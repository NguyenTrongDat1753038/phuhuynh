
import React from 'react';
import Login  from "./pages/Authen/Login"
import {CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RouterMD from "./routes/routes"
function App() {
  return (
    /*<BrowserRouter>
      <CssBaseline />
        <Switch>
          <Route path="/">*/
          <div>
            <RouterMD />
            </div>
         /* </Route>
        </Switch>
  </BrowserRouter>*/
  );
}

export default App;
