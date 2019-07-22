import React from 'react';
import { TextField, TableSortLabel, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';


class NewCostumer_Test extends React.Component {
    constructor(props) {

        super(props);

        this.state = { Name: '', Email: '', Tel: '', Address: '', Password: '', numCostumer: '' }
        this.checkExsitsCustomer = this.checkExsitsCustomer.bind(this);
        this.numCostumer = localStorage.getItem('localNumCostumer');
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


    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value })

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

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>עדכון / הרשמה</h1>
                <TableSortLabel>שם :</TableSortLabel>
                <TextField name='Name' placeholder="שם " onChange={this.handleChange} required></TextField> <br />
                <TableSortLabel>טלפון :</TableSortLabel>
                <TextField name='Tel' placeholder="טלפון " onChange={this.handleChange} required></TextField> <br />
                <TableSortLabel>כתובת:</TableSortLabel>
                <TextField name='Address' placeholder="כתובת" onChange={this.handleChange} required></TextField> <br />
                <TableSortLabel>אימייל:</TableSortLabel>
                <TextField name='Email' placeholder="Email" onChange={this.handleChange} required></TextField><br />
                <TableSortLabel>סיסמא:</TableSortLabel>
                <TextField name='Password' placeholder="Password" onChange={this.handleChange} required></TextField> <br /> <br />
                <br /><Button type='submit' variant="contained" color="primary" >  עדכן פרטים / הירשם</Button>
                <br></br>
                <br></br>


            </form>)

    }

}


export default NewCostumer_Test;

//     <Button variant="outlined" size="small" color="secondary" onClick={() => this.SignOut()} > התנתק מהמערכת </Button>