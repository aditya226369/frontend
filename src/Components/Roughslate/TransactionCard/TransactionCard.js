import React from "react";
import classes from "./TransactionCard.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function TransactionCard({ transaction,groupMembers }) {
  return (
    <div className={classes.transaction_container}>
      <Table style={{ width: "100%" }}>
        <TableBody>
        <TableRow className={classes.head}>
            <TableCell>LABEL</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>AMOUNT</TableCell>
            <TableCell>PAID BY</TableCell>
            <TableCell>SHARED BETWEEN</TableCell>
            <TableCell>DATE</TableCell>
        </TableRow>
          {(transaction.transactions).length > 0 && transaction.transactions.map((item, index) => {
            const toArr=[];
            for(let i=0;i<item.fromTo[1].length;i++){
              if(item.fromTo[1][i] >0 ){
                toArr.push(groupMembers[i]);
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
                  {groupMembers[item.fromTo[0]]}
                </TableCell>
                <TableCell>
                  {strTo}
                </TableCell>
                <TableCell>{item.date}</TableCell>
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
