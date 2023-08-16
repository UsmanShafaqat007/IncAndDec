import {Box, Typography} from "@mui/material"
import Grid from "@mui/material/Grid"
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos"
import {styled} from "@mui/material/styles"
import {Link} from "react-router-dom"
import {RedButton} from "../Buttons/redButton"
import Tooltip from "@mui/material/Tooltip"

const useStyles = styled((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("xs")]: {
      marginTop: "40px"
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "30px"
    }
  },
  headings: {
    marginTop: "20px",
    [theme.breakpoints.up("xs")]: {
      textAlign: "initial"
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  }
}))

const buttons = [
  {
    title: "Free Valuation",
    component: <ArrowForwardIos />,
    to: "/requestauction"
  },
  {
    title: "Current Lots",
    component: <ArrowForwardIos />,
    to: "/currentlots"
  },
  {
    title: "Bidder Registration",
    component: <ArrowForwardIos />,
    to: "/registerToBid"
  },
  {
    title: "Available Lots",
    component: <ArrowForwardIos />,
    to: "/availablelots"
  }
]

function HeaderContent({title, description, showButtons = false}) {
  const classes = useStyles()

  return (
    <div className="mh-65">
      <Grid container>
        <Grid xs={12} sm={2} />
        <Grid
          className="self-end"
          style={{marginTop: "19vh"}}
          item
          xs={12}
          sm={8}
        >
          <Box className={classes.root}>
            <Typography
              variant="h2"
              style={{
                fontFamily: "Public Sans",
                fontSize: "4vw",
                fontWeight: 800,
                textAlign: "center",
                letterSpacing: "2px",
                lineHeight: "80px",
                marginBottom: !!description ? "" : "60px"
              }}
              gutterBottom
              color={"white"}
              className={classes.headings}
            >
              {title}
            </Typography>

            <Typography
              variant={"body1"}
              color={"white"}
              style={{
                fontFamily: "Inter",
                fontWeight: !showButtons ? 400 : 500,
                textAlign: "center",
                fontSize: "2vw",
                paddingBottom: !showButtons ? "50px" : ""
              }}
              className={classes.headings}
            >
              {description}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={2} />
      </Grid>
      {showButtons && (
        <Grid container>
          <Grid xs={12} sm={2} />
          <Grid className="self-end" item xs={12} sm={8}>
            <Grid
              container
              style={{
                marginTop: "15px",
                paddingTop: "20px",
                paddingBottom: "20px",
                marginBottom: "30px",
                textAlign: "center"
              }}
              xs={12}
              sm={12}
            >
              {buttons.map((item) => (
                <Grid style={{margin: "0.5rem 0"}} item xs={12} sm={3} lg={3}>
                  <Tooltip title={item.title} placement="top" arrow>
                    <RedButton
                      variant="contained"
                      style={{padding: "0 0.5rem", fontSize: "0.75rem"}}
                      component={Link}
                      to={item.to}
                      endIcon={item.component}
                    >
                      <span className="truncate">{item.title}</span>
                    </RedButton>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid xs={12} sm={2} />
        </Grid>
      )}
    </div>
  )
}
export default HeaderContent
