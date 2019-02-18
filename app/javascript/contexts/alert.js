import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertContext = React.createContext();

class AlertProvider extends Component {
    state = { message: null, type: null };

    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <AlertContext.Provider value={{
                alert: (message, type) => {
                    if (message === null) {
                        return this.setState({ message: null, type: null });
                    }
                    if (!message || !type) {
                        if (this.state.message && this.state.type) {
                            return (
                                <Alert variant={this.state.type} dismissible>
                                    {this.state.message}
                                </Alert>
                            );
                        }
                        return;
                    }
                    this.setState({message, type});
                }
            }}>
                {this.props.children}
            </AlertContext.Provider>
        );
    }
}

const AlertConsumer = props => {
    return (
        <AlertContext.Consumer>
            {props.children}
        </AlertContext.Consumer>
    );
};

AlertConsumer.propTypes = {
    children: PropTypes.func
};

export default AlertContext;
export const Provider = AlertProvider;
export const Consumer = AlertConsumer;