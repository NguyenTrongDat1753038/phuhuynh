import React, {useState,useEffect,Image} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,Avatar,List ,ListItem,ListItemAvatar,ListItemText } from '@material-ui/core'
import Typography from 'material-ui/styles/typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { IndeterminateCheckBoxRounded } from '@material-ui/icons';
import { DialogTitle } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      margin: "auto",
  
      flexDirection: 'column',
      maxWidth: '50%',
      height: '100%' 
    },

  }));

export const LikedUser =  ({
        isOpen,
        handleClose,
        id,
    })=>{
    const classes  = useStyles();
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);

    const getLikedUser = async(id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);
  
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/viewlike", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              setList(result);
            })
            .catch(error => console.log('error', error));
      }
    useEffect(()=>{
        if (loading == true){
            getLikedUser(id);
            setLoading(false);
        }
    },[])
    
    const totalProps = list.reduce((a, obj) => a + Object.keys(obj).length, 0);
    const listItems = (totalProps===0 ? <Typography>Hãy là người like bài viết đầu tiên </Typography> :list.map((item,index) => 
        <li key={index}>
            <Avatar src={item.Avart}/>
            <Typography>{item.Name}</Typography>
        </li>))
    return(
        <Dialog 
        open={isOpen}
        onClose={handleClose}
        className={classes.root}
        fullWidth
        maxWidth={'md'} 
        >
      
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Huỷ
                </Button>
            </DialogActions>
        </Dialog>
    )
}
Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,

}