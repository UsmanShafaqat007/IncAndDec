import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
    // textAlign: 'center',
  },
  title: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    textAlign: "center"
  },
  card: {
    //marginBottom: theme.spacing(2),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  }
}))

const WhyUs = ({data, showTwo, height}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {!showTwo && (
        <Typography
          variant="h4"
          component="h1"
          className={classes.title}
          style={{
            fontSize: "40px",
            lineHeight: "48px",
            // letterSpacing: "3px",
            fontWeight: 600,
            fontFamily: "Inter"
          }}
        >
          Why Us?
        </Typography>
      )}
      <Grid container spacing={8}>
        {data.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={showTwo ? 6 : 4}
            lg={showTwo ? 6 : 3}
            key={index}
          >
            <Card className={classes.card}>
              <CardContent style={{height: height ? height : "auto"}}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{width: "80px", marginBottom: "1rem"}}
                />
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  style={{
                    fontSize: "20px",
                    lineHeight: "32px",
                    letterSpacing: "0.5px",
                    fontWeight: 600,
                    fontFamily: "Inter"
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                    color: "#889099",
                    letterSpacing: "0.5px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    paddingBottom: "10px"
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
export default WhyUs
