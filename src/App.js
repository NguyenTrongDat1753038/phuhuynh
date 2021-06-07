
import React from 'react';
import {CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main  from "./pages/Homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
  </BrowserRouter>
  );
}

export default App;
