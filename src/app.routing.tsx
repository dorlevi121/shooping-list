import React from "react";
import { Route, Switch } from "react-router";
import Main from "./components/main/main";
import SignIn from "./components/auth/sign-in/sign-in.auth";
import SignUp from "./components/auth/sign-up/sign-up.auth";
import History from "./components/history/history";


const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/history" component={History}/>
    </Switch>
  );
};

export default Routing;
