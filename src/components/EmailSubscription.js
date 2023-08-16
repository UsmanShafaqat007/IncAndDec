import React, {useState} from "react"
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  CircularProgress
} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import Toaster from "./Toaster"
import {sendEmail} from "../apis/common"

const EmailSubscription = ({withMargin = false}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#B21F18",
      color: "white",
      display: 'inline-block'
    },
    p2: {
      padding: theme.spacing(2)
    },
    textField: {
      borderRadius: "5px",
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: 0
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: 0
      }
    },
    checkbox: {
      color: "#FFFFFF",
      "& .MuiCheckbox-colorSecondary.Mui-checked": {
        color: "#FFFFFF"
      }
    }
  }))

  const [state, setState] = useState({
    email: "",
    loading: false,
    toasterColor: "success",
    toasterMessage: ``
  })

  const [agreed, setAgreed] = useState(false)

  const handleSubmit = async () => {
    try {
      setState({...state, loading: true})

      const {email} = state

      const data = {
        text: {email},
        subject: "You have received email subscription request"
      }

      const res = await sendEmail(data)

      if (!!res && res.success) {
        setState({
          ...state,
          email: "",
          loading: false,
          toasterColor: "success",
          toasterMessage: `Your response has been recorded!`
        })
      }
    } catch (e) {
      setState({
        ...state,
        email: "",
        loading: false,
        toasterColor: "error",
        toasterMessage: `Error while saving your response`
      })

      console.log("error while sending email", e.message)
    }
  }

  const classes = useStyles()

  const disableBtn = () => {
    const {email} = state

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !emailRegex.test(email)
    }
    return true
  }

  const removeToaster = () => {
    setState({...state, toasterColor: "success", toasterMessage: ""})
  }

  return (
    <div className={classes.root}>
      <Grid container sx={{py: 7}}>
        <Grid xs={12} md={1} />
        <Grid item xs={12} md={4}>
          <Typography
            variant="h4"
            style={{
              fontSize: "40px",
              lineHeight: "55px",
              fontWeight: 600,
              fontFamily: "Public Sans",
              color: "white",
            }}
          >
            Leave you email to get the latest news and to hear about the some of the latest deals.
          </Typography>
        </Grid>
        <Grid xs={12} md={1} />
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.p2}
              control={
                <Radio
                  checked={agreed}
                  onClick={() => setAgreed((prev) => !prev)}
                  color="default"
                  style={{color: "white"}}
                />
              }
              label={
                <span
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: 400,
                    fontFamily: "Inter"
                  }}
                >
                  I agree to company’s{" "}
                  <strong>Terms and Conditions of service</strong> and{" "}
                  <strong>Privacy Policy</strong>.
                </span>
              }
            />
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.p2}
            xs={11}
          >
            <Grid item xs={12} sm={8}>
              <TextField
                placeholder="Enter Your Email"
                value={state.email}
                fullWidth
                classes={{root: classes.textField}}
                style={{backgroundColor: "white", borderColor: "white"}}
                onChange={(e) => {
                  setState({...state, email: e.target.value})
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                disabled={disableBtn() || state.loading}
                variant="outlined"
                loading={state.loading}
                onClick={handleSubmit}
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "white",
                  borderColor: "white",
                  width: "120px",
                  height: "55px",
                  textTransform: "none"
                }}
              >
                {state.loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {state.toasterMessage && (
        <Toaster
          message={state.toasterMessage}
          removeToaster={removeToaster}
          severity={state.toasterColor}
        />
      )}
    </div>
  )
}

export default EmailSubscription
