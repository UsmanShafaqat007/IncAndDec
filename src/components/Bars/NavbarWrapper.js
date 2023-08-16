import React, {useEffect, useState} from "react"
import TopBar from "./TopBar"
import Navbar from "./Navbar"

const NavbarWrapper = ({withBackground = false}) => {
  const [navbarBg, setNavbarBg] = useState(null)
  const [hideTopBar, setHideTopBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBg(true)
      } else {
        setNavbarBg(false)
      }
      if (window.scrollY > 200) {
        setHideTopBar(true)
      } else {
        setHideTopBar(false)
      }
    }
    if (!withBackground) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed-navbar ${withBackground ? "dark-background" : ""} ${
        navbarBg === null
          ? ""
          : navbarBg
          ? "dark-background"
          : navbarBg === false && "light-background"
      }`}
    >
      <TopBar height={hideTopBar ? 0 : "7vh"} />
      <Navbar height={"12vh"} />
    </div>
  )
}

export default NavbarWrapper
