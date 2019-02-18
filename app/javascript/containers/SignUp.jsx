import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import validator from 'validator';
import { withToastManager } from 'react-toast-notifications';

import { registerUser } from './../ducks/user';
import { withUser } from './../hoc/with-user';
import SignUpForm from './../components/SignUpForm';

class SignUp extends Component {
    state = { validated: false, submitDisabled: false };

    onFormSubmit(values, dispatch) {
        const { registerUser, history, toastManager } = this.props;
        dispatch(clearSubmitErrors('signUpForm'));
        return new Promise((resolve, reject) => {
            const errors = validateForm(values, this.props);
            if (Object.keys(errors).length > 0) { // or Boolean(Object.keys(errors)[0])
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(async ({email, password}) => {
            this.setState({validated: true, submitDisabled: true});

            try {
                await registerUser(email, password);
                toastManager.add('First step for registering completed', { appearance: 'success', autoDismiss: true });

                history.push({
                    pathname: '/auth/confirm',
                    state: { email }
                });
            } catch(e) {
                this.setState({validated: false, submitDisabled: false});

                toastManager.add('Registration unsuccessful', { appearance: 'error', autoDismiss: true });

                return Promise.reject(new SubmissionError({
                    '_error': 'Could not complete a registration',
                    'email': true,
                    'password': true,
                    'password_confirmation': true,
                    'agreement': true,
                }));
            }
        });
    }


    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Sign-up for MailSnag</title>
                    <meta name="description"
                          content="Sign-up for MailSnag today and start receiving your dev / staging e-mails" />
                </Helmet>
                <SignUpForm
                    onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                    validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                    error={this.props.error} />
            </Fragment>
        );
    }
}

const validateForm = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'E-mail address is not given';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Invalid e-mail address';
    }

    if (!values.password) {
        errors.password = 'Password is not given';
    } else if (values.password.length < 6) {
        errors.password = 'Password is too short (min: 6 characters)'
    }

    if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Passwords do not match';
    }

    if (values.agreement !== true) {
        errors.agreement = true;
    }

    return errors;
};

export default reduxForm({
    form: 'signUpForm',
    persistentSubmitErrors: true
})(connect(
    null,
    { registerUser }
)(withUser({
    noAuthorized: true
})(withToastManager(SignUp))));