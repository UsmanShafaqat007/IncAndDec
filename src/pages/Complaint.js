import React from "react"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import {Grid, styled} from "@mui/material"
import Footer from "../components/Footer"
import CopyrightSection from "../components/CopyrightSection"
import EmailSubscription from "../components/EmailSubscription"
import {Typography} from "@mui/material"

const Complaint = (props) => {
  const useStyles = styled((theme) => ({
    root: {
      marginTop: "20vh"
    },
    mainHeader: {
      fontSize: "4vh",
      lineHeight: "43px",
      fontWeight: 600,
      fontFamily: "Inter",
      color: "#1D242A",
      textAlign: "center",
      marginBottom: "2rem !important"
    },
    smallHeader: {
      color: "#1D242A",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "26px",
      fontStyle: "normal",
      fontWeight: "bold !important",
      lineHeight: "35px",
      marginTop: "2.5rem !important",
      marginBottom: "1rem !important"
    },
    normalText: {
      color: "#889099",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "23px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "30px",
      marginBottom: "1.5rem !important"
    },
    list: {
      color: "#889099",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "23px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "30px",
      marginBottom: "0.5rem !important"
    },
    normalBigText: {
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "1.8rem !important",
      fontWeight: 500,
      marginTop: "2rem !important"
    }
  }))
  const classes = useStyles()
  const officialEmail = "info@swiftpropertyauctions.co.uk"
  return (
    <div className={classes.root}>
      <NavbarWrapper withBackground={true} />
      <Grid container style={{padding: "2rem 0"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <Typography variant="h2" className={classes.mainHeader}>
            Complaint Procedure
          </Typography>
          <Typography
            style={{color: "#889099", textAlign: "center"}}
            className={classes.normalBigText}
            variant="h5"
          >
            We are committed to providing a professional service to all our
            clients and customers. We understand that things can go wrong
            sometimes, and we want to make sure that you are able to raise any
            concerns you have with us so that we can learn from them and improve
            our services.
          </Typography>
          <Typography variant="h4" className={classes.smallHeader}>
            How to make a complaint?
          </Typography>
          <Typography variant="h5" className={classes.normalText}>
            If you have a complaint, please put it in writing to us as soon as
            possible. Your complaint should include as much detail as possible,
            such as what happened, when it happened, and who you were dealing
            with. You can send your complaint to us by post or email.
          </Typography>
          <Typography variant="h4" className={classes.smallHeader}>
            Our response
          </Typography>
          <Typography variant="h5" className={classes.normalText}>
            We will acknowledge your complaint within three working days of
            receiving it. We will then investigate your complaint and contact
            you within 15 working days of acknowledging your complaint. In our
            investigation, we will review your file and speak to the member of
            staff who dealt with you. We will then write to you with the outcome
            of our investigation, including any steps we will take to address
            your complaint.
          </Typography>
          <Typography variant="h4" className={classes.smallHeader}>
            If you are not satisfied
          </Typography>
          <Typography variant="h5" className={classes.normalText}>
            If you are not satisfied with our response to your complaint, you
            can ask for a review by a senior member of staff. We will write to
            you within 15 working days of receiving your request for a review to
            confirm our final viewpoint on the matter.
          </Typography>
          <Typography variant="h4" className={classes.smallHeader}>
            If you are still not satisfied
          </Typography>
          <Typography variant="h5" className={classes.normalText}>
            If you are still not satisfied with our final viewpoint, you can
            contact The Property Ombudsman to request an independent review. The
            Property Ombudsman is an independent body that can help you resolve
            your complaint. You can contact The Property Ombudsman at:
          </Typography>

          <li style={{marginLeft: "1rem"}} className={classes.list}>
            The Property Ombudsman Ltd
          </li>
          <li style={{marginLeft: "1rem"}} className={classes.list}>
            Milford House, 43-45 Milford Street
          </li>
          <li style={{marginLeft: "1rem"}} className={classes.list}>
            Salisbury, Wiltshire, SP1 2BP
          </li>
          <li style={{marginLeft: "1rem"}} className={classes.list}>
            01722 333 306
          </li>
          <li style={{marginLeft: "1rem"}} className={classes.list}>
            www.tpos.co.uk
          </li>
          <Typography
            style={{
              marginLeft: "1rem",
              fontWeight: "400",
              textAlign: "justify",
              fontFamily: "Inter",
              fontSize: "1.6rem",
              marginTop: "2rem",
              marginBottom: "0.5rem"
            }}
            variant="h5"
          >
            Please note:
          </Typography>

          <li
            style={{
              marginLeft: "1rem",
              fontWeight: "400",
              textAlign: "justify",
              fontFamily: "Inter",
              fontSize: "1.6rem"
            }}
          >
            You must submit your complaint to The Property Ombudsman within 12
            months of receiving our final viewpoint letter.
          </li>
          <li
            style={{
              marginLeft: "1rem",
              fontWeight: "400",
              textAlign: "justify",
              fontFamily: "Inter",
              fontSize: "1.6rem"
            }}
          >
            The Property Ombudsman requires that all complaints are addressed
            through this in-house complaint procedure before being submitted for
            an independent review.
          </li>
          <Typography
            style={{
              marginLeft: "1rem",
              fontWeight: "400",
              textAlign: "justify",
              fontFamily: "Inter",
              fontSize: "1.6rem",
              marginTop: '2rem',
              marginBottom: '7rem'
            }}
            variant="h5"
          >
            We hope that this complaints procedure is clear and easy to
            understand. If you have any questions, please do not hesitate to
            contact us: 0208 950 4588 or{" "}
            <a
              style={{color: "#B21F18"}}
              rel="noopener noreferrer"
              href={`mailto:${officialEmail}?subject=${encodeURIComponent(
                ""
              )}&body=${encodeURIComponent("")}`}
              target="_blank"
            >
              {officialEmail}
            </a>
          </Typography>
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>
      <EmailSubscription />

      <Footer />
      <CopyrightSection />
    </div>
  )
}

export default Complaint
