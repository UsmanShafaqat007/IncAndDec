import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import WhyUs from "../components/whyUs"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {styled} from "@mui/material/styles"
import {Grid, Typography} from "@mui/material"
import CopyrightSection from "../components/CopyrightSection"
import Button from "@mui/material/Button"
import {Link} from "react-router-dom"
import LazyLoad from "react-lazy-load"
import bg from "../assets/whyus_main.png"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import {RedButton} from "../components/Buttons/redButton"

const WhyUsPage = (second) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const useStyles = styled((theme) => ({
    root: {
      marginTop: "90px",
      marginBottom: "90px"
    },
    flexCenter: {
      display: "flex",
      justifyContent: "center"
    },
    smallHeader: {
      color: "#1D242A",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "26px",
      fontStyle: "normal",
      fontWeight: "700 !important",
      lineHeight: "35px",
      marginBottom: "2rem !important"
    },
    normalText: {
      color: "#889099",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "23px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "30px",
      marginBottom: "1.2rem !important"
    }
  }))

  const classes = useStyles()

  const firstSection = {
    title: "Why Choose Us?",
    desc: "Auctions are becoming an increasingly popular way to buy and sell property, as they offer speed and certainty. However, with so many auction houses to choose from, it can be difficult to know which one is right for you. Here are a few reasons why you should choose us:",
    list: [
      "We are experts in the auction process. We know the ins and outs of the auction process, and we can help you navigate it smoothly.",
      "We offer a comprehensive range of services. We not only sell properties at auction, but we also offer a full range of property services, including valuations, marketing, and conveyancing. This means that you can trust us to take care of everything for you, from start to finish.",
      "We are committed to providing excellent customer service. We understand that buying or selling a property is a big decision, and we want to make sure that you have the best possible experience. Our team is friendly, knowledgeable, and dedicated to helping you achieve your goals."
    ]
  }

  const secondSection = {
    title: "Communication is key to building trust in property auctions.",
    list: [
      "Trust is essential when choosing a property auction house. This trust can only be built when there is strong communication between the auctioneer and their clients. At SellProp Auctions, we understand that communication is the glue that holds property transactions together. That's why we are committed to providing excellent communication and customer service in every aspect of the journey of buying or selling a home at auction.",
      "We promise to return every email and phone call promptly. Our team will answer every question, no matter how trivial or difficult. We also provide feedback on all our viewings and offer advice at every step of the way.",
      "We believe that by providing excellent communication and customer service, we can build trust with our clients and help them achieve their property goals.",
      "Here are some additional points that could be included in the rewritten text:"
    ]
  }

  const thirdSection = {
    list: [
      "We understand that buying or selling a property at auction can be a daunting task. That's why we want to make sure that you have all the information you need to make an informed decision.",
      "We understand that buying or selling a property at auction can be a daunting task. That's why we want to make sure that you have all the information you need to make an informed decision.",
      "We are here to help you achieve your property goals. We will work with you every step of the way to make sure that you are satisfied with the outcome of your auction."
    ],
    title: "Nationwide coverage and local.",
    desc1:
      "Unlike other property auctioneers that cater to specific areas, Swift Property Auctions London operate nationwide. We have partner agents located across the UK, including Birmingham, Liverpool, Manchester, and Newcastle. This nationwide presence allows us to tap into a large pool of regional and national buyers and sellers, keeping us at the pulse of the housing market across the country.",
    desc2:
      "Our team of property auction specialists also have in-depth knowledge of the areas we operate from. This gives our clients additional confidence that they are in safe and knowledgeable hands. Whether you are a buyer or seller, we can help you achieve your property goals."
  }

  return (
    <>
      <NavbarWrapper />
      <LazyLoad offset={100} once>
        <div style={{background: `url(${bg}) center center / cover no-repeat`}}>
          <HeaderContent title={"Why Swift Property?"} description={""} />
        </div>
      </LazyLoad>

      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={1} />
          <Grid item md={10}>
            <Typography variant="h4" className={classes.smallHeader}>
              {firstSection.title}
            </Typography>
            <Typography variant="body-1" className={classes.normalText}>
              {firstSection.desc}
            </Typography>
            <ul>
              {firstSection.list.map((item) => (
                <li className={classes.normalText}>{item}</li>
              ))}
            </ul>
          </Grid>
          <Grid item md={1} />
        </Grid>
      </div>
      <Grid
        container
        spacing={2}
        style={{padding: "90px 0", background: "rgba(29, 36, 42, 0.05)"}}
      >
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <Typography
            variant="h4"
            style={{textAlign: "center"}}
            className={classes.smallHeader}
          >
            {secondSection.title}
          </Typography>
          {secondSection.list.map((item) => (
            <Typography
              variant="h5"
              style={{textAlign: "center"}}
              className={classes.normalText}
            >
              {item}
            </Typography>
          ))}
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>
      <Grid container spacing={2} style={{padding: "90px 0"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <ul style={{marginBottom: "3rem"}}>
            {thirdSection.list.map((item) => (
              <li className={classes.normalText}>{item}</li>
            ))}
          </ul>
          <Typography
            variant="h4"
            style={{textAlign: "center"}}
            className={classes.smallHeader}
          >
            {thirdSection.title}
          </Typography>
          <Typography
            variant="h5"
            style={{textAlign: "center"}}
            className={classes.normalText}
          >
            {thirdSection.desc1}
          </Typography>
          <Typography
            variant="h5"
            style={{textAlign: "center"}}
            className={classes.normalText}
          >
            {thirdSection.desc2}
          </Typography>
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>

      <Grid container spacing={2} className={classes.whyUsContainer}>
        <Grid item md={2} />
        <Grid item md={8}>
          <WhyUs
            height="220px"
            showTwo={true}
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
        <Grid item md={2} />
      </Grid>

      <Grid
        style={{paddingBottom: "60px", paddingTop: "60px"}}
        container
        spacing={2}
        className={classes.flexCenter}
      >
        <Grid item md={4} />
        <Grid item md={4} className={classes.flexCenter}>
          <RedButton gutterBottom component={Link} to={`/requestAuction`}>
            Free Auction Appraisal
          </RedButton>
        </Grid>
        <Grid item md={4} />
      </Grid>

      <EmailSubscription />
      <Footer />

      <CopyrightSection />
    </>
  )
}

export default WhyUsPage
