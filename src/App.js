import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import ErrorPage from "./pages/Error"
import About from "./pages/About"
import WhyUsPage from "./pages/WhyUsPage"
import Testimonials from "./pages/Testimonials"
import UpcomingAuctions from "./pages/UpcomingAuctions"
import CurrentLots from "./pages/CurrentLots"
import LotsDetails from "./pages/LotsDetails"
import PreviousAuctions from "./pages/PreviousAuctions"
import AuctionsForm from "./pages/AuctionsForm"
import Signup from "./pages/Signup"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import ResetEmail from "./pages/ResetEmail"
import RegisterToBid from "./pages/RegisterToBid"
import AuctionGuide from "./pages/AuctionGuide"
import AuctionsBenefits from "./pages/AuctionsBenefits"
import Blogs from "./pages/Blogs"
import BlogDetails from "./pages/BlogDetails"
import Contact from "./pages/Contact"
import AdminDashboard from "./pages/AdminDashboard"
import {Navigate} from "react-router-dom"
import {MyContextProvider} from "./context"
import {ThemeProvider, createTheme} from "@mui/material/styles"
import Policy from "./pages/Policy"
import Complaint from "./pages/Complaint"

function App() {
  console.log("app file")

  function getItem(key) {
    const item = JSON.parse(localStorage.getItem(key))

    if (item) {
      const expirationDate = new Date(item.expirationDate)

      // Check if the item has expired
      if (expirationDate <= new Date()) {
        // Item has expired, remove it from local storage
        localStorage.removeItem(key)
        return null
      }

      return item.value
    }

    return null
  }

  let user = null

  const retrievedItem = getItem("cred")

  const {email, password} = !!retrievedItem ? retrievedItem : {}

  if (email && password && email === "swiftPropertyAdmin@gmail.com" && password === "swiftProp123") {
    user = {email, password}
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "about",
      element: <About />
    },
    {
      path: "whyus",
      element: <WhyUsPage />
    },
    // {
    //   path: "testimonials",
    //   element: <Testimonials />
    // },
    {
      path: "upcomingAuctions",
      element: <UpcomingAuctions />
    },
    {
      path: "currentLots",
      element: <CurrentLots type={"current"} />
    },
    {
      path: "availableLots",
      element: <CurrentLots type={"available"} />
    },
    {
      path: "lotsdetails/:id",
      element: <LotsDetails />
    },
    // {
    //   path: "previousAuctions",
    //   element: <PreviousAuctions />
    // },
    {
      path: "requestAuction",
      element: <AuctionsForm />
    },
    {
      path: "signup",
      element: <Signup />
    },
    {
      path: "signin",
      element: <SignIn />
    },
    {
      path: "resetEmail",
      element: <ResetEmail />
    },
    {
      path: "resetpassword",
      element: <ResetPassword />
    },
    {
      path: "registerToBid",
      element: <RegisterToBid />
    },
    {
      path: "sellingguide",
      element: (
        <AuctionGuide title={"Guide To Selling At Auction"} mode={"selling"} />
      )
    },
    {
      path: "buyingguide",
      element: (
        <AuctionGuide title={"Guide To Buying At Auction"} mode={"buying"} />
      )
    },
    {
      path: "benefits",
      element: <AuctionsBenefits />
    },
    {
      path: "blogs",
      element: <Blogs />
    },
    {
      path: "blogDetails/:id",
      element: <BlogDetails />
    },
    {
      path: "contact",
      element: <Contact />
    },
    {
      path:"policy",
      element:<Policy/>
    },
    {
      path:"complaint",
      element:<Complaint/>
    },
    {
      path: "admin/dashboard",
      element: user ? <AdminDashboard /> : <Navigate to={"/"} />
    }
  ])

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform : 'none !important'
          }
        }
      }
    }
  })
  return (
    <MyContextProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
      </div>
    </MyContextProvider>
  )
}

export default App
