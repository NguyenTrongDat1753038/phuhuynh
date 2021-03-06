import React , {useState, useEffect,useCallback}from 'react';
import { Typography,makeStyles,Menu,MenuItem, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import TimeAgo from '../../../components/functions/TimeAgo';
import ConfirmDialog from "../../../components/shared/ConfirmDialog"
import LoadingScreen from '../../../components/shared/LoadingScreen';
import { green } from '@material-ui/core/colors';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ViewComment from '../ViewComment';


const useStyles = makeStyles((theme) => ({
  root: {
    margin:'auto',
    flexDirection: 'column',
    maxWidth: '75%',
    backgroundColor: "#f5f8fa"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: "#f44336",
  },
  news_post:{
    marginTop:"30px",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loadingEffect:{
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block"
  },
  dropdown_content: {
    display: "none",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    padding: "12px 16px",
    zIndex: "1"
  },
  dropdown_hover__dropdown_content: {
    display: "block"
  },
  uploadBtn: {
    position: "absolute",
    left: 0,
    opacity: 0,
  },
  uploadWrap: {
    position: "relative"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  like_dialog_popup: {
    display: "fixed", 
    background: "#e4e7af", 
    position: "fixed", 
    top: "50%", 
    left: "55%", 
    transform: "translate(-50%, -50%)", 
    width: "50%", 
    borderColor: "black"
  }
}));



export default function Khoa(props)
{
    const classes = useStyles();
    const [forumPosts,setForumPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPost,setCurrentPost] = useState(null);
    const [userMail,setUserMail] = useState(null);
    const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""})  
    const [popup,setPopUp] = useState(false);
    const [listLike,setListLike] = useState([]);
    const self = props.self;

    const handleOptionsClick = (e,id) => {
      setCurrentPost(id);
      setAnchorEl(e.currentTarget);
    };
  
    
    const handleOptionsClose = () => {
      setAnchorEl(null);
    };


    
    const getUserEmail = ()=>{
      var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {setUserMail(result[0].Email)})
            .catch(error => console.log('error', error));
    }
    const getForumPosts = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              result = result.filter(forum => forum.scope ==='u');
              if (self === "self"){
                result = result.filter(forum => forum.EmailOwn === userMail);
              }
              let data = [];
              for (var i=0;i< result.length;i++){
                data.push({ID: result[i].ID,
                  EmailOwn: result[i].EmailOwn,
                  AvartaOwn: result[i].AvartaOwn,
                  LikeByOwn: result[i].LikeByOwn,
                  NameOwn: result[i].NameOwn,
                  comment: result[i].comment,
                  image: result[i].image,
                  like: result[i].like,
                  scope: result[i].scope,
                  time: result[i].time,
                  title: result[i].title,
                  showcomment: false
                })
              }
              setForumPosts(data);

            })
            .catch(error => console.log('error', error));
    }

   

    useEffect(() => {
       getUserEmail();
       getForumPosts();
       setLoading(false);

     },[self]);

    
     const Btn_ClickShowComment = (forum) => {
      let items = [...forumPosts];
      let scopeFunction = setForumPosts
  
      const index = items.findIndex(item => item.ID === forum.ID);
      if (items[index].showcomment === false){
      items[index].showcomment = true;
      }
      else{
        items[index].showcomment = false;
      }
      scopeFunction(items)
    
    }
    const updateNumberLike = (id,type) => {
      let index;
      if (type===1){
          index = forumPosts.findIndex(x=> x.ID === id);
          let g = forumPosts[index]
          g['like']-=1
          let value = g['like'];
          updateState(id,"like",value)
      }
      else{
        index = forumPosts.findIndex(x=> x.ID === id);
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

    const removeElementState =(id)=> {
      var array = [...forumPosts];
      var index = array.findIndex(x=> x.ID === id);
      if (index !== -1) {
        array.splice(index, 1);
        setForumPosts([...array]);
      }
    }


    const likePosts = async(id) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
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
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
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
            updateState(id,"LikeByOwn",0)
            )
          .catch(error => console.log('error', error));
    }

    const deletePosts = async(id) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("IDPost", id);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/forum/delete", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
          removeElementState(id);
        }
        else{
          console.log("loi");
        }
  
      }).catch((err) => console.log(err, "error"));
    }

    const renderLike = (item) => {
      return(
        <div>
          {item.LikeByOwn === 0 ? <FavoriteIcon/> :<FavoriteIcon style={{ color: 'red' }} />}
          {item.like}
        </div>
      )}
    const getPostLiked = async(id) => {
        let details = {
          IDPost: id
      }
      let formBody = [];
  
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch("https://hcmusemu.herokuapp.com/forum/viewlike", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `bearer ${localStorage.getItem("token")}`,
          },
          body: formBody,
      }) .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {
          if(statusCode === 200){
              setListLike(dataRes);
          }
      }).catch(error => console.log('error', error));
    }

    const renderListUserLike = () =>{
      if (listLike.length === 0){
        return(<div>
          <Box style={{ padding: "20px", borderRadius: "7px",borderColor:"black" }} className={classes.like_dialog_popup}>
          <IconButton style={{position: "absolute",top: "0px",right: "0px",}}  onClick={() => setPopUp(false)}><HighlightOffIcon/></IconButton>
          <Typography>B???n h??y l?? ng?????i like b??i vi???t ?????u ti??n ^^</Typography>
          </Box>
        </div>)

      }
      else{
        return(
          <div>
            <div style={{ padding: "20px", borderRadius: "10px" }} className={classes.like_dialog_popup}>
            <IconButton style={{position: "absolute",top: "0px",right: "0px",}}  onClick={() => setPopUp(false)}><HighlightOffIcon/></IconButton>
              {listLike.map((item, index) => {
                  return (
                    <div key={index}>
                        <CardHeader
                            avatar={
                              <Avatar
                                src={item.Avart}
                              />
                            }
                            title={item.Name}
                          />
                    </div>
              )})}
            </div>
          </div>
       )
    }}
    const renderLikePopup = async(id) => {
        await getPostLiked(id);
        setPopUp(true);
    }
    const renderImage = (item) =>{
      if (item.image !== "")
      return(
        <CardMedia
        className={classes.media}
        image={item.image}
        />
      )
    }
     
    const getCurrentMail = (id) => {
      var array = [...forumPosts];
      var index = array.findIndex(x=> x.ID === id);
      if (index !== -1){
        return array[index].EmailOwn;
      }
      return "";
    }

     const handleLike = async(item) =>
     {
        if (item.LikeByOwn !== 0){
          await unLikePosts(item.ID);
          await updateNumberLike(item.ID,1)
        }
        else{
          await likePosts(item.ID);
          await updateNumberLike(item.ID,0)
        }
     }

    const handleDeletePost = (id) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    deletePosts(id);
    }
    const getComments = useCallback((forum) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("IDPost", forum.ID);

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };

      return fetch("https://hcmusemu.herokuapp.com/forum/viewcmt", requestOptions)
    }, [])

    const renderForum = () =>{
      if (forumPosts.length === 0){
        return(
          <Typography variant="h5" style={{textAlign:"center",marginTop:"5%"}}>
            Kh??ng c?? b??i vi???t
          </Typography>
        )
      }
      else{
      return forumPosts.map((item, index) => {
        return (
          <div key={index}>
                <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={item.AvartaOwn}/>
                      }
                      action={
                        <IconButton aria-label="settings" onClick={(e) => {
                          handleOptionsClick(e, item.ID);
                       }}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title= {
                       <Typography variant="h6"></Typography>  
                      }
                      subheader= {
                        <Typography textAlign="center" variant="h6" style={{fontWeight:"bold"}}>
                          {item.NameOwn} 
                          <br/>
                          <span style={{fontWeight:"normal"}}>{TimeAgo(item.time)}</span>
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
                      onClick= {() => Btn_ClickShowComment(item)}
                      >
                      <CommentIcon/>
                    </IconButton>
                   
                </CardActions>
                  {item.showcomment === true ? <ViewComment getComments={getComments} forum={item} email={userMail} /> : null}
                   <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleOptionsClose}
                >
                  {userMail === getCurrentMail(currentPost) ?
                  <MenuItem onClick={()=>{
                       setConfirmDialog({
                        isOpen: true,
                        title: 'B???n mu???n xo?? tin n??y ch???',
                        subTitle: "Giao t??c kh??ng th??? ho??n",
                        onConfirm: () => { handleDeletePost(currentPost);setConfirmDialog({isOpen: false,});setAnchorEl(null); }
                    })
                  }}>Xo?? post</MenuItem>
                  : null
                  }
                  <MenuItem onClick={()=>{renderLikePopup(currentPost);setAnchorEl(null)}}> Ng?????i ???? th??ch b??i vi???t </MenuItem>  
                                
                </Menu>
              <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              />
              </Card>
              {popup === true ? renderListUserLike() : null}
              <p/> <br/>
          </div>
        )})}
    }

  if (loading === true){
    return(
      <div>
        <LoadingScreen/>
      </div>
    )
    }
   else{
    return(
          <div>
            {renderForum()}
          </div>
  )}
}
