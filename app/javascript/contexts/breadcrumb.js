import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BreadcrumbContext = React.createContext();

class BreadcrumbProvider extends Component {
    state = { breadcrumbs: null };

    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <BreadcrumbContext.Provider value={{
                breadcrumb: {
                    show: () => {
                        return this.state.breadcrumbs;
                    },
                    set: breadcrumbs => {
                        this.setState({breadcrumbs});
                    }
                }
            }}>
                {this.props.children}
            </BreadcrumbContext.Provider>
        );
    }
}

const BreadcrumbConsumer = props => {
    return (
        <BreadcrumbContext.Consumer>
            {props.children}
        </BreadcrumbContext.Consumer>
    );
};

BreadcrumbConsumer.propTypes = {
    children: PropTypes.func
};

export default BreadcrumbContext;
export const Provider = BreadcrumbProvider;
export const Consumer = BreadcrumbConsumer;