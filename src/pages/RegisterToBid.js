import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {styled} from "@mui/material/styles"
import {Button, Grid, Typography, Card, CardContent} from "@mui/material"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import { RedButton } from "../components/Buttons/redButton"

const useStyles = styled((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8)
    }
  },
  btnDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: '2rem 0'
  },
  marginLeftLg: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(6)
    }
  },
  textStyling: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3)
  },
  card: {
    maxWidth: 400,
    margin: "auto",
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" // Add box shadow style
  },
  normalText: {
    color: "#889099",
    fontFamily: "Inter",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "28px"
  }
}))

const cardsData = [
  {
    title: "Telephone Bidding",
    list: [
      "Fast track system for registering to bid at in-room auctions",
      "Fast track system for accessing legal documents",
      "Bid for properties on our online auctions",
      "Save time re-entering your details on auctioneer web sites",
      "Email document link direct to your solicitor",
      "Direct access to previously viewed legal documents",
      "View auctions live online"
    ]
  },
  {
    title: "Internet Bidding",
    list: [
      "Fast track system for registering to bid at in-room auctions",
      "Fast track system for accessing legal documents",
      "Bid for properties on our online auctions",
      "Save time re-entering your details on auctioneer web sites",
      "Email document link direct to your solicitor",
      "Direct access to previously viewed legal documents",
      "View auctions live online"
    ]
  },
  {
    title: "Proxy Bidding",
    list: [
      "Fast track system for registering to bid at in-room auctions",
      "Fast track system for accessing legal documents",
      "Bid for properties on our online auctions",
      "Save time re-entering your details on auctioneer web sites",
      "Email document link direct to your solicitor",
      "Direct access to previously viewed legal documents",
      "View auctions live online"
    ]
  }
]

const RegisterToBid = (second) => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div
        style={{background: "url(/register_main.png)", backgroundSize: "cover"}}
      >
        <HeaderContent title={"Register To Bid"} description={""} />
      </div>
      <div className={classes.root}>
        <Typography
          variant="h4"
          component="h4"
          style={{
            fontSize: "35px",
            lineHeight: "48px",
            fontWeight: 600,
            fontFamily: "Inter",
            textAlign: "center",
            marginBottom: '3rem'
          }}
        >
          Guide to Online Property Auctions and Bidding
        </Typography>

        <Grid item xs={12}>
          <Grid item sm={12} md={1} />
          <Grid container justifyContent="center" spacing={5}>
            {cardsData.map((item, index) => (
              <Grid key={index} item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      style={{
                        fontSize: "25px",
                        color: "#B21F18",
                        lineHeight: "48px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        textAlign: "center"
                      }}
                    >
                      {item.title}
                    </Typography>
                    <ul>
                      {item.list.map((item) => (
                        <li className={classes.normalText}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid item sm={12} md={1} />
        </Grid>

        <div className={classes.btnDiv}>
          <RedButton variant="contained">
            Register to Bid
          </RedButton>
        </div>
      </div>
      <EmailSubscription />
      <Footer />
      <CopyrightSection />
    </>
  )
}

export default RegisterToBid
