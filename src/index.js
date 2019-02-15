import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import SignUp from './components/auth/SignUp/SignUp';
import Login from './components/auth/Login/Login';
import firebase from './firebase';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {

  componentDidMount = () => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.setUser(user);
          this.props.history.push('/');
        } else {
          this.props.clearUser();
          this.props.history.push('/login')
        }
      });
  }

  render() {
    return (
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signUp' exact component={SignUp} />
        <Route path='/login' exact component={Login} />
      </Switch>
    )
  }
}

const RootWithHistory = withRouter(connect(null, { setUser, clearUser })(Root));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithHistory />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
