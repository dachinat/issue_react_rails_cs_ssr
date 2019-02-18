import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { withUser } from './../hoc/with-user';
import { REQUEST_SET_PAGE } from './../ducks/page';
import { REQUEST_LOGIN } from './../ducks/user';

class Page extends Component {
    componentDidMount() {
        this.props.setPage(this.props.location.pathname);

        this.props.login({email: 'dachinat@gmail.com', password: 'd1989119O'}, (e) => {
            console.log(e);
        });

    }

    render() {
        const { pageName } = this.props;

        console.log(this.props);

        return (
            <div>
                <div>Page {pageName}</div>
                <div>AJAX request won't have effect on server-rendered page number (view source won't change after ajax call)</div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        pageName: state.page.pageName,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPage: path => dispatch({type: REQUEST_SET_PAGE, path }),
        login: (payload, callback) => dispatch({type: REQUEST_LOGIN, payload, callback})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withUser({})(Page)));