import React, { useEffect } from "react";
import {backendurl} from '../../Globals/constants';
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
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
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TransactionCard from "../TransactionCard/TransactionCard";
import SimplifyCard from "../Charts/SimplifyCard";
import AddFriend from "../AddFriend/AddFriend";
import "../../Styles/Color.css";
import "../Dashboard/Dashboard.css";
import Logo from "../../Img/black_white_logo.png";
import AddExpense from "../AddExpense/AddExpense";
import AddGroup from "../AddGroup/AddGroup";
import SettleUp from "../SettleUp/SettleUp";
import Money from "../../Img/money.png";
import Rupees from "../../Img/rupee.svg";
import AmountCard from "../AmountCard/AmountCard";
import GetBack from "../../Img/getBack.png";
import Give from "../../Img/donation.png";

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
    "@media (max-width:500px)": {
      justifyContent: "left",
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

export default function Dashboard() {
  let navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [fetched, setFetched] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [group, setGroup] = React.useState([]);
  const [transaction, setTransaction] = React.useState({
    transactions: [],
    simplified: 0,
    showAmount: [0, 0],
    gid: "",
    _id: "",
  });
  const [show, setShow] = React.useState(false);
  const [groupMembers, setGroupMembers] = React.useState([]);
  const [isId, setId] = React.useState();

  const logoutCall = async () => {
    try {
      const res = await fetch(backendurl+"/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetched),
      });
      if (res.status !== 200) {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  const handleLogout = (e) => {
    logoutCall();
    navigate("/login");
  };

  const getGroupMemberName = async (id) => {
    try {
      const getUser = await fetch(backendurl+"/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (getUser.status === 200) {
        const userData = await getUser.json();
        return userData.name;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const gettingGroupMembersIntoArray = async (groups) => {
    let groupArr = [];
    for (let i = 0; i < groups.length; i++) {
      let arr = [];
      for (let j = 0; j < groups[i].members.length; j++) {
        const getUser = await getGroupMemberName(groups[i].members[j]);
        if (getUser) {
          arr.push([groups[i].members[j], getUser]);
        }
      }
      groupArr.push({
        gid: groups[i]._id,
        name: groups[i].name,
        members: arr,
      });
    }
    setGroup(groupArr);
  };
  const fetchTransactionFromgid = async (gid) => {
    try {
      const getTransaction = await fetch(backendurl+"/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gid: gid }),
      });
      if (getTransaction.status !== 200) {
        return false;
      }
      const response = await getTransaction.json();
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const fetchgroupFromUid = async (data) => {
    try {
      const getGroup = await fetch(backendurl+"/group/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (getGroup.status !== 200) {
        return;
      }
      const response = await getGroup.json();
      await gettingGroupMembersIntoArray(response);
    } catch (e) {
      console.log(e);
    }
  };
  const callDashboardPage = async () => {
    try {
      const res = await fetch(backendurl+"/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) {
        const error = new Error(res.error);
        navigate("/login");
        throw error;
      }
      const data = await res.json();
      setFetched(data);
      await fetchgroupFromUid(data);
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };

  useEffect(() => {
    setExpanded("panel4");
    callDashboardPage();
  }, []);

  // useEffect(()=>{
  //   fetchgroupFromUid(fetched._id)
  // },[state])

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

  const onClickGroupButton = async (idx, e) => {
    setGroupMembers([group[idx], group[idx].members]);
    const res = await fetchTransactionFromgid(group[idx].gid);
    const indexOfUser = group[idx].members[0].indexOf(fetched._id);
    setId(indexOfUser);
    setTransaction({
      transactions: res.transactions,
      simplified: res.simplified,
      showAmount: res.showAmount[indexOfUser],
      gid: res.gid,
      _id: res._id,
    });
    setShow(true);
  };
  

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
          <div className="appbar_profile">
            <span>Welcome&nbsp;&nbsp;</span>
            <span style={{ fontWeight: "bold" }}>{fetched.name}</span>
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
            <div>Groups</div>
            <div className="drawer_add" style={{ cursor: "pointer" }}>
              <AddGroup fetched={fetched} />
            </div>
          </div>
          <List>
            {group.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={(e) => onClickGroupButton(index, e)}
              >
                <ListItemIcon>
                  <PeopleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <div className="drawer_collection">
            <div>Friends</div>
            <div className="drawer_add" style={{ cursor: "pointer" }}>
              {groupMembers[0] ? (
                <AddFriend
                  group={
                    groupMembers[0] ? groupMembers[0] : { name: "Select group" }
                  }
                />
              ) : (
                false
              )}
            </div>
          </div>
          <List>
            {groupMembers &&
              groupMembers.length > 0 &&
              groupMembers[1]?.map((item, index) => (
                <ListItem
                  button
                  key={index}
                >
                  <ListItemIcon>
                    <PersonRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={item[1]} />
                </ListItem>
              ))}
          </List>
        </div>
        <Divider />
        <div>
          <Button
            className={classes.transaction_btn}
            variant="contained"
            fullWidth
            onClick={() => handleClick("panel4")}
          >
            Transactions
          </Button>
        </div>
        <div className="drawer_footer">
          <Button
            className={classes.drawer_footer_btn}
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className="grid_container">
          <div className="display_statistic_chart">
            <div className="item_card" onClick={() => handleClick("panel1")}>
              <AmountCard
                color="#D32F2F"
                icon1={Money}
                icon2={Rupees}
                title="Total"
                amount={
                  transaction.showAmount[0] - transaction.showAmount[1] > 0
                    ? "+".concat(
                        (
                          transaction.showAmount[0] - transaction.showAmount[1]
                        ).toString()
                      )
                    : (
                        transaction.showAmount[0] - transaction.showAmount[1]
                      ).toString()
                }
              />
            </div>
            <div className="item_card">
              <AmountCard
                color="success"
                icon1={GetBack}
                icon2={Rupees}
                title="Get Back"
                amount={transaction.showAmount[0].toString()}
              />
            </div>
            <div className="item_card">
              <AmountCard
                color="#D32F2F"
                icon1={Give}
                icon2={Rupees}
                title="Give Back"
                amount={transaction.showAmount[1].toString()}
              />
            </div>
            <div className="control_btn">
              <div className="inner_box_control_btn">
                <AddExpense
                  className={classes.addexpense}
                  members={groupMembers}
                  groupMembers={groupMembers}
                  transaction={transaction}
                />
              </div>
              <div className="inner_box_control_btn ">
                <SettleUp className="settleup" />
              </div>
            </div>
          </div>
          <div className="chart">
            <SimplifyCard groupMembers={groupMembers} isId={isId} transaction={transaction} />
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
                  {transaction.transactions
                    ? "search bar"
                    : "Please select group"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TransactionCard transaction={transaction} groupMembers={groupMembers} />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}
