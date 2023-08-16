import React, {useState, useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import NextAuctionHeader from "../components/NextAuctionHeader"
import LotsList from "../components/Lots/LotsLists"
import WhyUs from "../components/whyUs"
import ExploreNowCards from "../components/ExploreNowCards"
import NewsAndBlogs from "../components/NewsAndBlogs/NewsAndBlogs"
import ContactForm from "../components/ContactInfo/ContactForm"
import ContactDetails from "../components/ContactInfo/ContactDetails"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {Grid} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import {getSpecificLots} from "../apis/lots"
import {Link} from "react-router-dom"
import CopyrightSection from "../components/CopyrightSection"
import LazyLoad from "react-lazy-load"
import bg from "../assets/backgroundHome.png"
import {RedButton} from "../components/Buttons/redButton"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

const Home = () => {
  const [state, setState] = useState({
    lots: []
  })

  useEffect(() => {
    const anonymousFunc = async () => {
      try {
        const lots = await getSpecificLots(0, {featured: true}, 6)
        setState({...state, lots: lots?.data?.lots ? lots.data.lots : []})
      } catch (e) {
        console.log(e.message)
      }
    }
    anonymousFunc()

    window.scrollTo(0, 0)
  }, [])

  const useStyles = makeStyles((theme) => ({
    flexCenter: {
      display: "flex",
      justifyContent: "center"
    },
    whyUsContainer: {
      marginBottom: theme.spacing(6)
    }
  }))

  const classes = useStyles()

  return (
    <>
      <NavbarWrapper />

      <LazyLoad className="mh-65" offset={100} once>
        <div
          className="mh-65"
          style={{background: `url(${bg}) center center / cover no-repeat`}}
        >
          <HeaderContent
            title={"Swift Property Auctions London"}
            showButtons={true}
            description={
              "Connecting buyers and Sellers Through The Power of Auctions"
            }
          />
        </div>
      </LazyLoad>

      <NextAuctionHeader removeBottomMargin={true} />

      <Grid
        container
        spacing={2}
        style={{paddingTop: "30px", background: "rgba(29, 36, 42, 0.05)"}}
      >
        <Grid item md={1} />
        <Grid item xs={12} md={10}>
          <LotsList
            type={true}
            showThree={true}
            text={"Featured Lots"}
            data={state.lots}
          />
        </Grid>
        <Grid item md={1} />
        <Grid
          style={{paddingBottom: "60px"}}
          container
          spacing={2}
          className={classes.flexCenter}
        >
          <Grid item md={4} />
          <Grid item md={4} className={classes.flexCenter}>
            <RedButton variant="contained" component={Link} to={`/currentlots`}>
              Show All Lots
            </RedButton>
          </Grid>
          <Grid item md={4} />
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.whyUsContainer}>
        <Grid item md={1} />
        <Grid item md={10}>
          <WhyUs
            height="295px"
            showTwo={false}
            data={[
              {
                image: "whyUs1.svg",
                title: "Experience Agents",
                description:
                  "At Swift Property Auction we have over 60 years combined experience in all matters Real Estate. There isn't a property or situation we haven't dealt with before."
              },
              {
                image: "whyUs4.svg",
                title: "Expert Advice",
                description:
                  "We aim to give you Expert Auction Advice whether you are looking to buy or sell any type of Residential or Commercial Property"
              },
              {
                image: "whyUs3.svg",
                title: "Extensive Marketing",
                description:
                  "What good is it having a fabulous property if it cant be seen? That's why we advertise on Rightmove, Zoopla and Eigroup (Not to mention our Swift Property Auction Boards)"
              },
              {
                image: "whyUs2.svg",
                title: "Contact Us 24/7",
                description:
                  "Yes, thats right we are the only Property Auctioneer you can call or email us around the clock"
              }
            ]}
          />
        </Grid>
        <Grid item md={1} />
      </Grid>

      <ExploreNowCards />
      <NewsAndBlogs offset={6} />
      <div style={{background: "url(contact.png)", backgroundSize: "cover"}}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sm={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <Grid item xs={12} md={2} sm={2} />
            <Grid item xs={12} md={9} sm={8}>
              <ContactDetails />
            </Grid>
            <Grid item xs={12} md={1} sm={2} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sm={12}
            style={{display: "flex", justifyContent: "center"}}
          >
            <Grid item xs={12} md={2} sm={2} />

            <Grid item xs={12} md={8} sm={8}>
              <ContactForm />
            </Grid>
            <Grid item xs={12} md={2} sm={2} />
          </Grid>
        </Grid>
      </div>

      <EmailSubscription withMargin={true} />

      <Footer />

      <CopyrightSection />
    </>
  )
}
export default Home
