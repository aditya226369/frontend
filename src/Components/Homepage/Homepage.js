import React from "react";
import { useNavigate } from "react-router-dom";
import {url} from '../../Globals/constants';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Logo from "../../Img/while_black.png";
import image1 from "../../Img/talk-to-experts-graphic.svg";
import slate from "../../Img/math.png";
import compatibility from "../../Img/web-design.png";
import uniformity from "../../Img/unifmrity.png";
import transaction from "../../Img/digital-wallet.png";
import classes from "./Homepage.module.css";
import hearticon from "../../Img/heart.png";


const Homepage = () => {
  let navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function changeRoutes(){
    navigate("/login");
  }

  return (
    <div className={classes.HomeContainer}>
      <AppBar id={classes.appbar}>
        <Toolbar className={classes.nav}>
          <img className={classes.logo_img} src={Logo} alt="logo" />
          <Button id={classes.nav_btn} variant="contained" onClick={changeRoutes}>Login / Signin</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <div className={classes.headercontainer}>
          <div className={classes.headercontainer_item1}>
            <div className={classes.mainHeading}>
              Less Stress When Sharing Expenses
              <p>
                <span className={classes.mainHeading_text}> With Anyone</span>
              </p>
            </div>
            <div>
              <Button id={classes.roughslatebutton} variant="contained" onClick={()=>navigate("/roughslate")}>
                ROUGH SLATE
              </Button>
            </div>
          </div>
          <div className={classes.headercontainer_item2}>
            <img src={image1} alt="" />
          </div>
        </div>
        <div className={classes.section_main}>
          <div className={classes.section_container}>
            <div className={classes.section_title}>
              <span>Features</span>
            </div>
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.cardContainer}>
            <div className={classes.box}>
              <img src={slate} className={classes.slate_img} alt="slate" />
              <div className={classes.box_title}>
                <span>Rough slate</span>
              </div>
              <div className={classes.box_para}>
                <span>Do the split without making the groups</span>
              </div>
            </div>
            <div className={classes.box}>
              <img
                src={compatibility}
                className={classes.slate_img}
                alt="compactibility"
              />
              <div className={classes.box_title}>
                <span>Compactibility</span>
              </div>
              <div className={classes.box_para}>
                <span>Compactible with all Devices</span>
              </div>
            </div>
            <div className={classes.box}>
              <img
                src={uniformity}
                className={classes.slate_img}
                alt="uniformity"
              />
              <div className={classes.box_title}>
                <span>Uniformity</span>
              </div>
              <div className={classes.box_para}>
                <span>We are uniform throught your journey</span>
              </div>
            </div>
            <div className={classes.box}>
              <img
                src={transaction}
                className={classes.slate_img}
                alt="minimal-transactions"
              />
              <div className={classes.box_title}>
                <span>Minimal Transactions</span>
              </div>
              <div className={classes.box_para}>
                <span>We can minimize your transactions</span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.faq}>
          <div className={classes.faq_title}>
            <span>Frequently Asked Questions</span>
          </div>
          <div>
            <Accordion
              className={classes.accordion}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                className={classes.panel}
              >
                <Typography className={classes.heading}></Typography>
                <Typography className={classes.secondaryHeading}>
                  How do I use BillSplit?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordion_summary}>
                <Typography>
                  BillSplit is an app for splitting expenses with your friends.
                  It lets you and your friends add various bills and keep track
                  of who owes who, and then it helps you to settle up with each
                  other. \nHere's a quick overview of how it works.\nFirst, sign
                  up for an account!\nNext, create a group. \nOnce you've
                  created your group, you and your friends can all start adding
                  expenses! Go to your group, then hit the 'Add bill' button.
                  You'll be asked for various details about your expense, like
                  the total cost, who paid, and how much each person should owe.
                  As soon as you hit 'Save', BillSplit will update everyone's
                  balances to keep track of how much each person owes.
                  Later,
                  after you've added a bunch of expenses, you'll probably want
                  to settle up with your friends. Just hit the 'Settle up'
                  button to pay back your friend. You can record a cash payment
                  (e.g. you just handed your friend some cash.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className={classes.accordion}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                className={classes.panel}
              >
                <Typography className={classes.heading}></Typography>
                <Typography className={classes.secondaryHeading}>
                How do I join an existing group?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordion_summary}>
                <Typography>
                  You are not able to join by yourself. Somone from the group can add you in group.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className={classes.accordion}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                className={classes.panel}
              >
                <div className={classes.secondaryHeading}>
                What does the 'simplify debts' setting do?
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.accordion_summary}>
                <Typography>
                  It minimizes the transactions connections so that minimum transactions can happen.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className={classes.Aboutus}>
          <span className={classes.about_title}>About Us</span>
          <div className={classes.about_content}>
            <p>
              BillSplit is a financial application that makes it easy to split
              bills with friends and family. We organize all your shared
              expenses in one place, so that everyone can see who they owe.
              Whether you are sharing a ski vacation, splitting rent with
              roommates, or paying someone back for lunch, BillSplit makes life
              easier. We store your data in the cloud so that you can access it
              anywhere: on iPhone, Android, or on your computer. We focus on
              fairness: Most people want to be fair to each other, but sometimes
              they forget, or can’t decide on what fair is. In addition to
              helping people honor their debts, we provide mediation advice
              about fairness issues through our “fairness calculators.” These
              calculators turn our crowdsourced data into a neutral fairness
              opinion about your personal situation.
            </p>
          </div>
        </div>
        <footer className={classes.footer}>
          <h3>
            Made with{" "}
            <img
              src={hearticon}
              className={classes.footer_img}
              alt="hearticon"
            />{" "}
            in INDIA
          </h3>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
