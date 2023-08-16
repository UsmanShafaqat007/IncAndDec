import React, {useEffect, useState} from "react"
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Select,
  MenuItem,
  CircularProgress,
  Radio
} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {postAuctionRequest} from "../apis/common"
import Toaster from "../components/Toaster"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import {Card, CardContent} from "@material-ui/core"
import {RedButton} from "../components/Buttons/redButton"

const useStyles = makeStyles((theme) => ({
  formContainer: {
    background: "#fff",
    padding: theme.spacing(2),
    margin: "auto"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2)
  },
  field: {
    backgroundColor: "#F3F3F3 !important"
  },
  root: {
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    },
    background: "rgba(29, 36, 42, 0.05)"
  },
  textAreaField: {
    backgroundColor: "#F3F3F3 !important",
    [theme.breakpoints.down("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "450px"
    }
  },
  padding: {
    padding: "0 1rem 1rem 2.5rem"
  }
}))

const AuctionsForm = () => {
  const classes = useStyles()

  const fieldLabel = {
    fontSize: "17px",
    color: "#1D242A",
    lineHeight: "28px",
    fontWeight: 600,
    fontFamily: "Inter"
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [state, setState] = useState({
    name: "",
    nationalId: "",
    email: "",
    phone: "",
    address: "",
    town: "",
    country: "",
    code: "",
    message: "",
    propertyType: [],
    loading: false,
    toasterColor: "success",
    toasterMessage: ``
  })
  const [agreed, setAgreed] = useState(false)

  const disableBtn = () => {
    const {
      name,
      email,
      phone,
      message,
      nationalId,
      address,
      code,
      town,
      country,
      propertyType
    } = state

    if (
      name &&
      email &&
      phone &&
      Array.isArray(propertyType) &&
      propertyType.length > 0 &&
      address &&
      town &&
      country &&
      code
    ) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      // Test the email against the regex pattern
      return !emailRegex.test(email)
    }
    return true
  }

  const handleSubmit = async () => {
    try {
      setState({...state, loading: true})

      const {
        name,
        email,
        phone,
        message,
        nationalId,
        address,
        code,
        town,
        country,
        propertyType
      } = state

      const data = {
        firstName: name,
        email,
        phone,
        message,
        lastName: nationalId,
        address,
        code,
        town,
        country,
        propertyType
      }

      const res = await postAuctionRequest(data)

      if (!!res && res.success) {
        setState({
          ...state,
          email: "",
          message: "",
          loading: false,
          phone: "",
          name: "",
          nationalId: "",
          address: "",
          code: "",
          town: "",
          country: "",
          propertyType: [],
          toasterColor: "success",
          toasterMessage: `Your response has been recorded!`
        })
      }
    } catch (e) {
      setState({
        ...state,
        email: "",
        message: "",
        loading: false,
        phone: "",
        name: "",
        nationalId: "",
        address: "",
        code: "",
        town: "",
        country: "",
        propertyType: [],
        toasterColor: "error",
        toasterMessage: `Error while saving your response`
      })

      console.log("error while adding auction request", e.message)
    }
  }

  const removeToaster = () => {
    setState({...state, toasterColor: "success", toasterMessage: ""})
  }

  return (
    <>
      <NavbarWrapper />
      <div
        style={{
          background: "url(/auctionform_main.png)",
          backgroundSize: "cover"
        }}
      >
        <HeaderContent title={"Free Valuation"} description={""} />
      </div>
      <div className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={7}>
            <Card className={classes.formContainer}>
              <CardContent>
                <Typography
                  style={{
                    fontSize: "35px",
                    lineHeight: "48px",
                    // letterSpacing: "3px",
                    fontWeight: 600,
                    fontFamily: "Inter",
                    marginBottom: "20px"
                  }}
                  variant="h5"
                  textAlign={"center"}
                  gutterBottom
                >
                  Request Auction Valuation
                </Typography>
                <Typography
                  style={{
                    fontSize: "17px",
                    color: "#889099",
                    lineHeight: "28px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    marginBottom: "20px"
                  }}
                  variant="body1"
                  textAlign={"center"}
                >
                  Request a Free Auction Valuation and one of our auctions
                  experts will be in touch.
                </Typography>
                <form>
                  <Grid style={{marginTop: "3rem"}} container spacing={1}>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                      >
                        First Name
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        value={state.name}
                        placeholder="Enter your first name"
                        inputProps={{className: classes.field}}
                        variant="filled"
                        fullWidth
                        size="small"
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
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        fontWeight="bold"
                      >
                        Last Name
                      </Typography>
                      <TextField
                        value={state.nationalId}
                        placeholder="Enter your last name"
                        inputProps={{className: classes.field}}
                        variant="filled"
                        fullWidth
                        size="small"
                        onChange={(e) => {
                          if (e.target.value.length <= 30) {
                            setState({...state, nationalId: e.target.value})
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
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        Email
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        placeholder="Enter you email"
                        inputProps={{className: classes.field}}
                        variant="filled"
                        fullWidth
                        size="small"
                        value={state.email}
                        onChange={(e) => {
                          setState({...state, email: e.target.value})
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        value={state.phone}
                        placeholder="Enter your phone number"
                        inputProps={{className: classes.field}}
                        variant="filled"
                        fullWidth
                        size="small"
                        onChange={(e) => {
                          if (
                            e.target.value.length <= 30 &&
                            e.target.value.match(/^[0-9]+$/)
                          ) {
                            setState({...state, phone: e.target.value})
                          } else if (e.target.value.length > 30) {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage:
                                "Length should be less or equal to 30"
                            })
                          } else {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage: "Only Numbers are Allowed"
                            })
                          }
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={12}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        Property Address
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        value={state.address}
                        placeholder="Enter property address"
                        variant="filled"
                        fullWidth
                        size="small"
                        inputProps={{className: classes.field}}
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            setState({...state, address: e.target.value})
                          } else {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage:
                                "Characters Length should be less or equal to 200"
                            })
                          }
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        Town
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        placeholder="Enter town"
                        inputProps={{className: classes.field}}
                        variant="filled"
                        fullWidth
                        size="small"
                        value={state.town}
                        onChange={(e) => {
                          if (
                            e.target.value.length <= 200 &&
                            e.target.value.match(/^[a-zA-Z]+$/)
                          ) {
                            setState({...state, town: e.target.value})
                          } else if (e.target.value.length > 200) {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage:
                                "Characters Length should be less or equal to 200"
                            })
                          } else {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage: "Characters are allowed only"
                            })
                          }
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        Country
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        placeholder="Enter your country"
                        variant="filled"
                        fullWidth
                        inputProps={{className: classes.field}}
                        size="small"
                        value={state.country}
                        onChange={(e) => {
                          if (
                            e.target.value.length <= 40 &&
                            e.target.value.match(/^[a-zA-Z]+$/)
                          ) {
                            setState({...state, country: e.target.value})
                          } else if (e.target.value.length > 40) {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage:
                                "Length should be less or equal to 40"
                            })
                          } else {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage: "Characters are allowed only"
                            })
                          }
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component="span"
                        fontWeight="bold"
                      >
                        Post Code
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <TextField
                        placeholder="Enter post code"
                        inputProps={{className: classes.field}}
                        variant="filled"
                        fullWidth
                        size="small"
                        value={state.code}
                        onChange={(e) => {
                          if (
                            e.target.value.length <= 30 &&
                            e.target.value.match(/^[0-9]+$/)
                          ) {
                            setState({...state, code: e.target.value})
                          } else if (e.target.value.length > 30) {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage:
                                "Length should be less or equal to 30"
                            })
                          } else {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage: "Only Numbers are Allowed"
                            })
                          }
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={6}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        component={"span"}
                        fontWeight="bold"
                      >
                        Property Type
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{color: "red"}}
                      >
                        {" *"}
                      </Typography>
                      <Select
                        sx={{width: "100%", height: "48px"}}
                        labelId="multiselect-label"
                        className="custom-css"
                        multiple
                        variant="filled"
                        placeholder="Double Story House"
                        inputProps={{
                          className: classes.field,
                          style: {paddingTop: "0 !important"}
                        }}
                        value={state.propertyType}
                        onChange={(e) => {
                          setState({...state, propertyType: e.target.value})
                        }}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {[
                          {label: "Residential", value: "Residential"},
                          {label: "Commercial", value: "Commercial"},
                          {label: "Lands", value: "Lands"},
                          {label: "Others", value: "Others"}
                        ].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid className={classes.padding} xs={12}>
                      <Typography
                        style={fieldLabel}
                        variant="subtitle1"
                        fontWeight="bold"
                      >
                        Any Further Information
                      </Typography>
                      <TextField
                        placeholder="Please enter your message"
                        fullWidth
                        margin="normal"
                        multiline
                        sx={{marginTop: "10px"}}
                        rows={4}
                        InputProps={{
                          style: {
                            backgroundColor: "#F3F3F3 !important",
                            border: 0
                          }
                        }}
                        value={state.message}
                        onChange={(e) => {
                          setState({...state, message: e.target.value})
                        }}
                      />
                    </Grid>
                    <Grid className={classes.padding} xs={12}>
                      <FormControlLabel
                        className={classes.p2}
                        control={
                          <Radio
                            checked={agreed}
                            onClick={() => setAgreed((prev) => !prev)}
                            color="default"
                            style={{color: "#B21F18"}}
                          />
                        }
                        label={
                          <span
                            style={{
                              color: "#1D242A",
                              fontSize: "15px",
                              fontWeight: 400,
                              fontFamily: "Inter"
                            }}
                          >
                            Clicking 'Subscribe' means that you agree to the our
                            company’s{" "}
                            <strong style={{color: "#B21F18"}}>
                              Terms and Conditions of service
                            </strong>{" "}
                            and{" "}
                            <strong style={{color: "#B21F18"}}>
                              Privacy Policy
                            </strong>
                            .
                          </span>
                        }
                      />
                    </Grid>
                    <Grid xs={12} className={classes.buttonContainer}>
                      <RedButton
                        variant="contained"
                        disabled={disableBtn() || state.loading}
                        sx={{
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
                          "Submit"
                        )}
                      </RedButton>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <EmailSubscription />
      <Footer />

      <CopyrightSection />

      {state.toasterMessage && (
        <Toaster
          message={state.toasterMessage}
          removeToaster={removeToaster}
          severity={state.toasterColor}
        />
      )}
    </>
  )
}

export default AuctionsForm
