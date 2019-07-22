import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';

class Contact2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: '', Email: '', Tel: '', Message: '', succsess: '', fields: {},
      errors: {}

    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["Email"]) {
      formIsValid = false;
      errors["Email"] = "האימייל לא יכול להישאר ריק";
    }

    if (typeof fields["Email"] !== "undefined") {
      let lastAtPos = fields["Email"].lastIndexOf('@');
      let lastDotPos = fields["Email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["Email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["Email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["Email"] = "האימייל אינו תקין";
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


  SendMail(Name, Tel, Email, Message) {
    // alert(Name)
    // alert(Tel)
    // alert(Email)
    // alert(Message)
    if (this.handleValidation()) {
      if (window.location.hostname === "localhost") {
        fetch('http://localhost:49934/api/SendMail?Name=' + Name + '&Tel=' + Tel + '&Email=' + Email + '&Message=' + Message)
          .then(response => response.json())
          .then(data => {
            this.setState({
              succsess: data,
            })
            if (this.state.succsess == 1) {

              swal('תודה שיצרת איתנו קשר! ההודעה נשלחה')
            }
            else {
              return swal('קרתה תקלה בעת שליחת ההודעה, אנא נסה שנית מאוחר יותר')
            }
          })
          .catch(error => this.setState({ error: "There was an error by doing sending mail" }));
      }
      else {
        fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/SendMail?Name=' + Name + '&Tel=' + Tel + '&Email=' + Email + '&Message=' + Message)
          .then(response => response.json())
          .then(data => {
            this.setState({
              succsess: data,
            })
            if (this.state.succsess == 1) {

              swal('תודה שיצרת איתנו קשר! ההודעה נשלחה')
            }
            else {
              return swal('קרתה תקלה בעת שליחת ההודעה, אנא נסה שנית מאוחר יותר')
            }
          })
          .catch(error => this.setState({ error: "There was an error by doing sending mail" }));
      }
    }
    else {
      return null;
    }

  }




  handleSubmit = event => {
    event.preventDefault();
  }



  render() {
    return (
      <div className="contact" style={{ backgroundColor: "white", opacity: "0.92" }}>
        <MuiThemeProvider>
          <div>
            <AppBar style={{ backgroundColor: "#6e1534" }}
              title="צור קשר"
            />
            <labal >חנות מסגרות</labal>
            <br></br>
            <labal> סוקולוב 57 הרצליה</labal>
            <br></br>
            <labal >09-9503512</labal>
            <br></br>
            <labal >framestoreherzliya@gmail.com</labal>
            <br></br>
            <hr></hr>
            <form onSubmit={this.contactSubmit.bind(this)}>
              <TextField
                hintText="הכנס שם מלא"
                floatingLabelText="שם מלא"
                onChange={(event, newValue) => this.setState({ Name: newValue })}
                required
              />
              <br />
              <TextField
                hintText="הכנס מספר טלפון"
                floatingLabelText="טלפון"
                onChange={(event, newValue) => this.setState({ Tel: newValue })}
                required
              />
              <br />
              <TextField
                hintText="הכנס אימייל"
                type="email"
                floatingLabelText="אימייל"
                onChange={this.handleChange.bind(this, "Email")} value={this.state.fields["Email"]}
                required
              />
              <br />
              <span style={{ color: "red" }}>{this.state.errors["Email"]}</span>
              <br />
              <TextField
                hintText="הודעה"
                floatingLabelText="הודעה"
                name="Message"
                type="message"
                onChange={(event, newValue) => this.setState({ Message: newValue })}
                id="outlined-bare"
                margin="normal"
                variant="outlined"
                value={this.state.Message}
                required
              />
              <br /><br />
              <Button style={{ backgroundColor: "#6e1534", color: "white" }} primary={true} onClick={() => this.SendMail(this.state.Name, this.state.Tel, this.state.Email, this.state.Message)}>שלח הודעה</Button>

              {/*}           <RaisedButton label="שלח הודעה" primary={true} style={style} onClick={() => this.SendMail(this.state.Name,this.state.Tel,this.state.Email, this.state.Message)}/>*/}
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Contact2;