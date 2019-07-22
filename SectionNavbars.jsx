import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
// core components
import GridContainer from "./Grid/GridContainer.jsx";
import GridItem from "./Grid/GridItem.jsx";
import Header from "./Header/Header.jsx";
import CustomInput from "./CustomInput/CustomInput.jsx";
import CustomDropdown from "./CustomDropdown/CustomDropdown.jsx";
import Button from "./CustomButtons/Button.jsx";

import navbarsStyle from "./navbarsStyle.jsx";

import image from "./img/bg.jpg";
import profileImage from "./img/faces/avatar.jpg";
import './Style.css';

class SectionNavbars extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div id="navbar" className={classes.navbar}>
          <div
            className={classes.navigation}   
          >
            <Header
              brand="Framing Store"
              color="transperant"
              rightLinks={
                <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink + " " + classes.navLinkActive}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      <Explore className={classes.icons} /> Discover
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      <AccountCircle className={classes.icons} /> Profile
                    </Button>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      <Icon className={classes.icons}></Icon> Settings
                    </Button>
                  </ListItem>
                </List>
              }
            />          
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(navbarsStyle)(SectionNavbars);
