import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Consumer as UserConsumer } from './../contexts/user';
import { withConsumer } from './../hoc/with-consumer';

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const initialConfig = {
    protected: false,
    redirectProtected: '/auth/login',
    noAuthorized: false,
    redirectAuthorized: '/mailbox'
};

export const withUser = (config = {}) => WrappedComponent => {
    config = Object.assign(Object.assign({}, initialConfig), config);

    class WithUser extends Component {
        static WrappedComponent = WrappedComponent;

        static propTypes = {
            authorized: PropTypes.bool,
            currentUser: PropTypes.object,
            history: PropTypes.object.isRequired,
        };

        componentWillMount() {
            const {authorized} = this.props;
            // protected: true
            if (config.protected && authorized === false) {
                this.handleUnauthorized();
            }
            // noAuthorized: true
            if (config.noAuthorized && authorized) {
                this.handleAuthorized();
            }
        }

        componentWillUpdate(nextProps) {
            // protected: true
            if (config.protected && nextProps.authorized === false) {
                this.handleUnauthorized(true);
            }
        }

        componentWillReceiveProps(nextProps) {
            // noAuthorized: true
            if (config.noAuthorized && this.props.authorized === null && nextProps.authorized) {
                this.handleAuthorized();
            }
        }

        handleUnauthorized(noWarning = false) {
            const { history, intl } = this.props;
            if (!noWarning) {
                console.error('Authorization needed');
            }
            history.push(config.redirectProtected);
        }

        handleAuthorized() {
            const { history, intl } = this.props;
            console.error('Already logged in');
            history.push(config.redirectAuthorized);
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }

    WithUser.displayName = `WithUser(${getDisplayName(WrappedComponent)})`;
    return withRouter(withConsumer(UserConsumer)(WithUser));
};