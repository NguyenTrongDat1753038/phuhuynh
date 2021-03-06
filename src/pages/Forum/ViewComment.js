import React, { useEffect, useState } from 'react';
import { Button,makeStyles } from '@material-ui/core';
//import Zoom from 'react-medium-image-zoom'

const backCover = {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3
}

const useStyles = makeStyles((theme) => ({
    forum__dialog_popup: {
        display: "fixed", 
        background: "white", 
        position: "fixed", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)", 
        width: "40%", 
        zIndex: "4"
      }
}))

function ViewComment(props) {
    const classes = useStyles();
    const [loadding, setLoadding] = useState(false)
    const [comments, setComments] = useState([])
    const [imgData, setimgData] = useState(null);
    const [image, setImage] = useState(null);
    //const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""})  

    const [newcomment, SetNewcomment] = useState("");
    const [count,setCount] = useState(0);
    const [popup, setPopup] = useState(null)
    const email = props.email;

    useEffect(() => {
        getComments();
    },[count])

    const getComments = () => {
        if (props.forum.comment === 0)
            return

        setLoadding(true)
        props.getComments(props.forum)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
                if (statusCode === 200){
                    setComments(dataRes)
                }
                setLoadding(false)
            })
            .catch(error => console.log('error', error));
    }

    const handleNewcomment = (event) => {
        if (event.key === 'Enter') {
            Newcomment_API()
        }

    }

    const Newcomment_API = async () => {
        if (newcomment === "" && image === null)
            return
        setLoadding(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var formdata = new FormData();
        formdata.append("IDPost", props.forum.ID);
        formdata.append("comment", newcomment);
        formdata.append("image", image);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        SetNewcomment("");
        setImage(null)
        setimgData(null)
        var url
        if (props.forum.scope !== undefined) {
            url = "https://hcmusemu.herokuapp.com/forum/cmt"
        }
        else if (props.forum.IDCourses !== undefined) {
            url = "https://hcmusemu.herokuapp.com/forum/courses/cmt"
        }
        else return
        await fetch(url, requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
                if (statusCode === 200){
                    let val = count;
                    setCount(val);
                }
                else{
                    alert("C?? l???i khi b??nh lu???n")
                }
                setLoadding(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoadding(false)
            });


    }
  
    const RemoveComment_API = (removeid) => {
        setPopup(null)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCmt", removeid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const items = [...comments];
        const temp = [...comments];
        const j = items.findIndex(item => item.ID === removeid);

        items.splice([j], 1);

        setComments(items)
        var url
        if (props.forum.scope !== undefined) {
            url = "https://hcmusemu.herokuapp.com/forum/deletecmt"
        }
        else if (props.forum.IDCourses !== undefined) {
            url = "https://hcmusemu.herokuapp.com/forum/courses/deletecmt"
        }
        else return
        fetch(url, requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
              if (statusCode === 200){
                    
              }
              else{
                  alert("C?? l???i khi xo??");
              }
          })
            .catch(error => setComments(temp));
    }

    const onChangePicture = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setimgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const removeImageComment = () => {
        setImage(null)
        setimgData(null)
    }

    const convertTimeAgo = (UNIX_timestamp) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = Date.now() - UNIX_timestamp;

        if (elapsed < msPerMinute) {
            return '1 ph??t tr?????c';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' ph??t tr?????c';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' gi??? tr?????c';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ng??y tr?????c';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' th??ng tr?????c';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' n??m tr?????c';
        }
    }

    const renderPopup = () => {
        return <div>
            <div style={backCover} onClick={() => setPopup(null)}></div>
            <div style={{ padding: "20px", borderRadius: "7px" }} className={classes.forum__dialog_popup}>
                <p style={{ textAlign: "center", fontWeight: "500" }}>B???n c?? mu???n x??a b??nh lu???n kh??ng?</p>
                <div className="row" style={{ justifyContent: "space-around" }}>
                    <Button className="col-4" style={{ textAlign: "center", fontWeight: "500", background: "#f1f2f4", color: "rgb(24, 70, 139)", padding: "5px" ,borderRadius:"2px"}} onClick={() => setPopup(null)}>H???y</Button>
                    <Button className="col-4" style={{ textAlign: "center", fontWeight: "500", background: "rgb(24, 70, 139)", color: "white", padding: "5px" ,borderRadius:"2px"}} onClick={() =>  RemoveComment_API(popup)}>C??</Button>
                </div>
                   
            </div>
        </div>
    }

    const renderComment = () => {
      if (comments !== null && comments.length>=1) {
            var showcomment = comments.map((comment) => {
                return( <div className="row justify-content-center" >
                    <div className="col-md-12">
                        <div className="row list-forum" style={{ background: "white", padding: "10px 0", justifyContent: "space-start" }}>
                            <div className="col-1">
                                <img width="50px" height="50px" src={comment.AvartOwn} alt="" style={{ borderRadius: "100%" }} />
                            </div>
                            <div className="col-11">
                                <div className="row" style={{ margin: "0" }}>
                                    <div className="col-auto" style={{ background: "#f0f3f5", borderRadius: "7px" }}>
                                        <div className="flex">
                                            <span style={{ fontWeight: "bold", fontSize: "15px" }}>{comment.NameOwn}</span>
                                            <span className="comment time">&nbsp;&nbsp;&nbsp;{convertTimeAgo(comment.time)}</span>
                                            {comment.EmailOwn === email ?  <span style={{marginLeft:"20px"}} type="button" onClick={() => setPopup(comment.ID)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                </svg>
                                            </span> : null}
                                        </div>
                                        <div style={{fontSize:"15px"}} className="own flex">
                                            <span className={"title comment"}>{comment.comment}</span>
                                        </div>
                                        {comment.image === "" ? null : <img width="200vw" height="200vw" src={comment.image} alt="" style={{ paddingBottom: "10px" }} />}
                                        {/* </div> */}
                                    </div>


                                </div>
                            </div>

                        </div>
                        {/* {remove} */}
                        {popup !== null ? renderPopup() : null}
                    </div>
                </div>)
            })
            return showcomment
        }
    }

    if (loadding)
        return <div className="text-center" style={{ padding: "10px" }}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    else return <div className="col-md-12">
        <div>
            <div className="row justify-content-center" >
                <div className="col-md-12">
                    <div className="row" style={{ background: "white", margin: "0", justifyContent: "space-start", alignItems: "center" }}>
                        <label style={{ width: "35px", padding: 0, margin: 0, textAlign: "center", borderRadius: "100%" }} for="files" className="col-auto btn"><i className="fa fa-file-image-o"></i></label>
                        <input width="0vw" id="files" type="file" hidden accept="image/png, image/jpeg" onChange={(e) => onChangePicture(e)} />

                        <input className="col-11 input-comment" type="text" placeholder="Nh???p b??nh lu???n" value={newcomment} required onChange={(e) => SetNewcomment(e.target.value)} onKeyDown={handleNewcomment} />
                    </div>
                    <div style={{ background: "white", display: "flex", alignItems: "start", margin: "5px" }}>
                        {imgData !== null ? <img style={{ width: "50%", maxWidth: "50vw", height: "50%", maxHeight: "50vh" }} src={imgData} alt=""/> : null}
                        {imgData !== null ? <div style={{ background: "#7367f0", color: "white", padding: "5px", borderRadius: "7px", margin: "5px", fontSize: "14px" }} type="button" onClick={removeImageComment}>X??a ???nh</div> : null}
                    </div>
                </div>
            </div>
            {renderComment()}

        </div>
    </div>
}

export default ViewComment;