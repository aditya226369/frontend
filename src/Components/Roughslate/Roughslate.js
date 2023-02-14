import React, { useEffect } from "react";
import clsx from "clsx";
import {backendurl} from '../../Globals/constants';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TransactionCard from "./TransactionCard/TransactionCard";
import SimplifyCard from "./Charts/SimplifyCard";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import "../../Styles/Color.css";
import "./Roughslate.css";
import Logo from "../../Img/black_white_logo.png";
import AddExpense from "./AddExpense/AddExpense";
import SettleUp from "./SettleUp/SettleUp";
import Money from "../../Img/money.png";
import Rupees from "../../Img/rupee.svg";
import AmountCard from "../AmountCard/AmountCard";
import GetBack from "../../Img/getBack.png";
import Give from "../../Img/donation.png";
import AddFriend from "./AddFriend/AddFriend";

const drawerWidth = 250;
const mobiledrawerWidth = "100%";
const main_primary = "#0277bd";
const main_secondary = "#039be5";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // background:`linear-gradient(90deg,white 0%, lightBlue 100%)`,
    height: "100vh",
  },
  logo: {
    width: "200px",
  },
  sideLogo: {
    width: "170px",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: "none",
    "@media (max-width: 500px)": {
      width: mobiledrawerWidth,
    },
  },
  drawerHeader: {
    position: "sticky",
    top: "0",
    overflow: "hidden",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: "0px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    backgroundColor: main_primary,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "700",
    color: "#616161",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  transaction_btn: {
    textAlign: "left",
    width: "100%",
    backgroundColor: main_secondary,
    color: "white",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: main_primary,
      color: "white",
      borderRadius: "0px",
      transitionDuration: "0.5s",
    },
  },
  drawer_footer_btn: {
    backgroundColor: main_secondary,
    color: "white",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: main_primary,
      color: "white",
      borderRadius: "0px",
      transitionDuration: "0.5s",
    },
    "@media (max-width:500px)": {
      justifyContent: "left",
    },
  },
}));

export default function Roughslate() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [groupMembers, setGroupMembers] = React.useState([]);
  const [id, setId] = React.useState(0);
  const [transaction, setTransaction] = React.useState({
    simplified: 0,
    showAmount: 0,
    transactions: [],
  });
  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = (panel) => {
    if (expanded === panel) setExpanded(false);
    if (expanded !== panel) setExpanded(panel);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // setExpanded("panel4");


  }, []);

  const deleteMembers = (text,idx) => {
    if(transaction.showAmount[0][idx][0] === 0 && transaction.showAmount[0][idx][1] === 0){
      const newMembers = groupMembers.filter((item) => item !== text);
      setGroupMembers(newMembers);
    }else{
      const name = (groupMembers[idx] === groupMembers[id]) ? "You" : groupMembers[idx];
      alert(name+" are involved in the transaction...please settleUp to leave");
    }
  };

  const addMembers = (arr) => {
    const newmembers = [...groupMembers, arr.toUpperCase()];
    setGroupMembers(newmembers);
  };

  const getSimplified = async(fromTo,showamount,simplified,amount)=>{
    const res = await fetch(`${backendurl}/simplify`,{
      method: "POST",
      headers :{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fromTo:fromTo,showAmount:showamount,simplified:simplified,amount:amount})
    });
    const data = await res.json();
    return data;
  };

  const addtransaction = async({ label, description, date, fromTo, amount }) => {
    let showamount = transaction.showAmount === 0 ? (new Array(groupMembers.length).fill(new Array(2).fill(0))) : (transaction.showAmount);
    const append = [...transaction.transactions,{ label, description, date, fromTo, amount }];
    const arr = await getSimplified(fromTo,showamount,transaction.simplified,amount);
    const updateTransaction = await {
      simplified: arr.simplified,
      showAmount: arr.showAmount,
      transactions: append
    };
    setTransaction(updateTransaction);
  };

  const onClickFriend=(idx,e)=>{
    e.preventDefault();
    if(transaction.showAmount === 0){
      alert(`No transaction for ${groupMembers[idx]}`);
    }else if(transaction.showAmount[idx] === undefined){
      alert(`No transaction for ${groupMembers[idx]}`);
    }else{
      setId(idx);
    }
  }

  const settleup = ({from,to,amount})=>{
    let sa = transaction.showAmount;
    let simple = transaction.simplified;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: main_primary }}
      >
        <Toolbar className="navbar">
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className="logo_img">
            {!open && <img className={classes.logo} src={Logo} alt="logo" />}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose} color="inherit">
              {theme.direction === "ltr" ? <MenuIcon /> : <ChevronRightIcon />}
            </IconButton>
            <div>
              <img src={Logo} alt="logo" className={classes.sideLogo} />
            </div>
          </div>
          <div className="drawer_collection">
            <div>Friends</div>
            <div className="drawer_add" style={{ cursor: "pointer" }}>
              <AddFriend groupMembers={addMembers} members={groupMembers}/>
            </div>
          </div>
          <List>
            {groupMembers?.map((text, index) => (
              <ListItem key={index} onClick={(e) => onClickFriend(index,e)} className={index===id?"greybackground":"normal"}>
                <ListItemIcon>
                  <PersonRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
                <CancelOutlinedIcon
                  onClick={() => deleteMembers(text,index)}
                  style={{ cursor: "pointer" }}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <Divider />
      </Drawer>
      <main
        container
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className="grid_container">
          <div container className="display_statistic_chart">
            <div className="item_card" onClick={() => handleClick("panel1")}>
              <AmountCard
                color="#D32F2F"
                icon1={Money}
                icon2={Rupees}
                title="Total"
                amount={transaction.showAmount === 0 ? '0' :
                  transaction.showAmount[id][0] - transaction.showAmount[id][1] > 0
                    ? "+".concat((transaction.showAmount[id][0] - transaction.showAmount[id][1]).toString())
                    : (transaction.showAmount[id][0] - transaction.showAmount[id][1]).toString()
                }
              />
            </div>
            <div className="item_card" onClick={() => handleClick("panel2")}>
              <AmountCard
                color="success"
                icon1={GetBack}
                icon2={Rupees}
                title="Get Back"
                amount={transaction.showAmount === 0 ? '0' : (transaction.showAmount[id][0]).toString()}
              />
            </div>
            <div className="item_card" onClick={() => handleClick("panel3")}>
              <AmountCard
                color="#D32F2F"
                icon1={Give}
                icon2={Rupees}
                title="Give Back"
                amount={transaction.showAmount === 0 ? '0' : (transaction.showAmount[id][1]).toString()}
              />
            </div>
            <div className="control_btn">
              <div className="inner_box_control_btn">
                <AddExpense
                  className={classes.addexpense}
                  groupMembers={groupMembers}
                  addtransaction={addtransaction}
                />
              </div>
              <div className="inner_box_control_btn ">
                {/* <SettleUp className="settleup" groupMembers={groupMembers} settleup={settleup} transaction={transaction} id={id}/> */}
              </div>
            </div>
          </div>
          <div className="chart">
            <SimplifyCard
              groupMembers={groupMembers}
              transaction={transaction}
            />
          </div>
          <div className="information_card">
            <Accordion
              id="accordion"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                className="accordion_summary"
              >
                <Typography className={classes.heading}>
                  Transactions
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  all transactions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TransactionCard
                  transaction={transaction}
                  groupMembers={groupMembers}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}
