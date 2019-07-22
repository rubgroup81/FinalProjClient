import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import './Style.css';
import GetGlasses from './GetGlasses';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TableSortLabel, TextField, Checkbox, FormLabel, Button } from '@material-ui/core';
import GetMirrors from './GetMirrors';
import swal from 'sweetalert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


class CutMirror extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            Height: '',
            Width: '',
            Faza: 0,
            Remarks: '',
            ServiceCode: 3,
            ProductCode: '',
            totalPrice: '',
            PriceToOne: '',
            localDataMirrorPrice: null,
            ProductType: '',
            priceFaza: 0,
            isChecked: true,
        };
        this.handleChecked = this.handleChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Addservices = this.Addservices.bind(this);
        this.localDataMirrorMakat = null;
        this.localStorCutMirror = null;
        this.localDataMirrorType = null;
        this.handleClick = this.handleClick.bind(this);

        this.CalculatePrice = this.CalculatePrice.bind(this);
        this.PriceTotal = null;
    }

    handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
    }

    Addservices = () => {
        var arr = [];

        this.localStorCutMirror = {
            ServiceCode: 3,
            ProductCode: this.localDataMirrorMakat,
            Height: this.state.Height,
            Width: this.state.Width,
            Remarks: this.state.Remarks,
            Faza: this.state.Faza,
            ProductType: this.localDataMirrorType,

            PriceToOne: this.CalculatePrice(),

        };

        if (JSON.parse(localStorage.getItem('myDataServies') !== null)) {
            arr = JSON.parse(localStorage.getItem('myDataServies'));
        }

        arr.push(this.localStorCutMirror);
        localStorage.setItem('myDataServies', JSON.stringify(arr));
        swal("הפריט נוסף לסל הקניות!", "", "success");

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    getData = (data) => {
        this.localDataMirrorMakat = data.Makat;
        this.localDataMirrorType = data.Type;
        this.setState({ localDataMirrorPrice: data.PricePerSquareMeter })
    }

    handleClick(e) {
        this.setState({
            isChecked: !this.state.isChecked,
        });

        this.state.isChecked ? this.setState({ Faza: 1, priceFaza: (2 * (this.state.Height / 100 + this.state.Width / 100) * 50), })
            : this.setState({ Faza: 0, priceFaza: 0, });
        //console.log("faza: " + this.state.Faza);
    }

    CalculatePrice = () => {

        if (this.state.Height != '' & this.state.Width != '' & this.state.localDataMirrorPrice != null) {

            this.PriceTotal = (this.state.Height * this.state.Width * this.state.localDataMirrorPrice) / 10000;
            return Math.round(this.PriceTotal + this.state.priceFaza);

        }
        return 'חסר מידע';
    }

    render() {
        return (

            <div style={{ backgroundColor: "white", width: "80%", margin: "0 auto", textAlign: "center", opacity: "0.92" }} >
                <br />
                <h3  >חיתוך מראה</h3>              
                <GetMirrors sendData={this.getData} /><br />
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
                &nbsp;  &nbsp;  &nbsp;  &nbsp;  <TableSortLabel><b>  הערות:</b></TableSortLabel>
                <TextField
                    name="Remarks"
                    onChange={this.handleChange}
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"
                /><br /><br />

                <TableSortLabel name="Faza" onClick={this.handleClick} checked={this.state.isChecked}><b>פאזה:</b> <Checkbox checked={this.state.Faza} color="primary" /></TableSortLabel>
                <br /><br /><br />
                <TableSortLabel><b>  מחיר:</b></TableSortLabel>
                <TextField placeholder="מחיר" name="PriceToOne" value={this.CalculatePrice()} type="number" inputProps={{ min: "1", max: "999" }} disabled></TextField>
                <br /><br /><br />

                {this.state.Height !== "" && this.state.Width !== "" && this.state.localDataMirrorPrice !== null ?
                    <Button variant="outlined" color="secondary" onClick={this.Addservices}>
                        <AddShoppingCartIcon /> הוסף לעגלת הקניות
                </Button> :
                    <Button variant="outlined" disabled> <AddShoppingCartIcon /> הוסף לעגלת הקניות
                </Button>}
                <br /><br />
            </div>
        )
    }
}

export default CutMirror;