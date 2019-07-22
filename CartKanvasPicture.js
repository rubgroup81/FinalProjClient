import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';

import './Style.css';
import swal from 'sweetalert';


class CartKanvasPicture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.localId,
            ServiceCode: 5,
            Length_Width: this.props.localLength_Width,
            Makat: this.props.localMakat,
            Price: this.props.localPrice,
            Image: this.props.localImage,
            Description: this.props.localDescription,
        }
    }

    render() {

        return (
            <div className="divCart">

                {this.props.num === 0 ? <h3><u>תמונת קנבס :</u></h3> : <h3><u> {this.state.Id + 1}.  תמונת קנבס:</u></h3>}

                <TableSortLabel> <b> קוד תמונת קנבס:</b></TableSortLabel>
                <TextField value={this.state.Makat} type="number" inputProps={{ min: "1", max: "99" }} name='Makat' disabled></TextField> &nbsp;

                <TableSortLabel> <b>שם התמונה:</b></TableSortLabel>
                <TextField value={this.state.Description} inputProps={{ min: "1", max: "200" }} name='Description' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel> <b> אורך ורוחב התמונה:</b></TableSortLabel>
                <TextField value={this.state.Length_Width} inputProps={{ min: "10", max: "200" }} name='Length_Width' disabled></TextField> &nbsp;&nbsp;&nbsp;
               
                <br></br><br></br>
                {this.props.serviceInOrder === 1 ? '' :
                    <img src={"http://proj.ruppin.ac.il/bgroup81/test2/bar_images/" + this.state.Image} width="100" height="100"></img>
                }
                <br /> <br />

                <TableSortLabel><b>מחיר:</b></TableSortLabel>
                <TextField placeholder="מחיר" name="Price" type="number" value={this.state.Price} inputProps={{ min: "1", max: "999" }} disabled></TextField> <br /> <br />

            </div>
        )
    }
}

export default CartKanvasPicture;
