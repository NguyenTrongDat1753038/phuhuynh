import React, { Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LogIn from '../pages/Authen/Login';
import Profile from "../pages/UserProfile";
import SignUp from "../pages/Authen/Signup"
import UniversityInfo from "../pages/UniversityInfo"
import News from "../pages/News"
import Homepage from "../pages/Homepage/Homepage"
import Calendar from '../pages/Calendar';
import Forum from '../pages/Forum';
import Course from '../pages/Course';
import Document from '../pages/Document';
import {CssBaseline } from "@material-ui/core";

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
            <Route exact path="/profile">  <Profile/> </Route> 
            <Route exact path="/signup"> <SignUp/> </Route>
            <Route exact path = "/contact" > <UniversityInfo/> </Route>
            <Route exact path = "/news" > <News/> /</Route>
            <Route exact path = "/calendar"> <Calendar/></Route>
            <Route exact path = "/course"> <Course/></Route>
            <Route exact path = "/forum"> <Forum/></Route>
            <Route exact path = "/document"> <Document/> </Route>
          </Switch>
    </BrowserRouter>
    
       )
}
}
export default ReactRouter;