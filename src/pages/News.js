import React , {useState, Component}from 'react';
import NavBar from '../Navigation/NavBar'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Typography, Box  } from '@material-ui/core';
import PropTypes from "prop-types"

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
    
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function News(){
  const classes = useStyles()
  const [value, setValue] = useState(0);
  
  const [newsuni,setNewsUni] = useState([]);
  const [newsfac,setNewsFac] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getNewsUniversity = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/info/newsuniversity", requestOptions)
        .then(response => response.json())
        .then(result => {
            setNewsUni(result)
        })
        .catch(error => console.log('error', error));
    }

    const getNewsFaculty = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/info/newsfaculty", requestOptions)
        .then(response => response.json())
        .then(result => {
          setNewsFac(result)
        })
        .catch(error => console.log('error', error));
    }

  return (
      <div className={classes.root}>
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
      <TabPanel value={value} index={0}>
          123      
      </TabPanel>
      <TabPanel value={value} index={1}>
        456
      </TabPanel>
            </main>
      </div>
  );
}