import React, { Component } from 'react';
import {Field} from 'redux-form';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { renderControl } from './ReduxForm';
import SocialButtons from './SocialButtons'

class SignInForm extends Component {
    render() {
        const { error, validated, submitDisabled, onSubmit } = this.props; // Global submission error

        return (
            <div>
                <SocialButtons />
                <div>
                    <Form onSubmit={onSubmit} validated={validated} noValidate>
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="5">
                                    <strong>
                                        Sign-in
                                    </strong>
                                    { error && <p className="text-danger">{error}</p>}
                                    <Field name="email" type="email" label="E-mail" placeholder="Your e-mail address"
                                           component={renderControl} />
                                    <Field name="password" type="password" label="Password" placeholder="Your password"
                                           component={renderControl} />
                                    <div className="text-right" style={{marginTop: '15px'}}>
                                        <Button disabled={submitDisabled} type="submit" color="primary" style={{marginTop: '10px'}}>
                                            { submitDisabled ? 'Signing-in...' : 'Sign-in' }
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

export default SignInForm;