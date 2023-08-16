import React, {useEffect, useState} from "react"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {styled} from "@mui/material/styles"
import {Grid, Pagination, PaginationItem} from "@mui/material"
import LotsList from "../components/Lots/LotsLists"
import {getSpecificLots} from "../apis/lots"
import CopyrightSection from "../components/CopyrightSection"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

function CurrentLots({type}) {
  const useStyles = styled((theme) => ({
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

  const [state, setState] = useState({
    lots: [],
    count: 0,
    page: 0,
    loading: false
  })

  useEffect(() => {
    window.scrollTo(0, 0)

    setState({...state, loading: true})
    const anonymousFunc = async () => {
      try {
        let lots = {data: {lots: []}}
        if (type === "current") {
          lots = await getSpecificLots(0, {current: true})
        } else {
          lots = await getSpecificLots(0, {available: true})
        }

        setState({
          ...state,
          lots: lots?.data?.lots ? lots.data.lots : [],
          count: lots?.data?.count ? lots.data.count : 0,
          loading: false
        })
      } catch (e) {
        setState({...state, loading: false})
        console.log(e.message)
      }
    }
    anonymousFunc()
  }, [type])

  const handleChangePage = async (event, page) => {
    try {
      setState({...state, loading: true})
      let lots = {data: {lots: []}}
      if (type === "current") {
        lots = await getSpecificLots(page - 1, {current: true})
      } else {
        lots = await getSpecificLots(page - 1, {available: true})
      }

      setState({
        ...state,
        page: page - 1,
        lots: lots?.data?.lots ? lots.data.lots : [],
        count: lots?.data?.count ? lots.data.count : 0,
        loading: false
      })

      window.scrollTo(0, 0)
    } catch (e) {
      setState({...state, loading: false})
      console.log(e.message)
    }
  }

  return (
    <>
      <NavbarWrapper />
      <div
        style={{
          background: type === "current" ? "url(/currentlots_main.png)" : "url(/availablelots_main.png)",
          backgroundSize: "cover"
        }}
      >
        <HeaderContent
          title={type === "current" ? "Current Lots" : "Available Lots"}
          description={""}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item md={0.5}/>
        <Grid item xs={12} md={11}>
          <LotsList
            type={type === "current"}
            hideHotList={true}
            loading={state.loading}
            showBothButtons={type === "current"}
            data={state.lots}
            text={type === "current" ? "Current Lots" : "Available Lots"}
          />
        </Grid>
        <Grid item md={0.5}/>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={1}/>
        <Grid item xs={10} style={{display: "flex", justifyContent: "center"}}>
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
        <Grid item md={1}/>
      </Grid>

      <EmailSubscription />
      <Footer />

      <CopyrightSection />
    </>
  )
}

export default CurrentLots
