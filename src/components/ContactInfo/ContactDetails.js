import React from "react"
import {Typography, Button} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import {RedButton} from "../Buttons/redButton"

const ContactDetails = ({fromContact = false}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      color: "white",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        textAlign: "center"
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "start"
      }
    },
    btnDiv: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center"
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "start"
      }
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        variant="h3"
        gutterBottom
        fontWeight={"bolder"}
        style={{
          fontSize: "60px",
          lineHeight: "60px",
          // letterSpacing: "3px",
          fontWeight: 700,
          fontFamily: "Public Sans",
          color: fromContact ? "black" : "white",
          marginTop: "30px"
        }}
      >
        Find Your <br/> Dream Property <br/>at{" "}
        <span
          style={{
            fontSize: "55px",
            lineHeight: "60px",
            fontWeight: 800,
            fontFamily: "Public Sans",
            color: "#B21F18"
          }}
        >
          Swift Property <br/> Auctions
        </span>{" "}
        London
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{
          fontSize: "20px",
          lineHeight: "28px",
          fontWeight: 400,
          fontFamily: "Inter",
          color: fromContact ? "#A0A0A0" : "white",
          marginBottom: "20px"
        }}
      >
        Whether you would like a free valuation on your property or simply understand how the auction process, we'd love to hear from you
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{
          fontSize: "20px",
          lineHeight: "17px",
          fontWeight: 700,
          fontFamily: "Inter",
          color: fromContact ? "#B21F18" : "white",
          marginBottom: "10px"
        }}
      >
        <strong> Call us at:</strong>
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{
          fontSize: "20px",
          lineHeight: "17px",
          fontWeight: 700,
          fontFamily: "Inter",
          color: fromContact ? "black" : "white",
          marginBottom: "20px"
        }}
      >
        020 7824 9867
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{
          fontSize: "20px",
          lineHeight: "17px",
          fontWeight: 700,
          fontFamily: "Inter",
          color: fromContact ? "#B21F18" : "white",
          marginBottom: "10px"
        }}
      >
        <strong> Email us at: </strong>
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{
          fontSize: "20px",
          lineHeight: "17px",
          fontWeight: 700,
          fontFamily: "Inter",
          color: fromContact ? "black" : "white",
          marginBottom: "20px"
        }}
      >
        info@swiftpropertyauctions.co.uk
      </Typography>
      {!fromContact && (
        <div className={classes.btnDiv}>
          <RedButton
            variant="contained"
            style={{
              marginTop: "3rem"
            }}
          >
            Register To Bid
          </RedButton>
        </div>
      )}
    </div>
  )
}

export default ContactDetails