import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toast-notifications/dist/ToastContainer';

const ToastContainerWrapper = styled.div`
    z-index: 1020;
    position: absolute;
`;

export default props => (
    <ToastContainerWrapper>
        <ToastContainer {...props}>
            {props.children}
        </ToastContainer>
    </ToastContainerWrapper>
);