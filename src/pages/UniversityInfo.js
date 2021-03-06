import React, { useState,useEffect } from "react";
import NavBar from "../Navigation/NavBar"
import {
  Grid,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  Toolbar,

} from "@material-ui/core";
import LanguageIcon from '@material-ui/icons/Language';
import SchoolIcon from '@material-ui/icons/School';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import LoadingScreen from '../components/shared/LoadingScreen';
import {useHistory} from "react-router-dom";
import checkTokenExpired from "../ValidAccess/AuthToken"
let theme = createMuiTheme();
theme.typography.h6 = {
  fontSize: "1rem",
  "@media (min-width:900px)": {
    fontSize: "1.05rem"
  },
  "@media (min-width:1000px)": {
    fontSize: "1.1rem"
  },
  "@media (min-width:1200px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width:1300px)": {
    fontSize: "1.25rem"
  }
};


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#594f8d",
    color: "white",
    padding: "0.5em",
    width: "80%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  form: {
    backgroundColor: "#ddde9b",
    color: "#594f8d ",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  floatingMenu:{
      clear:"both",
      position:"fixed",
      width:"85%",
      backgroundColor:"#78AB46",
      top:"5px",
    },
  root:{
        marginLeft: "210px",
        backgroundColor: "#faf9e8"
    },
  img:{
      width:"100%",
      height:"300px"
    }

}));


export default function UniversityInfo() {
  const classes = useStyles();
  const [info,setInfo] = useState([{
    TenTruongDH: "",
    WebSite: "",
    Email: "",
    SDT: "",
    FanFage: "",
    TenDiaChi: "",
    TenKhoa: "",
    Website: "",
    Images:""
  }])
  const [loading,setLoading] = useState(true);
  const history = useHistory();
  useEffect(() =>{
    getInfoUni();
  })

  const getInfoUni = async() => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"tC");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/info/getinfo", requestOptions)
        .then(response => {return response.json();})
        .then(result => {
         setInfo({
           TenTruongDH: result[0].TenTruongDH,
           WebSite: result[0].WebSite,
           Email: result[0].Email,
           SDT: result[0].SDT,
           FanFage: result[0].FanFage,
           TenDiaChi: result[0].TenDiaChi.split(";")[0],
           TenKhoa: result[0].TenKhoa,
           Website: result[0].WebSite,
           Images: result[0].Images}
         );
         setLoading(false);
        })
        .catch(error => console.log('error', error));
    }
 

  if (loading === true){
    return(
      <div className={classes.root}>
         <NavBar className = {classes.floatingMenu}/>
          <Toolbar /> 
         <LoadingScreen/>
      </div>
    )
  }
  else{
  return (
    <div className={classes.root}>
    <NavBar className = {classes.floatingMenu}/>
    <Toolbar /> 
      <MuiThemeProvider theme={theme}>
        <Typography align="center" variant="h3"> Ch??o m???ng ?????n v???i trang tin li??n h??? c???a tr?????ng</Typography>
        <br/>
        <Grid container spacing={2} item xs={12}>
              <img className={classes.img} src = {info.Images} alt=""  ></img>
        </Grid>
        <br/><br/>
        <div style={{marginLeft: "5%"}}>
          <Typography variant="h5">
            <SchoolIcon style={{fontSize: "25px"}}/> {info.TenTruongDH}
          </Typography>
          <br/>
          <Typography style={{fontSize: "25px"}}>
            <LanguageIcon style={{fontSize: "25px"}}/>  
            <a href={info.WebSite} rel="noopener noreferrer" target="_blank">
                {info.WebSite}
            </a>
          </Typography>
          <br/>
          <Typography style={{fontSize: "25px"}}>
            <MailIcon style={{fontSize: "25px"}}/> {info.Email}
          </Typography>
          <br/>
          <Typography style={{fontSize: "25px"}}>
            <PhoneIcon style={{fontSize: "25px"}}/> {info.SDT}
          </Typography>
          <br/>
          <Typography style={{fontSize: "25px"}}>
            <FacebookIcon style={{fontSize: "25px"}}/> 
            <a href={info.WebSite} rel="noopener noreferrer" target="_blank">
              {info.FanFage}
            </a>
          </Typography>
          <br/>
          <Typography style={{fontSize: "25px"}}>
            <HomeIcon style={{fontSize: "25px"}}/> {info.TenDiaChi}
          </Typography>
          <br/>
          <Typography style={{fontSize: "25px"}}>
            <BusinessIcon style={{fontSize: "25px"}}/> {info.TenKhoa}
          </Typography>
          </div>
      </MuiThemeProvider>
    </div>
  );
  }
}
