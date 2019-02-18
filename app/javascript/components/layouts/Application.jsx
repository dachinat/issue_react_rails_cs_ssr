import React, { Component, Fragment } from 'react';
import {Container, Form, Button, FormControl, Nav, Navbar, NavDropdown, Row, Col, Breadcrumb, BreadcrumbItem} from "react-bootstrap";
import * as Scroll from 'react-scroll';
import ScrollUp from 'react-scroll-up';
import { ToastConsumer } from 'react-toast-notifications';

import Footer from './../Footer';
import {Consumer as UserConsumer} from './../../contexts/user';
import { Provider as BreadcrumbProvider, Consumer as BreadcrumbConsumer } from './../../contexts/breadcrumb';

const Navigation = props => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">MailSnag</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to="/mailbox">
                        Mailbox
                    </Nav.Link>

                    <Nav.Link to="/profile">
                        Profile
                    </Nav.Link>
                </Nav>
                <Form inline>
                    <ToastConsumer>
                        {({ add }) => (
                            <Button variant="outline-light" onClick={e => {
                                props.logout(e => {
                                    if (e) {
                                        return add('Could not sign you out', {
                                            appearance: 'error',
                                            autoDismiss: true
                                        });
                                    }
                                    add('Now you\'re signed out', {
                                        appearance: 'success',
                                        autoDismiss: true
                                    });
                                });
                            }}>Sign-out</Button>
                        )}
                    </ToastConsumer>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};


const ApplicationLayout = props => {
    return (
        <Fragment>
            <Navigation {...props} />
            <Container className="mt-5 mb-5">
                <BreadcrumbProvider>
                    <BreadcrumbConsumer>
                        {({ breadcrumb }) => (
                            <Breadcrumb>
                                <BreadcrumbItem>MailSnag</BreadcrumbItem>
                                {breadcrumb.show()}
                            </Breadcrumb>
                        )}
                    </BreadcrumbConsumer>
                    {props.children}
                </BreadcrumbProvider>
            </Container>
            <Footer />
        </Fragment>
    );
};

ApplicationLayout.propTypes = {

};

export default ApplicationLayout;