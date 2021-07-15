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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import unixToDateString from "../../../components/functions/unixToDateString"

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'auto',
    flexDirection: 'column',
    maxWidth: '80%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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


export default function Khoa()
{
    const classes = useStyles();
    const [forumPosts,setForumPosts] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

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
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/forum/yourpost", requestOptions)
            .then(response => {return response.json()})
            .then(result => {
                setForumPosts(result)
            })
            .catch(error => console.log('error', error));
    }
    const getAvatar = (avatar) =>{
      var img = avatar.substr(1);
      return img;
    }

    useEffect(() => {
      getForumPosts();
     },[]);
     if (forumPosts.length != undefined)
     {
        return forumPosts.map((item, index) => {
          console.log(getAvatar(item.AvartaOwn))
            return (
              <div key={index}>
                
              </div>
            )
      })}
      else return (
        <div>
          <Typography>Hiện chưa có bài viết nào trong forum cả.</Typography>
        </div>
      )
}
