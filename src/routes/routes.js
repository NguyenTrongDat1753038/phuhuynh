import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import { Toolbar } from "@material-ui/core";
import Main  from "../pages/Homepage/Homepage";
import LogIn from '../pages/Authen/Login';
import UserProfile from "../pages/UserProfile";
import SignUp from "../pages/Authen/Signup"
import UniversityInfo from "../pages/UniversityInfo"
import News from "../pages/News"
import {CssBaseline } from "@material-ui/core";


const ReactRouter = () => {
    return (
        <BrowserRouter>
        <NavBar></NavBar>
        <Toolbar/>
        <CssBaseline />
          <Switch>
            <Route path="/" exact component = {Main}/>
            <Route path="/Login" exact component = {LogIn}/>
            <Route path="/profile" exact component = {UserProfile}/>
            <Route path="/signup" exact component = {SignUp}/>
            <Route path = "/contact" exact component = {UniversityInfo} />
            <Route paht = "/news" exact component = {News}  />
          </Switch>
    </BrowserRouter>
    
       )
     }
export default ReactRouter;