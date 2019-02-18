import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Consumer as AlertConsumer } from './../contexts/alert';
import { withConsumer } from './../hoc/with-consumer';

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export const withAlert = WrappedComponent => {
    class WithAlert extends Component {
        static WrappedComponent = WrappedComponent;

        static propTypes = {
            alert: PropTypes.func.isRequired
        };

        componentWillUnmount() {
            this.props.alert(null);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithAlert.displayName = `WithAlert(${getDisplayName(WrappedComponent)})`;
    return withConsumer(AlertConsumer)(WithAlert);
};