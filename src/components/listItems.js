import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import ForumIcon from '@material-ui/icons/Forum';
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';


export const mainListItems = (
  <div >
    <ListItem button >
      <ListItemIcon>
        <HomeIcon style={{ color: 'white' }}  />
      </ListItemIcon>
      <ListItemText  primary="Trang chủ" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText  primary="Lịch dạy" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Khoá học giảng dạy" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <ForumIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Diễn dàn" />
    </ListItem>
    <Divider  light />
    <ListItem button>
      <ListItemIcon>
        <EmailIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Thư điện tử" />
    </ListItem>
    <Divider light />
  </div>
);

