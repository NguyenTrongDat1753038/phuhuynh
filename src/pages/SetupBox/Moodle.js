import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button,TextField,Typography} from "@material-ui/core"
import { Alert } from 'react-native';
import VisibilityPasswordTextField from "../../components/shared/VisibilityPasswordTextField"
import LoadingScreen from "../../components/shared/LoadingScreen"
import { type } from 'language-tags';
const useStyles = makeStyles((theme) => ({
    root: {
      background: "#faf9e8", 
      borderRadius: "25px",
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
    const [isVisible,setVisible] = useState(true);
    const [cancelBtnActive,setCancelBtnActive] = useState(false);

    const handleVisible = () =>{
        setVisible(!isVisible);
    }
    const handleURL = (event) => {
            setInfo({url:event.target.value});
        }
    const handleUsername = (event) => {
            setInfo({username:event.target.value});
        }
    const handlePassword = (event) => {
            setInfo({password: event.target.value});
        }
    const isEmpty = (obj)=> {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
        
            return true;
        }
    const getMoodleInfo = async() => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            fetch("https://hcmusemu.herokuapp.com/web/getcustomlink", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        throw new Error('Lấy thất bại');
                    }
                })
                .then(result => {
                    console.log(result)
                    result = result.filter(connection => connection.Type == 'Moodle');
                    if (isEmpty(result)==false){
                        setInfo({url:result[0].Url,username:result[0].Username})
                        setCancelBtnActive(false);
                    }
                    else{
                        setInfo({url:"",username:""})
                        setCancelBtnActive(true);
                    }

                    setLoading(false);

                })
                .catch(error => {
                    console.log('error', error)
                });
    
    
        }
    useEffect(()=>{
        getMoodleInfo();
    },[])
    const postMoodleLink = async() => {
            setLoading(false);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            console.log(info);
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
                //console.log(result);
                })
                .catch(error => {
                    console.log('error', error)
                });
    
    
        }
    const deleteMoodleLink = async() => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
            var urlencoded = new URLSearchParams();
            urlencoded.append("typeUrl","Moodle");
    
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
    
            fetch("https://hcmusemu.herokuapp.com/web/deleteaccount", requestOptions)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                        return response.text();
                    }
                    else {
                        console.log(response.status);
                        throw new Error('Lưu thất bại');
                    }
                })
                .then(
                    setInfo({url:"",username:"",password:""})
                )
                .catch(error => {
                    console.log('error', error)
                });
    
    
        }
    const hanldePostMoodle = ()=>{
        postMoodleLink();
    }

    if (loading == true){
        return(
        <div className={classes.root}>
            <LoadingScreen/>
        </div>
        )
    }
   else{
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
            <VisibilityPasswordTextField 
                    isVisible={isVisible}
                    onVisibilityChange = {handleVisible}
                    id = "user_pass"
                    value={info.password}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handlePassword}
                    size="medium"  />
            <br/>
            <div className="btn-toolbar" style={{marginLeft:"5%"}}>
                <Button style={{width:"auto",backgroundColor:"green",color:"white"}} onClick={hanldePostMoodle}>
                    Kết nối
                </Button>
                <Button onClick={deleteMoodleLink} disabled={cancelBtnActive} style={{width:"auto",backgroundColor: cancelBtnActive==false?"red":"#f0b3b3",color:"white",marginLeft: 175}} >
                   Huỷ kết nối
                </Button>
            </div>
        </Box>
        </div>
    )
   }
}
