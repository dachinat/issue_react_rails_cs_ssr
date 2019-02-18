import React, {Component, Fragment} from 'react';
import {clearSubmitErrors, reduxForm, SubmissionError} from "redux-form";
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withToastManager} from 'react-toast-notifications';
import validator from 'validator';

import {confirmUser, resendConfirmation} from './../ducks/user';
import {withUser} from './../hoc/with-user';
import {withAlert} from './../hoc/with-alert';
import ConfirmTokenForm from './../components/ConfirmTokenForm';
import ConfirmResendForm from './../components/ConfirmResendForm';

class Confirm extends Component {
    state = {validated: false, submitDisabled: false};

    static propTypes = {};

    componentDidMount() {
        const {location: {state}, alert, match} = this.props;
        if (state && state.email) {
            alert('You have been registered, but you need to confirm your account to sign-in', 'success');
        }

        const token = match.params.token;
        if (typeof token !== 'undefined') {
            this.confirmUser(token);
        }
    }

    onFormSubmit(values, dispatch) {
        dispatch(clearSubmitErrors('confirmTokenForm'));
        return new Promise((resolve, reject) => {
            const errors = validateTokenForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(({token}) => {
            this.setState({validated: true, submitDisabled: true});
            this.confirmUser(token);
        });
    }

    async confirmUser(token) {
        const {confirmUser, toastManager} = this.props;

        try {
            await confirmUser(token);
            toastManager.add('Your account has been successfully confirmed', {
                appearance: 'success',
                autoDismiss: true
            });
            this.redirectToLogin();
        } catch (e) {
            this.setState({validated: false, submitDisabled: false});

            toastManager.add('Make sure you\'re submitting a valid confirmation token', {
                appearance: 'error',
                autoDismiss: true
            });

            return Promise.reject(new SubmissionError({
                '_error': 'Could not verify your token',
                'token': true,
            }));
        }
    }

    redirectToLogin() {
        const {history, authorized} = this.props;
        return history.push({
            pathname: authorized ? '/profile' : '/auth/login',
            state: {alert: {type: 'success', message: 'Your account is now confirmed'}}
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
            pathname: '/auth/confirm/resend',
            state: { email: state.email }
        });
    }

    render() {
        const {alert, location, history, match} = this.props;

        return (
            <Fragment>
                <Helmet>
                    <title>Account confirmation</title>
                    <meta name="description"
                          content="MailSnag needs to verify your e-mail address to complete your registration"/>
                </Helmet>
                {alert() && <div>{alert()}</div>}
                <ConfirmTokenForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
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
                                            Resend an e-mail ({state.email})
                                        </a>
                                        <br/>
                                        <Link to="/auth/confirm/resend">
                                            Other?
                                        </Link>
                                    </div>
                                )
                                : <Link to="/auth/confirm/resend">Resend an e-mail</Link>;
                        })()
                    }
                </div>
            </Fragment>
        );
    }
}

class ConfirmResend extends Component {
    state = {validated: false, submitDisabled: false};

    static propTypes = {};

    componentDidMount() {
        const { location: { state } } = this.props;

        if (state && state.email) {
            this.resendConfirmation(state.email);
        }
    }

    onFormSubmit(values, dispatch) {
        dispatch(clearSubmitErrors('confirmResendForm'));
        return new Promise((resolve, reject) => {
            const errors = validateResendForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(({email}) => {
            this.setState({validated: true, submitDisabled: true});

            this.resendConfirmation(email);

        });
    }

    async resendConfirmation(email) {
        const { history, resendConfirmation, toastManager } = this.props;

        try {
            await resendConfirmation(email);

            toastManager.add('Instructions have been resent', {
                appearance: 'success',
                autoDismiss: true
            });

            history.push({
                pathname: '/auth/confirm',
                state: { email }
            });
        } catch(e) {

            this.setState({validated: false, submitDisabled: false});

            toastManager.add('An error occurred while resending the instructions', {
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
                          content="Resend our confirmation instructions to your mailbox and confirm your account"/>
                </Helmet>
                <ConfirmResendForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
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
    form: 'confirmResendForm',
    persistentSubmitErrors: true
})(connect(null, {resendConfirmation})(withToastManager(ConfirmResend)));

export default reduxForm({
    form: 'confirmTokenForm',
    persistentSubmitErrors: true
})(withAlert(connect(null, {confirmUser})(withUser({
    noAuthorized: false
})(withToastManager(Confirm)))));
