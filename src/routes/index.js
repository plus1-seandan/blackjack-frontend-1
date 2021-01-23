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
import GamePage from './GamePage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const Routes = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/game" exact component={GamePage} />
        <Route path="/profile" exact component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
