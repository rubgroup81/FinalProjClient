import React from 'react';
import GetSmallFrames from './GetSmallFrames';
import GetPasspartu from './GetPasspartu';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';


class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      localDataImageFrame: "black.jpg",
      localDataWidthPass: 0,
      localDataColorPass: '',
      height: this.props.heightPic,
      localDataFramePrice: null,
      localDataPassPrice: 0,
    };
    this.localDataFrame = null;
    this.PriceTotal = 0;
    this.localDataPass = 33;
    this.PriceFrameProps = 0;
    this.CalculatePrice = this.CalculatePrice.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  // width passpurto
  getDataPasspurto = (data) => {
    this.setState({ localDataWidthPass: data });
    this.props.sendDataWidthPass(data);
  }

  // Color passpurto
  getDataColorPass = (data) => {
    this.setState({ localDataColorPass: data });
    this.props.sendDataColorPass(data);
  }

  // Makat passpurto
  getDataMakatPass = (data) => {

    this.localDataPass = data;
    { this.localDataPass === 33 ? this.setState({ localDataPassPrice: 0, localDataWidthPass: 0 }) : this.setState({ localDataPassPrice: 40 }) }
    this.props.sendDataCodePass(this.localDataPass);
  }

  CalcPXheight = () => {
    return (this.props.heightPic / this.props.widthPic) * 250 + "px";
  }

  CalcPXwidthPassparto = () => {
    return 20.2353 + (this.state.localDataWidthPass * 4) + "px";
  }

  //frame
  getDataFrames = (data) => {

    this.setState({ localDataImageFrame: data.Image }); //frame src Image
    this.localDataFrame = data.Makat; //frame Makat
    this.setState({ localDataFramePrice: data.PricePerMeter }); //frame PricePerMeter
    this.props.sendDataImageFrame(data.Image);//send val src frame  
    this.props.sendDataCodeFrame(data.Makat);//send val code frame 
    this.PriceFrameProps = (2 * (this.props.heightPic / 100 + this.props.widthPic / 100)) * data.PricePerMeter;

    this.props.sendDataCalcPrice(Math.round(this.PriceFrameProps));
  }


  CalculatePrice = () => {

    if (this.props.heightPic != '' & this.props.widthPic != '' & this.localDataFrame != null) {

      this.PriceTotal = this.PriceFrameProps;//total frame     
      this.PriceTotal += this.state.localDataPassPrice;// total Passpartu
      return Math.round(this.PriceTotal);
    }
    return 'חסר מידע';
  }


  render() {

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={{ height: this.CalcPXheight() }} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return (
      <div className="previewComponent">
        <h3><b>בחר את סוג המסגרת:</b></h3>
        <GetSmallFrames sendDataFrame={this.getDataFrames}></GetSmallFrames>
        <br />

        <div className="imgPreview"
          style={{
            borderImageSource: "url('http://proj.ruppin.ac.il/bgroup81/test2/imagesProj/" + this.state.localDataImageFrame + " ')",
            height: this.CalcPXheight(),
            borderWidth: this.CalcPXwidthPassparto(),//  Width Passpurto
            background: this.state.localDataColorPass,
          }}>

          {$imagePreview}
        </div>

        <h3><b>בחר תמונה:</b></h3>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e) => this._handleImageChange(e)} />

          <button className="submitButton"//hide
            type="submit"
            onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
        </form>

        <GetPasspartu sendDataPass={this.getDataPasspurto} sendDataColorPass={this.getDataColorPass} sendDataMakatPass={this.getDataMakatPass}></GetPasspartu>

        <TableSortLabel>מחיר מסגרת + פספרטו</TableSortLabel>
        <TextField placeholder="מחיר" name="PriceToOne" value={this.CalculatePrice()} disabled></TextField><br /><br />
      </div>
    )
  }
}
export default Preview;



