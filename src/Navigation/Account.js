import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import {withStyles,useStyles } from '@material-ui/core/styles';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {ListItemText,MenuItem,List} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message';
import {Link,Route,BrowserRouter as Router, Switch} from 'react-router-dom'

const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.light,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  export default function AccountMenu() {  
    return (
    <Router>
      <List className= "Account_btn">
        <StyledMenuItem>
          <HomeIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Trang chủ" />
        </StyledMenuItem>
        <StyledMenuItem>
          <PersonOutlineRoundedIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Hồ sơ của bạn" />
          <Link to="/profile"></Link>
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
      </List>
      
    </Router>
);}