import React from 'react';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import './AddFriend.css';

export default function AddFriend({group,members}) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState('');
    const [chipData, setChipData] = React.useState([
    ]);
    const handleAddFriend =(e)=>{
      e.preventDefault();
      setData(e.target.value);
    }
    const handleAdd = (e)=>{
      e.preventDefault();
      if(chipData.includes(data)){
        return
      }
      setChipData([...chipData,data])
      setData('');
    }
    const handleDelete = (chipToDelete) => () => {
      setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleSave = () => {
      members(chipData);
      setChipData([]);
      setOpen(false);
    };

    const handleClose=()=>{
      setOpen(false);
    }

  return (
    <div>
        <Button onClick={handleClickOpen} style={{color:'white'}}>add+</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="modal_nav nav__text">Add Friend</DialogTitle>
        <DialogContent style={{width:'30rem'}}>
            <DialogContentText>
                <div className="content_text">
                    <div>
                        <span classname="group_title"> Group name&emsp;</span><span className="group_name">{group.name}</span>
                    </div> 
                </div>
                <div className="add_root">
                    <Paper className="paper_chip">
                        {chipData.map((data,index) => {

                          return (
                            <span key={index}>
                              <Chip
                                // icon={icon}
                                style={{backgroundColor:'#039be5',color:'white'}}
                                label={data}
                                onDelete={handleDelete(data)}
                                className="chip"
                              />
                            </span>
                          );
                        })}
                      </Paper>
                    </div>
                <div className="content_text">
                        <PersonAddIcon/>
                        <TextField
                        fullWidth
                        name="member"
                        value={data}
                        onChange={handleAddFriend}
                        margin="dense"
                        id="name"
                        placeholder = "Enter a email you want to add"
                        type="text"
                        textalign="center"
                        />
                        <AddCircleOutlineIcon className="add" onClick={handleAdd}/>
                    </div>
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
