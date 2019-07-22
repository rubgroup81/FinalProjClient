import React from 'react';
import Button from '@material-ui/core/Button';

class GetSmallFrames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Makat: '',
            frames: [],
            PricePerMeter: '',
            name: '',
            isLoaded: false,
            error: null,
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Frame')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        frames: data,
                    })                  
                })

                .catch(error => this.setState({ error: "There was an error in getting the frmaes" }));
        }
        else{
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Frame')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        frames: data,
                    })                  
                })

                .catch(error => this.setState({ error: "There was an error in getting the frmaes" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    ChooseFrame(objFrame) {       
        this.props.sendDataFrame(objFrame);//send src img
       // alert(objFrame);
    }



    render() {
        if (this.state.frames.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (

                <div  className="smallPic">
                    {this.state.frames.map((frame, i) => (                     
                        <Button key={i} value={frame.Makat} onClick={() => this.ChooseFrame(frame)} >
                            <img src={"http://proj.ruppin.ac.il/bgroup81/test2/small_imagesProj/" + frame.Image} width="40" height="40"></img>
                        </Button>
                    ))}                    
                </div>
            )
        }
    }
}

export default GetSmallFrames;

