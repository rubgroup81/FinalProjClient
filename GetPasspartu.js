import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { TextField, InputLabel, TableSortLabel, FormLabel, Button } from '@material-ui/core';

class GetPasspartu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passpartu: [],
            name: '',
            isLoaded: false,
            error: null,
            name: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.props.sendDataMakatPass(33);
        this.props.sendDataPass(0);
    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Paspartu')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        passpartu: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the passparus" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Paspartu')
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    passpartu: data,
                })
            })
            .catch(error => this.setState({ error: "There was an error in getting the passparus" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    handleChange = event => { //width pass
        this.setState({ [event.target.name]: event.target.value });
        this.props.sendDataPass(event.target.value);
    };

    ChoosePass(makatPass, coloPass) {// makat pass
        if (makatPass === 33) {
            this.props.sendDataPass(0);
        }
        this.props.sendDataMakatPass(makatPass);//send Makat pass
        this.props.sendDataColorPass(coloPass);//send color pass      
    }

    render() {
        if (this.state.passpartu.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (

                <div>
                    <br />
                    <div className="Off-White_swatch">
                        <div class="tooltip"><b>בחר פספרטו</b>
                            &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                            <span class="tooltiptext">תוספת רקע מסביב לתמונה</span>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.state.passpartu.map(option => (
                            <Button key={option.Makat} value={option.Makat} onClick={() => this.ChoosePass(option.Makat, option.Color)}>
                                {option.Makat != 33 ? <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + option.Color + ".jpg"} width="30" height="30"></img> : 'ללא'}
                            </Button>
                        ))}
                        <br />
                        <TableSortLabel>רוחב :</TableSortLabel>
                        <TextField type="number"
                            className="text-field-amount"
                            name="Width"
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                            }}
                            placeholder="ס''מ"
                            min={0}
                            onChange={this.handleChange}
                            inputProps={{ min: "0", max: "15", step: "1" }}
                            required
                        />&nbsp;
                        <br /><br />

                    </div>
                </div>
            )
        }
    }
}

export default GetPasspartu;

