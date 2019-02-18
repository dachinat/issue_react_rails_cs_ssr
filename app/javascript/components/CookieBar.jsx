import React, { Fragment } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: #343a40;
    color: white;
    font-size: 14px;
    font-weight: 100;
    transition: .3s;
`;

const Message = styled.span`
    ${props => {
        return !props.mobile ? `
            white-space: nowrap;
            text-shadow: 0 1px 0 #343a40;
            @media (max-width: 700px) {
                display: none;
            }
        ` : `
            display: none;
            @media (max-width: 700px) {
                display: inline-block;
            }
        `
    }}
`;

const Input = styled.input`
    display: none;
    
    &:checked + ${Bar} {
        transform: translateY(70px);
    }
`;

const Close = styled.label`
    border: none;
    color: white;
    background: #107ffb;
    position: absolute;
    display: inline-block;
    right: 15px;
    top: 10px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.2);
    line-height: 30px;
    height: 30px;
    width: 30px;
    font-size: 16px;
    font-weight: bold;
    
    &:hover {
        background: #095c66;
    }
`;

const acceptCookies = () => localStorage.setItem('accept-cookies', 1);

export default () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('accept-cookies') === '1') {
        return null;
    }

    return (
        <Fragment>
            <Input id="cb_chk" type="checkbox" onChange={acceptCookies} />
            <Bar>
                <Message>
                    We uses cookies for a better experience. By your stay you agree to the <a href="javascript:void(0);">terms</a>
                </Message>
                <Message mobile>
                    We use cookies, <a href="javascript:void(0);">learn more</a>
                </Message>
                <Close htmlFor="cb_chk">x</Close>
            </Bar>
        </Fragment>
    );
};
