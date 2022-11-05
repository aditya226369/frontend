import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CreateIcon from '@material-ui/icons/Create';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import classes from "./AddExpense.module.css";


export default function AddExpense({members,addtransaction,fetched,isId,group}) {
  const [open, setOpen] = React.useState(false);
  const [paidBy, setPaidBy] = React.useState(members[0]);
  const [groupMembers,setGroupMembers] = React.useState([])
  const [checkAmount, setCheckAmount] = React.useState([0, 0]);
  const [expense, setExpense] = React.useState({
    groupIdx: 0,
    label: "Food",
    description: "",
    date: "",
    fromTo: [0, []],
    amount: 0,
  });

  React.useEffect(()=>{
    setExpense({
      groupIdx: 0,
      label: "Food",
      description: "",
      date: "",
      fromTo: [0, []],
      amount: 0,
    })
    let ng=[];
    for(let i=0;i<groupMembers.length;i++){
      ng.push(members[i][1]);
    }
    setGroupMembers(ng);
  },[]);
  const handleChangePaidBy = (e) => {
    e.preventDefault();
    const newname = e.target.value;
    setPaidBy(newname);
  };

  const handleClickOpen = (e) => {
    e.preventDefault();
    let ng=[];
    for(let i=0;i<groupMembers.length;i++){
      ng.push(members[i][1]);
    }
    setGroupMembers([...ng]);
    const arr = new Array(groupMembers.length).fill(0);
    setCheckAmount(arr);
    setPaidBy(groupMembers[0]);
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleDescription = (e) => {
    e.preventDefault();
    handleAppends("description", e.target.value);
  };

  const handleAppends = (field, value) => {
    const makeObj = {
      groupIdx: field === "groupIdx" ? value : expense.groupIdx,
      label: field === "label" ? value : expense.label,
      description: field === "description" ? value : expense.description,
      date: field === "date" ? value : expense.date,
      fromTo: field === "fromTo" ? value : expense.fromTo,
      amount: field === "amount" ? value : expense.amount,
    };
    setExpense(makeObj);
  };

  const handleChangeLabel = (e) => {
    e.preventDefault();
    handleAppends("label", e.target.value);
  };
  const handleAmount = (e) => {
    e.preventDefault();
    const amt = e.target.value;
    const regex = /^[0-9-+/*]*$/;
    const data = regex.test(amt);
    if (data) {
      handleAppends("amount", amt);
    }
  };
  function evil(fn) {
    return new Function("return " + fn)();
  }
  const handleCal = (e) => {
    e.preventDefault();
    handleAppends("amount", evil(expense.amount));
  };
  
  const handleChangeGroup = (e)=>{
    e.preventDefault();
    handleAppends('groupIdx',e.target.value);
  }
  const handleSave = (e) => {
    e.preventDefault();
    const idxPaidBy = groupMembers.indexOf(paidBy);
    console.log(idxPaidBy);
    const split = parseInt(expense.amount / groupMembers.length);
    console.log(split);
    const arr = new Array(groupMembers.length).fill(split);
    console.log(arr);
    const ft = [idxPaidBy,arr];
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    addtransaction({
      label: expense.label,
      description: expense.description,
      date: new Date().toLocaleString("en-US",options),
      fromTo: ft,
      amount: parseInt(expense.amount),
    });
    setOpen(false);
    setExpense({
      label: "Food",
      description: "",
      date: "",
      fromTo: [0, []],
      amount: 0,
    })
  };

  console.log(checkAmount);
  console.log(groupMembers);
  return (
    <div>
      <Button
        variant="contained"
        onClick={
          members.length === 0
            ? () => alert("Please select group")
            : handleClickOpen
        }
        className={classes.btn}
        // disabled={members.length>0?false:true}
      >
        +Expense
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ maxHeight: "100%" }}
      >
        <DialogTitle id="form-dialog-title" className={classes.modal_nav}>
          <span>Add Expense</span>
        </DialogTitle>
        <DialogContent
          className={classes.dialog}
          style={{ overflowY: "visible" }}
        >
          <DialogContentText component={'div'}>
            <div className={classes.content_text}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" sx={{ mt: 3 }}>
                  <div className={classes.table_div}>
                    <table className={classes.table}>
                    <tr>
                        <td>Group</td>
                        <td>
                        {group[isId] ? 
                        <TextField
                            required
                            fullWidth
                            name="amount"
                            type="text"
                            value={group[isId].name}
                            InputProps={{ inputProps: { min: 1 } }}
                            id="quantity"
                            variant="outlined"
                            autoComplete="amount"
                          /> : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Label</td>
                        <td>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={expense.label}
                            variant="outlined"
                            onChange={handleChangeLabel}
                            IconComponent={CreateIcon}
                            fullWidth
                          >
                            <MenuItem value={"Food"}>Food</MenuItem>
                            <MenuItem value={"Groccery"}>Groccery</MenuItem>
                            <MenuItem value={"Electric"}>Electric</MenuItem>
                            <MenuItem value={"Trip"}>Trip</MenuItem>
                            <MenuItem value={"Petrol"}>Petrol</MenuItem>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td>Amount</td>
                        <td>
                          <TextField
                            required
                            fullWidth
                            name="amount"
                            type="text"
                            value={expense.amount}
                            onChange={handleAmount}
                            onBlur={handleCal}
                            InputProps={{ inputProps: { min: 1 } }}
                            id="quantity"
                            variant="outlined"
                            autoComplete="amount"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Paid By</td>
                        <td>
                          <Select
                            fullWidth
                            value={paidBy}
                            variant="outlined"
                            onChange={handleChangePaidBy}
                            IconComponent={CreateIcon}
                          >
                            {groupMembers.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item[1]}>
                                  {item[1]}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td>Split</td>
                        <td>
                          Equally
                          {/* <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={split}
                            variant="outlined"
                            onChange={handleChangeCal}
                            IconComponent={CreateIcon}
                          >
                            <MenuItem value={"equal"}>EQUAL</MenuItem>
                            <MenuItem value={"unequal"}>UNEQUAL</MenuItem>
                            <MenuItem value={"percentage"}>PERCENTAGE</MenuItem>
                          </Select> */}
                        </td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>
                          <TextField
                            className={classes.Textfield}
                            required
                            fullWidth
                            id="description"
                            name="description"
                            value={expense.description}
                            type="text"
                            variant="outlined"
                            autoComplete="description"
                            onChange={handleDescription}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Box>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modal_nav}>
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
