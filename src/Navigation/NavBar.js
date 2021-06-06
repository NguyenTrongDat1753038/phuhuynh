import React from 'react';
import clsx from 'clsx';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {SideBar} from './SideBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import {Menu,IconButton,MenuItem,Typography,Divider,AppBar,Drawer,Toolbar,CssBaseline,List,Badge,ListItemText} from '@material-ui/core';
import Notifications from "react-notifications-menu";
import logo from "../images/logo.jpg"
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
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function NavBar(props) {
  const { selectedTab, messages, width, openAddBalanceDialog } = props;
  const data = [
    {
      image : logo ,
      message : 'Google tuyển dụng',
      detailPage : 'wwww.google.com.vn', 
      receivedTime:'30-04-2020'
    }
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

  const handleMenuNotiOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuNotiClose = () => {
    setAnchorEl(null);
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
        <StyledMenuItem>
          <HomeIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Trang chủ" />
        </StyledMenuItem>
        <StyledMenuItem>
          <PersonOutlineRoundedIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Hồ sơ của bạn" />
        </StyledMenuItem>
        <StyledMenuItem>
          <GradeOutlinedIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Bảng điểm con em" />
        </StyledMenuItem>
        <StyledMenuItem>
          <MessageIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Tin nhắn" />
        </StyledMenuItem>
        <StyledMenuItem>
          <HelpOutlineOutlinedIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Trợ giúp" />
        </StyledMenuItem>
        <StyledMenuItem>
          <SettingsIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Cài đặt" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ExitToAppIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Thoát"  />
        </StyledMenuItem>
      </StyledMenu>
  );

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
            <IconButton color="inherit">
              <Badge badgeContent={5} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton 
            color="inherit"
            edge="end"
            aria-label="notification of current user"
            color="inherit"
            >
              <Badge color="white">
                    <Notifications
                   data={data}
                   width = '200px' 
                   viewAllbtn={{ text: 'see all', linkTo: '/seeAll' }}
                   markAsRead={data => console.log(data)}
                   header={
                    {
                      title: 'Notifications',
                      option: { text: 'View All', onClick: () => {} }
                    }
                  }
                    />
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
             <Typography  variant="h7" component="span" color="#ffffff"> Trần Thị Quỳnh Như </Typography>

              <AccountCircle />       
            </IconButton>
          </div>
         
        </Toolbar>
      </AppBar>
      {renderMenu}
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
