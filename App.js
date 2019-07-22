import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import RouteButton from './RouteButton'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import WizFramingPic from './WizFramingPic';
import WizFramingMirror from './WizFramingMirror';
import Dashboard from './Dashboard';
import ShoppingCart from './ShoppingCart';
import './Style.css';
import MenuPopupState from './MenuPopupState';
import swal from 'sweetalert';
import Kanvas_Test from './Kanvas_Test';
import MyOrders from './MyOrders';
import NewCostumer_Test from './NewCostumer_Test';
import Login3 from './Login3';
import Register3 from './Register3';
import Contact3 from './Contact3';
import CutMirrorGlass from './CutMirrorGlass.js';
import ServicesInOrder from './ServicesInOrder.js';



const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',

  },
  appBar: {
    position: 'relative',
  },
  footer: {
    padding: theme.spacing.unit * 6,
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

});

class App extends Component {
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  SignOut() {
    localStorage.setItem('localNumCostumer', 0)
    swal('התנתקת מהמערכת')
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
  }



  render() {
    const { value } = this.state;
    return (

      <Router >

        <div className={styles.root} >
          <div>

            <AppBar style={{ backgroundColor: "#2e1534" }} position="static">
              <Toolbar variant="dense">

                <Typography variant="h6" color="inherit">
                  <MenuPopupState></MenuPopupState>
                  <RouteButton value='דף הבית' pathname='/Dashboard' />&nbsp;
                  <RouteButton value='מסגור תמונה' pathname='/WizFramingPic' />&nbsp;
                  <RouteButton value='מסגור מראה' pathname='/WizFramingMirror' />&nbsp;
                  <RouteButton value='חיתוך זכוכית ומראה' pathname='/CutMirrorGlass' />&nbsp;
                  <RouteButton value='תמונות קנבס' pathname='/Kanvas_Test' />&nbsp;
                  <RouteButton value='סל קניות' pathname='/ShoppingCart' />&nbsp;
                  <RouteButton value='ההזמנות שלי' pathname='/MyOrders' />&nbsp;
                  <RouteButton value='אזור אישי' pathname='/Register3' />&nbsp;
                  <RouteButton value='צור קשר' pathname='/Contact3' />&nbsp;
                  {localStorage.getItem('localNumCostumer') > 0 ?
                    <Button style={{ backgroundColor: "#9e1534" }} variant="contained" size="small" color="secondary" onClick={() => this.SignOut()} > התנתק </Button>
                    : <Button style={{ backgroundColor: "#6e1534" }} variant="contained" color="secondary" component={Link} to="./Login3">התחבר</Button>}

                </Typography>

              </Toolbar>
            </AppBar>
          </div>
          <Route path="/" component={Dashboard} exact />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/WizFramingPic" component={WizFramingPic} />
          <Route path="/WizFramingMirror" component={WizFramingMirror} />
          <Route path="/ShoppingCart" component={ShoppingCart} />
          <Route path="/MenuPopupState" component={MenuPopupState} />
          <Route path="/Kanvas_Test" component={Kanvas_Test} />
          <Route path="/MyOrders" component={MyOrders} />
          <Route path="/Login3" component={Login3} />
          <Route path="/Register3" component={Register3} />
          {/*}  <Route path="/NewCostumer_Test" component={NewCostumer_Test} />*/}_
          <Route path="/CutMirrorGlass" component={CutMirrorGlass} />
          <Route path="/Contact3" component={Contact3} />

          <Route path="/ServicesInOrder/:id" component={ServicesInOrder} />

        </div>

        <div id="page-container"></div>

        <div id='divFooter'>

          {/* Footer */}

          {/* className="footer" */}
          <footer className="footer">
            {/* style={{ backgroundColor: "#8d143031"}} */}
            <Typography variant="h6" align="center" gutterBottom>
              אבי רוקשין - מסגור, מראות ותמונות
            </Typography>
            <Typography variant="subtitle1" align="center" style={{ backgroundColor: "#8d143031" }} component="p">
              סוקולוב 57 הרצליה , טל' 09-9503512
            </Typography>
          </footer>
          {/* End footer */}
        </div>

      </Router>
    );
  }
}

export default App;

