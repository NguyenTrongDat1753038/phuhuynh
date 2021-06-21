import React, { Component,useState,useEffect } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import { Toolbar } from "@material-ui/core";
import Main  from "../pages/Homepage/Homepage";
import LogIn from '../pages/Authen/Login';
import UserProfile from "../pages/UserProfile";
import SignUp from "../pages/Authen/Signup"
import UniversityInfo from "../pages/UniversityInfo"
import News from "../pages/News"
import Homepage from "../pages/Homepage/Homepage"
import {CssBaseline } from "@material-ui/core";
import { exact } from 'prop-types';

class ReactRouter extends Component {
  render() {
      return (
        <BrowserRouter>
        <Route
              exact
              path="/"
              render={() =>
                localStorage.getItem("token") === null ? (
                  <Redirect to= "/login"/>
                ) : (
                  <Redirect to="/homepage" />
                )
              }
        />
        <Route exact path = "/login"> <LogIn/></Route>
        <CssBaseline />
          <Switch>
            <Route exact path = "/homepage"> <Homepage/> </Route>
            <Route exact path="/profile">  <UserProfile/> </Route> 
            <Route exact path="/signup"> <SignUp/> </Route>
            <Route exact path = "/contact" > <UniversityInfo/> </Route>
            <Route exact path = "/news" > <News/> /</Route>
          </Switch>
    </BrowserRouter>
    
       )
}
}
export default ReactRouter;