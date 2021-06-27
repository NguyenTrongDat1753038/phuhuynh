import React, { useState, Component } from "react";
import NavBar from "../Navigation/NavBar"
import {
  Grid,
  Paper,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  Toolbar,
  withStyles
} from "@material-ui/core";

let theme = createMuiTheme();
theme.typography.h6 = {
  fontSize: "1rem",
  "@media (min-width:900px)": {
    fontSize: "1.05rem"
  },
  "@media (min-width:1000px)": {
    fontSize: "1.1rem"
  },
  "@media (min-width:1200px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width:1300px)": {
    fontSize: "1.25rem"
  }
};

// dummy data
const data = {
  Name: "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TPHCM",
  Website: "https://www.hcmus.edu.vn",
  Facebook: "https://www.facebook.com/us.vnuhcm/",
  Phone: "(84.8)38 353 193 - (028) 38 962 823",
  Address: "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
  Email: "bantin@hcmus.edu.vn"
};

const mapInformation = {
  Name:"Trường",
  Website: "Địa chỉ web",
  Facebook: "Fanpage",
  Phone: "Điện thoại",
  Address: "Địa chỉ",
  Email: "Hộp thư"
};

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#594f8d",
    color: "white",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  form: {
    backgroundColor: "white",
    color: "#594f8d ",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  floatingMenu:{
      clear:"both",
      position:"fixed",
      width:"85%",
      backgroundColor:"#78AB46",
      top:"5px"
    }

}));


class Deadline extends Component {
  constructor(props) {
      super(props);
      this.state = {
          loadding: 1,
          loaddingnewsuni: 1,
          loaddingnewsfac: 1,

          newsuni: [],
          newsfac: [],

          tag: 0
      }
  }

  getNewsUniversity = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };

      fetch("https://hcmusemu.herokuapp.com/info/newsuniversity", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              this.setState({
                  newsuni: result,
                  loaddingnewsuni: 0
              })
          })
          .catch(error => console.log('error', error));
  }

  getNewsFaculty = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };

      fetch("https://hcmusemu.herokuapp.com/info/newsfaculty", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              this.setState({
                  newsfac: result,
                  loaddingnewsfac: 0
              })
          })
          .catch(error => console.log('error', error));
  }


  convertMonth = (m) => {
      var months = ['một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai'];
      return months[m - 1];
  }

  convertTime = (UNIX_timestamp) => {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '20', '11', '12'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
      return time;
  }

  getCurrenDate = () => {
      var today = new Date();

      this.setState({
          month: today.getMonth() + 1,
          year: today.getFullYear()
      })
  }

  LoaddingIcon = () => {
      if (this.state.loadding === 1) {
          return <i className="loadding fa fa-circle-o-notch fa-spin fa-3x"></i>
      }
  }


  clickTag = async (numtag) => {
      await this.setState({
          tag: numtag
      })
      if (this.state.tag===1 && this.state.loaddingnewsuni===1)
      this.getNewsUniversity();
      if (this.state.tag==2 && this.state.loaddingnewsfac===1)
      this.getNewsFaculty();

  }

  renderTag = () => {
     if (this.state.tag === 1 && this.state.loaddingnewsuni === 0) {
          return (
              <div className="news-page">

                  {
                      this.state.newsuni.map((news) => {
                          return (<a href={"https://www.hcmus.edu.vn/" + news.Link} target="_blank" rel="noopener noreferrer"><div className="news">
                              <div className="title">
                                  {news.Title}
                              </div>
                              <div className="time">
                                  {news.Date}
                              </div>

                          </div>
                              {/* <hr/> */}
                          </a>
                          )
                      })
                  }

              </div>
          )
      }

      else if (this.state.tag === 2 && this.state.loaddingnewsfac === 0) {
          return (
              <div className="news-page">

                  {
                      this.state.newsfac.map((news) => {
                          return (<a href={"https://www.hcmus.edu.vn/" + news.Link} target="_blank" rel="noopener noreferrer"><div className="news">
                              <div className="title">
                                  {news.Title}
                              </div>
                              <div className="time">
                                  {news.Date}
                              </div>

                          </div>
                              {/* <hr/> */}
                          </a>
                          )
                      })
                  }

              </div>
          )
      }
  }

  render() {
      var university = this.state.tag === 1 ? "university" : "";
      var faculty = this.state.tag === 2 ? "faculty" : "";
      return (
          <div>
              <NavBar />
              <div className="deadline-tag">
                  <div className="tag">
                      <div type="button" className={"btn-deadline " + university} onClick={() => this.clickTag(1)}>Tin tức trường
                      </div>
                      <div type="button" className={"btn-deadline " + faculty} onClick={() => this.clickTag(2)}>Tin tức khoa
                      </div>
                  </div>
              </div>
              {this.renderTag()}
          </div>
      );
  }
}

export default withStyles(useStyles)(Deadline);