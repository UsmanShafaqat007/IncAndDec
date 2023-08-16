import React from "react"
import {
  Typography
} from "@mui/material"
import {makeStyles} from "@material-ui/core/styles"
import { Card, CardContent } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" // Add box shadow style
  },
  listItem: {
    marginBottom: theme.spacing(1)
  },
  icon: {
    fontSize: "1rem"
  }
}))

const TextCard = ({height = "", title, items}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card} style={{height: height ? height : "auto", padding: '1.2rem'}}>
      <CardContent>
        <Typography
          variant="h5"
          textAlign={"center"}
          gutterbottom
          style={{
            fontSize: "25px",
            color: "#B21F18",
            lineHeight: "48px",
            fontWeight: 600,
            fontFamily: "Inter"
          }}
        >
          {title}
        </Typography>

        {typeof items === "string" && (
          <Typography
            style={{
              fontSize: "17px",
              color: "#889099",
              lineHeight: "28px",
              fontWeight: 400,
              fontFamily: "Inter",
              whiteSpace: "break-spaces",
              marginTop: "15px"
            }}
            variant="body1"
            gutterbottom
          >
            {items}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default TextCard
