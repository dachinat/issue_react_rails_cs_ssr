import React, { Component } from 'react';
import {Field} from 'redux-form';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { renderControl, renderCheck } from './ReduxForm';

class SignUpForm extends Component {
    render() {
        const { error, validated, submitDisabled, onSubmit } = this.props; // Global submission error

        return (
            <div>
                <div>
                    <Form onSubmit={onSubmit} validated={validated} noValidate>
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="5">
                                    <strong>
                                        Registration
                                    </strong>
                                    { error && <p className="text-danger">{error}</p>}
                                    <Field name="email" type="email" label="E-mail" placeholder="Your valid e-mail address"
                                           component={renderControl} />
                                    <Field name="password" type="password" label="Password" placeholder="Desired password"
                                           component={renderControl} />
                                    <Field name="password_confirmation" type="password" label="Repeat password" placeholder="Repeat your password"
                                           component={renderControl} />
                                    <Field controlId="agreement" name="agreement" type="checkbox" label="I agree to terms of service"
                                           component={renderCheck} />
                                    <div className="text-right" style={{marginTop: '15px'}}>
                                        <Button disabled={submitDisabled} type="submit" color="primary" style={{marginTop: '10px'}}>
                                            { submitDisabled ? 'Registering...' : 'Submit registration' }
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