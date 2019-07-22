import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import './Style.css';
import GetGlasses from './GetGlasses';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TableSortLabel, TextField, FormLabel, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import swal from 'sweetalert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class CutGlass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Height: '',
            Width: '',
            Remarks: '',
            ServiceCode: 4,
            ProductCode: '',
            localDataGlassPrice: null,
            ProductType: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.Addservices = this.Addservices.bind(this);
        this.localDataGlass = null;
        this.localStorCutGlasses = null;
        this.localDataGlassType = null;
        this.PriceTotal = null;
    }

    Addservices = () => {

        var arr = [];

        this.localStorCutGlasses = {
            ServiceCode: 4,
            ProductCode: this.localDataGlass,
            Height: this.state.Height,
            Width: this.state.Width,
            Remarks: this.state.Remarks,
            ProductType: this.localDataGlassType,
            PriceToOne: this.CalculatePrice(),
        };

        if (JSON.parse(localStorage.getItem('myDataServies') !== null)) {
            arr = JSON.parse(localStorage.getItem('myDataServies'));
        }

        arr.push(this.localStorCutGlasses);
        localStorage.setItem('myDataServies', JSON.stringify(arr));
        swal("הפריט נוסף לסל הקניות!", "", "success");
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    //glass
    getData = (data) => {
        this.localDataGlass = data.Makat;
        this.localDataGlassType = data.Type;
        this.setState({ localDataGlassPrice: data.PricePerSquareMeter });

    }

    CalculatePrice = () => {
        if (this.state.Height != '' & this.state.Width != '' & this.localDataGlass != null) {

            this.PriceTotal = (this.state.Height * this.state.Width * this.state.localDataGlassPrice) / 10000;//total price glass            

            return Math.round(this.PriceTotal);
        }
        return 'חסר מידע';
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", width: "80%", margin: "0 auto", textAlign: "center", opacity: "0.92" }}>
                <br />
                <h3>חיתוך זכוכית</h3>

                <GetGlasses sendData={this.getData} picFits={0} /><br />
                <TableSortLabel><b>  אורך:</b></TableSortLabel>
                <TextField type="number"
                    className="text-field-amount"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                    }}
                    placeholder="ס''מ"
                    min={0}
                    name='Height'
                    onChange={this.handleChange}
                    required
                />
                <br /><br /><br />
                <TableSortLabel><b>רוחב {this.state.nameService}:</b></TableSortLabel>
                <TextField type="number"
                    className="text-field-amount"
                    name="Width"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                    }}
                    placeholder="ס''מ"
                    min={0}
                    onChange={this.handleChange}
                    required
                />
                <br /><br /><br />
                &nbsp;  &nbsp;  &nbsp;  &nbsp; <TableSortLabel><b>  הערות:</b></TableSortLabel>
                <TextField
                    name="Remarks"
                    onChange={this.handleChange}
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"

                /><br /><br />

                <TableSortLabel><b>  מחיר:</b></TableSortLabel>
                <TextField disabled className="priceField" value={this.CalculatePrice()} /><br /><br /><br />
                {this.state.Height !== "" && this.state.Width !== "" && this.localDataGlass !== null ?
                    <Button variant="outlined" color="secondary" onClick={this.Addservices}>
                        <AddShoppingCartIcon /> הוסף לעגלת הקניות
                    </Button> :
                    <Button variant="outlined" disabled> <AddShoppingCartIcon /> הוסף לעגלת הקניות  </Button>
                }
                <br /><br />
            </div>
        )
    }
}

export default CutGlass;