import React, {useEffect, useState, useContext} from "react"
import {styled} from "@mui/material/styles"
import {
    Breadcrumbs,
    Button,
    Card,
    Grid,
    IconButton,
    Typography
} from "@mui/material"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {useParams} from "react-router"
import {getLot} from "../apis/lots"
import fileDownload from "js-file-download"
import axios from "axios"
import Toaster from "../components/Toaster"
import CopyrightSection from "../components/CopyrightSection"
import {MyContext} from "../context"
import {Link} from "react-router-dom"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import {RedButton} from "../components/Buttons/redButton"
import SwiperControls from "../components/Swip"

const useStyles = styled((theme) => ({
    container: {
        padding: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
        }
    },
    breadcrumbs: {
        marginBottom: theme.spacing(2)
    },
    title: {
        fontWeight: "bold",
        marginBottom: theme.spacing(2)
    },
    description: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4)
    },
    buttonsContainer: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(2),
        backgroundColor: "#1D242A",
        color: "white"
    },
    price: {
        fontWeight: "bold",
        color: "#B21F18"
    },
    image: {
        width: "100%",
        height: "auto",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    featureContainer: {
        marginBottom: theme.spacing(2)
    },
    featureTitle: {
        fontWeight: "bold",
        marginBottom: theme.spacing(1)
    },
    featureList: {
        paddingLeft: theme.spacing(2)
    },
    columnContainer: {
        marginBottom: theme.spacing(2)
    },
    columnTitle: {
        fontWeight: "bold",
        marginBottom: theme.spacing(1)
    },
    rightComponentContainer: {
        display: "flex",
        borderBottom: "1px solid #80808047",
        margin: theme.spacing(2),
        paddingLeft: "10px"
    },
    rightComponentImage: {
        width: "52px",
        objectFit: "cover",
        paddingBottom: theme.spacing(2),
        marginRight: theme.spacing(3)
    },
    btnDiv: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: '2rem 0 !important'
    }
}))

const LotsDetails = ({}) => {
    const classes = useStyles()

    const {sharedData, updateSharedData} = useContext(MyContext)

    const [state, setState] = useState({
        breadcrumbs: [
            {
                title: sharedData === "current" ? "Current Lots" : "Available Lots",
                route: sharedData === "current" ? "/currentlots" : "/availablelots"
            }
        ],
        pageTitle: "",
        description: "",
        buttons: [
            {title: "Download Legal Pack", legalPackPdf: "", item: ["legalPackPdf"]},
            {
                title: "View Details as Pdf",
                detailsPdf: "",
                item: ["detailsPdf"]
            },
            {title: "View Map", route: ""},
            {
                title: "Finance Available",
                financeDetailPdf: "",
                item: ["financeDetailPdf"]
            }
        ],
        price: "",
        descriptionTitle: "Description",
        descriptionText: "",
        imageUrl: "",
        rightComponents: [
            {
                image: "/bed.svg",
                title: "Bed Rooms",
                bedRooms: 0,
                item: ["bedRooms"]
            },
            {
                image: "/living.svg",
                title: "Drawing Rooms",
                drawingRooms: 0,
                item: ["drawingRooms"]
            },
            {
                image: "/bath.svg",
                title: "Bath Rooms",
                bathRooms: 0,
                item: ["bathRooms"]
            },
            {
                image: "/car.svg",
                title: "Parking Slots",
                parkingSlots: 0,
                item: ["parkingSlots"]
            },
            {
                image: "/drawing.svg",
                title: "Living Rooms",
                livingRooms: 0,
                item: ["livingRooms"]
            },
            {
                image: "/kitchens.svg",
                title: "Kitchens",
                kitchens: 0,
                item: ["kitchens"]
            }
        ],
        detailsPdf: "",
        financeDetailPdf: "",
        otherDetails: "",
        legalPackPdf: ""
    })

    const {id} = useParams()

    useEffect(() => {
        const anonymousFunc = async () => {
            try {
                const lotDetails = await getLot(id)

                const {
                    address,
                    price,
                    propertyImage,
                    detailsPdf,
                    financeDetailPdf,
                    propertyType,
                    description,
                    disclaimer,
                    otherDetails,
                    bedRooms,
                    bathRooms,
                    parkingSlots,
                    drawingRooms,
                    livingRooms,
                    kitchens,
                    legalPackPdf,
                    mapLink
                } = lotDetails && lotDetails.data ? lotDetails.data : {}

                const rightComponents = state.rightComponents.map((el) => {
                    if (el.hasOwnProperty("bedRooms")) {
                        return {...el, bedRooms}
                    } else if (el.hasOwnProperty("bathRooms")) {
                        return {...el, bathRooms}
                    } else if (el.hasOwnProperty("parkingSlots")) {
                        return {...el, parkingSlots}
                    } else if (el.hasOwnProperty("drawingRooms")) {
                        return {...el, drawingRooms}
                    } else if (el.hasOwnProperty("livingRooms")) {
                        return {...el, livingRooms}
                    } else if (el.hasOwnProperty("kitchens")) {
                        return {...el, kitchens}
                    }
                })

                const buttons = state.buttons.map((el) => {
                    if (el.hasOwnProperty("legalPackPdf")) {
                        return {...el, legalPackPdf}
                    } else if (el.hasOwnProperty("detailsPdf")) {
                        return {...el, detailsPdf}
                    } else if (el.hasOwnProperty("financeDetailPdf")) {
                        return {...el, financeDetailPdf}
                    } else if (el.hasOwnProperty("route")) {
                        return {...el, route: mapLink}
                    }
                    return {...el}
                })

                setState({
                    ...state,
                    breadcrumbs: [...state.breadcrumbs, {title: address}],
                    pageTitle: address ? address : "No address Found",
                    description: description ? description : "No description Found",
                    price: price,
                    descriptionText: description ? description : "Nothing Found",
                    disclaimer: disclaimer ? disclaimer : "Nothing Found",
                    imageUrl: propertyImage,
                    detailsPdf: detailsPdf ? detailsPdf : "",
                    financeDetailPdf: financeDetailPdf ? financeDetailPdf : "",
                    otherDetails: otherDetails ? otherDetails : "",
                    legalPackPdf: legalPackPdf ? legalPackPdf : "",
                    rightComponents: rightComponents,
                    buttons: buttons
                })

                window.scrollTo(0, 0)
            } catch (e) {
                console.log(e.message)
            }
        }
        anonymousFunc()
    }, [])

    const removeToaster = () => {
        setState({...state, toasterColor: "success", toasterMessage: ""})
    }

    return (
        <>
            <NavbarWrapper/>
            <div
                style={{
                    background:
                        sharedData && sharedData === "current"
                            ? "url(/currentlots_main.png)"
                            : "url(/availablelots_main.png)",
                    backgroundSize: "cover"
                }}
            >
                <HeaderContent
                    title={
                        sharedData && sharedData === "current"
                            ? "Current Lots"
                            : "Available Lots"
                    }
                    description={""}
                />
            </div>
            <Grid container>
                <Grid item md={1}/>
                <Grid item xs={12} md={10}>
                    <div className={classes.container}>
                        <Grid container alignItems="center" className={classes.breadcrumbs}>
                            <Breadcrumbs aria-label="breadcrumb">
                                {state.breadcrumbs.map((breadcrumb, index) => (
                                    <Typography
                                        style={{
                                            fontSize: "12x",
                                            color:
                                                index + 1 === state.breadcrumbs.length
                                                    ? "#B21F18"
                                                    : "#A0A0A0",
                                            lineHeight: "24px",
                                            fontWeight: 400,
                                            fontFamily: "Inter",
                                            cursor: "pointer",
                                            textDecoration: "none"
                                        }}
                                        to={breadcrumb.route}
                                        component={Link}
                                        key={index}
                                        color="textSecondary"
                                    >
                                        {breadcrumb.title}
                                    </Typography>
                                ))}
                            </Breadcrumbs>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography
                                    style={{
                                        fontSize: "30px",
                                        color: "#1D242A",
                                        lineHeight: "40px",
                                        fontWeight: 600,
                                        fontFamily: "Inter"
                                    }}
                                    variant="h5"
                                    className={classes.title}
                                >
                                    {state.pageTitle}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton style={{padding: "5px"}}>
                                    <img src={"/love.svg"} alt={"share"}/>
                                </IconButton>
                                <IconButton style={{padding: "5px"}}>
                                    <img src={"/share.svg"} alt={"share"}/>
                                </IconButton>
                                <Typography
                                    variant="h4"
                                    style={{
                                        fontSize: "17px",
                                        color: "#1D242A",
                                        lineHeight: "28px",
                                        fontWeight: 600,
                                        fontFamily: "Inter"
                                    }}
                                >
                                    {"Guide Price *"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={classes.buttonsContainer}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                {state.buttons.map((button, index) => (
                                    <Button
                                        style={{
                                            fontSize: "15x",
                                            color: "white",
                                            lineHeight: "24px",
                                            fontWeight: 500,
                                            fontFamily: "Inter",
                                            borderRadius: 4,
                                            padding: "7px 15px",
                                            background: "#1D242A"
                                        }}
                                        key={index}
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={async (e) => {
                                            try {
                                                if (
                                                    button.title !== "View Map" &&
                                                    button[button.item[0]]
                                                ) {
                                                    const response = await axios.get(
                                                        `https://swiftproperty.triolabz.com/apis/${
                                                            button[button.item[0]]
                                                        }`,
                                                        {
                                                            headers: {
                                                                "Content-Type": "multipart/form-data"
                                                            },
                                                            responseType: "blob"
                                                        }
                                                    )

                                                    if (response && response.data) {
                                                        fileDownload(response.data, `file.pdf`)
                                                    } else {
                                                        setState({
                                                            ...state,
                                                            toasterColor: "error",
                                                            toasterMessage: "Unable To Download File!"
                                                        })
                                                    }
                                                } else {
                                                    if (button.title === "View Map") {

                                                        if (button.route) {
                                                            window.open(button.route, '_blank')
                                                        } else {
                                                            setState({
                                                                ...state,
                                                                toasterColor: "error",
                                                                toasterMessage: "Map Link Not Found!"
                                                            })
                                                        }

                                                    } else {
                                                        setState({
                                                            ...state,
                                                            toasterColor: "error",
                                                            toasterMessage: "No File Link Found!"
                                                        })
                                                    }
                                                }
                                            } catch (e) {
                                                setState({
                                                    ...state,
                                                    toasterColor: "error",
                                                    toasterMessage: "Something went wrong!"
                                                })
                                                console.log("error while downloading", e.message)
                                            }
                                        }}
                                    >
                                        {button.title}
                                    </Button>
                                ))}
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h4"
                                    style={{
                                        fontSize: "35px",
                                        color: "#B21F18",
                                        lineHeight: "28px",
                                        fontWeight: 700,
                                        fontFamily: "Inter",
                                        marginRight: "20px"
                                    }}
                                    className={classes.price}
                                >
                                    {"$" + state.price}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div className={classes.imageContainer}>
                            {state.imageUrl && <SwiperControls images={state.imageUrl}/>}
                        </div>
                        <Typography
                            variant="body2"
                            className={classes.description}
                            style={{
                                fontSize: "16px",
                                color: "#889099",
                                lineHeight: "28px",
                                fontWeight: 400,
                                fontFamily: "Inter"
                            }}
                        >
                            {state.description}
                        </Typography>
                        <Grid container className={classes.columnContainer}>
                            <Grid item xs={12} sm={8}>
                                <Typography
                                    variant="h6"
                                    className={classes.columnTitle}
                                    style={{
                                        fontSize: "25px",
                                        color: "#1D242A",
                                        lineHeight: "48px",
                                        fontWeight: 600,
                                        fontFamily: "Inter"
                                    }}
                                    gutterBottom
                                >
                                    {state.descriptionTitle}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    style={{
                                        fontSize: "16px",
                                        color: "#889099",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        fontFamily: "Inter"
                                    }}
                                >
                                    {state.descriptionText}
                                </Typography>
                                {state.features && state.features.length > 0 && (
                                    <div className={classes.featureContainer}>
                                        <Typography variant="h6" className={classes.featureTitle}>
                                            {state.featureTitle}
                                        </Typography>
                                        <ul className={classes.featureList}>
                                            {state.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Grid>
                            <Grid item sm={1}/>
                            <Grid item xs={12} sm={3} className={classes.featureCompGrid}>
                                <Card>
                                    {state.rightComponents.map((component, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                ...(state.rightComponents.length === index + 1 && {
                                                    marginBottom: "0 !important",
                                                    borderBottom: "none"
                                                })
                                            }}
                                            className={classes.rightComponentContainer}
                                        >
                                            <img
                                                src={component.image}
                                                alt="Right Component"
                                                className={classes.rightComponentImage}
                                            />
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    fontSize: "20px",
                                                    color: "#1D242A",
                                                    lineHeight: "40px",
                                                    fontWeight: 600,
                                                    fontFamily: "Inter"
                                                    //paddingLeft: "17px"
                                                }}
                                            >
                                                {component[component.item[0]] + " " + component.title}
                                            </Typography>
                                        </div>
                                    ))}
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    style={{
                                        fontSize: "25px",
                                        color: "#1D242A",
                                        lineHeight: "48px",
                                        fontWeight: 600,
                                        fontFamily: "Inter"
                                    }}
                                >
                                    Additional Fees and Disclaimer
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    style={{
                                        fontSize: "16px",
                                        color: "#889099",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        fontFamily: "Inter"
                                    }}
                                >
                                    {state.disclaimer}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    style={{
                                        fontSize: "25px",
                                        color: "#1D242A",
                                        lineHeight: "48px",
                                        fontWeight: 600,
                                        fontFamily: "Inter"
                                    }}
                                >
                                    Other Details
                                </Typography>
                                <Typography
                                    style={{
                                        fontSize: "16px",
                                        color: "#889099",
                                        lineHeight: "28px",
                                        fontWeight: 400,
                                        fontFamily: "Inter"
                                    }}
                                    variant="body2"
                                    gutterBottom
                                >
                                    {state.otherDetails}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item md={1}/>
                <div className={classes.btnDiv}>
                    <RedButton sx={{marginRight: '2rem !important'}}>Register to Bid</RedButton>
                    <RedButton>Enquire Now</RedButton>
                </div>
            </Grid>
            <EmailSubscription/>
            <Footer />

            <CopyrightSection/>

            {state.toasterMessage && (
                <Toaster
                    message={state.toasterMessage}
                    removeToaster={removeToaster}
                    severity={state.toasterColor}
                />
            )}
        </>
    )
}

export default LotsDetails