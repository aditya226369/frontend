import React from "react";
import classes from "./SimplifyCard.module.css";
function SimplifyCard({ groupMembers,isId, transaction }) {
    console.log(transaction);
    console.log((transaction.transactions).length);
  return (
    <>
      <div className={classes.board_title}>
        <span>Simplified Board</span>
      </div>
      <div className={classes.board_content}>
        {groupMembers &&
          (transaction.transactions).length>0 &&
          transaction.simplified!==0?transaction.simplified.map((item, index) => {
            const isGroup = item[0] === null ? true : false;
            return (
              <div className={classes.board_item} key={index}>
                {isGroup ? (
                  <span>Please choose a group</span>
                ) : (
                  <span>
                    {item[0] === isId ? " You " : (groupMembers[1][parseInt(item[0])][1]) }
                    {` gives `}
                    {groupMembers[1][parseInt(item[1])][1]}
                    {" Rs."}
                    {Math.abs(item[2])}
                  </span>
                )}
              </div>
            );
          }):"Please add transaction"}
      </div>
    </>
  );
}

export default React.memo(SimplifyCard);
