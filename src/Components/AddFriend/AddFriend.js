import React from 'react';
import {url} from '../../Globals/constants';
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

export default function AddFriend({group}) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(true);
    const [data, setData] = React.useState('');
    const [chipData, setChipData] = React.useState([
    
    ]);


    const userExist = async(email)=>{
      try{
        const getId = await fetch(url+"/user/check",{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({email})
        })
        if(getId.status!==200){
          console.log(getId.status);
          return false;
        }
        const jsonData = await getId.json();
        return jsonData;
      }catch(e){
        console.log(e);
        return false;
      }
    }

    const addGroupToDb=async(gid,members)=>{
      try{
        const request = await fetch(`${url}/group/add`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({gid:gid,members:members})
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

    const handleAddMembersChange =(e)=>{
      e.preventDefault();
      const data = e.target.value;
      if(data!==null || data!=='' || data!==' '){
        setData(e.target.value);
      }
    }

    const handleAdd = async(e)=>{
      setError(true);
      if(chipData.includes(data) || data===null || data==='' || data===' '){
        setError(false);
        return
      }
      const check = await userExist(data);
      console.log(check);
      if(check && !group.members.includes(check._id) ){
        setError(true);
        const obj = {name:check.name,uid:check._id}
        setChipData([...chipData,obj])
      }else{
        console.log("inside");
        setError(false);
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

    const handleSave=async()=>{
      let chips = chipData;
      console.log(group);
      let memberIdArray = [];
      for(let j=0;j<(group.members).length;j++){
        memberIdArray.push(group.members[j][0]);
      }
      for(let i=0;i<chips.length;i++){
        memberIdArray.push(chips[i].uid);
      }
      console.log(memberIdArray);
      await addGroupToDb(group.gid,memberIdArray)
      window.location.reload(false);
      setOpen(false);
    }

  return (
    <div>
         <Button onClick={handleClickOpen} style={{color:'white'}}>add+</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="modal_nav nav__text">Add Friend</DialogTitle>
        <DialogContent style={{width:'30rem'}}>
            <DialogContentText component={'div'}>
                <div className="content_text">
                    <div>
                        <span className="group_title"> Group name&emsp;</span><span className="group_name">{group.name}</span>
                    </div> 
                </div>
                <div className="add_root">
                    <Paper className="paper_chip">
                        {chipData.map((item,index) => {

                          return (
                            <span key={index}>
                              <Chip
                                // icon={icon}
                                style={{backgroundColor:'#039be5',color:'white'}}
                                label={item.name}
                                onDelete={handleDelete(index)}
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
                        onChange={handleAddMembersChange}
                        margin="dense"
                        id="name"
                        placeholder = "Enter a email you want to add"
                        type="text"
                        />
                        <AddCircleOutlineIcon className="add" onClick={handleAdd}/>
                    </div>
                    <div style={{textAlign:'center'}}><span hidden={error} style={{color:'red'}}>User doesn't exist or already exist</span></div>
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
