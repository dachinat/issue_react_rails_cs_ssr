import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Consumer as UserConsumer } from './../contexts/user';

const AuthLinks = props => {
    const { location: { pathname } } = props;

    const links = [
        {
            title: 'Already have an account? Login',
            to: '/auth/login'
        }, {
            title: 'New to MailSnag? Register',
            to: '/auth/register'
        }, {
            title: 'Recover lost password',
            to: '/auth/recover'
        }, {
            title: 'Resend confirmation instructions',
            to: '/auth/confirm'
        }, {
            title: 'Your account got locked?',
            to: '/auth/unlock'
        }
    ];

    return (
        <UserConsumer>
            {({authorized}) => {
                return (
                    <Fragment>
                        {authorized === false ? (
                            <div style={{textAlign: 'center', lineHeight: '21px'}}>
                                {links.map(link => {
                                    if (link.to === pathname.split('/').slice(0, 3).join('/')) {
                                        return null;
                                    }
                                    return <div key={link.to}>
                                        <Link to={link.to}>{link.title}</Link>
                                    </div>;
                                })}
                            </div>
                        ) : null}
                    </Fragment>
                );
            }}
        </UserConsumer>
    );
};

AuthLinks.propTypes = {
    location: PropTypes.object,
    children: PropTypes.element
};

export default AuthLinks;
