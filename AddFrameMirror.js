import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Style.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import swal from 'sweetalert';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
});

class AddFrameMirror extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frames: [],
            Makat: '',
            PricePerMeter: '',
            isLoaded: false,
            error: null,
        }

        this.PriceTotal = null;
        this.mirrorPrice = 150;
        this.localStorFramMirror = null;
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
                    this.props.sendDataFrame(this.state.frames);
                })
                .catch(error => this.setState({ error: "There was an error in getting the frmaes" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Frame')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        frames: data,
                    })
                    this.props.sendDataFrame(this.state.frames);
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

    Addservices(frame) {
        var arr = [];

        this.localStorFramMirror = {
            ServiceCode: 2,
            MirrorCode: 4,
            Height: this.props.heightMirr,
            Width: this.props.widthMirr,
            FrameCode: frame.Makat,
            PriceToOne: this.CalculatePrice(frame.PricePerMeter),
            ImageFrame: frame.Image,
        };

        if (JSON.parse(localStorage.getItem('myDataServies') !== null)) {
            arr = JSON.parse(localStorage.getItem('myDataServies'));
        }

        arr.push(this.localStorFramMirror);
        localStorage.setItem('myDataServies', JSON.stringify(arr));
        swal("הפריט נוסף לסל הקניות!", "", "success");
    }

    CalculatePrice = (pricePerMeterFrame) => {

        if (this.props.heightMirr != '' & this.props.widthMirr != '') {
            let priceTotalMirror = (this.props.heightMirr * this.props.widthMirr * this.mirrorPrice) / 10000;
            let priceTotalFrame = (2 * (this.props.heightMirr / 100 + this.props.widthMirr / 100)) * pricePerMeterFrame;
            this.PriceTotal = priceTotalMirror + priceTotalFrame;
            return Math.round(this.PriceTotal);
        }
        return 'חסר מידע';
    }

    render() {
        if (this.state.frames.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <React.Fragment>

                    <main>
                        <div className={[styles.layout, styles.cardGrid]}>
                            <Grid container spacing={40}>
                                {this.state.frames.map((card, i) => (
                                    <Grid item key={i} sm={6} md={4} lg={2}>
                                        <Card style={{ width: 200 }} key={i} sm={6} md={4} lg={3} className="cardsFrames">
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="80%"
                                                image={"http://proj.ruppin.ac.il/bgroup81/test2/imagesProj/" + card.Image}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent className={styles.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">

                                                </Typography>
                                                <Typography>
                                                    <b> קוד מסגרת:</b> {card.Makat}<br />
                                                    <b> חומר:</b> {card.Type}<br />
                                                    <b> גודל:</b> {this.props.heightMirr}X{this.props.widthMirr}<br />
                                                    <b>סה"כ מחיר:</b> {this.CalculatePrice(card.PricePerMeter)}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                {this.props.heightMirr !== "" && this.props.widthMirr !== "" ?
                                                    <Button variant="outlined" size="small" color="secondary" onClick={() => this.Addservices(card)} >
                                                        <AddShoppingCartIcon /> הוסף לעגלת הקניות
                                                </Button> :
                                                    <Button variant="outlined" size="small" disabled >
                                                        <AddShoppingCartIcon /> הוסף לעגלת הקניות
                                                </Button>}
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </main>
                </React.Fragment>
            );
        }
    }
}

export default AddFrameMirror;

