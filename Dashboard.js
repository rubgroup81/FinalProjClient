import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";


const images = [
    {
        url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic4.jpg',
        title: 'מסגור תמונה',
        width: '49%',
        linkTo: 'WizFramingPic',
    },
    {
        url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic3.jpg',
        title: 'מסגור מראה',
        width: '49%',
        linkTo: 'WizFramingMirror',
    },
    {
        url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/glass1.jpg',
        title: 'חיתוך זכוכית/מראה',
        width: '49%',
        linkTo: 'CutMirrorGlass',
    },
    {
        url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/picKanvas.jpg',
        title: 'תמונות קנבס',
        width: '49%',
        linkTo: 'Kanvas_Test',
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 100,
        width: '100%',
        backgroundImage: './images/architecture-attractive-background-988873.jpg',
    },
    image: {
        position: 'relative',
        height: 250,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: '100%',
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

export default function ButtonBases() {
    const classes = useStyles();

    return (
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
            <div style={{ textAlign: "center", textShadow: "2px 2px rgba(103, 101, 107, 0.390)" }}>
                <h1>אבי רוקשין</h1>
                <h2>מסגור, מראות ותמונות</h2>
            </div>
            {images.map(image => (
                <ButtonBase
                    component={Link} to={"./" + image.linkTo}

                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        position: 'relative',
                        height: 250,
                        width: image.width,
                        border: "3px solid white",
                    }}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image.url})`,
                            border: "15px solid rgba(70, 70, 73, 0.411)",
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}

                        >
                            {image.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
    );
}
