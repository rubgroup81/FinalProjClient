import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';

import './Style.css';

class CartCutGlass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.localId,
            ServiceCode: 4,
            Height: this.props.localHeight,
            Width: this.props.localWidth,
            ProductCode: this.props.localDataGlass,
            Remarks: this.props.localRemarks,
            ProductType: this.props.localDataGlassType,

            PriceToOne: this.props.localPriceTotal,
            //  ImageFrame: this.props.localimageFrame,
            //  MirrorCode: 4,                                                 

        }

    }

    // componentDidMount() {

    //     console.log("service code: " + this.state.ServiceCode + " heigth: " + this.state.Height + " width: " +
    //         this.state.Width + " productCode: " + this.state.ProductCode +
    //         " remarks :" + this.state.Remarks + " productType: " + this.state.ProductType)
    // }

    render() {

        return (
            <div className="divCart">

                {this.props.num === 0 ? <h3><u> חיתוך זכוכית:</u></h3> : <h3><u> {this.state.Id + 1}. חיתוך זכוכית:</u></h3>}

                <TableSortLabel> <b>מק"ט הזכוכית:</b></TableSortLabel>
                <TextField value={this.state.ProductCode} inputProps={{ min: "10", max: "200" }} id="ProductCode" type="number" name='ProductCode' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel> <b>סוג הזכוכית:</b></TableSortLabel>
                <TextField value={this.state.ProductType} inputProps={{ min: "10", max: "200" }} id="ProductType" type="text" name='ProductType' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel> <b> אורך הזכוכית:</b></TableSortLabel>
                <TextField value={this.state.Height} inputProps={{ min: "10", max: "200" }} id="height" type="number" name='Height' disabled></TextField> &nbsp;&nbsp;&nbsp;

                <TableSortLabel><b>רוחב הזכוכית:</b></TableSortLabel>
                <TextField value={this.state.Width} id="width" type="number" inputProps={{ min: "10", max: "200" }} name="Width" disabled></TextField>&nbsp;&nbsp; &nbsp;&nbsp;
                <br /><br />
                <TableSortLabel><b> מחיר (ש"ח):</b></TableSortLabel>
                <TextField placeholder="מחיר" name="PriceToOne" type="number" inputProps={{ min: "10", max: "9999" }} value={this.state.PriceToOne} disabled></TextField> <br /> <br />
                <TableSortLabel><b>  הערות:</b></TableSortLabel>
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

export default CartCutGlass;
