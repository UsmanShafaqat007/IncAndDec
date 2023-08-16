import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import ContactForm from "../components/ContactInfo/ContactForm"
import ContactDetails from "../components/ContactInfo/ContactDetails"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {Grid, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

function Contact() {
  const useStyles = makeStyles((theme) => ({
    contactBtnDiv: {
      backgroundColor: "#B21F18",
      width: "133px",
      display: "flex",
      justifyContent: "center"
    },
    flexCenter: {
      display: "flex",
      justifyContent: "center"
    },
    whyUsContainer: {
      marginBottom: theme.spacing(6)
    },
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  }))

  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div
        style={{background: "url(/contact_main.png)", backgroundSize: "cover"}}
      >
        <HeaderContent title={"Contact Us"} description={""} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={1} />
        <Grid
          item
          xs={12}
          md={5}
          style={{display: "flex", justifyContent: "center"}}
        >
          <ContactDetails fromContact={true} />
        </Grid>
        <Grid item xs={12} md={1} />

        <Grid item xs={12} md={4}>
          <ContactForm fromContact={true} />
        </Grid>
        <Grid item xs={12} md={1} />
      </Grid>

      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={10}>
            <Typography
              textAlign="center"
              variant="h4"
              gutterBottom
              style={{
                fontSize: "35px",
                lineHeight: "48px",
                // letterSpacing: "3px",
                fontWeight: 600,
                fontFamily: "Inter",
                marginTop: "20px",
                marginBottom: "20px"
              }}
            >
              Find Out Us Here
            </Typography>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27222.718512376214!2d74.3558237926647!3d31.47359235862942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190676e1e0d841%3A0xd14d6b7294fdf8a0!2sDHA%20Phase%203%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1687630882244!5m2!1sen!2s"
              style={{
                border: "0px",
                height: "50vh",
                width: "100%",
                marginBottom: "30px"
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
          <Grid item xs={12} md={1} />
        </Grid>
      </div>

      <EmailSubscription />

      <Footer />

      <CopyrightSection />
    </>
  )
}

export default Contact
