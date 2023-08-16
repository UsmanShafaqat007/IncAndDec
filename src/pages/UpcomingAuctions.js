import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {Grid} from "@mui/material"
import UpcomingAuctionsComponent from "../components/UpcomingAuctionsComponent"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

function UpcomingAuctions() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div
        style={{background: "url(/upcoming_main.png)", backgroundSize: "cover"}}
      >
        <HeaderContent title={"Future Auctions Dates"} description={""} />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <UpcomingAuctionsComponent />
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <EmailSubscription />
      <Footer />

      <CopyrightSection />
    </>
  )
}

export default UpcomingAuctions
