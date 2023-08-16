import React from "react"
import {Grid, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import {Link, useNavigate} from "react-router-dom"

const links = [
  [
    {label: "About Us", url: "/about"},
    {label: "Why Swift Property", url: "/whyus"},
    //{label: 'Testimonials', url: '/testimonials'},
    {label: "Contact Us", url: "/contact"}
  ],
  [
    {label: "Current Lots", url: "/currentlots"},
    {label: "Available Lots", url: "/availablelots"}
  ],
  [
    {label: "Future Auctions Date", url: "/upcomingauctions"},
    //{label: 'Previous Auctions', url: '/previousAuctions'},
    {label: "Free Valuation", url: "/requestauction"},
    {label: "Auction Buying Guide", url: "/buyingguide"},
    {label: "Auction Selling Guide", url: "/sellingguide"},
    {label: "Benefits of Auctions", url: "/benefits"}
  ],
  [
    {label: "Complaint Procedure", url: "/complaint"},
    {label: "Online Auction Buying Guide", url: "/"},
    {label: "Proxy Telephone & Internet Bidding Form", url: "/"},
    {label: "Privacy Policy", url: "/policy"},
    {label: "AML ID Requirements", url: "/"},
    {label: "Terms & Conditions", url: "/"}
  ]
]

const Footer = ({}) => {
  const iconStyle = {
    borderRadius: "2px",
    background: "#4B5055",
    width: "21px",
    paddingLeft: "7px",
    paddingRight: "7px",
    height: "37px",
    marginRight: "7px"
  }

  const useStyles = makeStyles((theme) => ({
    iconsStyleDiv: {
      display: "flex",
      gap: "8px",
      marginTop: "8px",
      [theme.breakpoints.up("md")]: {
        justifyContent: "start"
      },
      [theme.breakpoints.down("md")]: {
        justifyContent: "center"
      }
    },
    alignCenterSM: {
      [theme.breakpoints.up("md")]: {
        textAlign: "start"
      },
      [theme.breakpoints.down("md")]: {
        textAlign: "center"
      }
    },
    footer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      backgroundColor: "#1D242A",
      color: "white"
    }
  }))

  const classes = useStyles()

  const headings = ["About", "Lots", "Auctions", "Information"]

  const navigate = useNavigate()

  const gridSpacing = {
    2: "2",
    3: "3"
  }
  return (
    <div className={classes.footer}>
      <Grid container style={{paddingBottom: "30px", paddingTop: "30px"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={11}>
          <Grid container >
            <Grid item xs={12} sm={12} md={3} className={classes.alignCenterSM}>
              <div style={{width: "100%"}}>
                <img
                  onClick={(e) => {
                    navigate("/")
                  }}
                  src="/logo.svg"
                  alt="Logo"
                  style={{cursor: "pointer", width: "160px"}}
                />

                <Typography
                  variant="body2"
                  gutterBottom
                  style={{
                    fontSize: "16px",
                    lineHeight: "17px",
                    fontWeight: 700,
                    fontFamily: "Public Sans",
                    color: "white",
                    marginBottom: "20px",
                    marginTop: "40px"
                  }}
                >
                  Call: 020 7824 9867
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{
                    fontSize: "16px",
                    lineHeight: "17px",
                    fontWeight: 700,
                    fontFamily: "Public Sans",
                    color: "white",
                    marginBottom: "40px",
                    marginTop: "20px"
                  }}
                >
                  Email: info@swiftpropertyauctions.co.uk
                </Typography>
                <div className={classes.iconsStyleDiv}>
                  <img style={{...iconStyle}} src={"/fb.svg"} alt={"share"} />
                  <img style={{...iconStyle}} src={"/li.svg"} alt={"share"} />
                  <img style={{...iconStyle}} src={"/tw.svg"} alt={"share"} />
                  <img style={{...iconStyle}} src={"/ins.svg"} alt={"share"} />
                </div>
              </div>
            </Grid>
            <Grid item sm={12} md={1} />
            {headings.map((heading, index) => (
              <Grid
                item
                xs={6}
                md={gridSpacing[index] ?? 1.5}
                key={index}
                className={classes.alignCenterSM}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: 600,
                    fontFamily: "Public Sans",
                    color: "white",
                    marginBottom: "20px",
                    marginTop: "20px",
                    letterSpacing: "1px"
                  }}
                >
                  {heading}
                </Typography>
                {links[index].map((link, linkIndex) => (
                  <Typography
                    component={Link}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      color: "#6D737A",
                      fontSize: "15px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      fontFamily: "Public Sans",
                      marginBottom: "20px",
                      marginTop: "20px",
                      letterSpacing: "1px"
                    }}
                    to={link.url}
                    key={linkIndex}
                    variant="body2"
                    gutterBottom
                  >
                    {link.label}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
