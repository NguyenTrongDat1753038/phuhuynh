import React, {useState,useEffect} from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  withStyles,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import WaveBorder from "../shared/WaveBorder";
import transitions from "@material-ui/core/styles/transitions";
import FacebookIcon from '@material-ui/icons/Facebook';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';

const styles = theme => ({
  footerInner: {
    backgroundColor: theme.palette.common.darkBlack,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10)
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10)
    }
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    color: theme.palette.common.white
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: "#33383b !important"
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  link: {
    cursor: "Pointer",
    color: theme.palette.common.white,
    transition: transitions.create(["color"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn
    }),
    "&:hover": {
      color: theme.palette.primary.light
    }
  },
  whiteBg: {
    backgroundColor: theme.palette.common.white
  },
  largeIcon: {
    fontSize: "2em",
    color: "blue"
  },
});


function Footer(props) {
  const { classes, theme, width } = props;
  const [info, setInfo] = useState([{
    TenTruongDH: "Tr?????ng ?????i h???c Khoa h???c T??? nhi??n - ??HQG TPHCM",
    WebSite: "https://www.hcmus.edu.vn/",
    Email: "bantin@hcmus.edu.vn",
    SDT: "02838962823",
    FanFage: "https://www.facebook.com/us.vnuhcm/",
    TenDiaChi: " 227 ???????ng Nguy???n V??n C???, Ph?????ng 4, Qu???n 5, TP HCM; Khu ???? th??? ?????i h???c Qu???c Gia P.Linh Trung Qu???n Th??? ?????c, TP HCM",
    TenKhoa: "Khoa ?????a ch???t",
    Website: "https://phys.hcmus.edu.vn/",
    Images: "https://www.hcmus.edu.vn/images/2020/04/07/bn2.jpg"}]);

    const getInfoUni = async() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
  
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
           )
          })
          .catch(error => console.log('error', error));
      }
    useEffect(() =>{
      getInfoUni();
    },[])

  return (
    <footer className="lg-p-top">
      <WaveBorder
        upperColor="#FFFFFF"
        lowerColor={theme.palette.common.darkBlack}
        animationNegativeDelay={4}
      />
      <div className={classes.footerInner}>
        <Grid container spacing={isWidthUp("md", width) ? 10 : 5}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" style={{ color: "red" }} paragraph>
             Th??ng tin li??n l???c
            </Typography>
            <Typography style={{ color: "#1b2738" }} paragraph>
            
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: "20px"}}>
                <BusinessIcon/>Tr?????ng : {info.TenTruongDH} </div>
                <br/>    
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',}}><MailIcon/>Email :  {info.Email}</div>
                <br/>    
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',}}><PhoneIcon/> SDT : {info.SDT}</div>
                <br/>    
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',}}><HomeIcon/> ?????a ch??? : {info.TenDiaChi}</div>
                <br/>    
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',}}>
                  <WebIcon/> Website : &nbsp; <a href={info.WebSite} rel="noopener noreferrer" target="_blank">{info.WebSite}</a>
                </div>
            </Typography>
            <Box display="Fill">
                  <IconButton
                    aria-label= "Facebook"
                    className={classes.socialIcon}
                    href={info.FanFage}
                    rel="noopener noreferrer" 
                    target="_blank"
                    title= "Nh???n v??o ????y ????? truy c???p Fanpage tr?????ng"
                  >
                  <FacebookIcon className={classes.largeIcon}/>
                  </IconButton>
               
            </Box>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Footer));
