import React , {useState, useEffect}from 'react';
import { Typography,makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from 'material-ui/List/ListItem';
import CommentIcon from '@material-ui/icons/Comment';
import UserComment from "../Comment"
const useStyles = makeStyles((theme) => ({
  root: {
    margin:'auto',
    flexDirection: 'column',
    maxWidth: '75%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
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


export default function Truong()
{
    const classes = useStyles();
    const [forumPosts,setForumPosts] = useState([
     
    ]);
    const [loading, setLoading] = useState(true);

    const convertTime = (UNIX_timestamp) => {
      var time = new Date(UNIX_timestamp).toLocaleDateString('en-US');
      return time;
    }

    const getForumPosts = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              result = result.filter(forum => forum.scope == 'u');
              setForumPosts(result)
            })
            .catch(error => console.log('error', error),
            setLoading(false));
    }
    
    useEffect(() => {
       getForumPosts();
     },[]);

     
    const updateNumberLike = (id,type) => {
      if (type==1){
          var index = forumPosts.findIndex(x=> x.ID === id);
          let g = forumPosts[index]
          g['like']-=1
          let value = g['like'];
          updateState(id,"like",value)
      }
      else{
        var index = forumPosts.findIndex(x=> x.ID === id);
        let g = forumPosts[index]
        g['like']+=1
        let value = g['like'];
        updateState(id,"like",value)
      }
    }
    const updateState =(id, whichvalue, newvalue)=> {
      var index = forumPosts.findIndex(x=> x.ID === id);
    
      let g = forumPosts[index]
      g[whichvalue] = newvalue
      if (index === -1){
        console.log('no match')
      }
      else
        setForumPosts([
          ...forumPosts.slice(0,index),
          g,
          ...forumPosts.slice(index+1)
        ]);
    }
    const likePosts = async(id) => {
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
      await fetch("https://hcmusemu.herokuapp.com/forum/like", requestOptions)
          .then(response => {return response.json()})
          .then(
            updateState(id,"LikeByOwn",1)
            )
          .catch(error => console.log('error', error));
    }

    const unLikePosts = async(id) => {
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
      await fetch("https://hcmusemu.herokuapp.com/forum/unlike", requestOptions)
          .then(response => {return response.json()})
          .then(
            updateState(id,"LikeByOwn",0))
          .catch(error => console.log('error', error));
    }

    const renderLike = (item) => {
      return(
        <div>
          {item.LikeByOwn == 0 ? <FavoriteIcon/> :<FavoriteIcon style={{ color: 'red' }} />}
          {item.like}
        </div>
      )}
    const renderCommentCount = (item) => {
       return(
         <div>
            <CommentIcon/>
            {item.comment}
         </div>
       )
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
     const handleLike = (item) =>
     {
        if (item.LikeByOwn != 0){
          unLikePosts(item.ID);
          updateNumberLike(item.ID,1)
        }
        else{
          likePosts(item.ID);
          updateNumberLike(item.ID,0)
        }
     }
     const renderComment = (num) =>{
       return (
         <div>
           <UserComment id={num}/>
         </div>
       )
     }
     if (loading==false)
     {
        return forumPosts.map((item, index) => {
            return (
              <div key={index}>
                    <Card className={classes.root}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe" className={classes.avatar} src={item.AvartaOwn}/>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title= {
                           <Typography variant="h6"></Typography>  
                          }
                          subheader= {
                            <Typography textAlign="center" variant="h7">
                              {item.NameOwn} 
                              <br/>
                              {convertTime(item.time)}
                            </Typography>
                          }
                          
                        />
                    {renderImage(item)}
                    <CardContent>
                     <Typography variant="h6"> {item.title}</Typography> 
                    </CardContent>
                    <CardActions disableSpacing>

                        <IconButton 
                        aria-label="like the post"
                        onClick= {() => handleLike(item)}
                        >
                          {renderLike(item)}
                        </IconButton>
                        <IconButton 
                        aria-label="Comment the post"
                        onClick= {()=>renderComment()}
                        >
                          {renderCommentCount(item)}
                        </IconButton>
                       
                    </CardActions>

                      <UserComment></UserComment>

                  </Card>
                  <p/> <br/>
              </div>
            )
      })}
      else return (
        <div>
          <Typography align="center" textAlign="center">Hiện chưa có bài viết nào trong forum cả.</Typography>
        </div>
      )
}
