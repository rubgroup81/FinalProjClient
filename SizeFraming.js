import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox, Slide } from '@material-ui/core';
import './Style.css';
import 'rc-slider/assets/index.css';


class SizeFraming extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Height: '',
            Width: '',
            nameService: this.props.nameSer,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

        this.props.sendDataHeight(event.target.value);//send val Height     
    }

    handleChange1(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.sendDataWidth(event.target.value);//send val width     
    }

    render() {

        return (
            <div className="stepOneFrame">
                <TableSortLabel><b> הזן את מידות ה{this.state.nameService} שברצונך למסגר:</b></TableSortLabel><br /><br />
                <TableSortLabel> <b> אורך {this.state.nameService}:</b></TableSortLabel>
                <TextField type="number"
                    className="text-field-amount"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                    }}
                    placeholder="ס''מ"
                    min={0}
                    name='Height'
                    onChange={this.handleChange}
                    inputProps={{ min: "20", max: "200", step: "1" }}
                    required
                />
                &nbsp;&nbsp;
               <TableSortLabel><b>רוחב {this.state.nameService}:</b></TableSortLabel>
                <TextField type="number"
                    className="text-field-amount"
                    name="Width"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                    }}
                    placeholder="ס''מ"
                    min={0}
                    onChange={this.handleChange1}
                    inputProps={{ min: "20", max: "200", step: "1" }}
                    required
                />
                <br /><br />
            </div>
        )
    }
}
export default SizeFraming;
