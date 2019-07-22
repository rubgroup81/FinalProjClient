import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FramingMirror from './FramingMirror';
import SizeFraming from './SizeFraming';

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

class WizFramingMirror extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevActiveStep: 0,
      activeStep: 0,
      localDataHeight: '',
      localDataWidth: '',
    };
    this.steps = [' מידות המראה ', ' בחירת מסגרת  '];
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

  getStepContent(step) {
    switch (step) {
      case 0:
        return <SizeFraming sendDataHeight={this.getDataHeight} sendDataWidth={this.getDataWidth} nameSer={'מראה'}></SizeFraming>;
      case 1:
        return <FramingMirror heightMirr={this.state.localDataHeight} widthMirr={this.state.localDataWidth}></FramingMirror>
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
    
      <div className={useStyles.root}>
        <h1 style={{textAlign:"center"}}>מסגור מראה</h1>
        <hr style={{marginLeft:"30%",marginRight:"30%"}}/>
        <br/><br/>
        <Stepper activeStep={this.state.activeStep} orientation="vertical"  style={{ backgroundColor :"white", marginLeft:"1.5%",  marginRight:"1.5%", paddingLeft:"5px", paddingRight:"0" ,textAlign:"center", opacity:"0.92"}}>
          {this.steps.map((label, index) => (
            <Step key={index} >
              <StepLabel >{label}</StepLabel>
              <StepContent >
                <Typography >{this.getStepContent(index)}</Typography>
                <div className={useStyles.actionsContainer}>
                  <div>
                    {this.state.activeStep == this.steps.length - 1 ? '' :
                      <Button style={{ backgroundColor: "#6e1534", color: "white"}}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={useStyles.button}                       
                      >
                        הבא
                      </Button>}
                    &nbsp;
                    <Button style={{ borderColor : "#6e1534", color:"#6e1534" }}
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                      variant="outlined"
                      color="primary"
                      className={useStyles.button}
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
export default WizFramingMirror;







