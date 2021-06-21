import React, { Component } from 'react';
// import Footer from '../Footer';
import LoginButton from '../../Hooks/login';
import "../../Hooks/login.css"

class LogIn extends Component {
    
    render() {
        return (
            <div>
                <LoginButton/>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default LogIn;