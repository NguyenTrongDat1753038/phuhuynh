import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function Khoa()
{
    const classes = useStyles()
    const [newsfac,setNewsFac] = useState([]);

    const getNewsFaculty = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"tC");
    
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
     },[]);
        return newsfac.map((item, index) => {
            return (
              <div key={index}>
                 <a classes={classes.news_page_a} href={item.Link} target="_blank" rel="noopener noreferrer"> 
            <div className={classes.news_page__news}>
              <div className={classes.news_page__title}>
                  {item.Title}
              </div>
              <div className={classes.news_page__time}>
                  {item.Date}
              </div>
      
            </div>{}
            </a>
              </div>
            )
})}
