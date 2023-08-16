import React, {useEffect} from "react"
import HeaderContent from "../components/HeaderContent"
import EmailSubscription from "../components/EmailSubscription"
import Footer from "../components/Footer"
import {makeStyles} from "@material-ui/core/styles"
import {Grid, Typography} from "@material-ui/core"
import CopyrightSection from "../components/CopyrightSection"
import AccordionComponent from "../components/Accordion"
import NavbarWrapper from "../components/Bars/NavbarWrapper"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "150px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  mainHeader: {
    fontSize: "4vh",
    lineHeight: "43px",
    fontWeight: 600,
    fontFamily: "Inter",
    color: "#1D242A",
    marginBottom: "2rem"
  },
  smallHeader: {
    color: "#1D242A",
    textAlign: "justify",
    fontFamily: "Inter",
    fontSize: "26px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "35px"
  },
  normalText: {
    color: "#889099",
    textAlign: "justify",
    fontFamily: "Inter",
    fontSize: "23px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "30px",
    marginBottom: "1.5rem"
  }
}))

const items = [
  {
    title: "Are auction properties cash only?",
    content:
      "Actually, it's quite the opposite. Online property auctions are conducted entirely through digital platforms, eliminating the need for physical cash transactions. To participate in an auction, you need to ensure you have the necessary funds in place beforehand. You have the flexibility to explore various financial options, such as securing a bridging loan or mortgage, to support your bidding process."
  },
  {
    title: "What is a guided price?",
    content:
      "The guide price serves as the seller's minimum acceptable price for the property being auctioned. Its purpose is to assist potential buyers in determining whether they want to pursue a purchase. Typically, a provisional reserve range is established between the seller and the auctioneer at the beginning of the marketing process. However, the reserve price is not fixed at this stage and can be adjusted by the seller until the day of the auction, based on the level of interest generated during the marketing period. To provide clarity, a guide price is provided, which can be presented as a range between a minimum and maximum price encompassing an acceptable sale price (reserve), or as a single price figure within 10% of the minimum acceptable price (reserve)."
  },
  {
    title: "What is a reserve price?",
    content:
      "The Reserve Price represents the minimum price the seller is willing to accept for the property at auction. It serves as the threshold below which the auctioneer is not permitted to sell. Typically, the reserve price is kept confidential and known only to the seller and the auctioneer. In some cases, a property may be listed without a reserve price, which means that technically it can be sold if even a very low offer, such as £1, is received.\n" +
      "It's important to note that both the guide price and the reserve price are subject to potential changes leading up to and including the day of the auction."
  },
  {
    title: "Is it worth buying property at auction?",
    content:
      "Investing in property can be a highly rewarding endeavour. By conducting thorough research beforehand, establishing well-defined financial boundaries, and adhering to them, you can greatly enhance your auction experience compared to traditional real estate agents.\n" +
      "It's important to note that participating in an auction entails a legally binding commitment. As the successful bidder, you immediately assume ownership of the property, eliminating any risks of gazumping. Many individuals discover that auctions offer a less stressful, quicker, and more secure purchasing process compared to alternative methods.\n"
  },
  {
    title: "Are auction bids legally binding?",
    content:
      "Once an online auction concludes, the winning bid instantly transforms into a legally binding contract. This unique aspect of property auctions ensures remarkable speed in completing the sale and provides unparalleled security for both buyers and sellers. It completely eliminates the possibility of gazumping, offering a worry-free experience for all parties involved.\n"
  },

  {
    title: "How do I place bids?",
    content:
      'Prior to registering to bid, we strongly advise you to personally visit the property and thoroughly review all the legal information included in the Buying Information Pack for each specific Lot. It is crucial to ensure that you can fulfil all the Auction Terms and Conditions before proceeding with your bid. If you don\'t already have an account, you will need to create one before you can register for bidding on the property. On the website, you will find a "bid to purchase" option for each property, which you can click to initiate the registration process. During registration, you will be required to provide certain information to verify your identity and may need to input payment details for any applicable fees. Please note that we need to approve your bidding status, so it is vital to register as early as possible if you intend to participate in the auction.\n'
  },
  {
    title: "How do I register to bid at auction?",
    content:
      "To participate in the auction, all bidders are required to complete a pre-registration process via Passport by EIG. (Link to be inserted) During registration, you will be prompted to upload identification documents such as your driving license, passport, utility bills, and bank statements. Additionally, you will need to indicate the lots you intend to bid on and specify your preferred bidding method, which can be via telephone, internet, or proxy bidding. Please be aware that our auction team will carefully review and authorise your registration for the requested lot, confirming your chosen bidding method. It's important to note that there is a limited number of telephone bids available for each lot.\n"
  },
  {
    title: "Are there any other charges ?",
    content:
      "Upon an exchange of contracts there will be an administration charge of £1250 inc VAT or £500 inc VAT for transactions less than £10,000 payable to Swift Property Auctions Ltd "
  },
  {
    title: "What are Special Conditions of Sale?\n",
    content:
      "The Special Conditions contain any amendments required to the general conditions for the relevant property. Special Conditions are produced by the Seller’s legal advisor and are read and amended in conjunction with the General Conditions of Sale and Extra Conditions. Special Conditions usually include:\n" +
      "*  Details about the property\n" +
      "*  Amendments needed to the general and extra conditions\n" +
      "*  Details of any new terms, covenants or easements, VAT and tenancies\n" +
      ".Additional cost \n"
  },
  {
    title: "What is an Addendum?\n",
    content:
      "An addendum is sometimes made available a few days prior to or on the day of the auction. It is used to amend any errors in the legal pack or auction catalogue.\n"
  },
  {
    title: "Can I make a pre-auction bid?",
    content:
      "Yes, this is possible. We will present the offer to the seller (along with confirmation of the buyer checks, proof of funds plus other credentials we have) and inform you of the decision.\n" +
      "In our experience, most wish to wait and see how things go with the bidding but some may go ahead.\n"
  },
  {
    title: "Should I try selling via an estate agent before trying auction?\n",
    content:
      "No, it is not necessary to do so. In fact, this approach can often be counterproductive and potentially negatively impact the property's reputation. When properties are directly entered into auction without prior marketing through estate agents, they typically achieve higher sale prices. This is because they are newly introduced to the market and have not been negatively affected by potential overpricing or previous failed sales. If your property is suitable for auction, it is advisable to prioritise the auction route as your primary choice.\n"
  },
  {
    title: "What happens If I am successful bidder?",
    content:
      "Congratulations on winning the bid! You will be required to make a payment of 10% of the purchase price, along with any agreed costs, using a registered debit card. It is your responsibility to arrange insurance for the property after the exchange of contracts. We recommend contacting your insurers promptly or feel free to contact us and we guide you with the next steps to take\n" +
      "\n" +
      "If the property you were interested in does not meet its reserve, we will contact you if you were the underbidder. There may still be an opportunity for you to purchase the property following the conclusion of the online auction.\n"
  },
  {
    title: "Are there Additional fees at auction?",
    content:
      "Yes, there may be additional fees associated with buying property at auction. These fees are typically listed in the contract or special conditions of sale. They can be for a variety of things, including:\n" +
      "\t* The cost of searches, such as title searches and environmental searches.\n" +
      "\t* An apportionment of costs, such as legal fees and selling costs.\n" +
      "\t* Fines for delays in completion, such as late payment of the deposit or failure to complete on time.\n" +
      "\t* The serving of notices, such as notices to proceed with the sale or notices to complete.\n" +
      "It is important to read the contract or special conditions of sale carefully to understand what additional fees may be payable. These fees can vary depending on the property and the auction house.\n" +
      "Here are some tips for avoiding additional fees at auction:\n" +
      "\t* Read the contract or special conditions of sale carefully before bidding.\n" +
      "\t* Ask the auction house about any additional fees that may be payable.\n" +
      "\t* Be prepared to pay the additional fees if you are successful in your bid.\n" +
      "By following these tips, you can help to avoid unexpected additional fees when buying property at auction.\n"
  }
]

const firstSection = [
  {
    header: "Dynamic Marketing Approach:",
    normalText:
      "Leveraging a diverse array of channels such as online platforms, print media, and social networks, we employ proactive strategies to effectively connect with a vast audience."
  },
  {
    header: "Transparent Pricing Structure:",
    normalText:
      "By collaborating closely with you, we ascertain a realistic and optimal price for your property, ensuring that you attain the most favorable outcome possible."
  },
  {
    header: "Unparalleled Expertise:",
    normalText:
      "Our seasoned team of professionals and expert valuers possess a profound comprehension of the market, instilling utmost confidence that your property is entrusted to capable hands."
  },
  {
    header: "Intense Competition:",
    normalText:
      "Our auctions attract a multitude of eager bidders, fostering a fiercely competitive environment that secures the highest possible price for your property."
  },
  {
    header: "Unmatched Marketing Reach:",
    normalText:
      "With an unrivalled marketing network at our disposal, we ensure that your property receives unparalleled visibility, reaching an extensive audience of potential buyers."
  }
]

const secondSection = [
  {
    text: "Pro-active marketing: We use a variety of marketing channels to reach a wide audience, including online, print, and social media."
  },
  {
    text: "Transparent pricing: We work with you to set a realistic price for your property, ensuring that you get the best possible result."
  },
  {
    text: "Expert knowledge: Our team and valuers has a deep understanding of the market, so you can be confident that your property is in good hands."
  },
  {
    text: "Competitive bidding: Our auctions attract a large number of bidders, which ensures that you get the best possible price for your property."
  },
  {
    text: "Unrivalled marketing: We have the most comprehensive marketing reach in the industry, so your property will be seen by a wide audience."
  }
]

const thirdSection = {
  Left: {
    title:
      "If you are looking to sell your property, we would be delighted to help you.",
    list: [
      "We are a trusted and respected brand, with over three decades of experience in the property market.",
      "We offer a free valuation service, so you can get an accurate estimate of your property's value.",
      "We are committed to providing our clients with the best possible service, from start to finish. Whatever your property needs, we can help."
    ]
  },
  right: {
    title: "We have dedicated experts in all types of property, including:",
    list: [
      "Residential",
      "Commercial",
      "Mixed-use",
      "Investments",
      "Land development",
      "Garage blocks",
      "Ground rents",
      "Former public houses",
      "Churches",
      "Police stations",
      "Nursing homes"
    ]
  }
}

function About() {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarWrapper />
      <div
        style={{background: "url(/about_main.png)", backgroundSize: "cover"}}
      >
        <HeaderContent title={"About Us"} description={""} />
      </div>

      <Grid className="" container style={{margin: "2rem 0"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <Typography variant="h2" className={classes.mainHeader}>
            With over a century of combined experience,
            <br /> Swift Property Auctions has the expertise to provide the
            right advice for the current market. Our team of experienced team
            has seen it all, and we can help you navigate the auction process
            and get the best possible price for your property.
          </Typography>
          <Typography variant="h4" className={classes.normalText}>
            We have built a stellar reputation for delivering exceptional
            outcomes for our valued clients. Our extensive range of services
            encompasses:
          </Typography>
          {firstSection.map((item) => (
            <>
              <Typography variant="h4" className={classes.smallHeader}>
                {item.header}
              </Typography>
              <Typography variant="h4" className={classes.normalText}>
                {item.normalText}
              </Typography>
            </>
          ))}
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>

      <Grid
        container
        style={{padding: "2rem 0", background: "rgba(29, 36, 42, 0.05)"}}
      >
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <Typography variant="h2" className={classes.mainHeader}>
            Who We Are?
          </Typography>
          <Typography variant="h4" className={classes.normalText}>
            We are a leading property auction house in the UK and Ireland, with
            a proven track record of achieving excellent results for our
            clients. We offer a comprehensive range of services, including:
          </Typography>
          <ul>
            {secondSection.map((item) => (
              <li className={classes.normalText}>{item.text}</li>
            ))}
          </ul>
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>

      <Grid container style={{padding: "2rem 0"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={5}>
          <Typography variant="h2" className={classes.mainHeader}>
            {thirdSection.Left.title}
          </Typography>
          <ul>
            {thirdSection.Left.list.map((item) => (
              <li className={classes.normalText}>{item}</li>
            ))}
          </ul>
        </Grid>
        <Grid item sm={12} md={1} />

        <Grid item sm={12} md={4}>
          <Typography variant="h2" className={classes.mainHeader}>
            {thirdSection.right.title}
          </Typography>
          <ul>
            {thirdSection.right.list.map((item) => (
              <li
                className={classes.normalText}
                style={{marginBottom: "0.7rem"}}
              >
                {item}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>

      <Grid container style={{paddingBottom: "30px", paddingTop: "30px"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <Typography
            style={{
              fontSize: "40px",
              lineHeight: "48px",
              fontWeight: 600,
              fontFamily: "Inter",
              color: "#1D242A",
              marginBottom: "20px",
              textAlign: "center"
            }}
            variant="h4"
            textAlign={"center"}
          >
            Frequently Asked Questions
          </Typography>

          <div style={{marginBottom: "70px"}}>
            <AccordionComponent items={items} />
          </div>
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>

      <EmailSubscription />

      <Footer />

      <CopyrightSection />
    </>
  )
}

export default About
