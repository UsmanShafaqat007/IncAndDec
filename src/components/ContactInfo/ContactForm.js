import React, {useState} from "react"
import {Typography, TextField, CircularProgress} from "@mui/material"
import {styled} from "@mui/material/styles"
import {sendEmail} from "../../apis/common"
import Toaster from "../Toaster"
import {RedButton} from "../Buttons/redButton"
import {Card, CardContent} from "@mui/material"

const ContactForm = ({fromContact = false}) => {
  const useStyles = styled((theme) => ({
    root: {
      padding: "1rem 2rem",
      backgroundColor: "white",
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      borderRadius: "5px",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  }))

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    toasterColor: "success",
    toasterMessage: ``,
    loading: false
  })

  const handleSubmit = async () => {
    try {
      setState({...state, loading: true})

      const {name, email, phone, message} = state

      const data = {
        text: {name, email, phone, message},
        subject: "You have recieved contact info"
      }

      const res = await sendEmail(data)

      if (!!res && res.success) {
        setState({
          ...state,
          email: "",
          message: "",
          loading: false,
          phone: "",
          name: "",
          toasterColor: "success",
          toasterMessage: `Your response has been recorded!`
        })
      }
    } catch (e) {
      setState({
        ...state,
        email: "",
        message: "",
        phone: "",
        name: "",
        loading: false,
        toasterColor: "error",
        toasterMessage: `Error while saving your response`
      })

      console.log("error while sending email", e.message)
    }
  }

  const disableBtn = () => {
    const {name, email, phone, message} = state

    if (name && email && phone && message) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      // Test the email against the regex pattern
      return !emailRegex.test(email)
    }
    return true
  }

  const removeToaster = () => {
    setState({...state, toasterColor: "success", toasterMessage: ""})
  }

  const classes = useStyles()

  const fieldLabel = {
    fontSize: "17px",
    color: "#1D242A",
    lineHeight: "28px",
    fontWeight: 600,
    fontFamily: "Inter"
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontSize: "35px",
            lineHeight: "70px",
            letterSpacing: "1px",
            fontWeight: 600,
            fontFamily: "Inter",
            color: "#1D242A",
            textAlign: "center",
            marginBottom: "0"
          }}
        >
          Get In Touch
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          style={{
            fontSize: "18px",
            lineHeight: "27px",
            letterSpacing: "1px",
            fontWeight: 500,
            fontFamily: "Inter",
            color: "#A0A0A0",
            marginBottom: "1rem",
            textAlign: "center"
          }}
        >
          How can we help?
        </Typography>

        <form>
          <Typography style={fieldLabel} variant="subtitle1" component="span">
            Name
          </Typography>
          <Typography variant="body1" component="span" style={{color: "red"}}>
            {" *"}
          </Typography>
          <TextField
            value={state.name}
            placeholder="Enter your name"
            fullWidth
            variant="filled"
            sx={{marginBottom: "1rem !important"}}
            InputProps={{
              classes: {root: classes.textField},
              style: {
                backgroundColor: "#f5f5f5",
                padding: "6px 0 !important",
                textAlign: "center"
              }
            }}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setState({...state, name: e.target.value})
              } else {
                setState({
                  ...state,
                  toasterColor: "error",
                  toasterMessage:
                    "Characters Length should be less or equal to 30"
                })
              }
            }}
          />

          <Typography
            style={fieldLabel}
            variant="subtitle1"
            component="span"
            fontWeight="bold"
          >
            Email
          </Typography>
          <Typography variant="body1" component="span" style={{color: "red"}}>
            {" *"}
          </Typography>
          <TextField
            value={state.email}
            placeholder="Enter your email"
            fullWidth
            sx={{marginBottom: "1rem !important"}}
            variant="filled"
            type={"email"}
            InputProps={{style: {backgroundColor: "#f5f5f5", border: 0}}}
            onChange={(e) => {
              setState({...state, email: e.target.value})
            }}
          />

          <Typography
            style={fieldLabel}
            variant="subtitle1"
            component="span"
            fontWeight="bold"
          >
            Phone Number
          </Typography>
          <Typography variant="body1" component="span" style={{color: "red"}}>
            {" *"}
          </Typography>
          <TextField
            value={state.phone}
            placeholder="Enter your number"
            fullWidth
            variant="filled"
            InputProps={{style: {backgroundColor: "#f5f5f5", border: 0}}}
            sx={{marginBottom: "1rem !important"}}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setState({...state, phone: e.target.value})
              } else {
                setState({
                  ...state,
                  toasterColor: "error",
                  toasterMessage:
                    "Characters Length should be less or equal to 30"
                })
              }
            }}
          />
          <Typography
            style={fieldLabel}
            component="span"
            variant="subtitle1"
            fontWeight="bold"
          >
            Message
          </Typography>
          <Typography variant="body1" component="span" style={{color: "red"}}>
            {" *"}
          </Typography>
          <TextField
            value={state.message}
            sx={{marginBottom: "1rem !important"}}
            placeholder="Please enter your message"
            fullWidth
            variant="filled"
            multiline
            rows={4}
            InputProps={{style: {backgroundColor: "#f5f5f5", border: 0}}}
            onChange={(e) => {
              setState({...state, message: e.target.value})
            }}
          />
          <Typography
            variant="body1"
            gutterBottom
            style={{
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "Inter"
            }}
          >
            By clicking submit enquiry you agree to our{" "}
            <strong>Privacy Policy</strong>
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <RedButton
              variant="contained"
              disabled={disableBtn() || state.loading}
              sx={{
                mt: 2,
                "&:disabled": {
                  opacity: 0.6,
                  pointerEvents: "none"
                }
              }}
              loading={state.loading}
              onClick={handleSubmit}
            >
              {state.loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit Enquiry"
              )}
            </RedButton>
          </div>
        </form>

        {state.toasterMessage && (
          <Toaster
            message={state.toasterMessage}
            removeToaster={removeToaster}
            severity={state.toasterColor}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default ContactForm
