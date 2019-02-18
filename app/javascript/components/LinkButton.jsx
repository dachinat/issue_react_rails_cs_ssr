import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';

export default props => {
    return (
        <Link to={props.to}>
            <Button variant={props.variant}>
                {props.children}
            </Button>
        </Link>
    )
};
