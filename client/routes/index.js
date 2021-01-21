import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import GamePage from "./GamePage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/game" exact component={GamePage} />
      </Switch>
    </BrowserRouter>
  )
}
export default Routes;