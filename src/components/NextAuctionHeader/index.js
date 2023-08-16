import {Typography} from "@mui/material"
import Grid from "@mui/material/Grid"
import {RedButton} from "../Buttons/redButton"

const NextAuctionHeader = ({removeBottomMargin = false, height}) => {
  return (
    <Grid
      container
      className="mh-35"
      style={{
        background: "#1D242A",
        marginBottom: removeBottomMargin ? "0px" : "30px",
        height
      }}
    >
      <Grid item xs={12} sm={2}/>
      <Grid className="self-center" item xs={12} sm={4} gutterBottom style={{padding: "30px"}}>
        <Typography
          variant="h4"
          gutterBottom
          color={"white"}
          style={{
            fontSize: "30px",
            letterSpacing: "3px",
            fontWeight: 600,
            fontFamily: "Inter"
          }}
        >
          Sign Up Via,
        </Typography>

        <Typography
          variant="h3"
          gutterBottom
          color='#B21F18'
          style={{
            fontSize: "70px",
            lineHeight: "48px",
            fontWeight: 900,
            fontFamily: "Inter",
            marginTop: "1.5rem"
          }}
        >
          EiGroup
        </Typography>

        <RedButton variant="contained">
          Register To Bid
        </RedButton>
      </Grid>

      <Grid className="self-center" item xs={12} sm={6} gutterBottom style={{padding: "30px"}}>
        <Typography
          variant="h4"
          gutterBottom
          color={"white"}
          style={{
            fontSize: "40px",
            lineHeight: "48px",
            // letterSpacing: "3px",
            fontWeight: 600,
            fontFamily: "Inter",
            color: "white",
            marginBottom: '0.5rem'
          }}
        >
          Next Auction
        </Typography>

        <Typography
          variant="h2"
          color={"white"}
          style={{
            fontSize: "60px",
            lineHeight: "48px",
            // letterSpacing: "3px",
            fontWeight: 900,
            fontFamily: "Inter",
            color: "white",
            marginBottom: "35px"
          }}
        >
          30th May 2023
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          color={"#889099"}
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            // letterSpacing: "3px",
            fontWeight: 300,
            fontFamily: "Inter",
            marginBottom: "20px"
          }}
        >
          This Auction will be conducted remotely
        </Typography>
      </Grid>
    </Grid>
  )
}
export default NextAuctionHeader
