import React, { useState, useCallback, useRef, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityPasswordTextField from "../../components/VisibilityPasswordTextField";
import ButtonCircularProgress from "../../components/ButtonCircularProgress"
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography 
    variant="body2" 
    color="textSecondary"
    float = "left"
    align = "center"
    position = "absolute"
    bottom =  "0px">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 }
));

function LogIn(props) {
  const classes = useStyles();
  
  const {
    setStatus,
    history,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    if (loginEmail.current.value !== "trongdat") {
      setTimeout(() => {
        setStatus("Ta");
        setIsLoading(false);
      }, 1500);
    } else if (loginPassword.current.value !== "sqt123456") {
      setTimeout(() => {
        setStatus("invalidPassword");
        setIsLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        history.push("homepage");
      }, 150);
    }
  }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SchoolIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Hệ thống học tập hỗ trợ phụ huynh
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Nhập tài khoản"
            name="username"
            //autoComplete="email"
            autoFocus
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidPassword"}
            label="Password"
            inputRef={loginPassword}
            autoComplete="off"
            onChange={() => {
              if (status === "invalidPassword") {
                setStatus(null);
              }
            }}
            helperText={
              status === "invalidPassword" ? (
                <span>
                  Incorrect password. Try again, or click on{" "}
                  <b>&quot;Forgot Password?&quot;</b> to reset it.
                </span>
              ) : (
                ""
              )
            }
            FormHelperTextProps={{ error: true }}
            onVisibilityChange={setIsPasswordVisible}
            isVisible={isPasswordVisible}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi nhớ tài khoản"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submit}
          >
          <link_nav to="/"> Đăng nhập</link_nav>
          {isLoading && <ButtonCircularProgress />}
          </Button>
          <Grid container>
            <Grid item xs
            id= "forgot_btn">
              <Link 
              variant="body2"
              href = "#">       
                Quên mật khẩu
              </Link>
            </Grid>
            <Grid item
             id= "SignUp_btn">
              <Link 
              href="#" 
              variant="body2"
             >
                {"Không có tài khoản ? Đăng ký ngay"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright className={classes.footer} />
      </Box>
    </Container>
  );
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(LogIn);
