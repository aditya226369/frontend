import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import classes from "./AddExpense.module.css";


export default function AddExpense({props,members,roughslate}) {
  const [open, setOpen] = React.useState(false);
  const [split, setSplit] = React.useState({
    "stype": "",
    "members": members
  });
  const [amount, setAmount] = React.useState();
  const [expenseData , setexpenseData]  = useState([{
    "description":"",
    "amount":0,
    "paidby":[],
    "split":[]
  }]);


  const handleChange = (event) => {
    const newname = event.target.value;
    console.log(newname);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setexpenseData({
      "description":"",
      "amount":0,
      "paidby":[],
      "split":[]
    })
    setOpen(false);
  };
  
  const handleAmount = (e)=>{
    e.preventDefault();
    const amt = e.target.value;
    setAmount(amt);
  }
  const handleCal=(e)=>{
    e.preventDefault();
    setAmount(eval(amount));
  }
  const handleChangeCal=(e)=>{
    e.preventDefault();
    const splitType = e.target.value;
    setSplit({
      "stype":splitType,
      "members":members
    });
  }


  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className={classes.btn}
      >
        +Expense
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{maxHeight:"100%"}}
      >
        <DialogTitle id="form-dialog-title" className={classes.modal_nav}>
          <span>Add Expense</span>
        </DialogTitle>
        <DialogContent className={classes.dialog} style={{overflowY:"visible"}}>
          <DialogContentText>
            <div className={classes.content_text}>
            <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2} className={classes.container}>
                  {!roughslate && <Grid item xs={12} sm={12} className={classes.choose_content}>
                    <div className={classes.group_content}>
                    <span>Inside*</span>
                          <Select
                          style={{width:'fit-content'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={expenseData.paidby}
                            onChange={handleChange}
                            variant="outlined"
                            required
                          >
                            <MenuItem value={"id1"}>Group1</MenuItem>
                            <MenuItem value={"id2"}>Group2</MenuItem>
                            <MenuItem value={"id3"}>Group3</MenuItem>
                          </Select>
                    </div>
                  </Grid>}
                    <Grid item xs={12} sm={12} className={classes.image_text}>
                    <TextField
                        required
                        fullWidth
                        id="description"
                        name="description"
                        type="text"
                        label="Description"
                        variant="outlined"
                        autoComplete="description"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.choose_content}>
                    <div className={classes.group_content}>
                      <InputLabel id="demo-simple-select-outlined-label">Label</InputLabel>
                          <Select
                          style={{width:"5rem"}}  labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={expenseData.paidby}
                            label="label"
                            onChange={handleChange}
                          >
                            <MenuItem value={"id1"}>Label1</MenuItem>
                            <MenuItem value={"id2"}>Label2</MenuItem>
                            <MenuItem value={"id3"}>Label2</MenuItem>
                          </Select>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <div className={classes.amount_text}>
                      <TextField
                        required
                        name="amount"
                        label="Amount"
                        type="text"
                        value={amount}
                        onChange={handleAmount}
                        InputProps={{ inputProps: { min: 1 } }}
                        id="quantity"
                        variant="outlined"
                        autoComplete="amount"
                      />
                      <Button variant="contained" onClick={handleCal}>=</Button>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} container className={classes.choose_content}>
                      <div className={classes.paidby_content}>
                          <span>Paid By</span>
                          <Select
                          style={{width:"5rem"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={expenseData.paidby}
                            label="choose"
                            onChange={handleChange}
                          >
                            <MenuItem value={"id1"}>Daman</MenuItem>
                            <MenuItem value={"id2"}>Dipak</MenuItem>
                            <MenuItem value={"id3"}>Durgesh</MenuItem>
                          </Select>
                        </div>
                        <div className={classes.paidby_content}>
                          <span>Split</span>
                          <Select
                          style={{width:"fit-content"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={expenseData.paidby}
                            label="choose"
                            onChange={handleChangeCal}
                          >
                            <MenuItem value={"equal"}>EQUAL</MenuItem>
                            <MenuItem value={"unequal"}>UNEQUAL</MenuItem>
                            <MenuItem value={"percentage"}>PERCENTAGE</MenuItem>
                          </Select>
                        </div>
                    </Grid>
                    {/* unequal block */}
                    {split.stype === "unequal" ? <Grid item xs={12} sm={12} container className={classes.block}>
                      <div style={{width:'100%'}}>
                      <table style={{width:"100%",padding:"1px"}}>
                        {split.members.map((item,index)=>{
                          return(
                            <tr key={index}>
                              <td style={{textAlign:"center"}}>{item}</td>
                              <td style={{textAlign:"center"}}>
                                <span>Rs.<input className={classes.input_amount} type="number" /></span>
                              </td>
                          </tr>
                          )
                        })}
                        </table>
                      </div>
                      <Grid item xs={12} sm={12}>
                        <div style={{textAlign:"center"}}>
                          <p>Rs.total of Rs.amount</p>
                          <p>Rs.left left</p>
                        </div>
                      </Grid>
                    </Grid> : false}
                    {/* ends here */}

                    {/* percentage block */}
                    {split.stype === "percentage" ? <Grid item xs={12} sm={12} container className={classes.block}>
                      <div style={{width:'100%'}}>
                      <table style={{width:"100%",padding:"1px"}}>
                        {split.members[1].map((item,index)=>{
                          return(
                            <tr key={index}>
                              <td style={{textAlign:"center"}}>{item}</td>
                              <td style={{textAlign:"center"}}>
                                <span><input className={classes.input_amount} type="number" />%</span>
                              </td>
                            </tr>
                          )
                        })}
                        </table>
                      </div>
                      <Grid item xs={12} sm={12}>
                        <div style={{textAlign:"center"}}>
                          <p>total % of 100%</p>
                          <p>left% left</p>
                        </div>
                      </Grid>
                    </Grid> : false}
                    {/* ends here */}


                    <Grid>

                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
           </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modal_nav}>
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
