import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastProvider } from 'react-toast-notifications';

import { Provider as UserProvider } from './../contexts/user';
import Layout from './../components/Layout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomToast from './../components/CustomToast';

import { Provider as AlertProvider } from  './../contexts/alert';
import Sessions from './Sessions';
//import './../styles/codemirror.css';
//import './../styles/index.css';
import { REQUEST_LOGOUT } from '../ducks/user';

class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.element,
    };

    render() {
        const {children} = this.props;

        return (
            <UserProvider>
                <ToastProvider components={{ ToastContainer: CustomToast }} autoDismissTimeout={3000}
                               transitionDuration={150}>
                    <AlertProvider>
                        <Sessions />
                        <Layout {...this.props}>
                            {children}
                        </Layout>
                    </AlertProvider>
                </ToastProvider>
            </UserProvider>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: callback => dispatch({type: REQUEST_LOGOUT, callback})
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Wrapper));