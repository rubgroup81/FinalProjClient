import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox, Slide } from '@material-ui/core';
import './Style.css';
import AddFrameMirror from './AddFrameMirror';


class FramingMirror extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Height: this.props.heightMirr,
            Width: this.props.widthMirr,
            ServiceCode: 2,
            MirrorCode: 4,
            Notes: '',
            FrameCode: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="divMirror">
                    <TableSortLabel><b>  אורך (ס''מ) :</b></TableSortLabel>
                    <TextField id="height" type="number" placeholder="ס''מ" name='Height' onChange={this.handleChange} value={this.state.Height} required></TextField> &nbsp;
                    <br />
                    <TableSortLabel><b> רוחב (ס''מ) :</b></TableSortLabel>
                    <TextField id="width" type="number" placeholder="ס''מ" name="Width" onChange={this.handleChange} value={this.state.Width} required></TextField>&nbsp;&nbsp;
                    <br />  <br />
                </div>
                <AddFrameMirror
                    heightMirr={this.state.Height}
                    widthMirr={this.state.Width}
                ></AddFrameMirror>
                <br />  <br />
            </div>
        )
    }
}
export default FramingMirror;
