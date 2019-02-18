import React, { Component, Fragment } from 'react';
import {Container, Form, Button, FormControl, Nav, Navbar, NavDropdown, Row, Col} from "react-bootstrap";
import * as Scroll from 'react-scroll';
import ScrollUp from 'react-scroll-up';
import { ToastConsumer } from 'react-toast-notifications';
import { Link } from 'react-router-dom';

import Footer from './../Footer';
import {Consumer as UserConsumer} from './../../contexts/user';
import LinkButton from './../LinkButton';

const Navigation = props => {
    console.log('ok');
    console.log(props);
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">MailSnag</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Scroll.Link spy={true} to="getting-started" smooth={true} duration={300} offset={-75} activeclassName="active" className="nav-link" role="button">
                        Getting Started
                    </Scroll.Link>

                    <Scroll.Link spy={true} to="pricing" smooth={true} duration={300} offset={-75} activeclassName="active" className="nav-link" role="button">
                        Pricing
                    </Scroll.Link>

                    <Scroll.Link spy={true} to="need-help" smooth={true} duration={300} offset={-75} activeclassName="active" className="nav-link" role="button">
                        Need Help
                    </Scroll.Link>
                </Nav>
                <Form inline>
                    <UserConsumer>
                        {({authorized}) => {
                            return (
                                <Fragment>
                                    {authorized === false ? (
                                            <LinkButton to="/auth/login" variant="outline-light">
                                                Sign-in
                                            </LinkButton>
                                        ) :
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
                                    }
                                </Fragment>
                            );
                        }}
                    </UserConsumer>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};
Navigation.propTypes = {

};

const Contents = () => {
    return (
        <div>
            <Scroll.Element name="getting-started">
                <section style={{color: '#05223f',marginBottom: '25px',marginLeft:'10px'}}>
                    <h2>Getting Started</h2>
                </section>
                <article style={{lineHeight: '26px'}}>
                    MailSnag is about <mark className="landing">testing emails.</mark>
                    You get our <mark className="landing">fake smtp</mark> server credentials,
                    which you dispatch your <mark className="landing">development/staging emails</mark>
                    to.<br/><br/>
                    You are provided with separate <mark className="landing">authentication data</mark>
                    and <mark className="landing">inboxes</mark> for each
                    <mark className="landing">mailbox</mark> you create.<br/><br/>
                    It is very easy to change your existing application to use our mail-server.
                    We provide <mark className="landing">integration examples</mark> as well as
                    <mark className="landing">support</mark> to help you use MailSnag.
                </article>
            </Scroll.Element>

            <Scroll.Element name="pricing">
                <section style={{color: '#05223f',marginBottom: '25px',marginTop:'30px',marginLeft:'10px'}}>
                    <h2>Pricing and Plans</h2>
                </section>
                <article>

                    <div className="container">
                        <div className="card-deck mb-3 text-center">

                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Dev</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">Free <small className="text-muted">/ 1 mailbox</small>
                                    </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li className="text-primary">Lifetime Plan</li>
                                        <li><strong>50 messages</strong> per mailbox</li>
                                        <li><strong>50 kb</strong> size limit</li>
                                        <li><strong>1 day</strong> retention</li>
                                        <li><strong>1 hour</strong> sharing</li>
                                        <li>Manual forwarding</li>
                                        <li>No teammates</li>
                                        <li>No error simulation</li>
                                    </ul>
                                    <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for
                                        free
                                    </button>
                                </div>
                            </div>

                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Freelancer</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$1 <small className="text-muted">/ per mailbox (minimum 5)</small>
                                    </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li className="text-primary">Free until in BETA</li>
                                        <li><strong>100 messages</strong></li>
                                        <li><strong>500 kb</strong> size limit</li>
                                        <li><strong>7 day</strong> retention</li>
                                        <li><strong>7 day</strong> sharing</li>
                                        <li><strong>10</strong> teammates</li>
                                        <li>Custom error rates</li>
                                        <li>10 auto forwarding rules</li>
                                    </ul>
                                    <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                                </div>
                            </div>


                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Business</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$2 <small className="text-muted">/ per mailbox (minimum 5)</small>
                                    </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li className="text-primary">Free until in BETA</li>
                                        <li><strong>1000 messages</strong> per mailbox</li>
                                        <li><strong>5 mb</strong> size limit</li>
                                        <li><strong>30 day</strong> retention</li>
                                        <li><strong>30 day</strong> sharing</li>
                                        <li><strong>100</strong> teammates</li>
                                        <li>Custom error rates</li>
                                        <li>100 auto forwarding rules</li>
                                    </ul>
                                    <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </Scroll.Element>

            <Scroll.Element id="need-help">
                <section style={{color: '#05223f',marginBottom: '25px',marginLeft:'10px'}}>
                    <h2>Get in Touch</h2>
                </section>
                <article>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    <br/><br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    <br/><br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    <br/><br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    <br/><br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                    form will be here<br/>
                </article>
            </Scroll.Element>

            <ScrollUp showUnder={160} duration={300} style={{
                position: 'fixed',
                bottom: 65,
                right: 40,
                cursor: 'pointer',
                transitionDuration: '0.15s',
                transitionTimingFunction: 'linear',
                transitionDelay: '0s',
                background: '#343a40',
                borderRadius: 3,
                boxShadow: 'inset 0 0 1px 0 rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                width: 55,
                color: '#fff',
                fontSize: 33
            }}>
                <i className="dripicons dripicons-chevron-up"></i>
            </ScrollUp>
        </div>
    );
};

const LandingLayout = props => {
    return (
        <Fragment>
            <Navigation {...props} />
            <Container className="mt-5 mb-5">
                <Contents/>
            </Container>
            <Footer />
        </Fragment>
    );
};

LandingLayout.propTypes = {

};

export default LandingLayout;