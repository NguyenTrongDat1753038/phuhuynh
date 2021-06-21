import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from "clsx"
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(() => ({
    login_container: {
        marginTop: "10%", 
        marginBottom: "10%", 
        maxHeight: "300px"
      },
      info: {
        paddingTop: "5%", 
        paddingLeft: "5%"
      },
      login_form_1: {
        borderRadius: "10px", 
        padding: "3%", 
        background: "#ffffff", 
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)"
      },
      login_form_1_h3: {
        textAlign: "center", 
        marginBottom: "12%", 
        color: "rgb(0, 0, 0)"
      },
      btnSubmit: {
        fontWeight: "600", 
        width: "50%", 
        backgroundColor: "rgb(255, 255, 255)", 
        border: "1.5px solid black", 
        borderRadius: "1.5rem", 
        padding: "2%"
      },
      btnSubmit_hover: {
        boxShadow: "0px 0px 0px 0.5px black inset"
      },
      btnForgetPwd: {
        color: "rgb(0, 0, 0)", 
        fontWeight: "600", 
        textDecoration: "none", 
        paddingLeft: "10%"
      },
      btnForgetPwd_hover: {
        textDecoration: "none", 
        color: "rgb(100, 100, 100)"
      },
      login_input: {
        background: "#ffffff", 
        border: "1px solid black"
      }
}));
export default function LoginButton() {
    const classes = useStyles()
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadding, setLoadding] = useState(0);
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.replace("/");
        }
    })


    async function AcctionLogin() {
        setLoadding(1);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/account/signin", requestOptions)
            .then(response => {
                console.log(response.clone)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
                // return response.json();
            })
            .then(result => {
                console.log(result.token)
                if (result.token !== undefined) {
                    localStorage.setItem("token", result.token)
                    console.log(result.token)
                    history.replace("/");
                }
            })
            .catch(error => {
                console.log('error', error)
                alert("Sai mat khau hoac tai khoan")
                setLoadding(0);
            });
    }

    function loaddingButton() {
        if (loadding===1){
        return (
            <button type="button" className={classes.btnSubmit}>
                <i className="fa fa-circle-o-notch fa-spin">
                </i>Loading
            </button>

        )}
        return (
            <button type="button" className={classes.btnSubmit} onClick={AcctionLogin}>Đăng nhập</button>
        )
    }

    return (
        <div className={clsx(classes.login_container,'container')}>
            <div className="row">
                <div className={clsx(classes.info,"col-md-8")}>
                    <img className="row" width="30%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="logo"></img>
                    <h3 className="row">Ứng dụng kết nối và quản lý cổng học tập</h3>
                </div>
                <div className={clsx('col-md-4',classes.login_form_1)}>
                    <form>
                        <h3>Đăng nhập</h3>
                        <div className="form-group">
                            <input  type="text" className="form-control" name="username" placeholder="Tài khoản" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input  type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            {loaddingButton()}
                            <Link to="/signup" className={classes.btnForgetPwd}>Đăng kí</Link>
                        </div></form>
                </div>
            </div>
        </div>
    )
}