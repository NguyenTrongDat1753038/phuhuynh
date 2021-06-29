import react from "react"
import NavBar from "../Navigation/NavBar"
import { Toolbar, Typography } from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core"
import clsx from "clsx"
const useStyles = makeStyles((theme) =>({
    root: {
        marginLeft: "200px",
    },
    toolbar: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      calendar_page: {
        width: "81vw", 
        margin: "66px 17vw", 
        display: "flex", 
        background: "white", 
        padding: "10px", 
        justifyContent: "space-between"
      },
      calendar_page__calendar: {
        width: "50vw"
      },
      calendar_page__calendar__title: {
        fontSize: "20px", 
        fontWeight: "700", 
        color: "#18468b", 
        padding: "5px"
      },
      calendar_page_ul: {
        listStyleType: "none", 
        padding: "0"
      },
      calendar_page__calendar__picker: {
        display: "flex", 
        justifyContent: "space-around", 
        color: "#18468b", 
        fontWeight: "500", 
        padding: "5px", 
        fontSize: "18px"
      },
      calendar_page__calendar__picker_i: {
        fontWeight: "1000"
      },
      calendar_page__calendar_hr: {
        padding: "0", 
        margin: "2px"
      },
      calendar_page__dayofweek: {
        margin: "0", 
        padding: "10px 0"
      },
      calendar_page__dayofweek_li: {
        display: "inline-block", 
        width: "7vw", 
        textAlign: "center", 
        fontWeight: "500"
      },
      calendar_page__days_li: {
        display: "inline-block", 
        width: "7vw", 
        margin: "10px 0", 
        fontSize: "12px", 
        textAlign: "center"
      },
      days_li__color_event: {
        width: "3vw", 
        height: "3vw", 
        lineHeight: "3vw", 
        borderRadius: "50%", 
        textAlign: "center", 
        margin: "auto", 
        fontSize: "15px"
      },
      days: {
        padding: "10px 0", 
        margin: "0"
      },
      calendar_page__schedule: {
        width: "28vw", 
        background: "#3a7cdf", 
        color: "white", 
        borderRadius: "10px", 
        padding: "10px"
      },
      calendar_page__schedule__date: {
        fontSize: "16px", 
        fontWeight: "500", 
        margin: "10px 5px", 
        background: "white", 
        color: "rgb(97, 97, 97)", 
        padding: "2px 5px", 
        width: "22vw"
      },
      calendar_page__schedule__event: {
        maxHeight: "55vh"
      },
      calendar_page__schedule_td: {
        padding: "5px", 
        verticalAlign: "top"
      },
      calendar_page__schedule__time: {
        whiteSpace: "nowrap", 
        fontSize: "18px", 
        fontWeight: "600"
      },
      style_3___webkit_scrollbar_track: {
        WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)", 
        boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)", 
        backgroundColor: "#F5F5F5"
      },
      style_3___webkit_scrollbar: {
        width: "6px", 
        backgroundColor: "#F5F5F5"
      },
      style_3___webkit_scrollbar_thumb: {
        backgroundColor: "#000000"
      },
      calendar_button: {
        display: "flex", 
        justifyContent: "space-between"
      },
      calendar_button__btn_add: {
        color: "rgb(44, 44, 44)", 
        height: "3vw", 
        background: "#ffffff", 
        width: "3vw", 
        lineHeight: "3vw", 
        borderRadius: "50%", 
        textAlign: "center", 
        margin: "auto 0", 
        fontSize: "20px"
      },
      calendar_button__btn_add_hover: {
        background: "#eef1f5"
      },
      calendar_page__popup_event: {
        position: "fixed", 
        width: "35vw", 
        height: "70vh", 
        top: "50%", 
        left: "50%", 
        marginTop: "-30vh", 
        marginLeft: "-17vw", 
        background: "rgb(255, 255, 255)", 
        border: "1px solid black", 
        boxShadow: "2px 2px 10px 0px rgb(197, 197, 197)", 
        overflow: "hidden", 
        padding: "20px"
      },
      calendar_page__popup_event__event_input: {
        fontSize: "16px", 
        height: "30px", 
        background: "white", 
        border: "1px solid black", 
        borderRadius: "10px", 
        margin: "0", 
        padding: "5px"
      },
      calendar_page__popup_event__event_input_label: {
        fontWeight: "500"
      },
      calendar_page__popup_event__event_input__inputops: {
        width: "40vw", 
        fontSize: "16px", 
        height: "30px"
      },
      popup_event__add_title: {
        borderWidth: "0 0 2px", 
        outline: "none", 
        display: "block", 
        width: "30vw", 
        margin: "10px"
      },
      add_title_focus: {
        borderWidth: "0 0 2px", 
        outline: "none", 
        display: "block", 
        width: "30vw", 
        margin: "10px"
      },
      popup_event__event: {
        margin: "20px 10px"
      },
      popup_event__content: {
        borderWidth: "0 0 2px", 
        outline: "none", 
        display: "block", 
        width: "30vw", 
        margin: "10px"
      },
      content_focus: {
        borderWidth: "0 0 2px", 
        outline: "none", 
        display: "block", 
        width: "30vw", 
        margin: "10px"
      },
      popup_event__time: {
        margin: "10px", 
        borderWidth: "0 0 2px", 
        outline: "none", 
        width: "15vw"
      },
      time_focus: {
        margin: "10px", 
        borderWidth: "0 0 2px", 
        outline: "none", 
        width: "15vw"
      },
      popup_event__color: {
        margin: "10px"
      },
      event_clock: {
        margin: "10px", 
        width: "30vw", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"
      },
      event_clock__clock: {
        width: "10vw", 
        display: "inline-block", 
        padding: "3px"
      },
      popup_event__btn_box: {
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "20px"
      },
      popup_event__btn_add: {
        background: "rgb(100, 233, 122)", 
        width: "15vw"
      },
      popup_event__btn_cancel: {
        background: "rgb(255, 214, 180)", 
        width: "15vw"
      },
      react_datepicker__input_container_input: {
        display: "block", 
        borderWidth: "0 0 2px", 
        outline: "none", 
        width: "30vw", 
        margin: "10px"
      },
      calendar_page__schedule__remove: {
        padding: "5px", 
        background: "white", 
        color: "black", 
        borderRadius: "10%"
      },
      calendar_page__schedule__remove_hover: {
        background: "#eef1f5"
      },
      calendar_page__schedule__event_tr: {
        cursor: "pointer"
      }
}));

/*

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            month: 1,
            year: 2021,
            calendar: [],
            event: [],

            listEvent: [],
            selectedDay: 0,
            selectedEvent: null,

            loadcalendar: 1,
            loadevent: 1,

            edit_id: null,
            add_title: "",
            add_year: 2021,
            add_month: 1,
            add_day: 1,
            add_start: "1",
            add_startUNIX: 1621407600,
            add_end: "23",
            add_endUNIX: 1621422000,
            add_desc: "",
            add_color: "rgb(244, 67, 54)",
            add_noti: 1621406700,
            add_date: new Date(),

            popup: 0,
            popupview: 0,

            loadding: 1

        }

        this.handleChange = this.handleChange.bind(this);
        this.timeclock = Array.from(Array(24).keys());
    }
    convertTimestamp = (timestamp) => {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM	
        time = h + ':' + min + ' ' + ampm;

        return time;
    }

    convertTime = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var date = a.getDate();
        return date;
    }

    filterCalendar = () => {
        this.setState({
            loadevent: 1
        })
        let temp = Array.from({ length: 31 }, () => "");
        let listevent = Array.from({ length: 31 }, () => [""]);

        this.state.calendar.forEach((value, index) => {

            if (value.duedate !== undefined) {
                let newevent;
                newevent = {
                    title: value.decription,
                    time: this.convertTimestamp(value.duedate),
                    id: "",
                }
                temp[this.convertTime(value.duedate)] = "black";
                if (listevent[this.convertTime(value.duedate)][0] === "") {
                    listevent[this.convertTime(value.duedate)][0] = newevent;
                }
                else {
                    listevent[this.convertTime(value.duedate)].push(newevent);
                }

            }

            if (value.Date !== undefined) {
                // console.log(value.Date.day)
                let newevent;
                newevent = {
                    title: value.Title,
                    time: this.convertTimestamp(value.StartHour),
                    id: value._id,
                    value: value
                }
                console.log(newevent)

                temp[value.Date.day] = value.Color;
                if (listevent[value.Date.day][0] === "") {
                    listevent[value.Date.day][0] = newevent;
                }
                else {
                    listevent[value.Date.day].push(newevent);
                }
            }
        });
        // console.log(listevent[19].time)
        this.setState({
            event: temp,
            listEvent: listevent,
            loadevent: 0
        })
        // console.log("final",listevent)


    }



    convertAddingDate = () => {
        var fullday = new Date(this.state.add_date);
        this.setState({
            add_day: fullday.getDate(),
            add_month: fullday.getMonth() + 1,
            add_year: fullday.getFullYear(),
            add_startUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_start + ":00:00"),
            add_endUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_end + ":00:00")
        })
    }

    async componentDidMount() {
        // console.log(new Date(this.state.add_fulldate + " " + this.state.add_start + ":00:00").getHours())
        await this.getCurrenDate();
        this.getCalendar();
    }

    removeEvent = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        // console.log("event key",event.target.key)
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/calendar/delete", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        this.getCalendar()
    }

    selectedEventClick = (index) => {

        var viewevent = this.state.listEvent[this.state.selectedDay][index]
        // console.log("Seleted",this.state.selectedEvent)
        // console.log("view", viewevent)
        // console.log("index",index)
        // console.log(new Date(viewevent.value.StartHour).getHours())
        // console.log("des", viewevent.value.Decription.text)
        const date = new Date(viewevent.value.Date.month + "/" + viewevent.value.Date.day + "/" + viewevent.value.Date.year)
        this.setState({
            // selectedEvent: index,
            add_title: viewevent.value.Title,
            add_date: date,
            add_start: new Date(viewevent.value.StartHour * 1000).getHours(),
            add_end: new Date(viewevent.value.EndHour * 1000).getHours(),
            add_desc: viewevent.value.Decription.text,
            add_color: viewevent.value.Color,
            edit_id: viewevent.value._id,
            add_fulldate: date.toDateString(),
            popupview: 1
        })
    }

    selectedDay = () => {
        const {classes} = this.props;
        if (this.state.loadcalendar === 0 && this.state.loadevent === 0) {
            console.log("test", this.state.listEvent)
            var listE = this.state.listEvent[this.state.selectedDay].map((item, index) => {
                // console.log(item);
                if (item === "")
                    return <></>
                if (item.id !== "") return <tr onClick={() => this.selectedEventClick(index)}>
                    <td className={classes.time}>{item.time}</td>
                    <td>{item === "" ? "" : "-"}</td>
                    <td>{item.title}</td>
                    <td type="button" onClick={() => this.removeEvent(item.id)}><i className= {clsx(classes.calendar_page__schedule__remove,classes.fa)} ></i></td>
                </tr>
                else
                    return <tr>
                        <td className="time">{item.time}</td>
                        <td>{item === "" ? "" : "-"}</td>
                        <td>{item.title}</td>
                        <td ></td>
                    </tr>
            })
            return listE;
        }

    }

    getCalendar = () => {
        this.setState({
            loadcalendar: 1
        })
        var myHeaders = new Headers();
        // console.log(this.state.month)
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("year", this.state.year);
        urlencoded.append("month", this.state.month);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/calendar/getthismonth", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.setState({
                    calendar: result
                })
            })
            .then(success => {
                // console.log("success")
                this.filterCalendar();
                this.setState({
                    loadcalendar: 0,
                    loadding: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    getCurrenDate = () => {
        var today = new Date();

        this.setState({
            selectedDay: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
        })
    }

    setSelecteday = async (value) => {
        await this.setState({
            loadevent: 1
        })
        // console.log(value)
        this.setState({
            selectedDay: value
        })
        this.filterCalendar()
    }

    renderCalendar = () => {
        if (this.state.loadcalendar === 0) {
            let daysofmonth = new Date(this.state.year, this.state.month, 0).getDate();
            let ascen = Array.from({ length: daysofmonth }, (_, i) => i + 1);
            let dow = this.getDayOfWeek()
            let temp = Array.from({ length: dow }, () => "");
            var numbers = temp.concat(ascen)
            const listItems = numbers.map((number) => {
                if (number === "")
                    return <li></li>
                else if (this.state.event[number] !== "") {
                    return <li key={number} type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><div className="color-event" style={{ background: this.state.event[number], color: "white" }} >{number}</div></li>
                }
                // if (this.state.event[number] === "custom") {
                //     return <li key={number} type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><span className="custom">{number}</span></li>
                // }
                return <li key={number} type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><span className="color-event">{number}</span></li>
            }
            );
            return listItems;
        }
    }

    getDayOfWeek = () => {
        var now = new Date(2021, this.state.month - 1, 1, 0, 0, 0);

        var days = [6, 0, 1, 2, 3, 4, 5];

        var day = days[now.getDay()];
        // var month = months[now.getMonth()];

        // new Date(2020, 2, 0).getDate()
        // this.getDayOfWeek()

        return day;
    }

    changeMonth = async (i) => {
        var month = this.state.month += i;
        if (month > 12) { month = 1 }
        if (month < 1) { month = 12 }
        await this.setState({
            month: month,
            selectedDay: 1
        })

        this.getCalendar();
    }

    renderSchedule = () => {

        return <div className="schedule" >
            <div className="calendar-button">

                <div className="date">{this.state.selectedDay + "/" + this.state.month + "/" + this.state.year}</div>
                <div type="button" className="btn-add" onClick={this.openPopup}><i className="fa fa-plus" ></i></div>
            </div>
            <div className="event" id="style-3">
                <table>
                    <colgroup>
                        <col span="1" style={{ width: "9%" }} />
                        <col span="1" style={{ width: "1%" }} />
                        <col span="1" style={{ width: "85%" }} />
                        <col span="1" style={{ width: "5%" }} />
                    </colgroup>
                    <tbody>
                        {this.selectedDay()}
                    </tbody>
                </table>
            </div>
            {this.viewDetailEvent()}
        </div>

    }

    addEvent = async () => {
        this.setState({ popup: 0 })
        await this.convertAddingDate();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Title": this.state.add_title,
            "TypeEvent": "Công việc",
            "year": this.state.add_year,
            "month": this.state.add_month,
            "day": this.state.add_day,
            "StartHour": this.state.add_startUNIX,
            "EndHour": this.state.add_endUNIX,
            "desciptionText": this.state.add_desc,
            "url": "https://www.google.com/",
            "UnderLine": false,
            "Italic": false,
            "Bold": false,
            "Color": this.state.add_color,
            "listguestEmail": [],
            "listguestName": [],
            "Notification": this.state.add_noti
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/calendar/post", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        this.getCalendar();
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async handleChange(event) {
        await this.setState({ [event.target.name]: event.target.value });
        await this.setState({
            add_startUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_start + ":00:00"),
            add_endUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_end + ":00:00")
        });
        // console.log(this.state.add_endUNIX)
    }

    renderClockPicker = () => {


        var timepicker = this.timeclock.map((num) => {
            // console.log(num)
            if (num === 0) {
                return <option value={num}>12 AM</option>
            }
            else if (num === 12) {
                return <option value={num}>12 PM</option>
            }
            else if (num > 12) {
                return <option value={num}>{num - 12} PM</option>
            }

            else return <option value={num}>{num} AM</option>
        })
        return timepicker;
    }

    renderDatepicker = (date) => {
        this.setState({
            add_date: date,
            add_fulldate: date.toDateString()
        })
    }

    handleChangeComplete = (color, event) => {
        // console.log(color)
        this.setState({ add_color: color.hex });
    };

    editEvent = async () => {
        this.setState({ popupview: 0 })
        await this.convertAddingDate();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": this.state.edit_id,
            "Title": this.state.add_title,
            "TypeEvent": "Cả ngày",
            "year": this.state.add_year,
            "month": this.state.add_month,
            "day": this.state.add_day,
            "StartHour": this.state.add_startUNIX,
            "EndHour": this.state.add_endUNIX,
            "desciptionText": this.state.add_desc,
            "url": "https://www.google.com/",
            "UnderLine": "",
            "Italic": "",
            "Bold": "",
            "Color": this.state.add_color,
            "listguestEmail": [],
            "listguestName": [],
            "Notification": "1800"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/calendar/edit", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        this.getCalendar();
    }


    viewDetailEvent = () => {

        if (this.state.popupview === 1) {

            return (
                <div className="popup-event">
                    {}
                    <input className="add-title" placeholder="Thêm tiêu đề" onChange={this.setParams} name="add_title" value={this.state.add_title}></input>

                    
               /*     <DatePicker dateFormat="dd/MM/yyyy" locale="vi" selected={this.state.add_date} onChange={(date) => this.renderDatepicker(date)} />
                    <div className="event-clock">
                        <label style={{ color: "black" }}>Thời gian</label>
                        <select className="clock" name="add_start" onChange={this.handleChange} value={this.state.add_start}>
                            {this.renderClockPicker()}
                        </select>
                        <span>-</span>
                        <select className="clock" name="add_end" onChange={this.handleChange} value={this.state.add_end}>
                            {this.renderClockPicker()}
                        </select>
                    </div>
                    <div>
                        <input className="content" placeholder="Thêm nội dung" onChange={this.setParams} name="add_desc" value={this.state.add_desc}></input>
                    </div>
                    <div className="event">
                        <label style={{ color: "black" }}>Màu đánh dấu</label>
                        <CirclePicker color={this.state.add_color} width="30vw" onChangeComplete={this.handleChangeComplete} circleSize={28}></CirclePicker>
                    </div>
                    <div className="btn-box">
                        <div class="btn add" type="button" onClick={this.editEvent}>Chỉnh sửa</div>
                        <div class="btn cancel" type="button" onClick={this.closePopup}>Hủy</div>
                    </div>
                </div>
            )
        }
    }

    popupAddEvent = () => {
        if (this.state.popup === 1) {
            return (
                <div className="popup-event">
                    <input className="add-title" placeholder="Thêm tiêu đề" onChange={this.setParams} name="add_title" value={this.state.add_title}></input>
                    {/* <div className="event"> }

                    {/* <label>Ngày</label> }
                    <DatePicker dateFormat="dd/MM/yyyy" locale="vi" selected={this.state.add_date} onChange={(date) => this.renderDatepicker(date)} />
                    <div className="event-clock">
                        <label>Thời gian</label>
                        <select className="clock" name="add_start" onChange={this.handleChange} value={this.state.add_start}>
                            {this.renderClockPicker()}
                        </select>
                        <span>-</span>
                        <select className="clock" name="add_end" onChange={this.handleChange} value={this.state.add_end}>
                            {this.renderClockPicker()}
                        </select>
                    </div>
                    <div>
                        <input className="content" placeholder="Thêm nội dung" onChange={this.setParams} name="add_desc" value={this.state.add_desc}></input>
                    </div>
                    <div className="event">
                        <label>Màu đánh dấu</label>
                        <CirclePicker color={this.state.add_color} width="30vw" onChangeComplete={this.handleChangeComplete} circleSize={28}></CirclePicker>
                    </div>


                    
                    <div className="btn-box">
                        <div class="btn add" type="button" onClick={this.addEvent}>Thêm thông báo</div>
                        <div class="btn cancel" type="button" onClick={this.closePopup}>Hủy</div>
                    </div>
                </div>
            )
        }
    }

    closePopup = () => {
        this.setState({
            popup: 0,
            popupview: 0
        })
    }

    openPopup = () => {
        this.setState({
            popup: 1
        })
    }

    toTimestamp = (strDate) => {
        var datum = new Date(strDate).getTime();
        return datum / 1000;
    }


    render() {
        if (this.state.loadding === 0)
            return (
                <div>
                    <Navbar />
                    <Sidebar />
                    <div className="calendar-page">
                        <div className="calendar">
                            <div className="title">LỊCH CÁ NHÂN</div>
                            <div className="picker">
                                <div onClick={(i) => this.changeMonth(-1)}><i type="button" width="20vw" className="fa fa-angle-left fa-lg fa-fw" aria-hidden="true"></i></div>
                                <div>THÁNG {this.state.month}</div>
                                <div onClick={(i) => this.changeMonth(1)}><i type="button" width="20vw" className="fa fa-angle-right fa-lg fa-fw" aria-hidden="true"></i></div>
                            </div>
                            <hr />
                            <ul className="dayofweek">
                                <li key="H">H</li>
                                <li key="BA">B</li>
                                <li key="T">T</li>
                                <li key="N">N</li>
                                <li key="S">S</li>
                                <li key="B">B</li>
                                <li key="C">C</li>
                            </ul>
                            <ul className="days">
                                {this.renderCalendar()}
                            </ul>
                            {this.popupAddEvent()}

                        </div>
                        {this.renderSchedule()}
                    </div>

                </div>
            );
        else return null;

    }
}

export default withStyles(useStyles)(Calendar);*/

export default function Calendar(){

    return(
        <div>
            <NavBar/>
            <Toolbar/>
        </div>
    )
}