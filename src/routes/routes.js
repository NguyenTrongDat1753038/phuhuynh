import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Signin from "../pages/Signin";
import Homepage from "../pages/Homepage";



export default function Routing(){
        return (
            <Router>
                <div>
                    {}


                    <Switch>
                        <Route path="/homepage">
                            <Homepage />
                        </Route>
                        <Route path="/"> 
                             <Signin />
                        </Route>
                       

                    </Switch>
                </div>
            </Router>
        );
    }


