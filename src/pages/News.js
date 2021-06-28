import React , {useState, Component, useEffect}from 'react';
import NavBar from '../Navigation/NavBar'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Typography, Box  } from '@material-ui/core';
import PropTypes from "prop-types"
import clsx from "clsx"
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
    }
    
  }));
  const mapInformation = {
    Name:"Trường",
    Website: "Địa chỉ web",
    Facebook: "Fanpage",
    Phone: "Điện thoại",
    Address: "Địa chỉ",
    Email: "Hộp thư"
  };
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
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "sT");

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
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"sT");

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
 useEffect(() => {
   getNewsFaculty();
   getNewsUniversity();
 },[]);

  const rendernews = (id) => {
    if (id==0){
      return(
        <div className={classes.news_page}>

        {
           newsuni.map((news) => {
                return (<a classes={classes.news_page_a} href={news.Link} target="_blank" rel="noopener noreferrer"> <div className={classes.news_page__news}>
                    <div className={classes.news_page__title}>
                        {news.Title}
                    </div>
                    <div className={classes.news_page__time}>
                        {news.Date}
                    </div>

                </div>
                    {}
                </a>
                )
            })
        }
    </div>
      );
    }
    else if (id==1)
    {
      return(
        <div className={classes.news_page}>

        {
           newsfac.map((news) => {
                return (<a classes={classes.news_page_a} href={news.Link} target="_blank" rel="noopener noreferrer"> <div className={classes.news_page__news}>
                    <div className={classes.news_page__title}>
                        {news.Title}
                    </div>
                    <div className={classes.news_page__time}>
                        {news.Date}
                    </div>

                </div>
                    {}
                </a>
                )
            })
        }
    </div>
      );
    }
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
      <span>{JSON.stringify(newsuni)}</span>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <span>{JSON.stringify(newsfac)}</span>
      </TabPanel>
            </main>
      </div>
  );
  }