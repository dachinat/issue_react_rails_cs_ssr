import React, { Component } from 'react';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import reducers, { rootSaga } from './../ducks';
import { SET_REFRESH_INTERVAL, REQUEST_LOGOUT, FETCH_USER, handleLogin } from './../ducks/user';

const container = require.context('.', true, /\.jsx$/);

import './../scss/main';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
    const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware, reduxThunk));
    sagaMiddleware.run(rootSaga);

    if (typeof window !== 'undefined') {
        const authorization = localStorage.getItem('authorization');
        if (authorization) {
            handleLogin(authorization);
            store.dispatch({type: SET_REFRESH_INTERVAL});
        } else {
            store.dispatch({type: FETCH_USER, payload: null});
        }
    }

    axios.interceptors.response.use(null, e => {
        if (e.response.status === 401) {
            store.dispatch({type: REQUEST_LOGOUT, payload: { noRequest: true }});
        }
        return Promise.reject(e);
    });

    return store;
};

const Router = ({children, path}) => {
    return (typeof window === 'undefined') ?
        <StaticRouter location={path} context={{}}>{children}</StaticRouter> :
        <BrowserRouter>{children}</BrowserRouter>;
};

export default class extends Component {
    render() {
        const { path, data } = this.props;

        const store = configureStore({page: { pageName: data }});

        const Wrapper = container('./Wrapper.jsx').default;

        return (
            <Provider store={store}>
                <Router path={path}>
                    <Switch>
                        <Route path="/:component?">
                            <Switch>
                                <Route exact path="/omniauth/:provider/" component={container('./Omniauth.jsx').default} />
                                    <Switch>
                                        <Wrapper>
                                            <Switch>
                                                <Route exact path="/" component={container('./Landing.jsx').default} />
                                                <Route exact path="/auth/register" component={container('./SignUp.jsx').default} />
                                                <Route exact path="/auth/confirm/resend" component={container('./Confirm.jsx').Resend} />
                                                <Route path="/auth/confirm/:token?" component={container('./Confirm.jsx').default} />
                                                <Route path="/auth/unlock/resend" component={container('./Unlock.jsx').Resend} />
                                                <Route path="/auth/unlock/:token?" component={container('./Unlock.jsx').default} />
                                                <Route path="/auth/recover/:token?" component={container('./Recover.jsx').default} />
                                                <Route path="/auth/login" component={container('./SignIn.jsx').default} />
                                                <Route exact path="/profile" component={container('./Profile.jsx').default} />
                                                <Route path="/mailbox" component={container('./Mailbox.jsx').default} />
                                            </Switch>
                                        </Wrapper>
                                    </Switch>
                            </Switch>
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        );

    }
}