import React, { Component } from 'react';
import {Field} from 'redux-form';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { renderControl } from './ReduxForm';

class RecoverPasswordForm extends Component {
    render() {
        const { error, validated, submitDisabled, onSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={onSubmit} validated={validated} noValidate>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg="5">
                                <strong>
                                    Account recovery (step 3)
                                </strong>
                                { error && <p className="text-danger">{error}</p>}
                                <Field name="password" type="password" label="Password" placeholder="Enter a new password"
                                       component={renderControl} />
                                <Field name="password_confirm" type="password" label="Repeat Password" placeholder="Repeat new password"
                                       component={renderControl} />
                                <div className="text-right" style={{marginTop: '15px'}}>
                                    <Button disabled={submitDisabled} type="submit" color="primary" style={{marginTop: '10px'}}>
                                        { submitDisabled ? 'Saving...' : 'Save' }
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        );
    }
}

export default RecoverPasswordForm;