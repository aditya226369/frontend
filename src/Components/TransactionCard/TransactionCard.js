import React, { useEffect, useState } from "react";
import classes from "./TransactionCard.module.css";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function TransactionCard({ transaction,groupMembers }) {
  const [data, setData] = useState();
  return (
    <div className={classes.transaction_container}>
      <Table style={{ width: "100%" }}>
        <TableRow className={classes.head}>
            <TableCell>LABEL</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>AMOUNT</TableCell>
            <TableCell>FROM</TableCell>
            <TableCell>TO</TableCell>
            <TableCell>DATE</TableCell>
            {/* <TableCell>UPDATE</TableCell> */}
        </TableRow>
        <TableBody>
          {(transaction.transactions).length > 0 && transaction.transactions.map((item, index) => {
            console.log(item);
            const toArr=[];
            for(let i=0;i<item.fromTo[1].length;i++){
              if(item.fromTo[1][i] >0 ){
                toArr.push(groupMembers[1][i]);
              }
            }
            const strTo = toArr.join(',');
            return (
              <TableRow key={index} className={classes.row}>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.amount}
                </TableCell>
                <TableCell>
                  {groupMembers[1][item.fromTo[0]]}
                </TableCell>
                <TableCell>
                  {strTo}
                </TableCell>
                <TableCell>item.date</TableCell>
                {/* <TableCell>
                  <Button variant="contained" className={classes.updateBtn}>
                    Update
                  </Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default TransactionCard;
