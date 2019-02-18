import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MixpanelConsumer } from 'react-mixpanel';

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export const withMixpanel = WrappedComponent => {
    class WithMixpanel extends Component {
        static WrappedComponent = WrappedComponent;

        static propTypes = {
            mixpanel: PropTypes.object.isRequired
        };

        render() {
            return (
                <MixpanelConsumer>
                    {mixpanel => (
                        <WrappedComponent {...this.props} mixpanel={mixpanel} />
                    )}
                </MixpanelConsumer>
            );
        }
    }

    WithMixpanel.displayName = `WithAlert(${getDisplayName(WrappedComponent)})`;
    return WithMixpanel;
};