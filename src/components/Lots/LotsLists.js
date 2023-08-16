import React, {useState, useEffect, useContext} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import {Link} from "react-router-dom"
import axios from "axios"
import fileDownload from "js-file-download"
import Toaster from "../Toaster"
import CircularProgress from "@mui/material/CircularProgress"
import {useNavigate} from "react-router-dom"
import {MyContext} from "../../context"
import {CopyToClipboard} from "react-copy-to-clipboard"
import { red } from "@mui/material/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8)
    }
  },
  card: {
    marginBottom: theme.spacing(2),
    position: "relative"
  },
  hotSellerFlag: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: red['700'],
    color: "#fff",
    padding: theme.spacing(1),
    borderRadius: 3,
    zIndex: 1
  },
  image: {
    width: "100%",
    height: 'auto',
    objectFit: "cover",
    transition: "1s all ease-in-out",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
    // marginTop: theme.spacing(2),
  },
  textStyling: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3)
  },
  legalPdfBtn: {
    fontSize: "15x",
    backgroundColor: "#B21F18",
    color: "white",
    lineHeight: "24px",
    fontWeight: 600,
    fontFamily: "Inter",
    borderRadius: 0,
    padding: "10px",
    textTransform: 'none',
    marginBottom: "10px",
    "&:hover": {
      border: "1px solid #B21F18",
      backgroundColor: "white",
      color: "#B21F18"
    }
  },
  detailsBtn: {
    fontSize: "16px",
    backgroundColor: "#1D242A",
    color: "white",
    lineHeight: "24px",
    fontWeight: 550,
    fontFamily: "Inter",
    borderRadius: 0,
    border: "1px solid #1D242A",
    textTransform: 'none',
    padding: "10px",
    "&:hover": {
      backgroundColor: "white",
      color: "#1D242A"
    }
  }
}))

function LotsList({
  type,
  hideHotList = false,
  data,
  text,
  showBothButtons = false,
  showThree = false,
  loading = false
}) {
  const classes = useStyles()

  const [state, setState] = useState({
    lots: [],
    toasterColor: "success",
    toasterMessage: ``,
    favorites: []
  })

  const {sharedData, updateSharedData} = useContext(MyContext)

  const navigate = useNavigate()

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteLots") || "[]")

    setState({...state, lots: data && data.length > 0 ? data : [], favorites})
  }, [data])
  const removeToaster = () => {
    setState({...state, toasterColor: "success", toasterMessage: ""})
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.textStyling}>
        <Grid item>
          <Typography
            variant="h4"
            component="h4"
            color={"#B21F18"}
            gutterBottom
            style={{
              fontSize: "45px",
              lineHeight: "48px",
              fontWeight: 600,
              fontFamily: "Inter"
            }}
          >
            {text ? text : "Lots Options"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {state.lots && state.lots.length > 0 && !loading ? (
          state.lots.map((item, index) => (
            <Grid item xs={12} sm={4} lg={showThree ? 4 : 3} key={index}>
              <Card className={classes.card}>
                {item.featured && !hideHotList && (
                  <div className={classes.hotSellerFlag}>
                    <Typography
                      style={{
                        fontSize: "15px",
                        lineHeight: "24px",
                        fontWeight: 400,
                        fontFamily: "Inter"
                      }}
                      variant="caption"
                    >
                      Hot offer
                    </Typography>
                  </div>
                )}
                <div style={{height:'200px', overflow:'hidden'}}>
                    <img src={`https://swiftproperty.triolabz.com/apis/${item.propertyImage}`} alt={"Property Image"} className={classes.image} />
                </div>
                
                <CardContent>
                  <div className={classes.section}>
                    <Typography
                      sx={{fontWeight: "bold"}}
                      variant="subtitle2"
                      component="h2"
                      style={{
                        fontSize: "18px",
                        color: "#1D242A",
                        lineHeight: "28px",
                        fontWeight: 600,
                        fontFamily: "Inter"
                      }}
                    >
                      Guide Price*
                    </Typography>
                    <div>
                      <CopyToClipboard
                        text={`https://testing.swiftpropertyauctions.co.uk/lotsdetails/${item._id}`}
                        onCopy={() =>
                          setState({
                            ...state,
                            toasterColor: "success",
                            toasterMessage: "Url Copied To Clipboard!"
                          })
                        }
                      >
                        <IconButton aria-label="share" style={{padding: "0px"}}>
                          <img src={"/share.svg"} alt={"share"} />
                        </IconButton>
                      </CopyToClipboard>

                      {Array.isArray(state.favorites) &&
                      state.favorites.length > 0 &&
                      state.favorites.includes(item._id) ? (
                        <IconButton
                          aria-label="favorite"
                          onClick={() => {
                            const fav = JSON.parse(
                              JSON.stringify(state.favorites || [])
                            ).filter((el) => !!el && el !== item._id)

                            setState({...state, favorites: fav})
                            localStorage.setItem(
                              "favoriteLots",
                              JSON.stringify(fav)
                            )
                          }}
                        >
                          <img
                            style={{width: "30px"}}
                            src={"/heartFill.svg"}
                            alt={"heart"}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label="favorite"
                          onClick={() => {
                            setState({
                              ...state,
                              favorites: [...state.favorites, item._id]
                            })
                            localStorage.setItem(
                              "favoriteLots",
                              JSON.stringify([...state.favorites, item._id])
                            )
                          }}
                        >
                          <img src={"/love.svg"} alt={"share"} />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      fontSize: "30px",
                      color: "#B21F18",
                      lineHeight: "28px",
                      fontWeight: 600,
                      fontFamily: "Inter",
                      marginBottom: "13px",
                      marginTop: "5px"
                    }}
                  >
                    £ {item.price}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    style={{
                      fontSize: "18px",
                      color: "#1D242A",
                      lineHeight: "20px",
                      fontWeight: 500,
                      fontFamily: "Inter",
                      marginBottom: "30px"
                    }}
                  >
                    {item.address && item.address.length > 20
                      ? item.address.substring(0, 20) + " ....."
                      : item.address}
                  </Typography>
                  {showBothButtons && (
                    <Button
                      className={classes.legalPdfBtn}
                      fullWidth
                      gutterBottom
                      onClick={async (e) => {
                        try {
                          if (item.legalPackPdf) {
                            const response = await axios.get(
                              `https://swiftproperty.triolabz.com/apis/${item.legalPackPdf}`,
                              {
                                headers: {
                                  "Content-Type": "multipart/form-data"
                                },
                                responseType: "blob"
                              }
                            )

                            if (response && response.data) {
                              fileDownload(response.data, `file.pdf`)
                            } else {
                              setState({
                                ...state,
                                toasterColor: "error",
                                toasterMessage: "Unable To Download File!"
                              })
                            }
                          } else {
                            setState({
                              ...state,
                              toasterColor: "error",
                              toasterMessage: "No File Link Found!"
                            })
                          }
                        } catch (e) {
                          setState({
                            ...state,
                            toasterColor: "error",
                            toasterMessage: "No File Link Found!"
                          })
                          console.log("error while downloading file", e.message)
                        }
                      }}
                    >
                      Download Legal Package
                    </Button>
                  )}
                  <Button
                    className={classes.detailsBtn}
                    color="primary"
                    fullWidth
                    component={Link}
                    onClick={(e) => {
                      if (type) {
                        updateSharedData("current")
                      } else {
                        updateSharedData("available")
                      }

                      navigate(`/lotsdetails/${item._id}`)
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : !!loading ? (
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
            <Typography color="textSecondary" gutterBottom textAlign={"center"}>
              No Content To show
            </Typography>
          </div>
        )}
      </Grid>
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

export default LotsList