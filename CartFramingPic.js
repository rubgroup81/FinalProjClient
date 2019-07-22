import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';

import './Style.css';
import swal from 'sweetalert';


class CartFramingPic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.localId,
            ServiceCode: 1,
            Height: this.props.localHeight,
            Width: this.props.localWidth,
            GlassCode: this.props.localGlassCode,
            FrameCode: this.props.localframeCode,
            PaspartuWidth: this.props.localwidthPass,
            PaspartuCode: this.props.localcodePass,
            PriceToOne: this.props.localPriceTotal,
            ImageFrame: this.props.localimageFrame,
            ImagePass: this.props.localcolorPass,
            GlassType: this.props.localGlassType,

            Notes: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        return (
            <div className="divCart">

                {this.props.num === 0 ? <h3><u>מסגור תמונה:</u></h3> : <h3><u> {this.state.Id + 1}. מסגור תמונה:</u></h3>}

                <TableSortLabel> <b> אורך התמונה:</b></TableSortLabel>
                <TextField value={this.state.Height} inputProps={{ min: "10", max: "200" }} id="height" type="number" name='Height' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel><b>רוחב התמונה:</b></TableSortLabel>
                <TextField value={this.state.Width} id="width" type="number" inputProps={{ min: "10", max: "200" }} name="Width" disabled></TextField>&nbsp;&nbsp; &nbsp;&nbsp;

                <TableSortLabel> <b> זכוכית:</b></TableSortLabel>
                <TextField value={this.state.GlassType} name='GlassType' disabled></TextField>&nbsp;&nbsp;


                {this.props.serviceInOrder === 1 ? '' :
                    <TableSortLabel><b>מסגרת:</b>&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + this.state.ImageFrame} width="30" height="30"></img>
                    </TableSortLabel>

                }
                <br /><br />

                {this.state.PaspartuCode != 33 && this.props.serviceInOrder !== 1 ?
                    <div>
                        <TableSortLabel><b>צבע פספרטו:</b></TableSortLabel>
                        <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + this.state.ImagePass + ".jpg"} width="30" height="30"></img>&nbsp;&nbsp;&nbsp;&nbsp;
                        <TableSortLabel><b>רוחב פספרטו:</b></TableSortLabel>
                        <TextField name="PaspartuWidth" type="number" value={this.state.PaspartuWidth} inputProps={{ min: "1", max: "99" }} disabled></TextField>
                        <br /><br />
                    </div> : ''}

                <TableSortLabel><b>מחיר (ש"ח):</b></TableSortLabel>
                <TextField placeholder="מחיר" name="PriceToOne" type="number" value={this.state.PriceToOne} inputProps={{ min: "1", max: "999" }} disabled></TextField> <br /><br />
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

export default CartFramingPic;
