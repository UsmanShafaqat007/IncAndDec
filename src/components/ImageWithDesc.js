import React from 'react';
import {styled} from '@mui/material/styles';
import {Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {FiberManualRecord} from "@mui/icons-material";

const useStyles = styled((theme) => ({
    root: {
        marginTop: '150px',
        // marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2)

    },
    card: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '50px',
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: '60px',
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor: '#1D242A0D',
    },
    imageLeft: {
        width: '90%',
        height: 'auto',
        marginLeft: "20px"
    },
    imageRight: {
        [theme.breakpoints.up('md')]: {
            width: '90%',
        },
        [theme.breakpoints.down('md')]: {
            width: '70%',
        },

        height: 'auto',
    },
    heading: {
        marginBottom: '5px',
        marginTop: "10px"
    },
    paragraph: {
        marginBottom: '10px',
    },
    contentCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pl100SM: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(10), // Add paddingLeft from 1024px and above
        },
    },
    listItem: {
        marginBottom: theme.spacing(1),
    },
    icon: {
        fontSize: '1rem',
    },
    featureList: {
        paddingLeft: theme.spacing(2),
    },
}));

const ImageWithDesc = ({
                           features = [],
                           index,
                           imageSrc,
                           heading,
                           paragraph1,
                           paragraph2,
                           imageFirst,
                           list,
                           paragraph3 = '',
                           features2,
                           features1,
                           heading1,
                           heading2,
                           features3
                       }) => {

    const classes = useStyles();

    const cardContent = (addClass = false) => {
        return (
            <div className={addClass ? classes.pl100SM : ""}>
                <Typography variant={'h4'} fontWeight={'bold'} gutterBottom
                            className={classes.heading}
                            style={{
                                fontSize: "40px",
                                lineHeight: "48px",
                                fontWeight: 600,
                                fontFamily: "Inter",
                                color: "#1D242A",
                                marginBottom: "20px"
                            }}
                >{heading}</Typography>

                <Typography variant={"body1"} gutterBottom style={{
                    fontSize: "18px",
                    lineHeight: "25px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    color: "#889099",
                    marginBottom: "20px",
                    whiteSpace: "break-spaces"
                }} className={classes.paragraph}>{paragraph1}</Typography>
                <Typography variant={"body1"} gutterBottom style={{
                    fontSize: "18px",
                    lineHeight: "25px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    color: "#889099",
                    marginBottom: "20px"
                }} className={classes.paragraph}>{paragraph2}</Typography>

                {features && features.length > 0 && (
                    <div className={classes.featureContainer}>
                        <ul className={classes.featureList}>
                            {features.map((feature, index) => (
                                <li
                                    style={{
                                        fontSize: "18px",
                                        color: "#889099",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        fontFamily: "Inter"
                                    }} key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>)}

                <Typography variant={"body1"} gutterBottom style={{
                    fontSize: "18px",
                    lineHeight: "25px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    color: "#889099",
                    marginBottom: "20px"
                }} className={classes.paragraph}>{paragraph3}</Typography>

                {(Array.isArray(list) && list.length > 0) && (
                    <List>
                        {list.map((item, index) => (
                            <ListItem key={index} style={{
                                fontSize: "17px",
                                lineHeight: "25px",
                                fontWeight: 400,
                                fontFamily: "Inter",
                                color: "#889099", paddingTop: "0px", paddingBottom: "0px"
                            }}
                                      className={classes.listItem}>
                                <ListItemIcon>
                                    <FiberManualRecord className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={item} className={classes.listItemText}/>
                            </ListItem>
                        ))}
                    </List>
                )}

                {featuresHeading()}
            </div>
        );
    }

    const featuresHeading = () => {
        return (
            <>
                <Typography variant={"body1"} gutterBottom style={{
                    fontSize: "18px",
                    lineHeight: "25px",
                    fontWeight: 600,
                    fontFamily: "Inter",
                    color: "#1D242A",
                    marginBottom: "20px"
                }} className={classes.paragraph}>{heading1}</Typography>

                {features1 && features1.length > 0 && (
                    <div className={classes.featureContainer}>
                        <ul className={classes.featureList}>
                            {features1.map((feature, index) => (
                                <li
                                    style={{
                                        fontSize: "18px",
                                        color: "#889099",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        fontFamily: "Inter"
                                    }} key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>)}

                <Typography variant={"body1"} gutterBottom style={{
                    fontSize: "18px",
                    lineHeight: "25px",
                    fontWeight: 600,
                    fontFamily: "Inter",
                    color: "#1D242A",
                    marginBottom: "20px"
                }} className={classes.paragraph}>{heading2}</Typography>

                {features2 && features2.length > 0 && (
                    <div className={classes.featureContainer}>
                        <ul className={classes.featureList}>
                            {features2.map((feature, index) => (
                                <li
                                    style={{
                                        fontSize: "18px",
                                        color: "#889099",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        fontFamily: "Inter"
                                    }} key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>)}
            </>
        )
    }

    return (

        <div className={index === 1 ? "" : classes.root}
             style={{background: index === 1 ? "rgba(29, 36, 42, 0.05)" : "white"}}>
            <Grid container>
                <Grid item xs={12} md={1}/>
                <Grid item xs={12} md={10}>
                    <div style={{paddingTop: index === 1 ? "30px" : "0px"}} className={classes.card}>
                        {imageFirst ? (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6} style={{marginRight: "40px"}}
                                          className={classes.contentCenter}>
                                        <img loading="lazy" src={imageSrc} alt="Your Image" className={classes.imageLeft}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5}>
                                        {cardContent(false)}
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6} lg={7}>
                                        {cardContent(true)}
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={5} className={classes.contentCenter}>
                                        <img loading="lazy" src={imageSrc} alt="Your Image" className={classes.imageRight}/>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} md={1}/>
            </Grid>

        </div>
    );
};

export default ImageWithDesc;