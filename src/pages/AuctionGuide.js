import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {makeStyles} from "@material-ui/core/styles"
import {Button, Grid} from "@material-ui/core"
import TextCard from "../components/TextCard"
import {Typography} from "@mui/material"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import {RedButton} from "../components/Buttons/redButton"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  marginLeftLg: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(6)
    }
  },
  btnDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:'2rem',
    marginTop: '2rem'
  },
  button1: {
    [theme.breakpoints.down("md")]: {
      marginTop: 0
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4)
    },
    marginBottom: theme.spacing(10),
    marginRight: theme.spacing(4),
    backgroundColor: "#B21F18",
    color: "white",
    fontSize: "15x",
    lineHeight: "24px",
    fontWeight: 500,
    fontFamily: "Inter",
    borderRadius: 1
  },
  button2: {
    [theme.breakpoints.down("md")]: {
      marginTop: 0
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4)
    },
    marginBottom: theme.spacing(10),
    backgroundColor: "#B21F18",
    color: "white",
    fontSize: "15x",
    lineHeight: "24px",
    fontWeight: 500,
    fontFamily: "Inter",
    borderRadius: 1
  },
  textStyling: {
    justifyContent: "center",
    alignItems: "center"
    // marginBottom: theme.spacing(3)
  }
}))

function AuctionGuide({mode, title}) {
  const classes = useStyles()

  const [state, setState] = React.useState({
    textCardData: []
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    if (mode && mode === "selling") {
      setState({
        ...state,
        textCardData: [
          {
            title: "The Reserve Price",
            items:
              "This represents the absolute minimum amount you are willing to accept for your property. It serves as a safeguard, ensuring that you do not have to sell your property for less than a satisfactory amount. If the reserve price is not met during the auction, the property will not be sold. However, we will continue to market the property after the auction concludes"
          },
          {
            title: "The Guide Price",
            items:
              "This is the price we publicise to prospective buyers and acts as a reference point. It provides bidders with a realistic estimation of the amount you are willing to sell your property for. The guide price is always within 10% of the reserve price, either higher or lower."
          }
        ]
      })
    } else {
      setState({
        ...state,
        textCardData: [
          {
            title: "Asking for Legal Pack",
            items:
              "Once you have viewed the property, ask the seller's solicitors to send you a copy of the legal pack. This is a bundle of documents that contains all the legal information you need to know about the property before you make a bid. The legal pack can be downloaded for free."
          },
          {
            title: "Receiving a Legal Pack",
            items:
              "Once you have received the legal pack, pass it to your own solicitors so that they can review it and advise you. Your solicitors will be able to help you understand the legal implications of the property sale and make sure that you are protected in the transaction."
          }
        ]
      })
    }
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div
        style={{background: "url(/guide_main.png)", backgroundSize: "cover"}}
      >
        <HeaderContent
          title={
            mode === "selling"
              ? "Auction Selling Guide"
              : "Auction Buying Guide"
          }
          description={""}
        />
      </div>

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
              marginTop: "100px",
              marginBottom: "2rem"
            }}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.textStyling}>
        <Grid item sm={2} />
        <Grid item sm={8}>
          <Typography
            style={{
              fontSize: "17px",
              color: "#889099",
              lineHeight: "28px",
              fontWeight: 400,
              fontFamily: "Inter",
              whiteSpace: "break-spaces"
            }}
            variant="body1"
          >
            {mode === "selling"
              ? "We are pleased to offer you a complimentary and non-binding auction appraisal for your property. Utilising our reliable and proven desktop valuation approach, we will thoroughly examine your property, assess its surroundings, review the prices at which similar homes in the vicinity have been sold, and delve further into the local market using exclusive data accessible solely to industry professionals. Our extensive experience and expertise will enable us to determine an accurate value for your property. Additionally, if you would prefer, we are more than happy to conduct an in-person valuation by visiting your property.\n"
              : "Before the auction begins, you must register ahead of time for the auction. This is an easy process and takes just a few moments. Be prepared to have your name, address, phone number, and payment information ahead of time. Generally speaking, there are multiple payment options for an online auction. Once we approve you as a bidder, you can go ahead and start bidding on your favorite's lots.\n \n We use CREDAS to verify the identity of our buyers. CREDAS is a digital identity verification platform that allows you to upload your ID and certified proof of address (if applicable) using your smartphone. This process is quick and easy, and it helps us to ensure that our buyers are who they say they are."}
          </Typography>
        </Grid>
        <Grid item sm={2} />
      </Grid>

      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={1} />
              {state.textCardData.map((card, index) => (
                <Grid key={index} item xs={12} sm={6} lg={5}>
                  <TextCard
                    height={mode === "selling" ? "370px" : "320px"}
                    items={card.items}
                    title={card.title}
                  />
                </Grid>
              ))}
              <Grid item xs={12} lg={1} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
      </div>

      <Grid container spacing={2} className={classes.textStyling}>
        <Grid item sm={2} />
        <Grid item sm={8}>
          <Typography
            style={{
              fontSize: "17px",
              color: "#889099",
              lineHeight: "28px",
              fontWeight: 400,
              fontFamily: "Inter",
              whiteSpace: "break-spaces",
              marginTop: "40px"
            }}
            variant="body1"
          >
            {mode === "selling"
              ? "We are pleased to offer you a complimentary and non-binding auction appraisal for your property. Utilising our reliable and proven desktop valuation approach, we will thoroughly examine your property, assess its surroundings, review the prices at which similar homes in the vicinity have been sold, and delve further into the local market using exclusive data accessible solely to industry professionals. Our extensive experience and expertise will enable us to determine an accurate value for your property. Additionally, if you would prefer, we are more than happy to conduct an in-person valuation by visiting your property.\n"
              : "After viewing the property and reading the legal pack, if you are still interested in bidding, start arranging financing for the property.You need to be in a position to pay a non-refundable deposit (minimum of £5,000) before placing a bid  The reserve price will never be more than 10% above the starting price, so you can use this as a guide for your broker. If you plan to bid, arrange a survey before the auction date. If you are happy with all of the above, you can register to bid with Swift Property Auctions via the Auction Passport system.\n" +
                "\n" +
                "A member of the team will contact you on auction day to ensure that you have no outstanding questions or concerns about the property. Should you be the winning bidder you will be required to make a payment of 10% of the purchase price, along with any agreed costs, using a registered debit card. It is your responsibility to arrange insurance for the property after the exchange of contracts. We recommend contacting your insurers promptly or feel free to contact us and we guide you with the next steps to take\n" +
                "\n" +
                "If the property you were interested in does not meet its reserve, we will contact you if you were the underbidder. There may still be an opportunity for you to purchase the property following the conclusion of the online auction."}
          </Typography>
        </Grid>
        <Grid item sm={2} />
        <div className={classes.btnDiv}>
          <RedButton variant="contained">Register to Bid</RedButton>
        </div>
      </Grid>

      <EmailSubscription />
      <Footer />
      <CopyrightSection />
    </>
  )
}

export default AuctionGuide
