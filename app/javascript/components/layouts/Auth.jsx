import React, { Fragment } from 'react';
import {Container, Navbar } from "react-bootstrap";

import AuthLinks from './../AuthLinks';
import Footer from './../Footer';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">MailSnag</Navbar.Brand>
        </Navbar>
    );
};
Navigation.propTypes = {};

const AuthLayout = props => {
    return (
        <Fragment>
            <Navigation {...props} />
            <Container className="mt-5 mb-5">
                {props.children}
                <AuthLinks {...props} />
            </Container>
            <Footer />
        </Fragment>
    );
};

AuthLayout.propTypes = {};

export default AuthLayout;