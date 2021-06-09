import React from 'react';
import clsx from 'clsx';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {SideBar} from './SideBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import {Menu,IconButton,Typography,Divider,AppBar,Drawer,Toolbar,CssBaseline,List,Badge} from '@material-ui/core';
import Notifications from "react-notifications-menu";
import AlignItemsList from "./Message"
import AccountMenu from "./Account"
import logo from "../images/logo.jpg"
import NotificationsIcon from '../images/notification.jpg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  setColorWhite :{
    color: '#FFFFFF'
  },
  drawerPaper: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: "#1e2535",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  
  fixedHeight: {
    height: 240,
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


export default function NavBar(props) {
  const { selectedTab, messages, width, openAddBalanceDialog } = props;
  const data = [
    {
      image : logo ,
      message : 'Google tuyển dụng',
      detailPage : 'wwww.google.com.vn', 
      receivedTime:'30-04-2020'
    },
    {
      image : logo ,
      message : 'Lazada sale',
      detailPage : 'wwww.lazada.vn', 
      receivedTime:'16-05-2020'
    },
    {
      image : logo ,
      message : 'Shopee sale',
      detailPage : 'wwww.shopee.vn', 
      receivedTime:'16-05-2020'
    },
    {
      image : logo ,
      message : 'Shopee sale',
      detailPage : 'wwww.shopee.vn', 
      receivedTime:'16-05-2020'
    },
    {
      image : logo ,
      message : 'Shopee sale',
      detailPage : 'wwww.shopee.vn', 
      receivedTime:'16-05-2020'
    },
    {
      image : logo ,
      message : 'Shopee sale',
      detailPage : 'wwww.shopee.vn', 
      receivedTime:'16-05-2020'
    },
    {
      image : logo ,
      message : 'Shopee sale',
      detailPage : 'wwww.shopee.vn', 
      receivedTime:'16-05-2020'
    },
 ];
  const classes = useStyles();
  const [open, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuProfileClose = () => {
    setAnchorEl(null);
  };

  const [message_anchorEl, message_setAnchorEl] = React.useState(null);
  const isMessageOpen = Boolean(message_anchorEl);

  const handleMessageOpen = (event) => {
    message_setAnchorEl(event.currentTarget);
  };

  const handleMessageClose = () => {
    message_setAnchorEl(null);
  };



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
  const messageMenu = (<StyledMenu
    id="customized-menu"
    anchorEl={message_anchorEl}
    keepMounted
    open={Boolean(message_anchorEl)}
    onClose={handleMessageClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <AlignItemsList/>
    </StyledMenu>);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} display = "flex" variant="h4" noWrap>
            Hệ thống học tập hỗ trợ phụ huynh
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton 
            edge="end"
            aria-label="message of current user"
            className = "message_btn"
            aria-haspopup="true"
            onClick={handleMessageOpen}
            color="inherit"
            >
              <Badge badgeContent={5} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton 
            color="red"
            edge="end"
            aria-label="notification of current user"
            className = "notifi_btn"
            >
                    <Notifications
                   icon = {NotificationsIcon}
                   data={data}
                   width = '300px' 
                   height = '400px'
                   markAsRead={data => console.log(data)}
                   headerBackgroundColor	= "orange"
                   cardOption = "false"
                   header={
                    {
                      title: 'Thông báo',
                      option: { text: 'Xem tất cả', onClick: () => {window.location("/notifications");} }
                    }
                  }
                    />
                  

              
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuProfileOpen}
              color="inherit"
            >
             <Typography  variant="h7" component="span" color="#ffffff"> Trần Thị Quỳnh Như </Typography>

              <AccountCircle />       
            </IconButton>
          </div>
         
        </Toolbar>
      </AppBar>
      {renderMenu}
      {messageMenu}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton style={{ color: 'white' }} onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider style={{ color: 'white' }} />
        <List style={{ color: 'white' }}>{SideBar}</List>
        <Divider />
      </Drawer>
      
    </div>
  );
}
