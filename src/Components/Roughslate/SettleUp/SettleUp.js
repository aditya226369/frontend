import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CreateIcon from "@material-ui/icons/Create";
import DialogTitle from '@material-ui/core/DialogTitle';
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


export default function SettleUp({groupMembers , settleup ,transaction ,id}) {
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [from, setFrom] = React.useState(id);
    const [members,setMembers] = React.useState(groupMembers);
    const [amount, setAmount] = React.useState(0);
    const [error,setError] = React.useState(false);
    const [amt,setAmt] = React.useState(0);
    const [To, setTo] = React.useState(0);

    const handleClickOpen = () => {
      let cnt = transaction.simplified; // cnt = [[0,'1',20]]
      if(cnt===0){
        alert("Please add expense");
        setOpen(false);
        return;
      }
      console.log(cnt);
      let memberArr = []; 
      for(let i=0;i<cnt.length;i++){
        if(!memberArr.includes(parseInt(cnt[i][0]))){
          memberArr.push(groupMembers[parseInt(cnt[i][0])]);
        }
        if(!memberArr.includes(parseInt(cnt[i][1]))){
          memberArr.push(groupMembers[parseInt(cnt[i][1])]);
        }
      }
      setMembers(memberArr);
      console.log(memberArr)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChangeFrom = (e) => {
      e.preventDefault();
      console.log("changed from value")
      setFrom(e.target.value);
    };

    const handleChangeTo = (e) => {
      e.preventDefault();
      console.log(transaction.simplified);
      for(let i=0;i<transaction.simplified.length;i++){
        if(groupMembers.indexOf(from) === parseInt(transaction.simplified[i][0]) && groupMembers.indexOf(To) === parseInt(transaction.simplified[i][1])){
          console.log(groupMembers.indexOf(from));
          console.log(transaction.simplified[i][0])
          setAmount(parseInt(transaction.simplified[i][2]));
          setAmt(parseInt(transaction.simplified[i][2]));
        }
      }
      setTo(e.target.value);
    };

    const handleAmount=(e)=>{
      e.preventDefault();
      setAmount(e.target.value);
    }

    const handleSave=(e)=>{
      e.preventDefault();
      if(amount > transaction.simplified)
      settleup({from:groupMembers.indexOf(from),to:groupMembers.indexOf(To),amount:amount});
      setOpen(false);
    }

  return (
    <div>
        <Button variant="contained" onClick={groupMembers.length===0 ? ()=>alert("Please select friends") : handleClickOpen} className={classes.btn}>-Settle</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="modal_nav nav__text">Settle Up</DialogTitle>
        <DialogContent style={{width:'400px',height:'300px'}}>
            <DialogContentText>
                <div className="settleup_content_text">
                    <div className="flex_box">
                        {/* <label>From: </label> */}
                        <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={from}
                                variant="outlined"
                                onChange={handleChangeFrom}
                                IconComponent={CreateIcon}
                                fullWidth
                                required
                              >
                              {members?.map((item,index)=>{
                                return(
                                <MenuItem value={index}>{item}</MenuItem>
                                )
                              })}
                          </Select>
                        <span>gives</span>
                          {/* <label>To: </label> */}
                          <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={To}
                                variant="outlined"
                                onChange={handleChangeTo}
                                IconComponent={CreateIcon}
                              >
                              {members?.map((item,index)=>{
                                return(
                                <MenuItem value={index}>{item}</MenuItem>
                                )
                              })}
                          </Select>
                    </div>
                    <span>Amount</span>
                    <TextField
                            required
                            fullWidth
                            name="amount"
                            type="number"
                            value={amount}
                            onChange={handleAmount}
                            InputProps={{ inputProps: { min: 1 } }}
                            id="quantity"
                            variant="outlined"
                            autoComplete="amount"
                          />
                </div>
               {error ? <div style={{color:'red'}}><span>No transaction link found</span></div>
               : <div style={{color:'green'}}><span>Total Remaining amount : {amt-amount}</span></div>}
            </DialogContentText>
        </DialogContent>
        <DialogActions className="modal_nav">
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
