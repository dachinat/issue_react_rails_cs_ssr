import React from 'react';
import styled from 'styled-components';

import bitbucket from './../assets/social-buttons/bitbucket.png'
import bitbucketWhite from './../assets/social-buttons/bitbucket-white.png'
import github from './../assets/social-buttons/github.png'
import githubWhite from './../assets/social-buttons/github-white.png'

const SocialButton = styled.a`
    background-position: 25px 0px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    height: 40px;
	line-height: 40px;
    text-align: left;
    text-decoration: none;
    text-transform: uppercase;
    vertical-align: middle;
    width: 320px;
	border-radius: 3px;
    margin: 10px auto;
    outline: rgb(255, 255, 255) none 0px;
    padding-left: 50px;
    padding-right: 40px;
    transition: all 0.2s cubic-bezier(0.72, 0.01, 0.56, 1) 0s;
	-webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -ms-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
   
   ${props => {
       if (props.variant === 'bitbucket') {
           return `
                background: rgb(255, 255, 255) url('${bitbucket}') no-repeat scroll 10px 10px / 20px 20px padding-box border-box;
                border: 1px solid #2e86f9;
           `;
       }
       if (props.variant === 'google') {
           return `
                background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus.png') no-repeat scroll 5px 0px / 40px 40px padding-box border-box;
                border: 1px solid rgb(220, 74, 61);   
           `;
       }
       if (props.variant === 'github') {
           return `
                background: rgb(255, 255, 255) url('${github}') no-repeat scroll 10px 10px / 22px 22px padding-box border-box;
                border: 1px solid #171516;   
           `;
       }
    }} 
   
   :hover {
        ${props => {
            if (props.variant === 'bitbucket') {
                return `
                    border-color: #2e86f9;
                    background: #2e86f9 url('${bitbucketWhite}') no-repeat scroll 10px 10px / 20px 20px padding-box border-box;
                    -webkit-transition: all .5s ease-out;
                    -moz-transition: all .2s ease;
                    -ms-transition: all .2s ease;
                    -o-transition: all .2s ease;
                    transition: all .2s ease-out;
                `;
            }
            if (props.variant === 'google') {
                return `
                    border-color: rgb(220, 74, 61);
                    background: rgb(220, 74, 61) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus-white.png') no-repeat scroll 5px 0px / 40px 40px padding-box border-box;
                    -webkit-transition: all .5s ease-out;
                    -moz-transition: all .2s ease;
                    -ms-transition: all .2s ease;
                    -o-transition: all .2s ease;
                    transition: all .2s ease-out;
                `;
            }
            if (props.variant === 'github') {
                return `
                    border-color: #171516;
                    background: #171516 url('${githubWhite}') no-repeat scroll 10px 10px / 22px 22px padding-box border-box;
                    -webkit-transition: all .5s ease-out;
                    -moz-transition: all .2s ease;
                    -ms-transition: all .2s ease;
                    -o-transition: all .2s ease;
                    transition: all .2s ease-out;
                `;
            }
        }} 
        
        span {
            color: #fff;
            -webkit-transition: all .2s ease;
            -moz-transition: all .2s ease;
            -ms-transition: all .2s ease;
            -o-transition: all .2s ease;
            transition: all .2s ease;
        }
   }
   
   span {
        ${props => {
            if (props.variant === 'bitbucket') {
                return `
                    box-sizing: border-box;
                    color: #2e86f9;
                    cursor: pointer;
                    text-align: center;
                    text-transform: uppercase;
                    border: 0px none #2e86f9;
                    outline: rgb(255, 255, 255) none 0px;
                    -webkit-transition: all .2s ease;
                    -moz-transition: all .2s ease;
                    -ms-transition: all .2s ease;
                    -o-transition: all .2s ease;
                    transition: all .2s ease;
                `;
            }
            
            if (props.variant === 'google') {
                return `
                    box-sizing: border-box;
                    color: rgb(220, 74, 61);
                    cursor: pointer;
                    text-align: center;
                    text-transform: uppercase;
                    border: 0px none rgb(220, 74, 61);
                    outline: rgb(255, 255, 255) none 0px;
                     -webkit-transition: all .2s ease;
                    -moz-transition: all .2s ease;
                    -ms-transition: all .2s ease;
                    -o-transition: all .2s ease;
                    transition: all .2s ease;
                `;
            }
            
            if (props.variant === 'github') {
                return `
                    box-sizing: border-box;
                    color: #171516;
                    cursor: pointer;
                    text-align: center;
                    text-transform: uppercase;
                    border: 0px none #171516;
                    outline: rgb(255, 255, 255) none 0px;
                     -webkit-transition: all .2s ease;
                    -moz-transition: all .2s ease;
                    -ms-transition: all .2s ease;
                    -o-transition: all .2s ease;
                    transition: all .2s ease;
                `;
            }
        }} 
   }
`;

export default props => (
    <SocialButton variant={props.variant} onClick={props.onClick}>
        <span>
            {props.children}
        </span>
    </SocialButton>
);