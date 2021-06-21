//import logo from './logo.svg';

import React from 'react';
import NavBar from '../../Navigation/NavBar'
import {makeStyles, Toolbar,Typography} from "@material-ui/core"
import clsx from 'clsx'
import { CropLandscapeSharp } from '@material-ui/icons';
const drawerWidth = 200
const useStyles = makeStyles((theme)=>({
  root: {
    marginLeft: "200px",
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  info: {
    width: 0,
    flexGrow: 1,
  },
  div: {
      maxWidth: "100%",
      height: "auto",
      textOverflow: "clip",
      whiteSpace: "normal",
  },
}));
function Homepage() {
  const classes = useStyles();
  return (
    <div className = {classes.root}> 
        <NavBar/>
        <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default Homepage;
