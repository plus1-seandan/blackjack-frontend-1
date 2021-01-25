import React from 'react';
import {
  Router,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  browserHistory,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { createBrowserHistory } from 'history';

import GamePage from './GamePage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import PrivateRoute from './PrivateRoute';

const history = createBrowserHistory();

const Routes = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <PrivateRoute path="/home" exact component={HomePage} />
        <Route path="/register" exact component={RegisterPage} />
        <PrivateRoute path="/game" exact component={GamePage} />
        <PrivateRoute path="/profile" exact component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
