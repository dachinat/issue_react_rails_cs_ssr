import React, { Component, Fragment } from 'react';
import {BreadcrumbItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {withToastManager} from 'react-toast-notifications';
import validator from 'validator';
import {reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileForm from './../components/ProfileForm'
import { withUser } from './../hoc/with-user';
import { updateProfile } from './../ducks/user';
import { REQUEST_FETCH_USER } from './../ducks/user';
import Breadcrumb from './Breadcrumb';

class Profile extends Component {
    state = { validated: false, submitDisabled: false, unconfirmedEmail: null };

    componentDidMount() {
        this.props.fetchUser(currentUser => {
            console.log(currentUser);
            this.props.initialize({
                email: currentUser.email
            })
        });
    }

    async updateProfile(email, password, currentPassword) {
        return new Promise((resolve, reject) => {
            this.props.updateProfile(email, password, currentPassword, e => {
                if (e) {
                    return reject(e);
                }
                resolve();
            });
        });
    }

    onFormSubmit(values, dispatch) {
        const { toastManager, currentUser, fetchUser } = this.props;

        dispatch(clearSubmitErrors('profileForm'));

        return new Promise((resolve, reject) => {
            const errors = validateForm(values, this.props);
            if (Object.keys(errors).length > 0) { // or Boolean(Object.keys(errors)[0])
                reject(new SubmissionError(errors));
            } else {
                resolve(values);
            }
        }).then(async ({email, password, current_password: currentPassword}) => {
            this.setState({validated: true, submitDisabled: true});

            try {
                await this.updateProfile(email, password, currentPassword);

                fetchUser();
                toastManager.add('Your profile has been updated', { appearance: 'success', autoDismiss: true });
                if (email !== currentUser.email) {
                    this.setState({unconfirmedEmail: email});
                }
            } catch(e) {
                toastManager.add('Could not update your profile', { appearance: 'error', autoDismiss: true });

                return Promise.reject(new SubmissionError({
                    '_error': 'Could not update your profile',
                    'email': true,
                    'password': true,
                    'password_confirmation': true,
                    'current_password': true,
                }));
            } finally {
                this.setState({validated: false, submitDisabled: false});
            }
        });
    }

    render() {
        const { currentUser } = this.props;

        if (!currentUser) {
            return null;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Your Account</title>
                </Helmet>

                <Breadcrumb>
                    <BreadcrumbItem href="/profile" active>Profile</BreadcrumbItem>
                </Breadcrumb>
                <h3>Edit your profile</h3>
                <div>Profile</div>
                <ProfileForm onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}
                             validated={this.state.validated} submitDisabled={this.state.submitDisabled}
                             error={this.props.error} newUnconfirmedEmail={this.state.unconfirmedEmail}
                             passwordSecured={currentUser.password_secured} provider={currentUser.current_provider}
                             unconfirmedEmail={currentUser.unconfirmed_email} email={currentUser.email} />
            </Fragment>
        );
    }
}


const validateForm = (values, props) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'You can\'t remove an e-mail';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'E-mail address is not valid';
    }

    if (values.password && values.password.length < 6) {
        errors.password = 'Password is too short (min: 6 characters)'
    }

    if (values.password && values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Passwords do not match';
    }

    if (props.currentUser.password_secured && !values.current_password) {
        errors.current_password = 'You have to enter your current password';
    }

    return errors;
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: callback => dispatch({type: REQUEST_FETCH_USER, callback}),
        ...bindActionCreators({ updateProfile }, dispatch)
    };
};

export default reduxForm({
    form: 'profileForm',
    persistentSubmitErrors: true,
})(connect(null, mapDispatchToProps)(withUser({
    protected: true
})((withToastManager(Profile)))));