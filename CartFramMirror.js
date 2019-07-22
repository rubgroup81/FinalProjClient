import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';

import './Style.css';


class CartFramMirror extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.localId,
            ServiceCode: 2,
            Height: this.props.localHeight,
            Width: this.props.localWidth,
            FrameCode: this.props.localframeCode,
            PriceToOne: this.props.localPriceTotal,
            ImageFrame: this.props.localimageFrame,
            MirrorCode: 4,
            Notes: "",

        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(this.state.Notes)
    }

    render() {

        return (
            <div className="divCart">

                {this.props.num === 0 ? <h3><u>מסגור מראה:</u></h3> : <h3><u> {this.state.Id + 1}. מסגור מראה:</u></h3>}

                <TableSortLabel> <b> אורך המראה:</b></TableSortLabel>
                <TextField value={this.state.Height} inputProps={{ min: "10", max: "200" }} id="height" type="number" name='Height' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel><b>רוחב המראה:</b></TableSortLabel>
                <TextField value={this.state.Width} id="width" type="number" inputProps={{ min: "10", max: "200" }} name="Width" disabled></TextField>&nbsp;&nbsp; &nbsp;&nbsp;

                {this.props.serviceInOrder === 1 ? '' :
                    <TableSortLabel><b>מסגרת:</b>&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + this.state.ImageFrame} width="30" height="30"></img>
                    </TableSortLabel>
                }               
                <br />  <br />


                <TableSortLabel><b>מחיר (ש"ח):</b></TableSortLabel>
                <TextField placeholder="מחיר" name="PriceToOne" type="number" inputProps={{ min: "10", max: "9999" }} value={this.state.PriceToOne} disabled></TextField> <br /> <br />
                <TableSortLabel ><b>הערות:</b></TableSortLabel>
                <TextField
                    name="Notes"
                    onChange={this.handleChange}
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"
                    value={this.props.Notes}
                />
                <br />
            </div>
        )
    }
}

export default CartFramMirror;
