import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import "./AddFriend.css";

export default function AddFriend({ groupMembers ,members}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const friendName = React.useRef("");
  const [error, setError] = React.useState(false);
  const [chipData, setChipData] = React.useState();
  const handleAddFriend = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setError(false);
    if (
      chipData.includes(data.trim()) ||
      data === null ||
      data === "" ||
      data === " "
    ) {
      setError(true);
      setData("");
      return;
    }
    setChipData([...chipData, data.trim()]);
    setData("");
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError(false);
    const friend = friendName.current.value;
    if(members.includes(friend)){
      setError(true);
    }else{
      groupMembers(friend);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setData("");
    setChipData([]);
    setError(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ color: "white" }}>
        add+
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="modal_nav nav__text">
          Add Friend
        </DialogTitle>
        <DialogContent style={{ width: "30rem" }}>
          <DialogContentText component={"div"}>
            <div className="content_text">
              <PersonAddIcon />
              <TextField
                fullWidth
                name="member"
                inputProps={{ref:friendName}}
                margin="dense"
                id="name"
                placeholder="Add name"
                type="text"
                textalign="center"
              />
            </div>
            <div hidden={!error} style={{ color: "red", textAlign: "center" }}>
              <span>User already Exist</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="modal_nav">
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={(e)=>handleSave(e)} color="secondary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
