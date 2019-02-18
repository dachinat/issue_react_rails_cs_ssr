import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withAlert } from './../hoc/with-alert';
import { REQUEST_SESSION_END, SET_REFRESH_INTERVAL, handleLogin } from './../ducks/user';
import { withUser } from './../hoc/with-user';

class Sessions extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        authorized: PropTypes.bool,
        setRefreshInterval: PropTypes.func.isRequired,
        requestSessionEnd: PropTypes.func.isRequired,
        alert: PropTypes.func.isRequired
    };

    componentDidMount() {
        window.addEventListener('storage', this.storageListener.bind(this));
        window.addEventListener('message', this.messageListener.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.storageListener);
        window.removeEventListener('message', this.messageListener);
    }

    messageListener(e) {
        const { authorized, setRefreshInterval, history, location, alert } = this.props;

        if (authorized) {
            return;
        }

        if (~e.origin.indexOf(process.env.RAILS_ROOT)) { // eslint-disable-line no-undef
            const { omniauthJWT, omniauthFailure, reason } = e.data;
            if (omniauthJWT) {
                handleLogin(omniauthJWT);
                return setRefreshInterval(() => {
                    return history.push('/mailbox');
                });
            }

            if (omniauthFailure) {
                const message = reason === 'email' ?
                    'There was no email in response, profile private or restricted. Please use different method' :
                    'Could not complete an authentication with OAuth provider';

                if (location.pathname === '/auth/login') {
                    return alert(message, 'warning');
                }

                return history.push({
                    pathname: '/auth/login',
                    state: {
                        alert: { type: 'warning', message }
                    }
                });
            }
        }
    }

    storageListener(e) {
        const {setRefreshInterval, requestSessionEnd, history, authorized} = this.props;
        if (e.key === 'authorization') {
            if (!e.oldValue && e.newValue && authorized === false) {
                handleLogin(e.newValue);
                setRefreshInterval(() => history.push('/mailbox'));
            } else if (e.oldValue && !e.newValue && authorized === true) {
                return requestSessionEnd(() => history.push('/auth/login'));
            }
        }
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestSessionEnd: callback => dispatch({type: REQUEST_SESSION_END, callback}),
        setRefreshInterval: callback => dispatch({type: SET_REFRESH_INTERVAL, callback})
    };
};

export default withAlert(withUser()(connect(null, mapDispatchToProps)(Sessions)));
