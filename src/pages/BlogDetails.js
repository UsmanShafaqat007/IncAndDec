import React, {useEffect, useState} from "react"
import {styled} from "@mui/material/styles"
import {
  Breadcrumbs,
  Grid,
  IconButton,
  Typography
} from "@mui/material"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {useParams} from "react-router"
import {getBlog} from "../apis/blogs"
import CopyrightSection from "../components/CopyrightSection"
import {Link} from "react-router-dom"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

const useStyles = styled((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    }
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2)
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2)
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    marginBottom: theme.spacing(4)
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(4)
  },
  columnContainer: {
    marginBottom: theme.spacing(2)
  }
}))

const BlogDetails = ({}) => {
  const classes = useStyles()

  const [state, setState] = useState({
    breadcrumbs: [{title: "News & Blogs", route: "/blogs"}],
    title: "",
    description: "",
    blogImage: "",
    shortDescription: ""
  })

  const {id} = useParams()

  useEffect(() => {
    const anonymousFunc = async () => {
      try {
        const blogDetails = await getBlog(id)

        const {title, blogImage, description, shortDescription} =
          blogDetails && blogDetails.data ? blogDetails.data : {}

        setState({
          ...state,
          breadcrumbs: [...state.breadcrumbs, {title}],
          title: title ? title : "No title Found",
          description: description ? description : "No description Found",
          blogImage: blogImage,
          shortDescription
        })

        window.scrollTo(0, 0)
      } catch (e) {
        console.log(e.message)
      }
    }
    anonymousFunc()
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div style={{background: "url(/news_main.png)", backgroundSize: "cover"}}>
        <HeaderContent title={"News & Blogs"} description={""} />
      </div>
      <Grid container spacing={2}>
        <Grid item md={1}/>
        <Grid item xs={12} md={10}>
          <div className={classes.container}>
            <Grid container alignItems="center" className={classes.breadcrumbs}>
              <Breadcrumbs aria-label="breadcrumb">
                {state.breadcrumbs.map((breadcrumb, index) => (
                  <Typography
                    component={Link}
                    to={breadcrumb.route}
                    style={{
                      fontSize: "12x",
                      color:
                        index + 1 === state.breadcrumbs.length
                          ? "#B21F18"
                          : "#A0A0A0",
                      lineHeight: "24px",
                      fontWeight: 400,
                      fontFamily: "Inter",
                      cursor: "pointer",
                      textDecoration: "none"
                    }}
                    key={index}
                    color="textSecondary"
                  >
                    {breadcrumb.title}
                  </Typography>
                ))}
              </Breadcrumbs>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  style={{
                    fontSize: "30px",
                    color: "#1D242A",
                    lineHeight: "40px",
                    fontWeight: 600,
                    fontFamily: "Inter",
                    marginBottom: "20px"
                  }}
                  variant="h5"
                >
                  {state.title}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton style={{padding: "5px"}}>
                  <img src={"/love.svg"} alt={"share"} />
                </IconButton>
                <IconButton style={{padding: "5px"}}>
                  <img src={"/share.svg"} alt={"share"} />
                </IconButton>
              </Grid>
            </Grid>

            {/* <Grid container className={classes.columnContainer}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    fontSize: "17px",
                    color: "#889099",
                    lineHeight: "28px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    whiteSpace: "pre-line"
                  }}
                >{`${
                  state.shortDescription ? state.shortDescription : ""
                }`}</Typography>
              </Grid>
            </Grid> */}

            <div className={classes.imageContainer}>
              <img
                src={
                  "https://swiftproperty.triolabz.com/apis/" +
                  state.blogImage
                }
                alt="Product"
                className={classes.image}
              />
            </div>
            <Grid container className={classes.columnContainer}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    fontSize: "17px",
                    color: "#889099",
                    lineHeight: "28px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    whiteSpace: "pre-line"
                  }}
                >{`${state.description}`}</Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={1}/>
      </Grid>
      <EmailSubscription />
      <Footer />

      <CopyrightSection />
    </>
  )
}

export default BlogDetails