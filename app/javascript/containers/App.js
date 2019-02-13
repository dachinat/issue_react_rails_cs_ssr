console.log('ok');
// require('react');
//
// export default () => <div>hi</div>;

// import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import axios from 'axios';
//
// import reducers, { rootSaga } from './../ducks';
// import { SET_REFRESH_INTERVAL, REQUEST_LOGOUT, FETCH_USER, handleLogin } from './../ducks/user';
//
// //const container = require.context('.', true, /\.jsx$/);
// //const component = require.context('./../components', true, /\.jsx$/);
//
// import Wrapper from './Wrapper';
// import Footer from './../components/Footer';
//
// const sagaMiddleware = createSagaMiddleware();
//
// import './../scss/main.scss';
//
// const configureStore = (initialState = {}) => {
//     const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
//     sagaMiddleware.run(rootSaga);
//
//     if (typeof window !== 'undefined') {
//         const authorization = localStorage.getItem('authorization');
//         if (authorization) {
//             handleLogin(authorization);
//             store.dispatch({type: SET_REFRESH_INTERVAL});
//         } else {
//             store.dispatch({type: FETCH_USER, payload: null});
//         }
//     }
//
//     axios.interceptors.response.use(null, e => {
//         if (e.response.status === 401) {
//             store.dispatch({type: REQUEST_LOGOUT, payload: { noRequest: true }});
//         }
//         return Promise.reject(e);
//     });
//
//     return store;
// };
//
// const Router = ({children, path}) => {
//     return (typeof window === 'undefined') ?
//         <StaticRouter location={path} context={{}}>{children}</StaticRouter> :
//         <BrowserRouter>{children}</BrowserRouter>;
// };
//
// export default class extends Component {
//     render() {
//         const { path, data } = this.props;
//
//         const store = configureStore({page: { pageName: data }});
//
//         //const Wrapper = container('./Wrapper.jsx').default;
//
//         return (
//             <Provider store={store}>
//                 <Router path={path}>
//                     <Switch>
//                         <Route path="/:component?">
//                             <Switch>
//                                 <Wrapper>
//                                     <Switch>
//                                         <Route path="/" component={<Footer />} />
//                                         {/*<Route path="/" component={AsyncFooterComponent}/>*/}
//                                     </Switch>
//                                 </Wrapper>
//                             </Switch>
//                         </Route>
//                     </Switch>
//                 </Router>
//             </Provider>
//         );
//
//     }
// }