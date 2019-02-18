import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Indicator = () => <div>Loading</div>;

class Omniauth extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { match: { params: { provider } } } = this.props;

        const origin = encodeURIComponent(window.location.href);
        // eslint-disable-next-line no-undef
        window.location.href = `/users/auth/${provider}?origin=${origin}&popup=true`;

        window.document.getElementsByTagName('body')[0].classList.add('omniauth-popup-body');
    }

    render() {
        const { match: { params: { provider } } } = this.props;

        return (
            <div className="omniauth-popup">
                <Indicator />
                <br/><br/>
                <div>
                    Authenticating with {provider}
                </div>
            </div>
        );
    }
}

export default Omniauth;