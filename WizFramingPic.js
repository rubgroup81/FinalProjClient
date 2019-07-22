import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SizeFraming from './SizeFraming';
import Preview from './Preview';
import FinalStepFramePic from './FinalStepFramePic';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '90%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

class WizFramingPic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevActiveStep: 0,
      activeStep: 0,
      localDataHeight: '',
      localDataWidth: '',
      localDataImageFrame: '',
      localDataCodeFrame: '',
      localDataColorPass: '',
      localDataWidthPass: '',
      localDataCodePass: '',
      localDataCalcPrice: '',
    };
    this.steps = [' מידות התמונה ', ' בחירת מסגרת  ', ' סגירת הזמנה '];
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getDataHeight = (data) => {
    this.setState({ localDataHeight: data });
  }

  getDataWidth = (data) => {
    this.setState({ localDataWidth: data });
  }

  getDataImageFrame = (data) => {
    this.setState({ localDataImageFrame: data });
  }
  getDataCodeFrame = (data) => {
    this.setState({ localDataCodeFrame: data });
  }

  getDataColorPass = (data) => {
    this.setState({ localDataColorPass: data });
  }

  getDataWidthPass = (data) => {
    this.setState({ localDataWidthPass: data });
  }

  getDataCodePass = (data) => {
    this.setState({ localDataCodePass: data });
  }

  getDataCalcPrice = (data) => {
    this.setState({ localDataCalcPrice: data });
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <SizeFraming sendDataHeight={this.getDataHeight} sendDataWidth={this.getDataWidth} nameSer={'תמונה'}></SizeFraming>;
      case 1:
        return <Preview
          heightPic={this.state.localDataHeight}
          widthPic={this.state.localDataWidth}
          sendDataImageFrame={this.getDataImageFrame}
          sendDataCodeFrame={this.getDataCodeFrame}
          sendDataColorPass={this.getDataColorPass}
          sendDataWidthPass={this.getDataWidthPass}
          sendDataCodePass={this.getDataCodePass}
          sendDataCalcPrice={this.getDataCalcPrice}
        >
        </Preview>;
      case 2:
        return <FinalStepFramePic
          heightPic={this.state.localDataHeight}
          widthPic={this.state.localDataWidth}
          imageFrame={this.state.localDataImageFrame}
          frameCode={this.state.localDataCodeFrame}
          colorPass={this.state.localDataColorPass}
          widthPass={this.state.localDataWidthPass}
          codePass={this.state.localDataCodePass}

          calcPrice={this.state.localDataCalcPrice}
        >
        </FinalStepFramePic>;
      default:
        return 'Unknown step';
    }
  }

  handleNext() {
    this.setState({
      prevActiveStep: this.state.prevActiveStep + 1,
      activeStep: this.state.activeStep + 1,
    });
  }

  handleBack() {
    this.setState({
      prevActiveStep: this.state.prevActiveStep - 1,
      activeStep: this.state.activeStep - 1,
    });
  }

  handleReset() {
    this.setState({ activeStep: 0 });
  }

  render() {

    return (
      <div className={useStyles.root} >
        <h1 style={{ textAlign: "center" }}>מסגור תמונה</h1>
        <hr style={{ marginLeft: "30%", marginRight: "30%" }} /><br /><br />
        <Stepper activeStep={this.state.activeStep} orientation="vertical" style={{ backgroundColor: "white", width: "85% ", margin: "0 auto", textAlign: "center", opacity: "0.92" }}>
          {this.steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                <div className={useStyles.actionsContainer}>
                  <div>
                    {this.state.activeStep == this.steps.length - 1 ? '' :
                      <Button style={{ backgroundColor: "#6e1534", color: "white" }}
                        variant="contained"
                        onClick={this.handleNext}
                        className={useStyles.button}
                      >
                        הבא
                      </Button>}
                    &nbsp;

                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                      variant="outlined"
                      color="primary"
                      className={useStyles.button}
                      style={{ borderColor: "#6e1534", color: "#6e1534" }}
                    >
                      חזור
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>

      </div>
    );
  }
}
export default WizFramingPic;







