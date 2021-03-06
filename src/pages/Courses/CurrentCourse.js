import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import LoadingScreen from '../../components/shared/LoadingScreen';
import checkTokenExpired from "../../ValidAccess/AuthToken"
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    course_page: {},
    course_tag: {
      background: "white", 
      boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)"
    },
    course_tag__tag: {
      background: "white", 
      display: "flex", 
      justifyContent: "space-around", 
      textAlign: "center"
    },
    course: {
      marginTop: "10px", 
      padding: "30px 30px 5px 30px", 
      background: "white", 
      borderRadius: "5px", 
      boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)"
    },
    course__title: {
      fontSize: "20px", 
      fontWeight: "500", 
      padding: "5px", 
      background: "#18468b", 
      borderRadius: "10px", 
      color: "white"
    },
    list_teacher: {
      margin: "10px 0", 
      borderRadius: "10px"
    },
    list_teacher__content: {
      padding: "10px"
    },
    course_tag__btn_course: {
      display: "inline-block", 
      padding: "15px", 
      width: "50vw", 
      fontSize: "16px", 
      fontWeight: "500"
    },
    course_tag__tag__current: {
      borderBottom: "2px solid rgb(125, 149, 255)", 
      color: "rgb(125, 149, 255)"
    },
    course_tag__tag__all: {
      borderBottom: "2px solid rgb(255, 116, 116)", 
      color: "rgb(255, 116, 116)"
    },
    loadding: {
      display: "flex", 
      justifyContent: "center", 
      padding: "10px"
    },
    course__direct: {
      textDecoration: "none", 
      display: "block"
    },
    course__link: {
      fontSize: "16px", 
      textAlign: "center", 
      width: "70vw", 
      padding: "5px", 
      borderRadius: "10px", 
      fontWeight: "450"
    },
    course__link_hover: {
      background: "rgb(243, 243, 243)"
    }
}));

function CurrentCourse(){
    const classes = useStyles();
    const [course,setCourse] = useState([]);
    const [loading,setLoading] = useState(true);
    const history = useHistory();
    useEffect(()=>{
        getCurrentCourse()
    },[])
    const getCurrentCourse = () => {
      if (checkTokenExpired()) {
        localStorage.clear()
        history.replace("/");
        return null
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/studycourses/currentcourses", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCourse(result);
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }

    if (loading === true){
        return(
            <div>
                <LoadingScreen/>
            </div>

        )
    }
    else{
        if (!course.length === true){
            return(
                <div>
                    <Typography variant="h4" textAlign="center">H???c k?? n??y b???n ch??a ????ng k?? m??n n??o</Typography>
                </div>
            )
        }
        else{
            return course.map((c, index) => {
                    return (
                        <div key={index} className={classes.course}>
                            <Link to={"/course/" + c.IDCourses} className={clsx(classes.course__title,classes.course__direct)}>
                                {c.name}
                            </Link>
                            <div className={classes.list_teacher}>
                                {c.teacher.map((tc, tindex) => (
                                    <div key={tindex} className={classes.list_teacher__content}>
                                        <span>Gi??o vi??n: </span>
                                        <span>{tc}</span>
                                    </div>))}
                            </div>
                        </div>
                    )
                })
   
        }
    }
}

export default CurrentCourse;