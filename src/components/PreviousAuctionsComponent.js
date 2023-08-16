import React, {useEffect, useState} from 'react';
import {Grid, Card, CardContent, Typography, Pagination, PaginationItem} from '@mui/material';
import {styled} from '@mui/material/styles';
import {getPreviousAuctions} from "../apis/previousAuctions";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useStyles = styled((theme) => ({
    flag: {
        position: 'absolute',
        top: theme.spacing(1),
        padding: theme.spacing(0.5),
        left: theme.spacing(1),
        backgroundColor: '#B21F18',
        color: '#fff',
        borderRadius: 4,
        zIndex: 1,
        fontSize: "1rem"
    },
    card: {
        marginBottom: theme.spacing(2),
        position: 'relative',
    },
    valueContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: theme.spacing(2),
        rowGap: theme.spacing(1),
    },
    borderRight: {
        borderRight: "1px solid grey",
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
    image: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
    },
    textStyling: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing(3)
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
const PreviousAuctionsComponent = ({offset = 20}) => {

    const [state, setState] = useState({
        auctions: [],
        count: 0,
        page: 0,
        loading: false
    })

    useEffect(() => {
        const anonymousFunc = async () => {
            try {

                setState({...state, loading: true})

                let auctions = await getPreviousAuctions(0, offset)

                setState({
                    ...state,
                    auctions: auctions?.data?.auctions ? auctions.data.auctions : [],
                    count: auctions?.data?.count ? auctions.data.count : 0,
                    loading: false
                })

            } catch (e) {
                console.log(e.message)
                setState({...state, loading: false})
            }
        }
        anonymousFunc()
    }, [])

    const handleChangePage = async (event, page) => {

        try {

            setState({...state, loading: true})

            let auctions = await getPreviousAuctions(page - 1)

            setState({
                ...state,
                page: page - 1,
                auctions: auctions?.data?.auctions ? auctions.data.auctions : [],
                count: auctions?.data?.count ? auctions.data.count : 0,
                loading: false
            })

            window.scrollTo(0, 100)

        } catch (e) {
            setState({...state, loading: false})
            console.log(e.message)
        }
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.textStyling}>
                <Grid item>
                    <Typography variant="h4" component="h4">
                        {"Previous Auctions"}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.textStyling}>
                <Grid item>
                    <Typography
                        style={{
                            fontSize: "17px",
                            color: "#889099",
                            lineHeight: "28px",
                            fontWeight: 400,
                            fontFamily: "Inter"
                        }}
                        variant="body1" component="h4" gutterBottom>
                        View the results of previous auctions.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {(state.auctions && state.auctions.length > 0 && !state.loading) ? state.auctions.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                        <Card className={classes.card}>
                            {item.isLatest && (
                                <div className={classes.flag}>
                                    <Typography variant="caption">Latest Results</Typography>
                                </div>
                            )}

                            <img src={"https://swiftproperty.triolabz.com/apis/" + item['Image Url']} alt="Card"
                                 className={classes.image}/>
                            <CardContent>
                                <div className={classes.valueContainer}>
                                    <div className={classes.borderRight}>
                                        <Typography variant="body1"
                                                    textAlign={'center'}
                                                    style={{
                                                        fontSize: "15px",
                                                        color: "#1D242A",
                                                        lineHeight: "28px",
                                                        fontWeight: 600,
                                                        fontFamily: "Inter"
                                                    }}>Auction
                                            Date</Typography>
                                        <Typography
                                            textAlign={'center'}
                                            style={{
                                                fontSize: "15px",
                                                color: "#889099",
                                                lineHeight: "28px",
                                                fontWeight: 400,
                                                fontFamily: "Inter"
                                            }}
                                            variant="body1">{item['Date']}</Typography>
                                    </div>
                                    <div className={classes.borderRight}>
                                        <Typography textAlign={'center'} variant="body1" style={{
                                            fontSize: "15px",
                                            color: "#1D242A",
                                            lineHeight: "28px",
                                            fontWeight: 600,
                                            fontFamily: "Inter"
                                        }}>Sale
                                            Rate</Typography>
                                        <Typography
                                            textAlign={'center'}
                                            style={{
                                                fontSize: "15px",
                                                color: "#889099",
                                                lineHeight: "28px",
                                                fontWeight: 400,
                                                fontFamily: "Inter"
                                            }}
                                            variant="body1">{item["Sale Rate"] + " %"}</Typography>
                                    </div>
                                    <div>
                                        <Typography textAlign={'center'} variant="body1" style={{
                                            fontSize: "15px",
                                            color: "#1D242A",
                                            lineHeight: "28px",
                                            fontWeight: 600,
                                            fontFamily: "Inter"
                                        }}>Total
                                            Raised</Typography>
                                        <Typography
                                            textAlign={'center'}
                                            style={{
                                                fontSize: "15px",
                                                color: "#889099",
                                                lineHeight: "28px",
                                                fontWeight: 400,
                                                fontFamily: "Inter"
                                            }}
                                            variant="body1">{"$ " + item['Total Raised']}</Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : !!state.loading ? (
                        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <CircularProgress/>
                        </div>) :
                    (<div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography color="textSecondary" gutterBottom textAlign={'center'}>
                            No Content To show
                        </Typography>
                    </div>)}
            </Grid>

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

        </div>
    );
};

export default PreviousAuctionsComponent;
