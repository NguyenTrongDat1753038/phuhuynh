import React , {useState, useEffect}from 'react';
import { Typography,makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from 'material-ui/List/ListItem';
import CommentIcon from '@material-ui/icons/Comment';
import { Filter } from '@material-ui/icons';
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
    const [forumPosts,setForumPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

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
              //result = Filter(result);
              setForumPosts(result)
            })
            .catch(error => console.log('error', error),
            setLoading(false));
    }

    useEffect(() => {
       getForumPosts();
     },[]);

    const Filter = (list) => {
      list = list.filter(item => item.scope != 'u');
      return list;
    }
    const getIndex = (id) => {
      var index;
      for (var i=0; i< forumPosts.length;i++){
        if (forumPosts[i].ID == id)
          index = i;
      }
      return index;
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
      let markers = [ ...forumPosts ];
      markers[getIndex(id)] = {...forumPosts[getIndex(id)], LikeByOwn : 1};
      await fetch("https://hcmusemu.herokuapp.com/forum/like", requestOptions)
          .then(response => {return response.json()})
          .then(
            setForumPosts({ markers }))
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
      let markers = [ ...forumPosts ];
      markers[getIndex(id)] = {...forumPosts[getIndex(id)], LikeByOwn : 0};
      await fetch("https://hcmusemu.herokuapp.com/forum/unlike", requestOptions)
          .then(response => {return response.json()})
          .then(
            setForumPosts({ markers }))
          .catch(error => console.log('error', error));
    }

    const renderLike = (item) => {
      return(
        <div>
          {item.LikeByOwn == 0 ? <FavoriteIcon/> :<FavoriteIcon style={{ color: 'red' }} />}
          {item.like}
        </div>
      )}
     const renderCommemt = (item) => {
       return(
         <div>
            <CommentIcon> {item.comment}</CommentIcon>
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
                           <Typography variant="h6">{item.title}</Typography>  
                          }
                          subheader= {
                            <Typography textAlign="center" variant="h7">
                              Thời gian đăng: {convertTime(item.time)}
                              <br/>
                              Người đăng: {item.NameOwn}
                            </Typography>
                          }
                          
                        />
                    {renderImage(item)}
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                        <IconButton 
                        aria-label="like the post"
                        onClick=/*{item.LikeByOwn==0 ? likePosts(item.ID) : unLikePosts(item.ID)}*/""
                        >
                          {renderLike(item)}
                        </IconButton>
                        <IconButton 
                        aria-label="Comment the post"
                        onClick=/*{item.LikeByOwn==0 ? likePosts(item.ID) : unLikePosts(item.ID)}*/""
                        >
                          {renderCommemt(item)}
                        </IconButton>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                          })}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      
                    </Collapse>
                  </Card>
                  <p></p>
              </div>
            )
      })}
      else return (
        <div>
          <Typography align="center" textAlign="center">Hiện chưa có bài viết nào trong forum cả.</Typography>
        </div>
      )
}
