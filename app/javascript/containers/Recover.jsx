import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import validator from 'validator';
import {clearSubmitErrors, reduxForm, SubmissionError} from "redux-form";

import { recoverPassword, setPassword, touchPassword } from './../ducks/user';
import { withUser } from './../hoc/with-user';
import { withAlert } from './../hoc/with-alert';
import RecoverEmailForm from './../components/RecoverEmailForm';
import RecoverPasswordForm from './../components/RecoverPasswordForm';
import RecoverTokenForm from './../components/RecoverTokenForm';
import ConfirmResendForm from "../components/ConfirmResendForm";

class EmailForm extends Component {
    state = {validated: false, submitDisabled: false};

    onFormSubmit(values, dispatch) {
        const {toastManager, recoverPassword, setInstructionState} = this.props;

        dispatch(clearSubmitErrors('emailForm'));
        return new Promise((resolve, reject) => {
            const errors = validateEmailForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(async ({email}) => {
            this.setState({validated: true, submitDisabled: true});

            try {
                await recoverPassword(email);

                setInstructionState(email);

                toastManager.add('Account recovery instructions have been sent', {
                    appearance: 'success',
                    autoDismiss: true
                });
            } catch (e) {
                console.log(e);
                this.setState({validated: false, submitDisabled: false});

                toastManager.add('An error occurred while resending recovery instructions', {
                    appearance: 'error',
                    autoDismiss: true
                });

                return Promise.reject(new SubmissionError({
                    '_error': 'Could not send recovery instructions',
                    'email': true,
                }));
            }
        });
    }

    render() {
        return (
            <RecoverEmailForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                              validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                              error={this.props.error}/>
        );
    }
}
const validateEmailForm = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'E-mail address is not given';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Invalid e-mail address';
    }

    return errors;
};
const EmailFormWrapper = reduxForm({
    form: 'emailForm',
    persistentSubmitErrors: true
})(connect(null, {recoverPassword})(withToastManager(EmailForm)));

class PasswordForm extends Component {
    state = {validated: false, submitDisabled: false};

    onFormSubmit(values, dispatch) {
        console.log('it');
        console.log(this.props);
        const {toastManager, setPassword, history, match} = this.props;
        const { params } = match;

        if (!params.token) {
            return console.error('Expected token param'); // eslint-disable-line no-console
        }

        dispatch(clearSubmitErrors('passwordForm'));

        return new Promise((resolve, reject) => {
            const errors = validatePasswordForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(async ({password}) => {
            this.setState({validated: true, submitDisabled: true});

            try {
                await setPassword(password, params.token);

                toastManager.add('You can now log-in with your new password', {
                    appearance: 'success',
                    autoDismiss: true
                });

                history.push({
                    pathname: '/auth/login',
                    state: { alert: {
                            message: 'Password has been recovered. Log-in now.',
                            type: 'success'
                        }}
                });

            } catch(e) {
                this.setState({validated: false, submitDisabled: false});

                toastManager.add('An error occurred while resetting your password', {
                    appearance: 'error',
                    autoDismiss: true
                });

                return Promise.reject(new SubmissionError({
                    '_error': 'Could not reset a password',
                    'password': true,
                }));
            }
        });
    }

    render() {
        return (
            <RecoverPasswordForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                              validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                              error={this.props.error}/>
        );
    }
}
const validatePasswordForm = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Password is not given';
    }
    if (values.password_confirm !== values.password) {
        errors.password_confirm = 'Passwords do not match';
    }

    return errors;
};
const PasswordFormWrapper = reduxForm({
    form: 'passwordForm',
    persistentSubmitErrors: true
})(connect(null, {setPassword})(withRouter(withToastManager(PasswordForm))));


class TokenForm extends Component {
    state = {validated: false, submitDisabled: false};

    onFormSubmit(values, dispatch) {
        const {history, toastManager} = this.props;

        dispatch(clearSubmitErrors('tokenForm'));

        return new Promise((resolve, reject) => {
            const errors = validateTokenForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(async ({token}) => {
            this.setState({validated: true, submitDisabled: true});

            try {
                history.push(`/auth/recover/${token}`);
            } catch(e) {
                this.setState({validated: false, submitDisabled: false});

                toastManager.add('An error occurred while processing this token', {
                    appearance: 'error',
                    autoDismiss: true
                });

                return Promise.reject(new SubmissionError({
                    '_error': 'Could not use token',
                    'token': true,
                }));
            }
        });
    }

    render() {
        return (
            <RecoverTokenForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                                 validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                                 error={this.props.error}/>
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
const TokenFormWrapper = reduxForm({
    form: 'tokenForm',
    persistentSubmitErrors: true
})(withRouter(withToastManager(TokenForm)));


class Recover extends Component {
    static propTypes = {};

    state = {instructionsSent: false,validated: false, submitDisabled: false};

    componentDidMount() {
        const {alert, match: {params}} = this.props;

        if (params && params.token) {
            alert('Now you can set a new password', 'success');
        }
    }

    componentWillReceiveProps(nextProps) {
        const { alert, touchPassword } = this.props;
        const { match } = nextProps;
        const token = match.params.token;

        if (token) {
            if (!this.state.instructionsSent) {
                touchPassword(token);
            }

            if (token !== this.props.match.params.token) {
                alert('Now you can set a new password', 'success');
            }
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { alert } = this.props;
        const { instructionsSent } = nextState;
        if (instructionsSent && instructionsSent !== this.state.instructionsSent) {
            alert('Recovery instructions have been dispatched to your e-mail address', 'success');
        }
    }

    setInstructionState(email) {
        this.setState({instructionsSent: email});
    }

    render() {
        const { match } = this.props;

        return (
            <Fragment>
                <Helmet>
                    <title>Recover forgotten password</title>
                    <meta name="descrition" content="Forgot your MailSnag account password? Recover with two steps"/>
                </Helmet>
                {
                    match.params && match.params.token ? <PasswordFormWrapper/> :
                        this.state.instructionsSent ? <TokenFormWrapper/> :
                            <EmailFormWrapper setInstructionState={this.setInstructionState.bind(this)}/>
                }
            </Fragment>
        );
    }
}



export default withAlert(
    connect(null, {touchPassword})(withUser({
        noAuthorized: true
    })(Recover)));