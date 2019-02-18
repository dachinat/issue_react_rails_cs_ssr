import React, { Component } from 'react';
import {Field} from 'redux-form';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { renderControl } from './ReduxForm';

class UnlockTokenForm extends Component {
    render() {
        const { error, validated, submitDisabled, onSubmit } = this.props;

        return (
            <div>
                    <Form onSubmit={onSubmit} validated={validated} noValidate>
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="5">
                                    <strong>
                                        Unlock by token
                                    </strong>
                                    { error && <p className="text-danger">{error}</p>}
                                    <Field name="token" type="text" label="Your token" placeholder="Enter a token that was sent to you"
                                           component={renderControl} />
                                    <div className="text-right" style={{marginTop: '15px'}}>
                                        <Button disabled={submitDisabled} type="submit" color="primary" style={{marginTop: '10px'}}>
                                            { submitDisabled ? 'Unlocking...' : 'Unlock' }
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

export default UnlockTokenForm;