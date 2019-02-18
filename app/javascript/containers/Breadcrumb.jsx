import { Component } from 'react';
import PropTypes from 'prop-types';

import { Consumer as BreadcrumbConsumer } from './../contexts/breadcrumb';
import { withConsumer } from './../hoc/with-consumer';

class Breadcrumb extends Component {
    state = { breadcrumbs: null };

    static propTypes = {
        breadcrumb: PropTypes.object.isRequired,
        children: PropTypes.node
    };

    componentDidMount() {
        const { children, breadcrumb } = this.props;

        if ((breadcrumb.show() || []) !== children) {
            breadcrumb.set(children);
        }
    }

    componentWillUnmount() {
        this.props.breadcrumb.set(null);
    }

    render() {
        return null;
    }
}

export default withConsumer(BreadcrumbConsumer)(Breadcrumb);