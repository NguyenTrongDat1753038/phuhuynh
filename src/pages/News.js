import React from 'react';
import NavBar from '../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Grid, Paper, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      flexGrow: 1,
    },
    media: {
      height: 140,
    },
    shiftTextLeft: {
      marginLeft: '0px'
    },
    shiftTextRight: {
      marginLeft: 200,
    },
    deadline_page: {
      width: "75vw",
      margin: "0px 20vw"
    },
    deadline_box: {
      marginTop: "0px"
    },
    deadline: {
      padding: "30px 30px 10px 30px",
      marginTop: "10px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0px 0.5px 1px grey"
    },
    deadline__titlee: {
      fontSize: "24px",
      fontWeight: "500",
      padding: "5px",
      background: "#18468b",
      borderRadius: "10px",
      color: "white"
    },
      deadline__decription: {
      fontSize: "18px",
      fontWeight: "400",
      padding: "5px",
      color: "rgb(56, 56, 56)"
    },
      deadline__duedate: {
      fontSize: "14px",
      padding: "5px",
      color: "grey"
    },
    deadline__direct: {
      display: "flex",
      justifyContent: "space-around"
    },
    deadline__link: {
      fontSize: "16px",
      textAlign: "center",
      width: "70vw",
      padding: "5px",
      borderRadius: "10px",
      fontWeight: "450"
    },
    deadline_a: {
      textDecoration: "none",
      color: "black"
    },
    deadline__link_hover: {
      background: "rgb(243, 243, 243)"
    },
    datepicker: {
      width: "85vw",
      margin: "0 0 0 15vw",
      background: "white",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px",
      fontWeight: "500",
      boxShadow: "0px 0.5px 1px grey"
    },
    datepicker__month: {
      fontSize: "24px"
    },
    datepicker__change_month: {
      padding: "10px",
      borderRadius: "10px",
      fontSize: "14px",
      width: "10vw",
      textAlign: "center",
      background: "rgb(114, 152, 235)"
    },
    datepicker__change_month_hover: {},
      deadline_page_hr: {
      padding: "0px",
      margin: "10px"
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
  
export default function News() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div> 
        <Typography >
         
        </Typography>
      </div>
    )
}
  