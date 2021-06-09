
import React from 'react';
import {CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main  from "./pages/Homepage/Homepage";
import UserProfile from "./pages/UserProfile"
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
        <Switch>
          <Route path="/">
            <UserProfile />
          </Route>
        </Switch>
  </BrowserRouter>
  );
}

export default App;
