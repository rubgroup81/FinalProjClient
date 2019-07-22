import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';
import './Style.css';
import GetGlasses from './GetGlasses';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import swal from 'sweetalert';

class FinalStepFramePic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ServiceCode: 1,
            Height: this.props.heightPic,
            Width: this.props.widthPic,
            GlassCode: this.localDataGlass,
            FrameCode: this.props.frameCode,
            PaspartuWidth: this.props.widthPass,
            PaspartuCode: this.props.codePass,
            localDataGlassPrice: null,

        }

        this.localStorFramPic = null;
        this.localDataGlass = null;
        this.localDataTypeGlass = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.PriceTotal = null;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange1(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //data glass
    getDataGlass = (data) => {
        this.localDataGlass = data.Makat;
        this.localDataTypeGlass = data.Type;
        this.setState({ localDataGlassPrice: data.PricePerSquareMeter });
    }

    Addservices = () => {

        var arr = [];

        this.localStorFramPic = {
            ServiceCode: 1,
            Height: this.state.Height,
            Width: this.state.Width,
            GlassCode: this.localDataGlass,
            FrameCode: this.props.frameCode,
            PaspartuWidth: this.props.widthPass,
            PaspartuCode: this.props.codePass,
            PriceToOne: this.CalculatePrice(),
            ImageFrame: this.props.imageFrame,
            ImagePass: this.props.colorPass,
            GlassType: this.localDataTypeGlass,
        };

        if (JSON.parse(localStorage.getItem('myDataServies') !== null)) {
            arr = JSON.parse(localStorage.getItem('myDataServies'));
        }

        arr.push(this.localStorFramPic);
        localStorage.setItem('myDataServies', JSON.stringify(arr));
        swal("הפריט נוסף לסל הקניות!", "", "success");

    }

    CalculatePrice = () => {

        if (this.state.Height != '' & this.state.Width != '' & this.localDataGlass != null) {

            this.PriceTotal = (this.state.Height * this.state.Width * this.state.localDataGlassPrice) / 10000;//price glass         

            this.PriceTotal += this.props.calcPrice;//price frame

            return Math.round(this.PriceTotal);
        }
        return 'חסר מידע';
    }

    render() {

        return (
            <div className="divFinalStep">

                <TableSortLabel> <b> אורך התמונה:</b></TableSortLabel>
                <TextField value={this.props.heightPic} id="height" type="number" inputProps={{ min: "10", max: "200" }} name='Height' disabled></TextField> &nbsp;
                    <TableSortLabel><b>רוחב התמונה:</b></TableSortLabel>
                <TextField value={this.props.widthPic} id="width" type="number" inputProps={{ min: "10", max: "200" }} name="Width" disabled></TextField>&nbsp;&nbsp;
                    <br /><br />
                <GetGlasses picFits={1} sendData={this.getDataGlass} ></GetGlasses><br />

                <TableSortLabel><b>מסגרת:</b></TableSortLabel>
                <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + this.props.imageFrame} width="30" height="30"></img>
                <br />

                {this.state.PaspartuCode != 33 ? <div>
                    <TableSortLabel><b>צבע פספרטו:</b></TableSortLabel>
                    <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + this.props.colorPass + ".jpg"} width="30" height="30"></img>  <br />
                    <TableSortLabel><b>רוחב פספרטו:</b></TableSortLabel>
                    <TextField name="PaspartuWidth" type="number" inputProps={{ min: "0", max: "15", step: "1" }} value={this.state.PaspartuWidth} disabled></TextField>
                    <br />
                </div> : ''}

                <TableSortLabel><b>סה"כ מחיר:</b></TableSortLabel>
                <TextField placeholder="מחיר" value={this.CalculatePrice()} type="number" inputProps={{ min: "0", max: "9999" }} name="PriceToOne" disabled></TextField>
                <br /> <br />
                {this.props.heightPic !== "" && this.props.widthPic !== "" && this.localDataGlass !== null && this.props.frameCode !== null ?
                    <Button variant="outlined" color="secondary" onClick={this.Addservices}>
                        <AddShoppingCartIcon /> הוסף לעגלת הקניות
                </Button> :
                    <p> 
                        <Button variant="outlined" disabled> <AddShoppingCartIcon /> הוסף לעגלת הקניות </Button>
                        <h6>*יש לוודא שכל השדות מלאים*</h6>
                    </p>
                }
            </div>
        )
    }
}

export default FinalStepFramePic;
