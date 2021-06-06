import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from "../pages/Authen/Login";
import Homepage from "../pages/Homepage";
import { Select } from '@material-ui/core';



const ReactRouter = () => {
    return (
            <Select>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Homepage} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Select>
    
       )
     }
export default ReactRouter;