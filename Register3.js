import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '', Email: '', Tel: '', Address: '', Password: '', numCostumer: '', fields: {},
      errors: {}
    }
    this.checkExsitsCustomer = this.checkExsitsCustomer.bind(this);
    this.numCostumer = localStorage.getItem('localNumCostumer');


  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "האימייל לא יכול להישאר ריק";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "האימייל אינו תקין";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      alert("Form submitted");
    } else {
      alert("Form has errors.")
    }

  }


  handleChange(field, e) {
    let fields = this.state.fields;
    let Email = e.target.value;
    fields[field] = e.target.value;
    this.setState({ fields, Email });
  }




  checkExsitsCustomer() {

    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/Getmail?Email=' + this.state.Email)

        .then(response => response.json())
        .then(data => {
          this.setState({
            numCostumer: data,
          })
          if (this.state.numCostumer > 0) {
            return swal('הלקוח כבר קיים במערכת')
          }
        })
        .catch(error => this.setState({ error: "There was an error by doing login" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Getmail?Email=' + this.state.Email)

        .then(response => response.json())
        .then(data => {
          this.setState({
            numCostumer: data,
          })
          if (this.state.numCostumer > 0) {
            return swal('הלקוח כבר קיים במערכת')
          }
        })
        .catch(error => this.setState({ error: "There was an error by doing login" }));
    }
  }



  SignOut() {
    localStorage.setItem('localNumCostumer', 0)
    swal('התנתקת מהמערכת')
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.handleValidation()) {
      if (window.location.hostname === "localhost") {
        fetch('http://localhost:49934/api/Getmail?Email=' + this.state.Email)

          .then(response => response.json())
          .then(data => {
            this.setState({
              numCostumer: data,
            })

            if (this.state.numCostumer > 0 && localStorage.getItem('localNumCostumer') > 0) {

              const url = 'http://localhost:49934/api/UpdateCustomerClient'

              const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email, Password: this.state.Password }

              fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
              })
                .then(response => {
                  swal("הפרטים עודכנו בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
            }
            else if (this.state.numCostumer > 0) {
              return swal('הינך קיים במערכת, אנא התחבר בכדי לעדכן פרטים')
            }
            else {

              const url = 'http://localhost:49934/api/Register'

              const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email, Password: this.state.Password }

              fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
              })
                .then(response => {
                  swal("נירשמת בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
            }
          })
          .catch(error => this.setState({ error: "There was an error by doing login" }));
      }
      else {
        fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Getmail?Email=' + this.state.Email)

          .then(response => response.json())
          .then(data => {
            this.setState({
              numCostumer: data,
            })

            if (this.state.numCostumer > 0 && localStorage.getItem('localNumCostumer') > 0) {

              const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/UpdateCustomerClient'

              const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email, Password: this.state.Password }

              fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
              })
                .then(response => {
                  swal("הפרטים עודכנו בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
            }
            else if (this.state.numCostumer > 0) {
              return swal('הינך קיים במערכת, אנא התחבר בכדי לעדכן פרטים')
            }
            else {

              const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Register'

              const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email, Password: this.state.Password }

              fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
              })
                .then(response => {
                  swal("נירשמת בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
            }
          })
          .catch(error => this.setState({ error: "There was an error by doing login" }));
      }
    }
    else {
      return null;
    }
  }



  render() {
    return (
      <div className="register" style={{ backgroundColor: "white", opacity: "0.92" }}>
        <MuiThemeProvider>
          <div>
            {localStorage.getItem('localNumCostumer') > 0 ?
              <AppBar style={{ backgroundColor: "#6e1534" }}
                title=" עדכון פרטים"
                color="red"

              /> : <AppBar style={{ backgroundColor: "#6e1534" }}
                title="הרשמה"
                color="red"
              />}
            <TextField

              hintText="הכנס שם מלא"
              floatingLabelText="*שם מלא"
              onChange={(event, newValue) => this.setState({ Name: newValue })}


            />
            <br />
            <TextField
              hintText="הכנס מספר טלפון"
              floatingLabelText="*טלפון"
              onChange={(event, newValue) => this.setState({ Tel: newValue })}
            />
            <br />
            <TextField
              type="email"
              hintText="הכנס אימייל"
              type="email"
              floatingLabelText="*אימייל"
              onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
              required
            />
            <br />
            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            <br />
            <br />
            <TextField
              type="password"
              hintText="הכנס סיסמא"
              floatingLabelText="*סיסמא"
              onChange={(event, newValue) => this.setState({ Password: newValue })}
            />
            <br />
            {/*}   <RaisedButton label="הרשמה / עדכון" primary={true} style={style}  onClick={(event) => this.handleSubmit(event)}/>*/}
            <br />

            {this.state.Name !== '' && this.state.Email !== '' && this.state.Tel !== '' && this.state.Password !== '' ?
              <Button style={{ backgroundColor: "#6e1534", color: "white" }} primary={true} onClick={(event) => this.handleSubmit(event)}> אישור</Button>
              : <Button variant="contained" disabled>אישור</Button>
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;