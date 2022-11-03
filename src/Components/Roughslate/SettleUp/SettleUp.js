import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/Styles';
import {TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import './SettleUp.css';


const useStyles = makeStyles(()=>({
  btn:{
    backgroundColor:'#388e3c',
    color:'white',
    '&:hover':{
      backgroundColor:'#1b5e20',
      color:'white'
    }
  }
}))

export default function SettleUp({members}) {
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const friend = "friend";
  return (
    <div>
        <Button variant="contained" onClick={members.length===0 ? ()=>alert("Please select friends") : handleClickOpen} className={classes.btn}>-Settle</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="modal_nav nav__text">Settle Up</DialogTitle>
        <DialogContent style={{width:'400px',height:'300px'}}>
            <DialogContentText>
                <div className="content_text">
                    <div>
                        <label> With you and:&emsp;</label>
                    </div> 
                    <div>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder = {friend}
                        type="email"
                        textAlign="center"
                        sd
                        />
                    </div>
                </div>
                <div className="description_block">
                    <div className="content_text">
                        <DescriptionRoundedIcon/>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder = "Enter a description"
                        type="email"
                        textAlign="center"
                        sd
                        />
                    </div>
                </div>
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
            />
        </DialogContent>
        <DialogActions className="modal_nav">
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
