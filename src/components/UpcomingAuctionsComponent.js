import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, Typography, CircularProgress} from '@material-ui/core';
import {addUpcomingAuction, getUpcomingAuctions} from "../apis/upcomingAuctions";
import {Pagination, PaginationItem} from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import Toaster from "./Toaster";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        backgroundColor: '#ffffff', // White background
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow
        // margin: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4)
    },
    image: {
        width: 140,
        height: 70,
        padding: 15,
        marginRight: theme.spacing(1),
        backgroundColor: "#1D242A",
    },
    marginBottomSM: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2),
        },
    },
    leftContent: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    textStyling: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing(3)
    },
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
        },
    },
    pagination: {
        '& .MuiPaginationItem-page': {
            color: "#B21F18",
            backgroundColor: "white",
            margin: theme.spacing(0.5), // Add spacing between page numbers
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'white', // Change background color on hover
            },
        },
        '& .Mui-selected': {
            fontWeight: 'bold',
            backgroundColor: 'white !important'
        },
        '& .MuiPaginationItem-icon': {
            background: '#B21F18',
            padding: "7px",
            borderRadius: 2,
            color: "white"
        },
    },
}));

const UpcomingAuctionsComponent = ({}) => {

    const classes = useStyles();

    const [state, setState] = useState({
        auctions: [],
        count: 0,
        page: 0,
        toasterColor: "success",
        toasterMessage: ``,
        loading: false,
        btnLoading: false,
        currIndex: null
    })

    useEffect(() => {
        const anonymousFunc = async () => {

            try {

                setState({...state, loading: true})

                let auctions = await getUpcomingAuctions(0)

                setState({
                    ...state,
                    auctions: auctions?.data?.upcomingAuctions ? auctions.data.upcomingAuctions : [],
                    count: auctions?.data?.count ? auctions.data.count : 0,
                    loading: false
                })

            } catch (e) {
                setState({...state, loading: false, toasterColor: "error", toasterMessage: "Error while loading data"})
                console.log(e.message)
            }
        }
        anonymousFunc()
    }, [])

    const handleChangePage = async (event, page) => {

        try {

            setState({...state, loading: true})

            let auctions = await getUpcomingAuctions(page - 1)

            setState({
                ...state,
                page: page - 1,
                auctions: auctions?.data?.upcomingAuctions ? auctions.data.upcomingAuctions : [],
                count: auctions?.data?.count ? auctions.data.count : 0,
                loading: false
            })

            window.scrollTo(0, 100)

        } catch (e) {
            setState({...state, loading: false, toasterColor: "error", toasterMessage: "Error while loading data"})
            console.log(e.message)
        }
    }

    const dateFormat = (dateStr, showTime = false) => {

        const date = new Date(dateStr);

        const options = showTime ? {weekday: 'long'} : {day: 'numeric', month: 'long'}
        const day = date.toLocaleDateString('en-US', options);
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        const time = ((hours + 11) % 12 + 1) + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + amPM;

        if (showTime) {
            return `${day}, ${time}`
        } else {
            return `${day} ${year}`
        }
    }

    const handleSubmit = async (event) => {

        try {

            const data = {
                startDateTime: event['startDateTime'],
                endDateTime: event['endDateTime'],
                meetingUrl: event['Meeting Url'],
                admin: false,
                eventId: event._id,
            }

            let res = await addUpcomingAuction(data)

            if (res && res.success) {
                setState({
                    ...state,
                    toasterColor: "success",
                    toasterMessage: `Event Added To Calendar Successfully`,
                });
            }
        } catch (e) {
            setState({
                ...state,
                toasterColor: "error",
                toasterMessage: `Error while Adding Event To Calendar Successfully`,
            });
            console.log(e.message, 'error while adding event')
        }

    }

    const removeToaster = () => {
        setState({...state, toasterColor: 'success', toasterMessage: ""})
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.textStyling}>
                <Grid item>
                    <Typography
                        textAlign={"center"}
                        variant="h4"
                        component="h4"
                        style={{
                            fontSize: "35px",
                            lineHeight: "48px",
                            // letterSpacing: "3px",
                            fontWeight: 600,
                            fontFamily: "Inter",
                        }}
                    >
                        Upcoming Auctions
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.textStyling}>
                <Grid item sm={2}/>
                <Grid item sm={8}>
                    <Typography
                        style={{
                            fontSize: "17px",
                            color: "#889099",
                            lineHeight: "28px",
                            fontWeight: 400,
                            fontFamily: "Inter",
                            textAlign: "center"
                        }}
                        variant="body1"
                        textAlign={"center"}
                    >
                        Mark the dates and bid for our next upcoming auctions.
                    </Typography>
                </Grid>
                <Grid item sm={2}/>
            </Grid>
            {(state.auctions && state.auctions.length > 0 && !state.loading) ? state.auctions.map((elem, ind) =>
                (
                    <>
                        <Grid container className={classes.container}>
                            <Grid item xs={12} sm={8} md={8} className={classes.marginBottomSM}>
                                {/* Left side */}
                                <Grid container alignItems="center" spacing={2} className={classes.leftContent}>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <img src={"/logo.svg"} alt="Image" className={classes.image}/>
                                    </Grid>
                                    <Grid item xs={12} md={8} lg={9}>
                                        <Typography variant="h4"
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "#B21F18",
                                                        lineHeight: "40px",
                                                        fontWeight: 700,
                                                        fontFamily: "Inter",
                                                        marginBottom: "5px"
                                                    }}>{dateFormat(elem['Starts At'], false)}</Typography>

                                        <Typography variant="body1"
                                                    style={{
                                                        fontSize: "18px",
                                                        color: "#1D242A",
                                                        lineHeight: "24px",
                                                        fontWeight: 600,
                                                        fontFamily: "Inter",
                                                        marginBottom: "5px"
                                                    }}
                                        >{dateFormat(elem['Starts At'], true)}</Typography>
                                        <Typography variant="body1"
                                                    style={{
                                                        fontSize: "15px",
                                                        color: "#A0A0A0",
                                                        lineHeight: "28px",
                                                        fontWeight: 400,
                                                        fontFamily: "Inter"
                                                    }}
                                        >
                                            {elem['Description']}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                {/* Right side */}
                                <Grid container direction="column" alignItems="flex-end">
                                    <Grid item className={classes.buttonsContainer}>
                                        <Button
                                            style={{
                                                border: "1px solid #B21F18",
                                                color: "#B21F18",
                                                fontSize: "15x",
                                                lineHeight: "24px",
                                                fontWeight: 500,
                                                fontFamily: "Inter",
                                                borderRadius: 1
                                            }}
                                            onClick={async (e) => {
                                                try {
                                                    if (elem['Catalogue Pdf Url']) {

                                                        setState({...state, currIndex: ind, btnLoading: true})

                                                        const response = await axios.get(`https://swiftproperty.triolabz.com/apis/${elem['Catalogue Pdf Url']}`, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            },
                                                            responseType: "blob"
                                                        });

                                                        if (response && response.data) {
                                                            fileDownload(response.data, `file.pdf`)
                                                            setState({...state, btnLoading: false})
                                                        } else {
                                                            setState({
                                                                ...state,
                                                                btnLoading: false,
                                                                toasterColor: "error",
                                                                toasterMessage: "Unable To Download File!",
                                                                currIndex: null,
                                                            })
                                                        }

                                                    } else {
                                                        setState({
                                                            ...state,
                                                            toasterColor: "error",
                                                            toasterMessage: "No File Link Found!",
                                                            btnLoading: false,
                                                            currIndex: null
                                                        })
                                                    }
                                                } catch (e) {
                                                    setState({
                                                        ...state,
                                                        toasterColor: "error",
                                                        toasterMessage: "No File Link Found!",
                                                        btnLoading: false,
                                                        currIndex: null
                                                    })
                                                    console.log('error while downloading file', e.message)
                                                }
                                            }}
                                            className={classes.button}>{state.btnLoading && state.currIndex === ind ?
                                            <CircularProgress size={20}/> : "View Catalogue"}</Button>
                                    </Grid>
                                    <Grid item className={classes.buttonsContainer}>
                                        <Button
                                            style={{
                                                backgroundColor: "#1D242A",
                                                fontSize: "15x",
                                                color: "white",
                                                lineHeight: "24px",
                                                fontWeight: 500,
                                                fontFamily: "Inter",
                                                borderRadius: 1
                                            }}
                                            className={classes.button}
                                            onClick={(e) => handleSubmit(elem)}>Add to Calendar</Button>
                                        <Button
                                            style={{
                                                backgroundColor: "#B21F18",
                                                fontSize: "15x",
                                                color: "white",
                                                lineHeight: "24px",
                                                fontWeight: 500,
                                                fontFamily: "Inter",
                                                borderRadius: 1,
                                                padding: "10px"
                                            }}
                                            className={classes.button}>Register to Bid</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )) : !!state.loading ? (
                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CircularProgress/>
                    </div>) :
                (<div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography color="textSecondary" gutterBottom textAlign={'center'}>
                        No Content To show
                    </Typography>
                </div>)}

            <Grid container spacing={2}>
                <Grid item md={1}/>
                <Grid item xs={10} style={{display: "flex", justifyContent: "center"}}>
                    <Pagination
                        classes={{root: classes.pagination}}
                        count={Math.ceil(state.count / 20)}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                                {...item}
                            />
                        )}
                    />
                </Grid>
                <Grid item md={1}/>
            </Grid>

            {state.toasterMessage &&
                <Toaster message={state.toasterMessage} removeToaster={removeToaster} severity={state.toasterColor}/>}
        </div>
    );
};

export default UpcomingAuctionsComponent;
