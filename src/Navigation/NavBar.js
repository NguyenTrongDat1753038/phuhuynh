
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import {Menu,Badge} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import ForumIcon from '@material-ui/icons/Forum';
import EmailIcon from '@material-ui/icons/Email';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ClassIcon from '@material-ui/icons/Class';
import SubjectIcon from '@material-ui/icons/Subject';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Notifications from "react-notifications-menu";
import AlignItemsList from "./Message"
import AccountMenu from "./Account"
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import logo from "../images/logo.jpg"
import NotificationsIcon from '../images/notification.jpg';
import {Link,Route,BrowserRouter as Router, Switch} from 'react-router-dom'
import { render } from '@testing-library/react';
const drawerWidth = 200;

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
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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

function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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
 ];
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
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      <ListItem button >
      <ListItemIcon>
        <HomeIcon style={{ color: 'dark' }}  />
      </ListItemIcon>
      <ListItemText  primary="Trang chủ" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText  primary="Sự kiện" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Môn học" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <ForumIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Diễn đàn" />
    </ListItem>
    <Divider  light />
    <ListItem button>
      <ListItemIcon>
        <EmailIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Thư điện tử" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <CalendarTodayIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Lịch" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <ClassIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Lớp dạy" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <SubjectIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Tài liệu" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <QuestionAnswerIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Quiz" />
    </ListItem>
    <Divider light />
      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
          <Typography variant="h6" noWrap>
            Hệ thống phục vụ học tập cho giảng viên
          </Typography>
          <div className={classes.grow} />
          <div className={classes.toolbarButtons}>
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
            color="primary"
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
             <Typography  variant="h6" adjustsFontSizeToFit component="span" color="inherit"> Trần Thị Quỳnh Như </Typography>

              <AccountCircle />       
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {messageMenu}
      {
        renderMenu
      }
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
            {drawer}
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
