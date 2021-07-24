import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button,TextField,Typography} from "@material-ui/core"
import { Alert } from 'react-native';
const useStyles = makeStyles((theme) => ({
    root: {
      background: "#faf9e8", 
     boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
      borderRadius: "50px 50px 0 0",
    },
    is_grouped: {
        display: "inline-block",
        justifyContent:"space-between"
      },
    is_grouped____button_not__last_child: {
        marginRight: "10px"
    }
  }));

export default function Moodle()
{
    const classes = useStyles()
    const [info,setInfo] = useState({url:"",username:"",password:""});
    const [loading,setLoading] = useState(true)
    const [success,setSuccess] = useState(false);
    const [connected,setConnected]= useState([])
    const handleURL = (event) => {
            setInfo({url:event.target.value});
        }
    const handleUsername = (event) => {
            setInfo({username:event.target.value});
        }
    const handlePassword = (event) => {
            setInfo({password:event.target.value});
        }
    
        const postMoolde = async() => {
            setLoading(false);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
            var urlencoded = new URLSearchParams();
            urlencoded.append("typeUrl","Moodle");
            urlencoded.append("url", info.url);
            urlencoded.append("username", info.username);
            urlencoded.append("password", info.password);
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
    
            fetch("https://hcmusemu.herokuapp.com/web/postaccountcustom", requestOptions)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                        return response.text();
                    }
                    else {
                        throw new Error('Lưu thất bại');
                    }
                })
                .then(result => {
                    console.log(result);
                    setSuccess(1);
                })
                .catch(error => {
                    console.log('error', error)
                    setSuccess(0);
                    setLoading(true);
                });
    
    
        }
        
    
    return (
        <div className={classes.root}>
        <Box  container
              justifyContent="center"
              alignItems="left"
              background="dark"
              marginLeft="25%"
            >
                
            <Typography  style={{fontWeight:"bold",marginLeft:"12.5%",color:"blue"}}> Nhập URL Moodle ở đây </Typography>
            <TextField 
                    id = "user_link"
                    value={info.url}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handleURL}
                    size="medium"  />
            <Typography   style={{fontWeight:"bold",marginLeft:"10%",color:"blue"}}> Nhập tài khoản Moodle ở đây </Typography>
            <TextField 
                    id = "user_name"
                    value={info.username}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handleUsername}
                    size="medium"  />
            <Typography style={{fontWeight:"bold",marginLeft:"10%",color:"blue"}}> Nhập mật khẩu Moodle ở đây </Typography>
            <TextField 
                    id = "user_pass"
                    value={info.password}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handlePassword}
                    size="medium"  />
            <br/>
            <div className="btn-toolbar" style={{marginLeft:"5%"}}>
                <Button style={{width:170,backgroundColor:"green",color:"white"}} onClick={postMoolde}>
                    Kết nối
                </Button>
                <Button disabled style={{width:170,backgroundColor:"red",color:"white",marginLeft: 50}} >
                   Huỷ kết nối
                </Button>
            </div>
        </Box>
        </div>
    )
   }

