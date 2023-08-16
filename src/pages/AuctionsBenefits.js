import React, {useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Typography} from "@mui/material"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {Grid} from "@material-ui/core"
import TextCard from "../components/TextCard"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

const useStyles = makeStyles((theme) => ({
  title: {
    // position: 'relative',
    marginBottom: theme.spacing(4)
  },
  line: {
    width: "100%",
    border: "none",
    borderTop: "3px solid #B21F18",
    marginTop: "25px",
    marginBottom: theme.spacing(4)
  },
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  smallHeader: {
    color: "#1D242A",
    textAlign: "justify",
    fontFamily: "Inter",
    fontSize: "26px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "35px",
    marginLeft: "2rem !important"
  },
  normalText: {
    color: "#889099",
    textAlign: "justify",
    fontFamily: "Inter",
    fontSize: "23px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "30px",
    marginBottom: "1rem"
  }
}))

const SellerSection = [
  {
    title: "Speed:",
    desc: "Auctions are a fast way to sell property. The entire process, from instruction to exchange of contracts, can take as little as a few weeks. This is in contrast to the traditional method of selling property, which can take months or even years."
  },
  {
    title: "Certainty:",
    desc: "Auctions offer sellers a high degree of certainty. Once the hammer falls, the seller is guaranteed to sell their property for the agreed-upon price. This is in contrast to the traditional method of selling property, where there is always the risk that the sale will fall through."
  },
  {
    title: "Transparency:",
    desc: "Auctions are transparent. Once the reserve is set, it becomes a bidding war and will sell for the highest price possible."
  },
  {
    title: "Wider reach:",
    desc: "Auctions reach a wider audience than the traditional method of selling property. This is because at Swift we are not only local but national, we could quite possibly have a bidding war with buyers not only in London but Manchester, Birmingham and Liverpool all competing. We also advertise in a variety of media, including online, print, and social media. As a result, auctions are more likely to attract buyers from all over the country, or even the world."
  },
  {
    title: "Competition:",
    desc: "Auctions create competition among buyers. This can drive up the price of the property, which is beneficial for the seller (and fun to watch)."
  },
  {
    title: "No negotiation:",
    desc: "With an auction, there is no need to negotiate with buyers. The seller simply sets the reserve price and the highest bidder wins. This can save the seller a lot of time and hassle."
  },
  {
    title: "Expert advice:",
    desc: "Here at Swift Property Auctions we will provide the seller with expert advice throughout the process. This can help the seller to get the best possible price for their property."
  },
  {
    title: "Peace of mind:",
    desc: "Selling property via an auction house can give sellers peace of mind. They know that their property will be sold for the best possible price, and they do not have to worry about the sale falling through."
  }
]

const BuyerSection = [
  {
    title: "Speed:",
    desc: "You can move quickly with the entire home-buying process being completed within a set number of days (often 28) after the auction."
  },
  {
    title: "Transparency:",
    desc: "You’ll be able see the other bids for yourself and there’s no risk of gazumping."
  },
  {
    title: "Fairness:",
    desc: "There’s no pressure to get your offer in first, as with other property buying methods."
  },
  {
    title: "The deal’s done:",
    desc: "The process is not affected by lengthy delays from other parties or breakdowns in communication."
  },
  {
    title: "More choice:",
    desc: "There’s also usually a wider range of properties and it’s possible to find some real gems, such as an undervalued home with planning permission or that renovation project you were looking for."
  },
  {
    title: "Reliability:",
    desc: "Contracts are signed as soon as the auction is over."
  },
  {
    title: "Highly Organized and Regulated:",
    desc: "All buyers are required to register prior to auction, and there are a number of things you can do beforehand, so you are prepared and ready to buy on the day. If you are not successful it is simply refunded!"
  },
  {
    title: "Auction sales of investment properties:",
    desc: "Often occur without obtaining vacant possession beforehand, and this arrangement offers mutual benefits to both parties involved. The seller continues to receive rental income until the completion date, while the buyer starts generating rental income immediately, eliminating the risk of void periods. Consequently, as the new owner, you will begin reaping the rewards of your investment from the moment of ownership, which can make managing finance repayments more manageable."
  }
]

const AuctionBenefits = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div
        style={{background: "url(/benefits_main.png)", backgroundSize: "cover"}}
      >
        <HeaderContent title={"Benefits Of Auctions"} description={""} />
      </div>
      <Grid container spacing={2} style={{margin: "5rem 0"}}>
        <Grid xs={12} md={1} />
        <Grid xs={12} md={10}>
          <Typography variant="h4" className={classes.smallHeader}>
            Benefits for a seller
          </Typography>
          <ul style={{marginTop: "2rem"}}>
            {SellerSection.map((item) => (
              <li className={classes.normalText}>
                <span style={{marginRight: "1rem", color: '#B21F18'}}>
                  {item.title}
                </span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
          <Typography
            style={{marginTop: "5rem"}}
            variant="h4"
            className={classes.smallHeader}
          >
            Benefits for a Buyer
          </Typography>
          <ul style={{marginTop: "2rem"}}>
            {BuyerSection.map((item) => (
              <li className={classes.normalText}>
                <span style={{marginRight: "1rem", color: '#B21F18'}}>
                  {item.title}
                </span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid xs={12} md={1} />
      </Grid>

      <EmailSubscription />
      <Footer />
      <CopyrightSection />
    </>
  )
}

export default AuctionBenefits
