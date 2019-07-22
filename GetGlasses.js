import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TableSortLabel } from '@material-ui/core';


class GetGlasses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            glasses: [],
            isLoaded: false,
            error: null,
            //Price: '',
            glassType: '',

            Makat: 1,
        }

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Glasses/' + this.props.picFits)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        glasses: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the glasses" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Glasses/' + this.props.picFits)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        glasses: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the glasses" }));
        }

    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }); //changes the name in the select
        // console.log(event.target.value);
        this.props.sendData(event.target.value);//send object glass
    };


    render() {
        // const { Makat } = this.state;


        if (this.state.glasses.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <p>
                    <TableSortLabel><b>  בחר סוג זכוכית:</b></TableSortLabel>
                    <FormControl>
                        <Select
                            value={this.state.glassType}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'glassType',
                            }} >
                            <MenuItem value="">
                                <em>בחר זכוכית</em>
                            </MenuItem>
                            {this.state.glasses.map(option => (
                                <MenuItem key={option.Makat} value={option}>
                                    {option.Type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </p>



            )
        }

    }
}

export default GetGlasses;

