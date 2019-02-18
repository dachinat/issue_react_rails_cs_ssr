import React, { Component } from 'react';
import {Field} from 'redux-form';
import { Container, Row, Col, Button, Form, Badge, Alert } from 'react-bootstrap';

import { renderControl } from './ReduxForm';

class SignUpForm extends Component {
    render() {
        const { error, validated, submitDisabled, onSubmit, passwordSecured, provider, unconfirmedEmail,
            newUnconfirmedEmail, email } = this.props;

        return (
            <div>
                <div>
                    <Form onSubmit={onSubmit} validated={validated} noValidate>
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="5">
                                    <strong>
                                        Profile
                                    </strong>
                                    { error && <p className="text-danger">{error}</p>}

                                    <Field name="email" type="email" label="E-mail" placeholder="Your new e-mail address"
                                           component={renderControl} value="dachin@gmail.com" />

                                    {(unconfirmedEmail || newUnconfirmedEmail) && (
                                        <div className="small text-dark bg-warning mb-4 border border-warning rounded p-2">
                                            Currently awaiting confirmation of
                                            <strong> {unconfirmedEmail || newUnconfirmedEmail}</strong>
                                        </div>
                                    )}


                                    {!passwordSecured && (
                                        <Alert variant="primary">
                                            You're authorized with third-party provider <strong>({provider}) </strong>
                                            and you don't have a current password set. Set a new password to use
                                            MailSnag without external authority.
                                        </Alert>
                                    )}

                                    <Field name="password" type="password" label="New Password" placeholder="Desired password"
                                           component={renderControl} />
                                    <Field name="password_confirmation" type="password" label="Repeat password" placeholder="Repeat new password"
                                           component={renderControl} />
                                    {passwordSecured && (
                                        <Field name="current_password" type="password" label="Current password" placeholder="Password you use now"
                                               component={renderControl} />
                                    )}

                                    <div className="text-right" style={{marginTop: '15px'}}>
                                        <Button disabled={submitDisabled} type="submit" color="primary" style={{marginTop: '10px'}}>
                                            { submitDisabled ? 'Updating...' : 'Update profile' }
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUpForm;