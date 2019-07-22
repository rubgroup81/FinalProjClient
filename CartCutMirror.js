import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';

import './Style.css';

class CartCutMirror extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.localId,
            ServiceCode: 3,
            Height: this.props.localHeight,
            Width: this.props.localWidth,
            ProductCode: this.props.localDataMirrorMakat,
            Remarks: this.props.localRemarks,
            Faza: this.props.localFaza,
            ProductType: this.props.localDataMirrorType,

            PriceToOne: this.props.localPriceTotal,
            //  ImageFrame: this.props.localimageFrame,
            //  MirrorCode: 4,                                                 

        }

    }

    // componentDidMount() {

    //     console.log("service code: " + this.state.ServiceCode + " heigth: " + this.state.Height + " width: " +
    //         this.state.Width + " productCode: " + this.state.ProductCode +
    //         " remarks :" + this.state.Remarks + " faza: " + this.state.Faza + " productType: " + this.state.ProductType
    //         + " productType: " + this.state.PriceToOne)
    // }
    render() {

        return (
            <div className="divCart">

                {this.props.num === 0 ? <h3><u>חיתוך מראה:</u></h3> : <h3><u> {this.state.Id + 1}. חיתוך מראה:</u></h3>}


                <TableSortLabel> <b>מק"ט המראה:</b></TableSortLabel>
                <TextField value={this.state.ProductCode} inputProps={{ min: "10", max: "200" }} id="ProductCode" type="number" name='ProductCode' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel> <b>סוג המראה:</b></TableSortLabel>
                <TextField value={this.state.ProductType} inputProps={{ min: "10", max: "200" }} id="ProductType" type="text" name='ProductType' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel> <b> אורך המראה:</b></TableSortLabel>
                <TextField value={this.state.Height} inputProps={{ min: "10", max: "200" }} id="height" type="number" name='Height' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel><b>רוחב המראה:</b></TableSortLabel>
                <TextField value={this.state.Width} id="width" type="number" inputProps={{ min: "10", max: "200" }} name="Width" disabled></TextField>&nbsp;&nbsp; &nbsp;&nbsp;

                <TableSortLabel><b>פאזה:</b> &nbsp;&nbsp;
                <input type="Checkbox" checked={this.state.Faza} value={this.state.Faza} name="Faza" disabled /></TableSortLabel>
                <br /><br />
                <TableSortLabel><b> מחיר (ש"ח):</b></TableSortLabel>
                <TextField placeholder="מחיר" name="PriceToOne" type="number" inputProps={{ min: "10", max: "9999" }} value={this.state.PriceToOne} disabled></TextField> <br /> <br />
                <TableSortLabel><b> הערות:</b></TableSortLabel>
                <TextField
                    name="Remarks"
                    onChange={this.handleChange}
                    id="remarks"
                    margin="normal"
                    variant="outlined"
                    value={this.state.Remarks}
                    disabled
                />

                {/*  <TableSortLabel><b>מחיר:</b></TableSortLabel>
           <TextField placeholder="מחיר" name="PriceToOne" type="number"  inputProps={{ min: "10", max: "9999" }} value={this.state.PriceToOne} disabled></TextField> <br /> <br />*/}

            </div>
        )
    }
}

export default CartCutMirror;
