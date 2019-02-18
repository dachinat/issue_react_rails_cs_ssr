import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withToastManager } from 'react-toast-notifications';

import { REQUEST_LOGIN } from './../ducks/user';
import { withUser } from './../hoc/with-user';
import { withAlert } from './../hoc/with-alert';
import {clearSubmitErrors, reduxForm, SubmissionError} from "redux-form";
import SignInForm from './../components/SignInForm';
import validator from "validator";

class SignIn extends Component {
    state = { validated: false, submitDisabled: false };

    componentDidMount() {
        const { location: { state }, alert } = this.props;

        if (state && state.alert) {
            const { alert: { message, type } } = state;
            alert(message, type);
        }

        // if (state && state.forceWith) {
        //     loginWith(state.forceWith, intl.locale);
        // }
    }

    login(email, password) {
        const {login} = this.props;

        return new Promise((resolve, reject) => {
            login({email, password}, (error, res) => {
                if (error || !res || !res.id) {
                    return reject({error, res});
                }
                resolve(res);
            });
        });
    }

    onFormSubmit(values, dispatch) {
        const {toastManager, login, history} = this.props;

        dispatch(clearSubmitErrors('signInForm'));

        return new Promise((resolve, reject) => {
            const errors = validateForm(values, this.props);
            if (Object.keys(errors).length > 0) {
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(async ({email, password}) => {
            this.setState({validated: true, submitDisabled: true});

            try {
                await this.login(email, password);

                toastManager.add('You\'re now logged in', {
                    appearance: 'success',
                    autoDismiss: true
                });

                history.push('/mailbox');
            } catch(e) {

                this.setState({validated: false, submitDisabled: false});

                console.log(e);
                console.log(e.message);

                const {response: { data }} = e.res;

                if (data.message) {
                    this.props.alert(data.message, 'danger');
                }

                toastManager.add('Could not complete authorization', {
                    appearance: 'error',
                    autoDismiss: true
                });

                return Promise.reject(new SubmissionError({
                    '_error': 'Could not sign-in',
                    'email': true,
                    'password': true,
                }));
            }
        });
    }

    render() {
        console.log(this.props);
        const {authorized, alert} = this.props;

        if (authorized === null || authorized) {
            return null;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Login</title>
                    <meta name="description" content="Login to your MailSnag inbox" />
                </Helmet>
                {alert() && <div><br/>{alert()}</div>}
                <SignInForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                           validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                           error={this.props.error} />
            </Fragment>
        );
    }
}

// TODO registration form password validation repeat
const validateForm = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'You have to enter your e-mail login';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Invalid e-mail address';
    }

    if (!values.password) {
        errors.password = 'You have to use your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password is not valid'
    }

    return errors;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (payload, callback) => dispatch({type: REQUEST_LOGIN, payload, callback})
    };
};

export default reduxForm({
    form: 'signInForm',
    persistentSubmitErrors: true
})(withUser({
    noAuthorized: true
})(withAlert(connect(null, mapDispatchToProps)(withToastManager(SignIn)))));
