import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Typography,Grid} from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      margin:'auto',
      flexDirection: 'column',
      maxWidth: '75%',
    },
    media: {
      height: 0,
      paddingTop: '10%',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: "#f44336",
    },
  }));
function UserComment() {
    const classes = useStyles();
    const [comment,getComment] = useState([]); 
    const getPostComment = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", 66);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/viewcmttop", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
                getComment(result)
            })
            .catch(error => console.log('error', error));
      }
    useEffect(()=>{
        getPostComment();
    },[])
    const convertTime = (UNIX_timestamp) => {
        var time = new Date(UNIX_timestamp).toLocaleDateString('en-US');
        return time;
      }
    const renderImage = (item) =>{
        if (item.image != "")
        return(
          <CardMedia
          className={classes.media}
          image={item.image}
          />
        )
        else return(
          <div>  
          </div>
        )
       }
    return comment.map((item, index) => {
        return (
            <div key={index}>
                <Box border={0.5} borderColor="black" borderRadius="5px" width="100%" bgcolor="#c0c5ce">
                    <Grid container alignItems="left" spacing={2}>
                        <Grid item>
                            <Avatar className={classes.small} src = {item.AvartOwn}/> 
                        </Grid>
                        <Grid item>
                            <Typography style={{fontWeight: "Bold"}}  m={1}>{item.NameOwn}</Typography>
                        </Grid>
                    </Grid>
                
                    <div marginLeft="5px">
                        <Typography >{item.comment}</Typography>
                    </div>
                </Box>

               <br/>
            </div>

        )
    });
    
  }
  
 UserComment.propTypes = {
    id: PropTypes.any.isRequired,
  };

export default UserComment;