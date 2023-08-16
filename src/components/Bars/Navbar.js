import React, {useEffect, useState} from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import "./Navbar.scss"
import {styled} from "@mui/material/styles"
import {Link, useNavigate} from "react-router-dom"
import {RedButton} from "../Buttons/redButton"

const pages = [
  {title: "Home", route: "/"},
  {
    title: "About",
    options: [
      {name: "About Us", route: "/about"},
      {
        name: "Why Swift Property",
        route: "/whyus"
      },
      //{name: "Testimonials", route: "/testimonials"}
    ]
  },
  {
    title: "Current Lots",
    options: [
      {name: "Current Lots", route: "/currentLots"},
      {
        name: "Available Properties",
        route: "/availablelots"
      },
      {name: "Bidder Registrations", route: "/registerToBid"}
    ]
  },
  {
    title: "Auctions",
    options: [
      {name: "Future Auctions Dates", route: "/upcomingauctions"},
      //{name: "Previous Auction", route: "/previousAuctions"},
      {name: "Free Valuation", route: "/requestAuction"},
      {name: "Auction Buying Guide", route: "/buyingguide"},
      {name: "Auction Selling Guide", route: "/sellingguide"},
      {name: "Benefits of Auctions", route: "/benefits"}
    ]
  },
  {title: "News & Blogs", options: [{name: "Blogs", route: "/blogs"}]},
  {title: "Contact", route: "/contact"}
]

const Navbar = ({height}) => {
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null)

  const [state, setState] = useState({options: [], active: null, next: 0})

  const handleLinkClick = (path) => {
    navigate(path)
  }

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
    setState({...state, active: null})
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const useStyles = styled((theme) => ({
    toolBar: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      border: "none",
      outline: "none",
      color: "white",
      width: "68px",
      "&::placeholder": {
        color: "blue", // Replace with your desired placeholder color
        fontSize: "14px" // Replace with your desired placeholder font size
      }
    },
    iconButton: {
      padding: 3
    },
    root: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
        alignItems: "center"
      },
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }

      // borderRadius: theme.shape.borderRadius,
    },
    contactBtnDiv: {
      marginLeft: "10px",
      backgroundColor: "#B21F18",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      },
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    title: {
      "&:hover": {
        color: `#B21F18 !important`
      }
    }
  }))

  // useEffect(() => {
  //     const storedActiveButtonIndex = localStorage.getItem('activeButtonIndex');
  //     if (storedActiveButtonIndex) {
  //         setState({...state, active: Number(storedActiveButtonIndex)});
  //     }
  // }, []);

  const handleButtonClick = (index) => {
    setState({...state, active: Number(index), options: []})
    // localStorage.setItem('activeButtonIndex', index); // Store the active button index in local storage
  }

  const classes = useStyles()

  return (
    <AppBar style={{height}} position="static" class={"navBar"}>
      <Container className="h-100" maxWidth="xl">
        <Toolbar disableGutters className={`${classes.toolBar} h-100`}>
          <img
            onClick={() => navigate("/")}
            style={{width: "190px", height: "70px", cursor: "pointer"}}
            src="/logo.svg"
            alt="Logo"
          />
          <Box
            sx={{
              flexGrow: 1,
              display: {xs: "flex", md: "none"},
              justifyContent: {xs: "center", sm: "end", md: "normal"}
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: "block", md: "none"}
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  onClick={(e) => {
                    if (page.options) {
                      handleDropdownOpen(e)
                      setState({...state, options: page.options})
                    } else if (page.route) {
                      handleLinkClick(page.route)
                    }
                  }}
                  // key={page.title} component={Link} to={page.route}
                >
                  <Typography
                    textAlign="center"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px"
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {xs: "none", md: "flex"},
              justifyContent: {xs: "none", md: "center"}
            }}
          >
            {pages.map((page, index) => {
              return (
                page.title !== "Contact" && (
                  <div class="dropdown">
                    <Button
                      style={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 700,
                        margin: 0,
                      }}
                      className={classes.title}
                      onClick={(e) => {
                        if (!page.options) {
                          setState({...state, active: Number(index)})
                          handleLinkClick(page.route)
                          handleButtonClick(index)
                        }
                      }}
                      key={page.title}
                      sx={{
                        my: 2,
                        marginRight: "20px",
                        color: "white",
                        display: "block"
                      }}
                    >
                      {page.title}
                    </Button>
                    <div class="dropdown-content">
                      {Array.isArray(page?.options) &&
                        page.options.length &&
                        page.options.map((elem) => {
                          return (
                            <MenuItem
                            style={{color: '#000'}}
                              onClick={() => {
                                handleDropdownClose()
                                handleButtonClick(state.next)
                                handleLinkClick(elem.route)
                              }}
                            >
                              {elem.name}
                            </MenuItem>
                          )
                        })}
                    </div>
                  </div>
                )
              )
            })}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDropdownClose}
            >
              {Array.isArray(state.options) &&
                state.options.length &&
                state.options.map((elem) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        handleDropdownClose()
                        handleButtonClick(state.next)
                        handleLinkClick(elem.route)
                      }}
                    >
                      {elem.name}
                    </MenuItem>
                  )
                })}
            </Menu>
          </Box>

          {/*<div className={classes.root}>*/}
          {/*    <InputBase*/}
          {/*        className={classes.input}*/}
          {/*        placeholder="SEARCH"*/}
          {/*        style={{color: 'white'}}*/}
          {/*    />*/}
          {/*    <div className={classes.iconButton}>*/}
          {/*        <SearchIcon/>*/}
          {/*    </div>*/}
          {/*</div>*/}

          <div className={classes.contactBtnDiv}>
            <RedButton
              variant="contained"
              component={Link}
              to={"/contact"}
              onClick={(e) => setState({...state, next: 20, active: 20})}
              style={{minWidth: "8rem", height: "3rem"}}
            >
              CONTACT
            </RedButton>
            {/* <Button
              
              gutterBottom
              onClick={(e) => setState({...state, next: 20, active: 20})}
              style={{
                fontFamily: "Inter",
                fontSize: "15px",
                color: "white",
                fontWeight: 500,
                paddingLeft: "15px",
                paddingRight: "15px"
              }}
            >
              CONTACT
            </Button> */}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
