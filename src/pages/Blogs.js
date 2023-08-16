import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import NewsAndBlogs from "../components/NewsAndBlogs/NewsAndBlogs"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {Grid} from "@mui/material"
import {styled} from "@mui/material/styles"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"


function Blogs() {
  const useStyles = styled((theme) => ({
    contactBtnDiv: {
      backgroundColor: "#B21F18",
      width: "133px",
      display: "flex",
      justifyContent: "center"
    },
    flexCenter: {
      display: "flex",
      justifyContent: "center"
    },
    whyUsContainer: {
      marginBottom: theme.spacing(6)
    }
  }))

  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div style={{background: "url(/news_main.png)", backgroundSize: "cover"}}>
        <HeaderContent title={"News & Blogs"} description={""} />
      </div>

      <NewsAndBlogs />

      <EmailSubscription />

      <Footer />

      <CopyrightSection />
    </>
  )
}

export default Blogs
