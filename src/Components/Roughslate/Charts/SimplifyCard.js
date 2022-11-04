import React from "react";
import classes from "./SimplifyCard.module.css";
function SimplifyCard({ groupMembers, transaction }) {
    console.log(transaction.simplified);
    console.log(groupMembers);
  return (
    <>
      <div className={classes.board_title}>
        <span>Simplified Board</span>
      </div>
      <div className={classes.board_content}>
        {groupMembers &&
          transaction &&
          transaction.simplified !==0 ? (transaction.simplified.map((item, index) => {
            const isGroup = item[0] === null ? true : false;
            const flag = item[2] > 0 ? true : false;
            return (
              <div className={classes.board_item} key={index}>
                {isGroup ? (
                  <span key={index}>Please choose a group</span>
                ) : (
                  <span key={index}>
                    {(groupMembers[1][parseInt(item[0])][1]) }
                    {` gives `}
                    {groupMembers[1][parseInt(item[1])][1]}
                    {" Rs."}
                    {Math.abs(item[2])}
                  </span>
                )}
              </div>
            );
          })):"Please add transaction"}
      </div>
    </>
  );
}

export default SimplifyCard;
