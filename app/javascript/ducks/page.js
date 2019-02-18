import { call, put, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import axios from 'axios';

const SET_PAGE = 'arch_ssr_react/reducer/SET_PAGE';
export const REQUEST_SET_PAGE = 'arch_ssr_react/reducer/REQUEST_SET_PAGE';

export default function reducer(state = { pageName: null }, action = {}) {
    switch (action.type) {
        case SET_PAGE:
            return { ...state, pageName: action.payload };
        default: return state;
    }
}

const requestSetPage = async path => {
    const {data} = await axios.get(`${path}.json`);
    return data;
};

function* setPage({path}) {
    const payload = yield call(requestSetPage, path);
    if (payload) {
        yield put({type: SET_PAGE, payload});
    }
}

export function* watchSetPage() {
    yield takeLatest(REQUEST_SET_PAGE, setPage);
}