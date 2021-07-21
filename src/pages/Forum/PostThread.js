import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,IconButton,TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "auto",
      flexDirection: 'row',
      maxWidth: '75%',
      minHeight: "300px"
    },
  
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

export const PostThread =  ({
        isOpen,
        handleClose
    })=>{
    const classes  = useStyles();
    return(
        <Dialog
            className={classes.root}
            fullWidth
            maxWidth="md"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby = "max-width-dialog-title">
            <DialogTitle id="max-width-dialog-title">Đăng bài viết</DialogTitle>
            <DialogContent>
                <label> Tiêu đề bài thảo luận </label>
                <TextField variant="outlined" margin="normal"  fullWidth size="medium" multiline placeholder="Nhập tiêu đề tại đây ^^"/>
                <label> Nội dung bài viết </label>
                <TextField variant="outlined" margin="normal"  fullWidth size="medium" multiline placeholder="Nhập nội dung đăng tại đây ^^"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Huỷ
                </Button>
                <Button>
                    Đăng bài viết
                </Button>
            </DialogActions>
        </Dialog>      
    )
}

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}