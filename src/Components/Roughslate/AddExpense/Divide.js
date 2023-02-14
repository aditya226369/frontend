import React from 'react'
import { TextField } from "@material-ui/core";
import classes from "./AddExpense.module.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

function Divide({groupMembers,amount,setShareAmount}) {
    let friendlist = [...groupMembers];
    for(let i=0;i<friendlist.length;i++){
      friendlist[i] = {name:groupMembers[i],amt:''};
    }
    const [data, setData] = React.useState({
        total: 0,
        friends: friendlist
      });
      const handleAmount = (e) => {
        const amt = e;
        const regex = /^[0-9]*$/;
        const data = regex.test(amt);
        if (data) {
         return true;
        }
        return false;
      };
      const onChangeHandler = (e, index) => {
        e.preventDefault();
        const value = parseInt(data.friends[index].amt || 0);
        let getUpdatedList = [...data.friends];
        const ip = e.target.value;
        if(handleAmount(ip)){
          getUpdatedList[index].amt = parseInt(e.target.value);
          let newData = {
            total: parseFloat(data.total + parseInt(e.target.value) - value),
            friends: getUpdatedList,
          };
          setData(newData);
          setShareAmount(newData);
        }
      };
      return (
        <div>
        <TableContainer>
        <Table>
        <TableBody>
        {data.friends.map((item,index)=>{
          return (

          <TableRow key={index}>
            <TableCell>
              {item.name}
            </TableCell>
            <TableCell>
            <TextField
                  className={classes.Textfield}
                  required
                  fullWidth
                  id="description"
                  name="description"
                  value={item.amt}
                  type="text"
                  variant="outlined"
                  autoComplete="description"
                  onChange={(e) => onChangeHandler(e, index)}
                />
            </TableCell>
          </TableRow>
          )
        })}
          </TableBody>
        </Table>
          <div style={{textAlign:'center'}}>
            <span>Remaining Amount :{' '}
            {amount - data.total >= 0 ? (
              <span style={{ color: 'green' }}>{amount - data.total}</span>
            ) : (
              <span style={{ color: 'red' }}>{amount - data.total}</span>
            )}{' '}
            from {amount || 0}</span>
          </div>
        </TableContainer>
        </div>
      );
}

export default Divide