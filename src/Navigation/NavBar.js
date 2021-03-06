
import React, {useState,useEffect} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import ForumIcon from '@material-ui/icons/Forum';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountMenu from "./Account"
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import {useHistory} from "react-router-dom"
import {List,Toolbar,Typography,ListItem,ListItemIcon,Button,IconButton,ListItemText,Menu,Badge,Hidden,Drawer,Divider,CssBaseline,AppBar} from "@material-ui/core"
import ScoreIcon from '@material-ui/icons/Score';
import checkTokenExpired from '../ValidAccess/AuthToken';

const drawerWidth = 200;
const AppBarHeight = 60
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  inline: {
    display: 'inline',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: "100%",
      marginLeft: 0,
      height: AppBarHeight
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: AppBarHeight,
    backgroundColor:"#e4edf5"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '0.5px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

function NavBar() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listNoti,setListNoti] = useState([]);

  const [userInfo, setUserInfo] = useState([{
    HoTen: "",
    AnhSV: "",
    Email: "",
    MaTruong: "",
    TenTruongDH: "",
    MaKhoa: "",
    TenKhoa: ""

  }])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  

  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuProfileClose = () => {
    setAnchorEl(null);
  };

  const [message_anchorEl, message_setAnchorEl] = useState(null);

  const handleMessageOpen = (event) => {
    message_setAnchorEl(event.currentTarget);
  };

  const handleMessageClose = () => {
    message_setAnchorEl(null);
  };

  const getInfoUser = async() => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
         if (statusCode === 200){         
           setUserInfo(dataRes)
          }
          else if (statusCode === 401){
            
            return null
          }
        })
        .catch(error => console.log('error', error));
    }

    const getNofiData = async() => {
      if (checkTokenExpired()) {
        localStorage.clear()
        history.replace("/");
        return null
        }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
  
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
  
      await fetch("https://hcmusemu.herokuapp.com/notification", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
          dataRes = dataRes.filter(data => data.State === false);
          setListNoti(dataRes);
        }
        else{
          console.log("loi");
        }
  
      }).catch((err) => console.log(err, "error"));
    }
    
    const changeNotiState = async(id) => {
      if (checkTokenExpired()) {
        localStorage.clear()
        history.replace("/");
        return null
        }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("IDNotification",id);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
  
      await fetch("https://hcmusemu.herokuapp.com/notification/changestate", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
          updateStateNoti(id,"State",true);
        }
        else{
          console.log("loi");
        }
  
      }).catch((err) => console.log(err, "error"));
    }
    
    useEffect(() => {
      getInfoUser();
      getNofiData();
    },[]);
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuProfileClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
      <AccountMenu/>
      </StyledMenu>
  );
  const getLength = () =>{
    let temp = 0;
    for (var i=0;i < listNoti.length;i++){
      if (listNoti[i].State === false){
        temp++;
      }
    }
    return temp;
  }

  const updateStateNoti =(id, whichvalue, newvalue)=> {
    var index = listNoti.findIndex(x=> x._id === id);
  
    let g = listNoti[index]
    g[whichvalue] = newvalue
    if (index === -1){
      console.log('no match')
    }
    else
      setListNoti([
        ...listNoti.slice(0,index),
        g,
        ...listNoti.slice(index+1)
      ]);
  }

  const convertTimeAgo = (UNIX_timestamp) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - UNIX_timestamp;

    if (elapsed < msPerMinute) {
        return '1 ph??t tr?????c';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' ph??t tr?????c';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' gi??? tr?????c';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' ng??y tr?????c';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' th??ng tr?????c';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' n??m tr?????c';
    }
  }
  const handleNotiClick = (item) =>{
    changeNotiState(item._id);
    window.open(item.Url, "_blank");
  }
  const renderNotify = () =>{
    return(
      <List style={{height: "50vh",width:"20vw"}}>
      <Typography style={{float:"left",marginLeft: "20px",fontSize:"20px"}}>
          M???i
      </Typography>
      <Button style={{float: "right"}} onClick={()=>history.push("/notifications")}>
        Xem th??m
      </Button>
      {listNoti.map((item,index) => {
        return (
          <div key={index}>
              <ListItem button onClick={()=>handleNotiClick(item)}  alignItems="flex-start">
                  <ListItemText
                      primary={<div  style={{fontWeight:item.State === true ? "normal" : "750", }}>
                                <span style={{color:"red"}}>
                                    {item.Title} 
                                </span>
                                &nbsp;- &nbsp;
                                <span style={{color:"blue"}}>
                                  {convertTimeAgo(item.Date)}
                                </span>
                              </div>
                            } 
                      secondary= {<Typography>{item.Data.slice(0,30)+"..."} </Typography> }

                />
              </ListItem>
              <Divider variant="inset" component="li" />
          </div>
        )})}
      </List>
    )
    }
  
  const messageMenu = (<StyledMenu
    id="customized-notification"
    anchorEl={message_anchorEl}
    keepMounted
    open={Boolean(message_anchorEl)}
    onClose={handleMessageClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >

    {renderNotify()}
    </StyledMenu>);
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      <ListItem button onClick={()=> history.push("/")} >
      <ListItemIcon>
        <HomeIcon style={{ color: 'dark' }}  />
      </ListItemIcon>
      <ListItemText  primary="Trang ch???" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/news?tag=0")}>
      <ListItemIcon>
        <DateRangeIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText  primary="Tin t???c" />
    </ListItem>
    <Divider light />
    <ListItem button  onClick={()=> history.push("/forum")}>
      <ListItemIcon>
        <ForumIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Di???n ????n" />
    </ListItem>
    <Divider  light />
    <ListItem button onClick={()=> history.push("/chat")}>
      <ListItemIcon >
        <SchoolIcon style={{ color: 'dark' }}/>
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/calendar")}>
      <ListItemIcon>
        <CalendarTodayIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="L???ch" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/course")}>
      <ListItemIcon >
        <LocalLibraryIcon style={{ color: 'dark' }}/>
      </ListItemIcon>
      <ListItemText primary="M??n h???c" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/score")}>
      <ListItemIcon >
        <ScoreIcon style={{ color: 'dark' }}/>
      </ListItemIcon>
      <ListItemText primary="B???ng ??i???m" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/contact")}>
      <ListItemIcon >
        <SchoolIcon style={{ color: 'dark' }}/>
      </ListItemIcon>
      <ListItemText primary="Th??ng tin tr?????ng" />
    </ListItem>
    <Divider light />
    
      </List>
      
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontWeight="normal" variant="h4" noWrap style={{color: "#f5f5f5"}}>
            H??? th???ng ph???c v??? h???c t???p cho gi???ng vi??n
          </Typography>
          <div className={classes.grow} />
          <div className={classes.toolbarButtons}>
            <IconButton 
            color="inherit"
            edge="end"
            aria-label="notification of current user"
            className = "notifi_btn"
            aria-haspopup="true"
            onClick={handleMessageOpen}
            >
              <Badge badgeContent={getLength()} color="secondary">
                <NotificationsActiveIcon />       
              </Badge>
            </IconButton>
          
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuProfileOpen}
              color="inherit"
            >
             <Typography  variant="h6" adjustsfontsizetofit="true" component="span" color="inherit"> {userInfo[0].HoTen} </Typography>

              <AccountCircle />       
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {messageMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default NavBar;
