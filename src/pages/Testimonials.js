import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {makeStyles} from "@material-ui/core/styles"
import {Grid} from "@mui/material"
import TestimonialComponent from "../components/TestimonialComponent"
import CopyrightSection from "../components/CopyrightSection"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

function Testimonials() {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: "10px"
    }
  }))

  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const testimonialData = [
    {
      heading: "Client Testimonial 1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      rating: 4.5,
      author: "John Doe",
      city: "New York",
      image: "/commaIcon.svg"
    },
    {
      heading: "Client Testimonial 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      rating: 1,
      author: "Jane Smith",
      city: "Los Angeles",
      image: "/commaIcon.svg"
    },
    {
      heading: "Client Testimonial 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      rating: 5,
      author: "Jane Smith",
      city: "Los Angeles",
      image: "/commaIcon.svg"
    },
    {
      heading: "Client Testimonial 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      rating: 2,
      author: "Jane Smith",
      city: "Los Angeles",
      image: "/commaIcon.svg"
    },
    {
      heading: "Client Testimonial 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      rating: 3,
      author: "Jane Smith",
      city: "Los Angeles",
      image: "/commaIcon.svg"
    },
    {
      heading: "Client Testimonial 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      rating: 5,
      author: "Jane Smith",
      city: "Los Angeles",
      image: "/commaIcon.svg"
    }
  ]

  return (
    <>
      <NavbarWrapper />
      <div
        style={{
          background: "url(/testimonials_main.png)",
          backgroundSize: "cover"
        }}
      >
        <HeaderContent title={"Testimonials"} description={""} />
      </div>
      <div className={classes.root}>
        <TestimonialComponent data={testimonialData} />
      </div>
      <EmailSubscription />
      <Footer />

      <CopyrightSection />
    </>
  )
}

export default Testimonials
