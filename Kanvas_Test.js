import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Style.css';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { pink } from '@material-ui/core/colors';
import swal from 'sweetalert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


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

class Kanvas_Test extends React.Component {//GetBigFrames
    constructor(props) {
        super(props);
        this.state = {
            kanvas: [],
            // Makat: '',
            // Length_Width: '',
            //  Price: '',
            // Description: '',
            isLoaded: false,
            error: null,
            file: null

        }
        this.localStorKanvas = null;
    }



    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/FinalProduct')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        kanvas: data,
                    })
                    this.props.sendDataKanvas(this.state.kanvas);
                })

                .catch(error => this.setState({ error: "There was an error in getting the kanvas" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/FinalProduct')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        kanvas: data,
                    })
                    this.props.sendDataKanvas(this.state.kanvas);
                })

                .catch(error => this.setState({ error: "There was an error in getting the kanvas" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    ChooseKanvas(kanvas) {

        var arr = [];

        this.localStorKanvas = {
            ServiceCode: 5,
            Length_Width: kanvas.Length_Width,
            Price: kanvas.Price,
            Makat: kanvas.Makat,
            Description: kanvas.Description,
            Image: kanvas.Image,

        };

        if (JSON.parse(localStorage.getItem('myDataServies') !== null)) {
            arr = JSON.parse(localStorage.getItem('myDataServies'));
        }

        arr.push(this.localStorKanvas);
        localStorage.setItem('myDataServies', JSON.stringify(arr));
        swal("הפריט נוסף לסל הקניות!", "", "success");
    }


    Addservices(kanvas) {

        var arr = [];

        this.localStorKanvas = {
            ServiceCode: 5,
            Length_Width: kanvas.Length_Width,
            Price: kanvas.Price,
            Makat: kanvas.Makat,
            Description: kanvas.Description,
            Image: kanvas.Image,

        };

        if (JSON.parse(localStorage.getItem('myDataServies') !== null)) {
            arr = JSON.parse(localStorage.getItem('myDataServies'));
        }

        arr.push(this.localStorKanvas);
        localStorage.setItem('myDataServies', JSON.stringify(arr));

        swal("הפריט נוסף לסל הקניות!", "", "success");
    }

    render() {



        if (this.state.kanvas.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (

                <React.Fragment>
                    <main>
                        <div>
                            <div>
                                <h1 style={{ textAlign: "center" }} >גלריית תמונות קנבס</h1>
                                <hr style={{ marginLeft: "30%", marginRight: "30%" }} />
                                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                    גלריית תמונות קנבס ע"פ גדלים, מחירים וסוגים.
                                </Typography>
                            </div>
                        </div>
                        <div className={[styles.layout, styles.cardGrid]} style={{ marginLeft: "1.5%", marginRight: "1.5%", paddingLeft: "5px", paddingRight: "0", textAlign: "center" }}>

                            {/* {classNames(classes.layout, classes.cardGrid)} */}
                            {/* End hero unit */}
                            <Grid container spacing={40}>
                                {this.state.kanvas.map((card, i) => (
                                    <Grid item key={i} sm={6} md={4} lg={2} >
                                        <Card style={{ width: 200 }} key={i} sm={6} md={4} lg={4} className="cardsKanvas">

                                            <CardMedia style={{ height: 150 }}

                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="80%"
                                                // width="10"
                                                image={"http://proj.ruppin.ac.il/bgroup81/test2/bar_images/" + card.Image}
                                                //image={"http://proj.ruppin.ac.il/bgroup81/test2/imagesProj/" + card.Image}
                                                title="Contemplative Reptile"

                                            />
                                            <hr></hr>
                                            <CardContent className={styles.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {card.Description}
                                                </Typography>
                                                <Typography>
                                                    קוד תמונת קנבס: {card.Makat}<br />
                                                    גודל: {card.Length_Width}<br />
                                                    מחיר: {card.Price} ש"ח
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button variant="outlined" size="small" color="secondary" onClick={() => this.Addservices(card)} >
                                                    <AddShoppingCartIcon /> הוסף לעגלת הקניות
                                                </Button>

                                            </CardActions>
                                        </Card>
                                        <br></br>

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




export default Kanvas_Test;

