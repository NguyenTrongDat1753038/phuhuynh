
import React from 'react';
import {CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main  from "./pages/Homepage/Homepage";
import LogIn from './pages/Authen/Login';
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/Authen/Signup"
import UniversityInfo from "./pages/UniversityInfo"
import News from "./pages/News"
function App() {
  return (
    <BrowserRouter>
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
  );
}

export default App;
