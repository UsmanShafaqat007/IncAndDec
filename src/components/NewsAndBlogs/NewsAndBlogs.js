import React, {useState, useEffect} from "react"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  PaginationItem
} from "@mui/material"
import {styled} from "@mui/material/styles"
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos"
import {Link} from "react-router-dom"
import {getBlogs} from "../../apis/blogs"
import Toaster from "../Toaster"
import CircularProgress from "@mui/material/CircularProgress"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const NewsAndBlogs = ({offset = 20}) => {
  const [state, setState] = useState({
    blogs: [],
    count: 0,
    page: 0,
    loading: false
  })

  useEffect(() => {
    const anonymousFunc = async () => {
      try {
        setState({...state, loading: true})

        let blogs = await getBlogs(0, offset)

        setState({
          ...state,
          blogs: blogs?.data?.blogs ? blogs.data.blogs : [],
          count: blogs?.data?.count ? blogs.data.count : 0,
          loading: false
        })
      } catch (e) {
        setState({...state, loading: false})
        console.log(e.message)
      }
    }
    anonymousFunc()
  }, [])

  const handleChangePage = async (event, page) => {
    try {
      setState({...state, loading: true})
      let blogs = await getBlogs(page - 1)

      setState({
        ...state,
        page: page - 1,
        blogs: blogs?.data?.blogs ? blogs.data.blogs : [],
        count: blogs?.data?.count ? blogs.data.count : 0,
        loading: false
      })

      window.scrollTo(0, 100)
    } catch (e) {
      setState({...state, loading: false})
      console.log(e.message)
    }
  }

  const useStyles = styled((theme) => ({
    card: {
      padding: 0,
      height: "440px"
    },
    btnColor: {
      color: "#B21F18"
    },
    pagination: {
      "& .MuiPaginationItem-page": {
        color: "#B21F18",
        backgroundColor: "white",
        margin: theme.spacing(0.5), // Add spacing between page numbers
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "white" // Change background color on hover
        }
      },
      "& .Mui-selected": {
        fontWeight: "bold",
        backgroundColor: "white !important"
      },
      "& .MuiPaginationItem-icon": {
        background: "#B21F18",
        padding: "7px",
        borderRadius: 2,
        color: "white"
      }
    }
  }))

  const classes = useStyles()

  const removeToaster = () => {
    setState({...state, toasterColor: "success", toasterMessage: ""})
  }

  return (
    <div style={{margin: "20px 0", paddingLeft: "20px", paddingRight: "20px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "85px"
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                fontSize: "40px",
                lineHeight: "48px",
                // letterSpacing: "3px",
                fontWeight: 600,
                fontFamily: "Inter"
              }}
            >
              News & Blogs
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontSize: "15px",
                lineHeight: "28px",
                color: "#889099",
                // letterSpacing: "3px",
                fontWeight: 400,
                fontFamily: "Inter",
                marginTop: "10px",
                marginBottom: "20px"
              }}
            >
              Our blog is your go-to source for everything related to property
              auctions, providing you with expert advice, valuable tips, and the
              latest news and updates in the industry. Whether you're looking to
              buy or sell a property at auction, our blog has got you covered.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8} style={{marginBottom: "40px"}}>
          <Grid container spacing={2}>
            {state.blogs && state.blogs.length > 0 && !state.loading ? (
              state.blogs.map((item) => (
                <>
                  <Grid item xs={12} md={6} key={item._id}>
                    <Card className={classes.card}>
                      <CardContent style={{padding: "0px"}}>
                        <img
                          src={
                            "https://swiftproperty.triolabz.com/apis/" +
                            item["Blog Image Url"]
                          }
                          alt="Card"
                          style={{width: "100%", height: "250px"}}
                        />
                        <Typography variant="h6" style={{padding: "16px"}}>
                          {item.Title && item.Title.length > 20
                            ? item.Title.substring(0, 20) + " ....."
                            : item.Title}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{
                            fontSize: "15px",
                            lineHeight: "28px",
                            // letterSpacing: "3px",
                            fontWeight: 400,
                            fontFamily: "Inter",
                            paddingLeft: "16px",
                            color: "#889099"
                          }}
                        >
                          {item.Description && item.Description.length > 100
                            ? item.Description.substring(0, 100) + "..."
                            : item.Description}
                        </Typography>

                        <Button
                          endIcon={<ArrowForwardIos />}
                          component={Link}
                          to={`/blogdetails/${item._id}`}
                          disableElevation
                          disableRipple
                          sx={{
                            background: "transparent !important",
                            "&:hover": {
                                opacity: '1 !important'
                            }
                          }}
                          style={{
                            paddingLeft: "16px",
                            color: '#B21F18',
                            textTransform: "none",
                            fontSize: "15px",
                            lineHeight: "24px",
                            fontWeight: 700,
                            fontFamily: "Inter",
                            opacity: "0.9"
                          }}
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              ))
            ) : !!state.loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography
                  color="textSecondary"
                  gutterBottom
                  textAlign={"center"}
                >
                  No Content To show
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>

      {offset !== 6 && (
        <Grid container spacing={2}>
          <Grid item md={1} />
          <Grid
            item
            xs={10}
            style={{display: "flex", justifyContent: "center"}}
          >
            <Pagination
              classes={{root: classes.pagination}}
              count={Math.ceil(state.count / 20)}
              onChange={handleChangePage}
              renderItem={(item) => (
                <PaginationItem
                  slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                  {...item}
                />
              )}
            />
          </Grid>
          <Grid item md={1} />
        </Grid>
      )}

      {state.toasterMessage && (
        <Toaster
          message={state.toasterMessage}
          removeToaster={removeToaster}
          severity={state.toasterColor}
        />
      )}
    </div>
  )
}

export default NewsAndBlogs