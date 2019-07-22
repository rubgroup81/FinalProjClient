import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import './Style.css';
//import GetGlasses from './GetGlasses';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TableSortLabel, TextField } from '@material-ui/core';
import CutGlass from './CutGlass';
import CutMirror from './CutMirror';
import Button from '@material-ui/core/Button';

import RadioGroup from '@material-ui/core/RadioGroup';



class CutMirrorGlass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComponent: false,
            selectedValue: '',
            clicked: true,
            clicked2: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick = event => {
        this.setState({ clicked: !this.state.clicked })
        this.setState({ clicked2: !this.state.clicked })


        let selectedService = '';
        selectedService = event;

        selectedService === "4" ? this.setState({ showComponent: <CutGlass /> })
            : this.setState({ showComponent: <CutMirror /> });

    };

    render() {
        let button = this.state.clicked ? "white" : "#8d143031";
        let button2 = this.state.clicked ? "#8d143031" : "white";
        return (
            <div className="cutting" style={{ margin: "0 auto", textAlign: "center" }}>
                <h1 style={{ textAlign: "center" }}>חיתוך זכוכית ומראה</h1>
                <hr style={{ marginLeft: "30%", marginRight: "30%" }} />
                <h3 style={{ color: "#4e342e" }} >בחר את השירות בו אתה מעוניין</h3>

                <Button size="large" variant="outlined" style={{ color: "#4e342e", background: button }} className={{ button }} Align="center" value="4" onClick={() => this.handleClick("4")}><b>חיתוך זכוכית</b> </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="large" variant="outlined" style={{ color: "#4e342e", background: button2 }} Align="center" value='3' onClick={() => this.handleClick("3")}><b>חיתוך מראה</b> </Button>
                <br /><br />
                <div className='comp'>
                    {this.state.showComponent}
                </div>
            </div>



        )

    }
}
export default CutMirrorGlass;


