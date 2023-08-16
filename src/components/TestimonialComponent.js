import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Rating from "@mui/material/Rating"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  card: {
    backgroundColor: "white",
    boxShadow: "0px 3px 18px rgba(1, 2, 2, 0.2)",
    borderRadius: "5px",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    marginLeft:'30px'
  },
  city: {
    color: theme.palette.grey[600]
  },
  image: {
    width: "13%",
    height: "50px",
    marginTop: "20px",
    marginRight: "20px"
  },
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "#1D242A",
    color: "white",
    padding: "10px"
  },
  padding20: {
    padding: "20px"
  },
  pl15: {
    paddingLeft: "15px"
  }
}))

const TestimonialComponent = ({data}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={6}>
            {data.map((testimonial) => (
              <Grid item xs={12} md={6}>
                <div className={classes.card}>
                  <Typography
                    style={{
                      fontSize: "30px",
                      lineHeight: "30px",
                      fontWeight: 600,
                      fontFamily: "Inter",
                      color: "#363A3D",
                      paddingTop: "40px",
                      marginLeft: '20px'
                    }}
                    variant="h5"
                    component="h2"
                    gutterBottom
                    className={classes.padding20}
                  >
                    {testimonial.heading}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textSecondary"
                    gutterBottom
                    className={classes.pl15}
                    style={{
                      fontSize: "16px",
                      lineHeight: "25px",
                      fontWeight: 400,
                      fontFamily: "Inter",
                      color: "#889099",
                      padding: "0 40px 40px 40px"
                    }}
                  >
                    {testimonial.description}
                  </Typography>
                  <div className={classes.outerContainer}>
                    <div className={classes.ratingContainer}>
                      <div>
                        <Rating
                          value={testimonial.rating}
                          precision={0.5}
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Inter",
                            color: "white",
                            paddingBottom: "10px"
                          }}
                        >
                          {testimonial.author}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={classes.city}
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            fontFamily: "Inter",
                            color: "white",
                            paddingBottom: "10px"
                          }}
                        >
                          {testimonial.city}
                        </Typography>
                      </div>
                    </div>
                    <img
                      src={testimonial.image}
                      alt="Commas"
                      className={classes.image}
                    />
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1} />
      </Grid>
    </div>
  )
}

export default TestimonialComponent
