import React, {Component, Fragment} from 'react';
import {clearSubmitErrors, reduxForm, SubmissionError} from "redux-form";
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withToastManager} from 'react-toast-notifications';
import validator from 'validator';

import { withUser } from './../hoc/with-user';
import { withAlert } from './../hoc/with-alert';
import UnlockTokenForm from './../components/UnlockTokenForm';
import UnlockResendForm from './../components/UnlockResendForm';
import {unlockUser, resendUnlock} from "../ducks/user";

class Unlock extends Component {
    state = {validated: false, submitDisabled: false};

    static propTypes = {};

    componentDidMount() {
        const {location: {state}, alert, match} = this.props;
        if (state && state.email) {
            alert('Enter a received token to unlock your account', 'success');
        }

        const token = match.params.token;
        if (typeof token !== 'undefined') {
            this.unlockUser(token);
        }
    }

    onFormSubmit(values, dispatch) {
        dispatch(clearSubmitErrors('unlockTokenForm'));
        return new Promise((resolve, reject) => {
            const errors = validateTokenForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(({token}) => {
            this.setState({validated: true, submitDisabled: true});
            this.unlockUser(token);
        });
    }

    async unlockUser(token) {
        const {unlockUser, toastManager} = this.props;

        try {
            await unlockUser(token);
            toastManager.add('YYour account is not locked anymore', {
                appearance: 'success',
                autoDismiss: true
            });
            this.redirectToLogin();
        } catch (e) {
            this.setState({validated: false, submitDisabled: false});

            toastManager.add('Make sure you\'re submitting a valid unlock token', {
                appearance: 'error',
                autoDismiss: true
            });

            return Promise.reject(new SubmissionError({
                '_error': 'Could not unlock with token',
                'token': true,
            }));
        }
    }

    redirectToLogin() {
        const {history} = this.props;
        return history.push({
            pathname: '/auth/login',
            state: { alert: { type: 'success', message: 'Your account is now unlocked' } }
        });
    }

    redirectToResend(e) {
        const {history} = this.props;
        const {state} = this.props.location;

        e.preventDefault();

        if (!state || !state.email) {
            return;
        }

        history.push({
            pathname: '/auth/unlock/resend',
            state: { email: state.email }
        });
    }

    render() {
        const {alert, location} = this.props;

        return (
            <Fragment>
                <Helmet>
                    <title>Unlock your account</title>
                    <meta name="description"
                          content="MailSnag may lock your account for maximum security; Unlock your account by following the instructions"/>
                </Helmet>
                {alert() && <div>{alert()}</div>}
                <UnlockTokenForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                                  validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                                  error={this.props.error}/>

                <div style={{textAlign: 'center'}}>
                    {
                        (() => {
                            const {state} = location;
                            return state && state.email
                                ? (
                                    <div>
                                        <a href="/#" onClick={this.redirectToResend.bind(this)}>
                                            Resend an e-email ({state.email})</a>
                                        <br/>
                                        <Link to="/auth/unlock/resend">
                                            Other?
                                        </Link>
                                    </div>
                                )
                                : <Link to="/auth/unlock/resend">Resend an e-mail</Link>;
                        })()
                    }
                </div>
            </Fragment>
        );
    }
}


class UnlockResend extends Component {
    state = {validated: false, submitDisabled: false};

    static propTypes = {};

    componentDidMount() {
        const { location: { state } } = this.props;

        if (state && state.email) {
            this.resendUnlock(state.email);
        }
    }

    onFormSubmit(values, dispatch) {
        dispatch(clearSubmitErrors('unlockResendForm'));
        return new Promise((resolve, reject) => {
            const errors = validateResendForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(({email}) => {
            this.setState({validated: true, submitDisabled: true});
            this.resendUnlock(email);
        });
    }

    async resendUnlock(email) {
        const { history, resendUnlock, toastManager } = this.props;

        try {
            await resendUnlock(email);

            toastManager.add('Instructions have been sent', {
                appearance: 'success',
                autoDismiss: true
            });

            history.push({
                pathname: '/auth/unlock',
                state: { email }
            });
        } catch(e) {

            this.setState({validated: false, submitDisabled: false});

            toastManager.add('An error occurred while sending the instructions', {
                appearance: 'error',
                autoDismiss: true
            });

            return Promise.reject(new SubmissionError({
                '_error': 'Could not resend instructions',
                'email': true,
            }));
        }
    }

    render(){
        return (
            <Fragment>
                <Helmet>
                    <title>Resend instructions</title>
                    <meta name="description"
                          content="Enter your e-mail address andrReceive account unlock instructions"/>
                </Helmet>
                <UnlockResendForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                                   validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                                   error={this.props.error}/>
            </Fragment>
        );
    }
}

const validateTokenForm = values => {
    const errors = {};

    if (!values.token) {
        errors.token = 'Token is not given';
    }

    return errors;
};

const validateResendForm = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'E-mail address is not given';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Invalid e-mail address';
    }

    return errors;
};

export const Resend = reduxForm({
    form: 'unlockResendForm',
    persistentSubmitErrors: true
})(connect(null, {resendUnlock})(withToastManager(UnlockResend)));

export default reduxForm({
    form: 'unlockTokenForm',
    persistentSubmitErrors: true
})(withAlert(connect(null, {unlockUser})(withUser({
    noAuthorized: true
})(withToastManager(Unlock)))));

