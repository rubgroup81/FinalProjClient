import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';

import './Style.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartFramingPic from './CartFramingPic';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CartFramMirror from './CartFramMirror';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import CartKanvasPicture from './CartKanvasPicture';
import CartCutGlass from './CartCutGlass';
import CartCutMirror from './CartCutMirror';
import { border } from '@material-ui/system';

var date = new Date();
var newDate = new Date(date.setTime(date.getTime() + 7 * 86400000));

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myArray: [],
            StartDate: new Date().toISOString().split('T')[0],
            FinalDate: newDate.toISOString().split('T')[0],
            NumCostumer: localStorage.getItem('localNumCostumer'),
            maxorder: '',
        }

        this.priceTotalOrder = 0;
        this.objServies = JSON.parse(localStorage.getItem('myDataServies'));
        if (this.objServies === null) {
            this.objServies = [];
        }
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.AddNewOrder = this.AddNewOrder.bind(this);
        this.AddSerFramePic = this.AddSerFramePic.bind(this);
        this.AddSerFrameMirror = this.AddSerFrameMirror.bind(this);
        this.AddAllServices = this.AddAllServices.bind(this);
        this.AddSerKanvas = this.AddSerKanvas.bind(this);
        this.AddSerCutMirror = this.AddSerCutMirror.bind(this);
        this.AddSerCutGlasses = this.AddSerCutGlasses.bind(this);
    }


    onRemoveItem(index) {
        this.objServies.splice(index, 1);
        localStorage.setItem('myDataServies', JSON.stringify(this.objServies));
        window.location.reload();
    }

    AddNewOrder() {
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/Order'

            const data = {
                StartDate: this.state.StartDate,
                FinalDate: this.state.FinalDate,
                StatusPayment: "לא שולם",
                StatusOrder: "ממתין לאישור",
                NumCostumer: this.state.NumCostumer,
                Tax: 1.17,
                MethodOfPayment: "",
                PaidOnAccount: 0,
                LocationOrder: "",
                TotalOrder: this.priceTotalOrder,
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    this.AddAllServices();
                    swal("ההזמנה נשלחה בהצלחה", "", "success");
                    this.getMaxorder();

                    localStorage.removeItem("myDataServies");//delete all basket           
                })
                .catch(error => console.error('Error:', error))
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Order'

            const data = {
                StartDate: this.state.StartDate,
                FinalDate: this.state.FinalDate,
                StatusPayment: "לא שולם",
                StatusOrder: "ממתין לאישור",
                NumCostumer: this.state.NumCostumer,
                Tax: 1.17,
                MethodOfPayment: "",
                PaidOnAccount: 0,
                LocationOrder: "",
                TotalOrder: this.priceTotalOrder,
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    this.AddAllServices();
                    swal("ההזמנה נשלחה בהצלחה", "", "success");
                    this.getMaxorder();

                    localStorage.removeItem("myDataServies");//delete all basket           
                })
                .catch(error => console.error('Error:', error))
        }


    }

    AddAllServices() {

        this.objServies.map((option, index) => {

            switch (option.ServiceCode) {
                case 1:
                    this.AddSerFramePic(index, option);
                    break;
                case 2:
                    this.AddSerFrameMirror(index, option);
                    break;
                case 3:
                    this.AddSerCutMirror(index, option);
                    break;
                case 4:
                    this.AddSerCutGlasses(index, option);
                    break;
                case 5:
                    this.AddSerKanvas(index, option);
                    break;
            }
        })
    }

    AddSerFramePic(i, option) {
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/FramePicture';

            const data = {
                Id: i,
                ServiceCode: 1,
                Height: option.Height,
                Width: option.Width,
                GlassCode: option.GlassCode,
                FrameCode: option.FrameCode,
                PaspartuWidth: option.PaspartuWidth,
                PaspartuCode: option.PaspartuCode,
                PriceToOne: option.PriceToOne,
            }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("הפריט נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error))
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/FramePicture';

            const data = {
                Id: i,
                ServiceCode: 1,
                Height: option.Height,
                Width: option.Width,
                GlassCode: option.GlassCode,
                FrameCode: option.FrameCode,
                PaspartuWidth: option.PaspartuWidth,
                PaspartuCode: option.PaspartuCode,
                PriceToOne: option.PriceToOne,
            }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("הפריט נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error))

        }

    }


    AddSerFrameMirror(i, option) {

        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/FrameMirror';//לשנות לשרת

            const data = {
                Id: i,
                ServiceCode: 2,
                Height: option.Height,
                Width: option.Width,
                FrameCode: option.FrameCode,
                PriceToOne: option.PriceToOne,
                MirrorCode: option.MirrorCode,
                Notes: option.Notes,
            }


            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/FrameMirror';//לשנות לשרת

            const data = {
                Id: i,
                ServiceCode: 2,
                Height: option.Height,
                Width: option.Width,
                FrameCode: option.FrameCode,
                PriceToOne: option.PriceToOne,
                MirrorCode: option.MirrorCode,
                Notes: option.Notes,
            }


            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }
    }

    AddSerCutMirror(i, option) {
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/CutMirrorAndGlass';

            const data = {
                Id: i,
                Height: option.Height,
                Width: option.Width,
                ServiceCode: 3,
                Faza: option.Faza,
                Remarks: option.Remarks,
                ProductCode: option.ProductCode,
                PriceToOne: option.PriceToOne,

            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/CutMirrorAndGlass';

            const data = {
                Id: i,
                Height: option.Height,
                Width: option.Width,
                ServiceCode: 3,
                Faza: option.Faza,
                Remarks: option.Remarks,
                ProductCode: option.ProductCode,
                PriceToOne: option.PriceToOne,

            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }

    }

    AddSerCutGlasses(i, option) {
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/CutMirrorAndGlass';

            const data = {
                Id: i,
                Height: option.Height,
                Width: option.Width,
                ServiceCode: 4,
                Faza: 0,
                Remarks: option.Remarks,
                ProductCode: option.ProductCode,
                PriceToOne: option.PriceToOne,
            }


            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/CutMirrorAndGlass';

            const data = {
                Id: i,
                Height: option.Height,
                Width: option.Width,
                ServiceCode: 4,
                Faza: 0,
                Remarks: option.Remarks,
                ProductCode: option.ProductCode,
                PriceToOne: option.PriceToOne,
            }


            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }

    }



    AddSerKanvas(i, option) {
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/FinalProduct';

            const data = {

                Id: i,
                Makat: option.Makat,
                Length_Width: option.Length_Width,
                Price: option.Price,
                ServiceCode: 5,
                Name: "תמונת קנבס",
            }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {

                })
                .catch(error => console.error('Error:', error))
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/FinalProduct';

            const data = {

                Id: i,
                Makat: option.Makat,
                Length_Width: option.Length_Width,
                Price: option.Price,
                ServiceCode: 5,
                Name: "תמונת קנבס",
            }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {

                })
                .catch(error => console.error('Error:', error))
        }

    }

    SendMail(maxorder) {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/SendEMailOrder?maxorder=' + maxorder)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        succsess: data,
                    })
                    if (this.state.succsess == 1) {

                        swal('ההזמנה נשלחה בהצלחה')
                    }
                    else {
                        return swal('קרתה תקלה בעת שליחת ההזמנה, אנא נסה שנית מאוחר יותר')
                    }
                })
                .catch(error => this.setState({ error: "There was an error by doing sending order" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/SendEMailOrder?maxorder=' + maxorder)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        succsess: data,
                    })
                    if (this.state.succsess == 1) {

                        swal('ההזמנה נשלחה בהצלחה')
                    }
                    else {
                        return swal('קרתה תקלה בעת שליחת ההזמנה, אנא נסה שנית מאוחר יותר')
                    }
                })
                .catch(error => this.setState({ error: "There was an error by doing sending order" }));
        }
    }


    getMaxorder() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/GetMaxOrder')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        maxorder: data,

                    })
                    this.SendMail(this.state.maxorder)
                })
                .catch(error => this.setState({ error: "There was an error by doing login" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/GetMaxOrder')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        maxorder: data,

                    })
                    this.SendMail(this.state.maxorder)
                })
                .catch(error => this.setState({ error: "There was an error by doing login" }));
        }
    }



    render() {
        this.priceTotalOrder = 0;
        return (
            <div className="divShoppingCart" style={{ backgroundImage: "url(" + "./images/marble2.jpg " + ")", backgroundSize: "100%" }}>
                <h1 style={{ textAlign: "center" }} ><AddShoppingCartIcon /> סל קניות</h1>
                <hr style={{ marginLeft: "30%", marginRight: "30%" }} />

                {this.objServies.map((option, index) => {
                    if (option.ServiceCode === 1) {
                        return (
                            <div key={index} style={{ backgroundColor: "white", opacity: "0.92", paddingRight: "3%", border: "solid lightGrey" }}>
                                <br />
                                <CartFramingPic
                                    localId={index}
                                    localHeight={option.Height}
                                    localWidth={option.Width}
                                    localGlassCode={option.GlassCode}
                                    localframeCode={option.FrameCode}
                                    localcodePass={option.PaspartuCode}
                                    localPriceTotal={option.PriceToOne}
                                    localimageFrame={option.ImageFrame}
                                    localcolorPass={option.ImagePass}
                                    localwidthPass={option.PaspartuWidth}
                                    localGlassType={option.GlassType}
                                >
                                    {this.priceTotalOrder += option.PriceToOne}
                                </CartFramingPic>
                                <IconButton aria-label="Delete" onClick={() => this.onRemoveItem(index)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </div>
                        );
                    }
                    else if (option.ServiceCode === 2) {
                        return (
                            <div key={index} style={{ backgroundColor: "white", opacity: "0.92", paddingRight: "3%", border: "solid lightGrey" }}>
                                <br />

                                <CartFramMirror
                                    localId={index}
                                    localHeight={option.Height}
                                    localWidth={option.Width}
                                    localframeCode={option.FrameCode}
                                    localPriceTotal={option.PriceToOne}
                                    localimageFrame={option.ImageFrame}
                                >
                                    {this.priceTotalOrder += option.PriceToOne}
                                </CartFramMirror>
                                <IconButton aria-label="Delete" onClick={() => this.onRemoveItem(index)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>

                            </div>
                        );
                    }
                    else if (option.ServiceCode === 3) {
                        return (
                            <div key={index} style={{ backgroundColor: "white", opacity: "0.92", paddingRight: "3%", border: "solid lightGrey" }}>
                                <br />

                                <CartCutMirror
                                    localId={index}
                                    localHeight={option.Height}
                                    localWidth={option.Width}
                                    localDataMirrorMakat={option.ProductCode}
                                    localDataMirrorType={option.ProductType}
                                    localRemarks={option.Remarks}
                                    localFaza={option.Faza}
                                    localPriceTotal={option.PriceToOne}
                                >
                                    {this.priceTotalOrder += option.PriceToOne}
                                </CartCutMirror>
                                <IconButton aria-label="Delete" onClick={() => this.onRemoveItem(index)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </div>
                        );
                    }

                    else if (option.ServiceCode === 4) {
                        return (
                            <div key={index} style={{ backgroundColor: "white", opacity: "0.92", paddingRight: "3%", border: "solid lightGrey" }}>
                                <br />

                                <CartCutGlass
                                    localId={index}
                                    localHeight={option.Height}
                                    localWidth={option.Width}
                                    localDataGlass={option.ProductCode}
                                    localDataGlassType={option.ProductType}
                                    localRemarks={option.Remarks}
                                    localPriceTotal={option.PriceToOne}
                                >
                                    {this.priceTotalOrder += option.PriceToOne}

                                </CartCutGlass>
                                <IconButton aria-label="Delete" onClick={() => this.onRemoveItem(index)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </div>
                        );
                    }

                    else if (option.ServiceCode === 5) {
                        return (
                            <div key={index} style={{ backgroundColor: "white", opacity: "0.92", paddingRight: "3%", border: "solid lightGrey" }}>
                                <br />
                                <CartKanvasPicture
                                    localId={index}
                                    localLength_Width={option.Length_Width}
                                    localDescription={option.Description}
                                    localPrice={option.Price}
                                    localMakat={option.Makat}
                                    localImage={option.Image}
                                > {this.priceTotalOrder += option.Price}</CartKanvasPicture>
                                <IconButton aria-label="Delete" onClick={() => this.onRemoveItem(index)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </div>
                        );
                    }
                })}

                <div style={{ backgroundColor: "white", opacity: "0.92", paddingRight: "3%", border: "solid lightGrey" }}>
                    <br />
                    <TableSortLabel><b> סה"כ מחיר (ש"ח) :</b></TableSortLabel>
                    <TextField name="TotalOrder" type="number" value={this.priceTotalOrder} type="number" inputProps={{ min: "1", max: "9999" }} disabled></TextField>
                    <br /><br /><br />

                    {this.objServies.length != 0 && this.state.NumCostumer > 0 ?
                        <div id="btnCenter">
                            <Button onClick={this.AddNewOrder} variant="contained" color="primary" style={{ backgroundColor: "#2e1534" }}>  שלח הזמנה </Button>
                        </div>
                        : <div id="btnCenter" >
                            <Button variant="contained" color="primary" disabled >  שלח הזמנה </Button>
                            <h5>* בכדי שתוכל לבצע הזמנה עלייך קודם להירשם/להתחבר לאתר *</h5>
                            <Link component={Link} to="./Login3">התחבר</Link> &nbsp; / &nbsp;
                        <Link component={Link} to="./Register3">לקוח חדש? הירשם</Link>
                        </div>
                    }
                    <br /><br />
                </div>

            </div>
        )
    }

}

export default ShoppingCart;
