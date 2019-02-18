import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import userReducer, { watchLoginUser, watchLoginWithJWT, watchSetRefreshInterval, watchLogoutUser, watchFetchUser,
    watchSessionEnd } from './user';

import pageReducer, { watchSetPage } from './page';

// Export combined reducers
export default combineReducers({
    form: reduxForm,
    user: userReducer,
    page: pageReducer,
});

// Export combined sagas
export function* rootSaga() {
    yield all([
        watchLoginUser(),
        watchLoginWithJWT(),
        watchSetRefreshInterval(),
        watchLogoutUser(),
        watchFetchUser(),
        watchSessionEnd(),

        watchSetPage()
    ]);
}