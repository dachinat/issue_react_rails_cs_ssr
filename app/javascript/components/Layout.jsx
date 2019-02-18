import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import LandingLayout from './layouts/Landing';
import ApplicationLayout from './layouts/Application';
import AuthLayout from './layouts/Auth';
import CookieBar from './CookieBar';

const Layout = props => {
    const {match: { params: { component }}, children} = props;

    let ComputedLayout = ApplicationLayout;
    if (['terms_of_service'].includes(component) || typeof component === 'undefined') {
        ComputedLayout = LandingLayout;
    } else if (['auth'].includes(component)) {
        ComputedLayout = AuthLayout;
    }

    return (
        <Container>
            <Helmet titleTemplate="MailSnag - %s">
                <title>Welcome</title>
            </Helmet>
            <ComputedLayout {...props}>
                {children}
            </ComputedLayout>
            <CookieBar />
        </Container>
    );
};


Layout.propTypes = {
    match: PropTypes.object.isRequired
};

export default Layout;