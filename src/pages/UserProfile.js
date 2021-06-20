import React, { useState } from "react";
import NavBar from "../Navigation/NavBar"
import clsx from "clsx";

import {
  Grid,
  Paper,
  Typography,
  IconButton,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  TextField,
  Button,
  Toolbar 
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { CallMissedSharp } from "@material-ui/icons";

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
const user = {
  Name: "Nguyễn Trọng Đạt",
  email: "1753038@student.hcmus.edu.vn",
  phone: "123456789",
  Sex: "Nam",
  Address: "TP Thủ Đức , TP HCM "
};

const mapInformation = {
  Name:"Họ tên",
  email: "Email",
  phone: "Số điện thoại",
  Sex: "Giới tính",
  Address: "Địa chỉ"
};
const drawerWidth = 240;

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
    },
  toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
}));

const UserInfoFormItem = (formState, onChange, propt, index) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
    >
      <Paper className={classes.form}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            defaultValue={formState[propt]}
            name={Object.keys(user)[index]}
            onChange={onChange}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

const UserInfoGridItem = (formState, propt, index) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">{formState[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default function Profile() {
  const [isForm, setIsForm] = useState(false);
  const [formInput, setFormInput] = useState(user);
  const classes = useStyles()
  const handleEdit = () => setIsForm(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = () => {
    setFormInput(formInput);
    setIsForm(false);
  };

  const toggleRender = () => {
    if (isForm) {
      return Object.keys(user).map((key, index) =>
        UserInfoFormItem(formInput, handleChange, key, index)
      );
    }

    return Object.keys(user).map((key, index) =>
      UserInfoGridItem(formInput, key, index)
    );
  };
  
  return (
    <div>
    <main
        className={classes.content}
      >
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item sm={6} md={12} align="center">
                <Paper 
                zDepth={1}
                circle={true}
                style={{ border: "2px solid", height: "200px", width: "200px", borderRadius:'50%' }}
          >
              <img src = "https://picsum.photos/800/450"  style={{width:'100%', height:'100%',borderRadius:'50%'}} ></img>
        </Paper>
        <Typography variant="h4">{`${user.Name}`}</Typography>
        <IconButton
            style={{ backgroundColor: "#594f8d", marginLeft: "1rem" }}
            onClick={handleEdit}>
            <EditIcon style={{ color: "white" }} />
        </IconButton>
            </Grid>
          </Grid>
          {toggleRender()}
          <Grid item xs={12} align="center">
            {!isForm ? (
              <div></div>
            ) : (
              <Button
                style={{ color: "white", backgroundColor: "#594f8d" }}
                onClick={handleSubmit}
              >
                Cập nhật thông tin cá nhân
              </Button>
            )}
          </Grid>
        </Grid>
      </MuiThemeProvider>
      </main>
    </div>
  );
}
