import React, { Component } from 'react';
import {Field} from 'redux-form';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { renderControl } from './ReduxForm';

class RecoverTokenForm extends Component {
    render() {
        const { error, validated, submitDisabled, onSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={onSubmit} validated={validated} noValidate>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg="5">
                                <strong>
                                    Account recovery (step 2)
                                </strong>
                                { error && <p className="text-danger">{error}</p>}
                                <Field name="token" type="text" label="Token" placeholder="Enter received token"
                                       component={renderControl} />
                                <div className="text-right" style={{marginTop: '15px'}}>
                                    <Button disabled={submitDisabled} type="submit" color="primary" style={{marginTop: '10px'}}>
                                        { submitDisabled ? 'Checking...' : 'Check' }
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

export default RecoverTokenForm;