import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import SignUp from './components/auth/SignUp/SignUp';
import Login from './components/auth/Login/Login';

class Root extends Component {

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

const RootWithHistory = withRouter(Root);

ReactDOM.render(
  <BrowserRouter>
    <RootWithHistory />
  </BrowserRouter>, document.getElementById('root'));
