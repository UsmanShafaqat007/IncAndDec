import React from "react"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
} from "@mui/material"
import {
  MoreVert as MoreIcon,
  MailOutline,
  FacebookOutlined,
  Twitter,
  Instagram
} from "@mui/icons-material"
import {LinkedIn, LocalPhoneOutlined, Phone} from "@material-ui/icons"
import "./TopBar.scss"
import {makeStyles} from "@material-ui/core/styles"

const TopBar = ({height}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const useStyles = makeStyles((theme) => ({
    dotsBtn: {
      width: "3px",
      padding: 0
    },
    phoneBtn: {
      marginLeft: "12px",
      marginRight: "5px"
    }
  }))

  const classes = useStyles()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const mobileMenuId = "primary-search-account-menu-mobile"

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const menuItems = [
    {
      title: "Facebook",
      component: <img  src={'/fb.svg'} alt={"share"}onClick={() => itemClick("https://www.facebook.com/profile.php?id=100094843984182&mibextid=ZbWKwL")}/>
    },
    {title: "LinkedIn", component: <img src={'/li.svg'} alt={"share"}/>},
    {title: "Twitter", component: <img src={'/tw.svg'} alt={"share"}/>},
    {
      title: "Instagram",
      component: <img src={'/ins.svg'} alt={"share"} onClick={() => itemClick("https://instagram.com/swiftpropertyauctions?igshid=MzRlODBiNWFlZA==")}/>
    },
    {title: "123-6565-88", component: <Phone />}
  ]

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {menuItems.map((item) => {
        return (
          <MenuItem>
            <IconButton size="large" color="inherit">
              {item.component}
            </IconButton>
            <p>{item.title}</p>
          </MenuItem>
        )
      })}
    </Menu>
  )

  const itemClick = (linkUrl) => {
    window.open(linkUrl, "_blank")
  }
  const officialEmail = "info@swiftpropertyauctions.co.uk"

  return (
    <Box className={`element ${height ? 'visible' : 'hidden'}`} style={{height}} sx={{flexGrow: 1}}>
      <AppBar position="static" class={"appBar h-100"}>
        <Toolbar>
          <IconButton
            style={{marginLeft: "3rem"}}
            disableRipple
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          > 
            <MailOutline />
          </IconButton>
          <Typography variant="subtitle1" style={{fontFamily: "Inter"}}>
            <Box fontWeight="bold" display="inline">
              {" "}
              Email us at:{" "}
            </Box>
            <a
              style={{color:"#fff"}}
              href={`mailto:${officialEmail}?subject=${encodeURIComponent(
                ""
              )}&body=${encodeURIComponent("")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {officialEmail}
            </a>
          </Typography>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: "none", md: "flex"}}}>
            {menuItems
              .filter((e) => e.title !== "123-6565-88")
              .map((item) => {
                const {component} = item
                return (
                  <IconButton size="large" color="inherit">
                    {component}
                  </IconButton>
                )
              })}

            <IconButton disableRipple size="large" color="inherit" mx={3}>
              | <LocalPhoneOutlined className={classes.phoneBtn} />
              <Typography
                variant="body1"
                style={{
                  marginTop: "2px",
                  marginLeft: "8px",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  lineHeight: "22px"
                }}
              >
                020 7824 9867
              </Typography>
            </IconButton>
          </Box>
          <Box sx={{display: {xs: "flex", md: "none"}}}>
            <IconButton
              className={classes.dotsBtn}
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
export default TopBar
