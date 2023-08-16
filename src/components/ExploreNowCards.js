import React from "react"
import {Grid, Card, CardContent, Typography, Button} from "@mui/material"
import {ArrowForwardIos} from "@mui/icons-material"
import {makeStyles} from "@material-ui/core/styles"
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  card: {
    color: "white",
    height: "100%",
    transition: 'transform .3s ease-in-out !important',
    "&:hover": {
      transform: 'scale(1.1)'
    }
  },
  button: {
    color: "white",
    "&:hover": {
      backgroundColor: "#ffffff38 !important"
    }
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px"
  },
  icons: {
    color: "white"
  },
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}))

const ExploreNowCards = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={2} />

        {[
          {
            title: "Auction Valuation",
            link: "/requestauction",
            icon: "/calculator.svg"
          },
          {
            title: "Benefits of Auction",
            link: "/benefits",
            icon: "/page.svg"
          }
        ].map((elem) => (
          <Grid item xs={12} sm={4}>
            <Card
            onClick={() => window.open(elem.link, '_self')}
              className={classes.card}
              style={{
                backgroundColor: "#1D242A",
                color: "white",
                cursor: "pointer"
              }}
            >
              <CardContent>
                <div className={classes.iconsContainer}>
                  <img
                    src={elem.icon}
                    style={{marginTop: "40px"}}
                    alt={"icons"}
                  />
                </div>
                <Typography
                  textAlign={"center"}
                  variant="h5"
                  gutterBottom
                  style={{
                    fontSize: "2rem",
                    lineHeight: "48px",
                    color: "white",
                    letterSpacing: "0.5px",
                    fontWeight: 600,
                    fontFamily: "Inter"
                  }}
                >
                  {elem.title}
                </Typography>
                <div className={classes.iconsContainer}>
                  <Button
                    variant="text"
                    endIcon={<ArrowForwardIos />}
                    className={classes.button}
                    component={Link}
                    to={elem.link}
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "white",
                      fontWeight: 600,
                      fontFamily: "Inter",
                      textTransform: "none"
                    }}
                  >
                    Explore Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={2}/>
      </Grid>
    </div>
  )
}

export default ExploreNowCards
