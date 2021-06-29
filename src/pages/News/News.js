import React , {useState, useEffect}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Typography, Box,Paper  } from '@material-ui/core';
import PropTypes from "prop-types"
import Truong from './Truong';
import Khoa from "./Khoa"
const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: 200,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    news_page: {
      margin: "10px 0 0 16vw", 
      background: "white", 
      width: "82vw", 
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px"
    },
    news_page_a: {
      textDecoration: "none"
    },
    news_page__news: {
      padding: "20px 20px 0 20px"
    },
    news_page__news_hover__title: {
      color: "#3e50b5"
    },
    news_page__title: {
      fontSize: "18px", 
      fontWeight: "500", 
      color: "black"
    },
    news_page__time: {
      color: "gray", 
      fontSize: "14px"
    },
    deadline_tag: {
      width: "85vw", 
      margin: "56px 0 0 15vw", 
      background: "white"
    },
    deadline_tag__tag: {
      background: "white", 
      boxShadow: "0px 0.5px 1px grey", 
      display: "flex", 
      justifyContent: "space-around", 
      textAlign: "center"
    },
    deadline_tag__btn_deadline: {
      display: "inline-block", 
      padding: "15px", 
      width: "50vw", 
      fontSize: "16px", 
      fontWeight: "500"
    },
    deadline_tag__tag__assign: {
      borderBottom: "2px solid rgb(125, 149, 255)", 
      color: "rgb(125, 149, 255)"
    },
    deadline_tag__tag__university: {
      borderBottom: "2px solid rgb(125, 149, 255)", 
      color: "rgb(125, 149, 255)"
    },
    deadline_tag__tag__faculty: {
      borderBottom: "2px solid rgb(125, 149, 255)", 
      color: "rgb(125, 149, 255)"
    }
    
  }));
  
 
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
export default function News(){
  const classes = useStyles()
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
      <Paper className={classes.root}>
      <NavBar/>
            <main className={classes.content}>
            <div className={classes.toolbar} />
            <Tabs
            value={value}
            onChange={handleChange}
           indicatorColor="primary"
           textColor="primary"
            variant = "fullWidth"
          >
        <Tab label="Tin tức trường"/>
        <Tab  label="Tin tức khoa"/>
      </Tabs>
      {value === 0 && <Truong/>}  
      {value === 1 && <Khoa/>} 
      </main>
      </Paper>
  )};
  
