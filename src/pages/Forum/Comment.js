import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Typography, IconButton,Input,TextField} from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from "../../components/shared/ConfirmDialog"



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
    avatar: {
      backgroundColor: "#f44336",
    },
    input: {
      display: 'none'
  },
 
  }));
function UserComment({id,postid,sent}) {
    const classes = useStyles();
    const [comment,getComment] = useState([]); 
    const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""})  
    const [update,setUpdate] = useState(sent);
    const [list,setList] = useState([]);
    const [firsttime,setFirstime] = useState(true);
    const getPostComment = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost",id);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/viewcmttop", requestOptions)
            .then((response) => {
              return response.json()})
            .then(result=>{
                getComment(result);
            })
            .catch(error => console.log('error', error));
      }
    const getLikedUser = async() => {
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
      if (firsttime==true || update == true){
        getPostComment();
        getLikedUser();
        setFirstime(false);
        setUpdate(false);
      }
    },[])

   
    /*const handleDeleteComment = (id) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    deletePosts(id);
    }*/
   
    const renderImageUser = (item) =>{
        if (item.image != "")
        return(
              <img style={{height:"100px", width:"100px"}} src={item.image} alt="recipe thumbnail"/>   
        )
        else return(
          <div>  
          </div>
        )
       }
    
    
    const totalProps = comment.reduce((a, obj) => a + Object.keys(obj).length, 0);

    

    const renderComment = () =>{
      return comment.map((item, index) => {
        return (
            <div key={index}>
                <Box border={0.1} borderColor="black" borderRadius="5px" width="100%" height="50%">
                  <CardHeader avatar={<Avatar src= {item.AvartOwn}/>} title={item.NameOwn} 
                   action={
                    <IconButton aria-label="settings">
                      <DeleteIcon />
                    </IconButton>
                  }/>
                  {renderImageUser(item)}
                    <div>
                        <Typography style={{ marginLeft:"5%"}} >{item.comment}</Typography>
                    </div>
                </Box>
            </div>

        )
    })
    }

   
    if (totalProps == 0){
      return null;
    }
    else{
        return(
          <div>
            {renderComment()}
          </div>
        )
  }
}
    
  
  
 UserComment.propTypes = {
    id: PropTypes.any.isRequired,
  };

export default UserComment;