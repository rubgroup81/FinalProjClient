import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import RouteButton from './RouteButton';
import Register3 from './Register3';
import Button from '@material-ui/core/Button';


class Login2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      numCostumer: "",
      fields: {},
      errors: {}
    };
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if(!fields["email"]){
       formIsValid = false;
       errors["email"] = "האימייל לא יכול להישאר ריק";
    }

    if(typeof fields["email"] !== "undefined"){
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "האימייל אינו תקין";
        }
   }  

   this.setState({errors: errors});
   return formIsValid;
}

contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
       alert("Form submitted");
    }else{
       alert("Form has errors.")
    }

}


handleChange(field, e){         
  let fields = this.state.fields;
  let email = e.target.value;
  fields[field] = e.target.value;        
  this.setState({fields,email});
}



  handleClick(email, password) {
    if(this.handleValidation())
    {
    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/Costumer?email=' + email + '&password=' + password)
        .then(response => response.json())
        .then(data => {
          this.setState({
            numCostumer: data,
          })
          if (this.state.numCostumer > 0) {
            localStorage.setItem('localNumCostumer', this.state.numCostumer)
            swal('התחברת בהצלחה')


            return setTimeout(function () {
              window.location.reload(1);
            }, 1500);

          }
          else {
            return swal('שם משתמש או סיסמא אינם תקינים')
          }
        })
        .catch(error => this.setState({ error: "There was an error by doing login" }));
    }
    else{
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Costumer?email=' + email + '&password=' + password)
      .then(response => response.json())
      .then(data => {
        this.setState({
          numCostumer: data,
        })
        if (this.state.numCostumer > 0) {
          localStorage.setItem('localNumCostumer', this.state.numCostumer)
          swal('התחברת בהצלחה')


          return setTimeout(function () {
            window.location.reload(1);
          }, 1500);

        }
        else {
          return swal('שם משתמש או סיסמא אינם תקינים')
        }
      })
      .catch(error => this.setState({ error: "There was an error by doing login" }));
    }
  }
  else {
    return null;
  }
  }



  handleSubmit = event => {
    event.preventDefault();
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <div className="login" style={{ backgroundColor: "white", opacity: "0.92" }}>
        <MuiThemeProvider onSubmit={this.handleSubmit}>
          <div>
            <AppBar style={{ backgroundColor: "#6e1534" }}
              title="התחברות"
            />
             <form onSubmit= {this.contactSubmit.bind(this)}>
            <TextField
              hintText="הכנס את האימייל שלך"
              type="email"
              value={this.state.email}
              floatingLabelText="אימייל"
              onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
              required
              />
              <br/>
               <span style={{color: "red"}}>{this.state.errors["email"]}</span>
            <br/>
          
            <br />
            <TextField
              type="password"
              hintText="הכנס את הסיסמא שלך"
              value={this.state.password}
              type="password"
              floatingLabelText="סיסמא"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br /><br /><br />
            <Button block disabled={!this.validateForm()} style={{ backgroundColor: "#6e1534", color: "white" }} primary={true} onClick={() => this.handleClick(this.state.email, this.state.password)}>התחבר</Button>
            </form>
          </div>
          
          <br></br>
          
          <RouteButton value='הרשמה' pathname={"/Register3"} Component={Register3} />
          
        </MuiThemeProvider>
        
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login2;