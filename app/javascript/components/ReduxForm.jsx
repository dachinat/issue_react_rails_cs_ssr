import React from 'react';
import { Form } from 'react-bootstrap';

export const renderControl = ({meta: {touched, error}, label, input, type, placeholder}) => {
    console.log(input);
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control {...input} type={type} placeholder={placeholder}
                          isInvalid={error && touched} />
            {touched && error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Form.Group>
    );
};

export const renderCheck = ({meta: {touched, error}, controlId, label, input, type}) => {
    return (
        <Form.Group controlId={controlId}>
            <Form.Check custom {...input} type={type} label={label} isInvalid={error && touched} />
        </Form.Group>
    );
};