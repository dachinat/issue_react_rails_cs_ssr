import { call, put, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import axios from 'axios';

// Config
const REFRESH_INTERVAL = 1000 * 60 * 60; // 1 hour

// Types
export const REQUEST_LOGIN = 'mail-snag-client/reducer/REQUEST_LOGIN';
const LOGIN_USER = 'mail-snag-client/reducer/LOGIN_USER';
export const REQUEST_LOGOUT = 'mail-snag-client/reducer/REQUEST_LOGOUT';
const LOGOUT_USER = 'mail-snag-client/reducer/LOGOUT_USER';
export const REQUEST_LOGIN_WITH_JWT = 'mail-snag-client/reducer/REQUEST_LOGIN_WITH_JWT';
export const SET_REFRESH_INTERVAL = 'mail-snag-client/reducer/SET_REFRESH_INTERVAL';
export const REQUEST_FETCH_USER = 'mail-snag-client/reducer/REQUEST_FETCH_USER';
export const FETCH_USER = 'mail-snag-client/reducer/FETCH_USER';
const REGISTER_USER = 'mail-snag-client/reducer/REGISTER_USER';
const CONFIRM_USER = 'mail-snag-client/reducer/CONFIRM_USER';
const RESEND_CONFIRMATION = 'mail-snag-client/reducer/RESEND_CONFIRMATION';
const RECOVER_PASSWORD = 'mail-snag-client/reducer/RECOVER_PASSWORD';
const SET_PASSWORD = 'mail-snag-client/reducer/SET_PASSWORD';
const TOUCH_PASSWORD = 'mail-snag-client/reducer/TOUCH_PASSWORD';
const UNLOCK_USER = 'mail-snag-client/reducer/UNLOCK_USER';
const RESEND_UNLOCK = 'mail-snag-client/reducer/RESEND_UNLOCK';
const UPDATE_PROFILE = 'mail-snag-client/reducer/UPDATE_PROFILE';
export const REQUEST_SESSION_END = 'mail-snag-client/reducer/REQUEST_SESSION_END';

// Reducer
let authorized;
export default function reducer(state = { authorized: null, currentUser: null }, action = {}) {
    switch (action.type) {
        case LOGIN_USER:
            authorized = !!action.payload && !!action.payload.id;
            return { ...state, authorized, currentUser: authorized ? action.payload : null };
        case LOGOUT_USER:
            if (action.payload === true) {
                return { ...state, authorized: false, currentUser: null };
            }
            return { ...state };
        case FETCH_USER:
            if (action.payload && action.payload.id) {
                return { ...state, authorized: true, currentUser: action.payload };
            }
            return { ...state, authorized: false };
        default: return state;
    }
}

// Actions
export const registerUser = (email, password) => async dispatch => {
    try {
        await axios.post(`/users.json`, {user: {email, password}});
        dispatch({ type: REGISTER_USER });
    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
};

export const confirmUser = token => async dispatch => {
    try {
        const {data} = await axios.get(`/users/confirmation.json?confirmation_token=${token}`);

        if (!data.id) {
            throw new Error('No id present in response data');
        }

        dispatch({ type: CONFIRM_USER });
        return data;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
};

export const resendConfirmation = email => async dispatch => {
    try {
        await axios.post(`/users/confirmation.json`, {user: { email }});
        dispatch({ type: RESEND_CONFIRMATION });
    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
};

export const unlockUser = token => async dispatch => {
    try {
        await axios.get(`/users/unlock.json?unlock_token=${token}`);
        dispatch({ type: UNLOCK_USER });
    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
};

export const resendUnlock = email => async dispatch => {
    try {
        await axios.post(`/users/unlock.json`, {user: { email }});
        dispatch({type: RESEND_UNLOCK});
    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
};

export const recoverPassword = email => async dispatch => {
    try {
        await axios.post(`/users/password.json`, {user:  {email }});
        dispatch({ type: RECOVER_PASSWORD });
    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
};

export const setPassword = (password, reset_password_token) => async dispatch => {
    try {
        await axios.put('/users/password.json', {user: {password, reset_password_token}});
        dispatch({ type: SET_PASSWORD })
    } catch(e){
        console.error(e);
        throw new Error(e);
    }
};

export const touchPassword = token => async dispatch => {
    try {
        await axios.get(`/users/password.json/edit?reset_password_token=${token}`);
        dispatch({type: TOUCH_PASSWORD });
    } catch(e) {
        console.error(e);
        throw new Error(e);
    }
};

export const updateProfile = (email, password, currentPassword, callback=() => {}) => {
    axios.put(`/users.json`, {
        user: {
            email,
            password,
            current_password: currentPassword
        }
    }).then(() => {
        callback(null);
    }).catch(e => {
        callback(e);
    });
    return { type: UPDATE_PROFILE };
};

// Sagas
const requestLogin = async (email, password) => {
    try {
        delete axios.defaults.headers.common['authorization'];
        const { data, headers: {authorization} } = await axios.post(`/users/sign_in.json`, {
            user: { email, password }
        });
        handleLogin(authorization);
        return data;
    } catch (e) {
        console.error(e);
        return e;
    }
};
function* loginUser({payload: {email, password}, callback=() => {}}) {
    const payload = yield call(requestLogin, email, password);
    if (payload.id) {
        yield put({type: SET_REFRESH_INTERVAL});
    }
    yield put({type: LOGIN_USER, payload});
    yield call(callback, !((payload||{}).id), payload);
}
export function* watchLoginUser() {
    yield takeLatest(REQUEST_LOGIN, loginUser);
}

const requestLogout = async () => {
    try {
        await axios.delete('/users/sign_out.json');
        return true;
    } catch (e) {
        return false;
    }
};
function* logoutUser(sagaPayload={}) {
    const payload = (!sagaPayload.payload || !sagaPayload.payload.noRequest) ?
        yield call(requestLogout, sagaPayload) : true;
    if (payload === true) {
        yield call(handleLogout);
    }
    yield put({type: LOGOUT_USER, payload});
    if (sagaPayload.callback) {
        sagaPayload.callback(!payload);
    }
}
export function* watchLogoutUser() {
    yield takeLatest(REQUEST_LOGOUT, logoutUser);
}

function* sessionEnd(payload={}) {
    yield put({type: LOGOUT_USER, payload: true});
    yield call(handleLogout);
    if (payload.callback) {
        payload.callback();
    }
}
export function* watchSessionEnd() {
    yield takeLatest(REQUEST_SESSION_END, sessionEnd);
}

const requestLoginWithJWT = async jwt => {
    try {
        const {data, headers: {authorization}} = await axios.post('/users/sign_in.json', {}, {
            headers: { authorization: jwt }
        });
        handleLogin(authorization);
        return data;
    } catch (e) {
        return e;
    }
};
function* loginWithJWT({payload: jwt, callback=() => {}}) {
    const payload = yield call(requestLoginWithJWT, jwt);
    yield put({type: LOGIN_USER, payload});
    yield call(callback, !((payload||{}).id), payload);
}
export function* watchLoginWithJWT() {
    yield takeLatest(REQUEST_LOGIN_WITH_JWT, loginWithJWT);
}

const requestFetchUser = async () => {
    try {
        const {data} = await axios.get('/users/current_user.json');
        return data;
    } catch(e) {
        return null;
    }
};
function* fetchUser({callback = () => {}}) {
    const payload = yield call(requestFetchUser);
    yield put({type: FETCH_USER, payload});
    if (payload) {
        callback(payload);
    }
}
export function* watchFetchUser() {
    yield takeLatest(REQUEST_FETCH_USER, fetchUser);
}

function* setRefreshInterval({callback = () => {}}) {
    const chan = yield call(intervalChannel);

    let c = 0;
    while (true) {
        c += 1;
        const authorization = localStorage.getItem('authorization');
        yield take(chan);
        yield put({type: REQUEST_LOGIN_WITH_JWT, payload: authorization, callback: c === 1 ? callback : undefined });
    }
}
export function* watchSetRefreshInterval() {
    yield takeLatest(SET_REFRESH_INTERVAL, setRefreshInterval);
}

// Helpers
export const handleLogin = header => {
    if (!header) {
        return console.error('Header not present to save'); // eslint-disable-line no-console
    }
    localStorage.setItem('authorization', header);
    axios.defaults.headers.common['authorization'] = header;
};
const handleLogout = () => {
    const authorization_tid = localStorage.getItem('authorization_tid');
    if (authorization_tid) {
        localStorage.removeItem('authorization_tid');
        clearTimeout(+authorization_tid);
    }
    localStorage.removeItem('authorization');
    delete axios.defaults.headers.common['authorization'];
};
const intervalChannel = (it = 0) => {
    return eventChannel(emitter => {
            let tid;
            const authorization_tid = localStorage.getItem('authorization_tid');
            if (authorization_tid) {
                clearTimeout(+authorization_tid);
            }
            tid = setTimeout(function timeoutFn() {
                emitter(++it);
                tid = setTimeout(timeoutFn, REFRESH_INTERVAL);
                localStorage.setItem('authorization_tid', tid);
            }, 0);
            return () => {
                clearTimeout(tid);
            };
        }
    );
};