import React from "react"
import {Grid, Typography} from "@mui/material"
import {styled} from "@mui/material/styles"

const CopyrightSection = () => {
  const useStyles = styled((theme) => ({
    root: {
      backgroundColor: "#13171C",
      color: "white"
    },
    iconsContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: "2px",
      width: "100%"
    },
    text: {
      [theme.breakpoints.down("md")]: {
        textAlign: "center"
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "start"
      }
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            gutterBottom
            className={classes.text}
            style={{
              fontSize: "15px",
              lineHeight: "28px",
              fontWeight: 400,
              fontFamily: "Inter",
              color: "white",
              textAlign: "center"
            }}
          >
            &copy; Swift Property Auctions London Copyright 2023. All Rights
            Reserved.
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default CopyrightSection
