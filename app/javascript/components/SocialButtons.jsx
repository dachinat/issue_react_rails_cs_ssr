import React from 'react';
import SocialButton from './SocialButton'

const POPUP = {
    github: [700, 720],
    bitbucket: [710, 765],
    'google_oauth2': [600, 600]
};

export const loginWith = provider => {
    const link = `/omniauth/${provider}`;

    const width = POPUP[provider][0];
    const height = POPUP[provider][1];

    const sep = (link.indexOf('?') !== -1) ? '&' : '?',
        url = link + sep + 'popup=true',
        left = (window.screen.width - width) / 2 - 16,
        top = (window.screen.height - height) / 2 - 50,
        features = `menubar=no,toolbar=no,status=no,width=${width},height=${height},left=${left},top=${top}`;

    return window.open(url, 'OmniauthWindow', features);
};

export default () => (
    <div className="d-flex flex-column">
        <SocialButton variant="google" onClick={() => loginWith('google_oauth2')}>Connect with Google</SocialButton>
        <SocialButton variant="github" onClick={() => loginWith('github')}>Connect with GitHub</SocialButton>
        <SocialButton variant="bitbucket" onClick={() => loginWith('github')}>Connect with Bitbucket</SocialButton>
    </div>
);