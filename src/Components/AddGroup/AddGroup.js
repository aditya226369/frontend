import React from 'react';
import {backendurl} from '../../Globals/constants';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import './AddGroup.css';

export default function AddGroup({fetched}) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState('');
    const [name,setName] = React.useState('');
    const [chipData, setChipData] = React.useState([
      {
        name:'with You &',
        id:''
      }
    ]);
    const [error,setError] = React.useState(true);

    const userExist = async(email)=>{
      try{
        const getId = await fetch(backendurl+"/user/check",{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({email})
        })
        const jsonData = await getId.json();
        return jsonData;
      }catch(e){
        console.log(e);
        return false;
      }
    }
    const addGroupToDb=async(name,fetched,members)=>{
      try{
        const request = await fetch(backendurl+"/group",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({name:name,id:fetched._id,members:members})
        })
        if(request.status !==200){
          return false;
        }else{
          const jsonResponse = await request.json();
          return jsonResponse;
        }
      }catch(e){
        console.log(e);
        return false;
      }
    }

    const handleGroupNameChange=(e)=>{
      e.preventDefault();
      setName(e.target.value);
    }
    const handleAddMembersChange =(e)=>{
      e.preventDefault();
      const data = e.target.value;
      if(data!==null || data!=='' || data!==' '){
        setData(e.target.value);
      }
    }
    const handleAdd = async(e)=>{
      e.preventDefault();
      setError(true);
      if(chipData.includes(data) || data===null || data==='' || data===' '){
        setError(false);
        return
      }
      const check = await userExist(data);
      if(check && check._id!==fetched._id ){
        const obj = {name:check.name,uid:check._id}
        setChipData([...chipData,obj])
      }
      setData('')
    }
    const handleDelete = (chipToDelete) => () => {
      let chips = chipData;
      chips.splice(chipToDelete,1);
      setChipData(chips);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const handleSave = async() =>{
      let chips = chipData;
      chips = chips.splice(1);
      let memberIdArray = [];
      for(let i=0;i<chips.length;i++){
        memberIdArray.push(chips[i].uid);
      }
      await addGroupToDb(name,fetched,memberIdArray)
      window.location.reload(false);
      setOpen(false);
    }

  return (
    <div>
        <Button onClick={handleClickOpen} style={{color:'white'}}>add+</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="modal_nav nav__text">Create Group</DialogTitle>
        <DialogContent style={{width:"30rem"}}>
            <DialogContentText component={'div'}>
            <form>
                    <div className="addgroup_group">
                    <GroupIcon/>
                        <TextField
                        fullWidth
                        required
                        autoFocus
                        name="name"
                        value={name}
                        margin="dense"
                        id="name"
                        type="text"
                        onChange={handleGroupNameChange}
                        placeholder="Group name"
                        />
                    </div>
                    <div className="add_root">
                    <Paper className="paper_chip">
                        {chipData.map((item,index) => {

                          return (
                            <span key={index}>
                              <Chip
                                // icon={icon}
                                style={{backgroundColor:'#F64C71',color:'white'}}
                                label={item.name}
                                onDelete={handleDelete(index)}
                                className="chip"
                              />
                            </span>
                          );
                        })}
                      </Paper>
                    </div>
                    <div className="addgroup_group">
                        <PersonAddIcon/>
                        <TextField
                        fullWidth
                        name="member"
                        margin="dense"
                        value={data}
                        id="name"
                        placeholder = "Enter a email you want to add"
                        type="text"
                        onChange={handleAddMembersChange}
                        />
                        <AddCircleOutlineIcon className="add" onClick={handleAdd}/>
                    </div>
              <div style={{textAlign:'center'}}><span hidden={error} style={{color:'red'}}>User doesn't exist</span></div>
              </form>
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
