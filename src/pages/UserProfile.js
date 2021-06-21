import React, { Component } from 'react';
import NavBar from '../Navigation/NavBar';
import {makeStyles, withStyles} from "@material-ui/styles"
import {Toolbar} from "@material-ui/core"
import PropTypes from 'prop-types';
import { c } from 'bowser';

const useStyles = makeStyles(() => ({
  center: {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh"
  },
  root:  {
    marginLeft: "200px",
    flexGrow: 1,
  },
  info_profile: {
    width: "80vw", 
    margin: "76px 17.5vw", 
    background: "#fff", 
    padding: "20px", 
    borderRadius: "10px", 
    boxShadow: "0px 1px 2px grey"
  },
  info_profile_hr: {
    borderTop: "1px solid gray"
  },
  info_profile_table: {
    borderCollapse: "collapse", 
    width: "100%"
  },
  info_profile_th: {
    fontSize: "14px", 
    padding: "8px", 
    textAlign: "left", 
    borderBottom: "1px solid #ddd"
  },
  info_profile_td: {
    padding: "15px 0px 15px 5px"
  },
  info_profile__firstcol: {
    fontWeight: "bold", 
    paddingLeft: "20px"
  },
  info_profile__tb_row_hover: {
    background: "rgb(243, 243, 243)", 
    cursor: "pointer"
  },
  info_profile__edit: {
    color: "rgb(71, 71, 194)"
  },
  info_profile__confirm: {
    margin: "2px", 
    padding: "5px", 
    background: "#304f8d", 
    color: "white"
  },
  info_profile__cancel: {
    margin: "2px", 
    padding: "4px", 
    background: "#ffffff", 
    border: "1px solid"
  },
  info_profile__image: {
    borderRadius: "100px"
  },
  info_profile_input: {
    width: "45vw"
  },

}));
class Profile extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            university: "",
            fac: "",
            
            listuniversity:[],
            listfaculty:[],

            uniselected: "",
            facselected: "",

            editname: 0,
            editimg: 0,
            edituni: 0,
            editfac:0,

            loading: 0,                                      

            picture: "",
            imgData: process.env.PUBLIC_URL + 'uploadimg.png'
        }

    }


    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    name: result[0].HoTen,
                    email: result[0].Email,
                    university: result[0].TenTruongDH,
                    fac: result[0].TenKhoa,
                    loading: 1,
                    facselected:result[0].MaKhoa,
                    uniselected:result[0].MaTruong
                })
                console.log(this.state.name)
            })
            .catch(error => console.log('error', error));
    }

    onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            this.setState({
                picture: e.target.files[0]
            });
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.setState({
                    imgData: reader.result
                });
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    EditName = () => {
        this.setState({ editname: 1 })
    }

    CancelEdit = () => {
        this.setState({ editname: 0,edituni:0,editfac:0 })
    }

    updateProfile = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var urlencoded = new URLSearchParams();
        urlencoded.append("HoTen", this.state.name);
        urlencoded.append("MaTruong", this.state.uniselected);
        urlencoded.append("MaKhoa", this.state.facselected);
        urlencoded.append("AnhSV", "");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/edit", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message === "profile edited") {
                    window.location.reload();
                    // alert("Đổi thành công");
                }
                this.CancelEdit();
            })
            .catch(error => console.log('error', error));
    }

    
    changeName = () => {
        if (this.state.editname === 0) {
            return <tr className="tb-row" onClick={this.EditName}>
                <td className="firstcol">Tên</td>
                <td>{this.state.name}</td>
                <td className="edit" >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className="firstcol">Tên</td>
                <td><input name="name" value={this.state.name} onChange={this.setParams}></input></td>
                <td><span className="confirm" type="button" onClick={this.updateProfile}>Xác nhận</span><span className="cancel" type="button" onClick={this.CancelEdit}>Hủy</span></td>
            </tr>
        }
    }

    loadUni = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/university/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var uni = result.map((value, index) => {
                    return <option key={index} value={value.MaTruong}>{value.TenTruongDH}</option>;
                })
                console.log(uni)
                this.setState({ listuniversity: uni })
            })
            .catch(error => console.log('error', error));
    }

    loadingFaculty = () => {
        // console.log(this.state.uniselected)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("MaTruong", this.state.uniselected);
        // console.log(this.state.uniselected)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/faculty/getname", requestOptions)
            .then(response => response.json())
            .then(result => {
                var fa = result.map((value, index) => {
                    return <option key={index} value={value.MaKhoa}>{value.TenKhoa}</option>;
                })
                // console.log(fa)
                this.setState({ listfaculty: fa })
            })
            .catch(error => console.log('error', error));
    }



    EditUni = () => {
        this.setState({
            edituni: 1
        })
        this.loadUni();
    }

    EditFac = () => {
        this.setState({
            editfac: 1
        })
        this.loadingFaculty();
    }

    changeUni = () => {
        if (this.state.edituni === 0) {

            return <tr className="tb-row" onClick={this.EditUni}>
                <td className="firstcol">Trường</td>
                <td>{this.state.university}</td>
                <td className="edit" >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className="firstcol">Trường</td>
                <td><select className="form-control" name="uniselected" onChange={this.setParams} value={this.state.uniselected}>
                    {/* <option>Chọn trường</option> */}
                    {this.state.listuniversity}
                </select></td>
                <td><span className="confirm" type="button" onClick={this.updateProfile}>Xác nhận</span><span className="cancel" type="button" onClick={this.CancelEdit}>Hủy</span></td>
            </tr>
        }
    }

    changeFac = () => {
        if (this.state.editfac === 0) {
            return <tr className="tb-row" onClick={this.EditFac}>
                <td className="firstcol">Khoa</td>
                <td>{this.state.fac}</td>
                <td className="edit" >Chỉnh sửa</td>
            </tr>
        }
        else {
            return <tr>
                <td className="firstcol">Khoa</td>
                <td><select className="form-control" name="facselected" onChange={this.setParams} value={this.state.facselected}>
                    {/* <option>Chọn khoa</option> */}
                    {this.state.listfaculty}
                </select></td>
                <td><span className="confirm" type="button" onClick={this.updateProfile}>Xác nhận</span><span className="cancel" type="button" onClick={this.CancelEdit}>Hủy</span></td>
            </tr>
        }
    }



    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkPopup = () => {
        if (this.state.editimg === 0) {
            return <></>
        }
        else {
            return this.popupBox();
        }
    }

    changeIMG = () => {
        if (this.state.editimg === 0) {
            this.setState({
                editimg: 1
            })
        }
        else {
            this.setState({
                editimg: 0
            })
        }
    }

    popupBox = () => 
    { 
        return (

            <div className= "popup-box">
                <div className="header">
                    <div className="title">Chọn ảnh hồ sơ</div>
                    {/* <div className="tag">Tải ảnh lên</div>
                    <div className="tag">Ảnh của bạn</div> */}
                </div>
                <div className="body">
                    <img width="150vw" height="150vh" src={this.state.imgData} alt=""></img>
                    <label className="custom-file-upload">
                        <input type="file" accept="image/png, image/jpeg" onChange={this.onChangePicture} />Chọn ảnh từ máy tính của bạn
                    </label>
                </div>
                <div className="footer">
                    <div className="btnchange" type="button">Đặt ảnh đại diện</div>
                    <div className="btncancel" type="button" onClick={this.changeIMG}>Hủy</div>
                </div>
            </div>
        );
    }


    render() {
        const {classes} = this.props
        if (this.state.loading === 0) {
            console.log(this.state.name)
            return <></>
        }
        return (
            <div className={classes.center}>
               <NavBar/>
               <Toolbar/>
               <div className={classes.center}>
                {this.checkPopup()}
                <div className={classes.info_profile}>
                    <h3>Thông tin cá nhân</h3>
                    <hr />

                    <table>
                        <colgroup>
                            <col style={{ width: "25%" }} />
                            <col style={{ width: "65%" }} />
                            <col style={{ width: "15%" }} />
                        </colgroup>
                        <tbody>
                            <tr className="tb-row" onClick={this.changeIMG}>
                                <td className="firstcol">Ảnh</td>
                                <td style={{ color: "grey" }}>Thêm hình ảnh để cá nhân hóa tài khoản</td>
                                <td><img className="image" width="50vw" height="50vh" src="https://i.pinimg.com/originals/a4/f8/f9/a4f8f91b31d2c63a015ed34ae8c13bbd.jpg" alt=""></img></td>
                            </tr>

                            {this.changeName()}

                            <tr className="tb-row">
                                <td className="firstcol">Email</td>
                                <td>{this.state.email}</td>
                                <td></td>
                            </tr>
                            {this.changeUni()}
                            {this.changeFac()}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}


Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(Profile);
