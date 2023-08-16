import React from "react"
import NavbarWrapper from "../components/Bars/NavbarWrapper"
import HeaderContent from "../components/HeaderContent"
import {Grid, styled} from "@mui/material"
import Footer from "../components/Footer"
import CopyrightSection from "../components/CopyrightSection"
import EmailSubscription from "../components/EmailSubscription"
import {Typography} from "@mui/material"

const Policy = (props) => {
  const useStyles = styled((theme) => ({
    mainHeader: {
      fontSize: "4vh",
      lineHeight: "43px",
      fontWeight: 600,
      fontFamily: "Inter",
      color: "#1D242A",
      marginBottom: "2rem !important"
    },
    smallHeader: {
      color: "#1D242A",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "26px",
      fontStyle: "normal",
      fontWeight: "bold !important",
      lineHeight: "35px",
      marginTop: "2.5rem !important",
      marginBottom: "1rem !important"
    },
    normalText: {
      color: "#889099",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "23px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "30px",
      marginBottom: "1.5rem !important"
    },
    list: {
      color: "#889099",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "23px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "30px",
      marginBottom: "0.5rem !important"
    },
    normalBigText: {
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "1.8rem !important",
      fontWeight: 500,
      marginTop: "2rem !important"
    }
  }))

  const Data = {
    MainHeading: "Our Privacy Policy",
    MainDesc: [
      "At Swift Property safeguarding your privacy and treating your personal data with care are paramount to us. This policy, combined with referenced documents, outlines the procedures governing the collection and processing of your personal data. It is essential that you read and comprehend the following details to understand how your personal data is handled.",
      "This Privacy Policy pertains to the personal data of buyers, sellers, website visitors, potential clients, suppliers, and individuals inquiring about properties or services provided by Swift Property Auction."
    ],
    Content: [
      {
        DataType: "paragraph",
        heading: "IDENTIFICATION",
        desc: [
          'Throughout this policy, the terms "We," "Us," and "Our" refer to Swift Property Auctions Ltd, a privately-owned property advisory firm in London, registered in England under Company No: 14807003 located at 83 Uxbridge Road, Stanmore, England, HA7 3NH.',
          `Under the General Data Protection Regulation (GDPR), Swift Property Auction acts as both a data controller and a data processor for the personal information described in this Privacy Policy. Our services extend across the UK.`
        ]
      },
      {
        DataType: "paragraph",
        heading: "DEFINING PERSONAL DATA",
        desc: [
          `As per the EU's GDPR, personal data is defined as "any information relating to an identified or identifiable natural person ('data subject'); an identifiable natural person is one who can be identified, directly or indirectly, by reference to an identifier such as a name, an identification number, location data, an online identifier, or one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person."`
        ]
      },
      {
        DataType: "paragraph",
        heading: "TYPES OF PERSONAL DATA COLLECTED",
        desc: [
          `As a data controller under relevant data protection laws and regulations, we are entrusted with and responsible for the storage and use of personal data in paper or electronic formats.`
        ]
      },
      {
        DataType: "list",
        heading: "LAWFUL PROCESSING",
        desc: [
          `The lawful bases for processing, as outlined in Article 6 of the GDPR, must be satisfied whenever personal data is processed:`
        ],
        list: [
          `(a) Consent: We process personal data based on your clear consent for specific purposes.`,
          `(b) Contract: Processing is necessary for a contract between Swift Property Auction and you or preliminary steps to entering such a contract.`,
          `(c) Legal Obligation: Processing is required for Swift Property Auction's compliance with the law (excluding contractual obligations).`,
          `(d) Vital Interests: Processing is essential for protecting someone's life.`,
          `(e) Public Task: Processing is needed for a task in the public interest or as part of Swift Property Auctions official functions, with a clear legal basis.`,
          `(f) Legitimate Interests: Processing is necessary for Swift Property Auction or a third party's legitimate interests, unless personal data protection overrides these interests.`
        ]
      },
      {
        DataType: "bullets",
        heading: "DATA SUBJECT RIGHTS",
        desc: [`As a data subject, you possess certain rights:`],
        list: [
          `The right of access.`,
          `The right to rectification.`,
          `The right to erasure or the right to be forgotten.`,
          `The right to restriction of processing.`,
          `The right to be informed.`,
          `The right to data portability.`,
          `The right to object.`,
          `The right not to be subject to automated decisions.`,
          `The right to withdraw consent.`
        ]
      },
      {
        DataType: "paragraph",
        heading: "DATA COLLECTION METHODS",
        desc: [
          `Personal data may be acquired directly from you through various channels, such as the website, application forms, emails, correspondence, contracts, or communication through contractual or commercial relationships. Rarely, we may obtain your data from reputable sources to reach new audiences interested in our services.`
        ]
      },
      {
        DataType: "paragraph",
        heading: "DATA USE",
        desc: [
          `Personal information we gather is employed for communication purposes, including responding to inquiries, sending marketing materials, and performing services. Data is processed by Swift Property Auctions, and we share it with authorised suppliers as needed. No third parties access your personal data unless required for contractual obligations or the company's legitimate interests under GDPR Article 5. Opt-out and data removal options are provided.`
        ]
      },
      {
        DataType: "paragraph",
        heading: "DATA STORAGE",
        desc: [`Your data may be stored on our servers in Europe.`]
      },
      {
        DataType: "paragraph",
        heading: "DISCLOSURE",
        desc: [
          `Personal information may be shared with third parties for legal, contractual, or safeguarding purposes.`
        ]
      },
      {
        DataType: "paragraph",
        heading: "PRIVACY POLICY UPDATES",
        desc: [
          `Swift Property Auction may revise this policy, and updates will be posted on the website. Your use of the website or submission of personal data implies acceptance of these changes.`
        ]
      }
    ]
  }

  const classes = useStyles()
  const officialEmail = "info@swiftpropertyauctions.co.uk"
  return (
    <div>
      <NavbarWrapper />
      <div style={{background: "url(/policy.png)", backgroundSize: "cover"}}>
        <HeaderContent title={"Privacy Policy"} />
      </div>
      <Grid container style={{padding: "2rem 0"}}>
        <Grid item sm={12} md={1} />
        <Grid item sm={12} md={10}>
          <Typography variant="h2" className={classes.mainHeader}>
            {Data.MainHeading}
          </Typography>
          {Data.MainDesc.map((text) => (
            <Typography variant="h5" className={classes.normalText}>
              {text}
            </Typography>
          ))}
          {Data.Content.map((text) => (
            <>
              <Typography variant="h4" className={classes.smallHeader}>
                {text.heading}
              </Typography>
              {text.desc.map((paragraph) => (
                <Typography variant="h5" className={classes.normalText}>
                  {paragraph}
                </Typography>
              ))}
              {text.DataType === "list" &&
                text.list.map((item) => (
                  <Typography variant="h5" className={classes.list}>
                    {item}
                  </Typography>
                ))}
              {text.DataType === "bullets" && (
                <>
                  {text.list.map((item) => (
                    <li style={{marginLeft: "1rem"}} className={classes.list}>
                      {item}
                    </li>
                  ))}
                  <Typography
                    sx={{mt: "1.5rem !important"}}
                    variant="h5"
                    className={classes.list}
                  >
                    You can exercise your rights by indicating your preferences
                    on forms or by contacting us at{" "}
                    <a
                      style={{color: "#B21F18"}}
                      rel="noopener noreferrer"
                      href={`mailto:${officialEmail}?subject=${encodeURIComponent(
                        ""
                      )}&body=${encodeURIComponent("")}`}
                      target="_blank"
                    >
                      {officialEmail}
                    </a>
                  </Typography>
                </>
              )}
            </>
          ))}
          <Typography variant="h4" className={classes.smallHeader}>
            CONTACT
          </Typography>
          <Typography variant="h5" className={classes.normalText}>
            Queries or requests concerning this policy can be directed to{" "}
            <a
              style={{color: "#B21F18"}}
              rel="noopener noreferrer"
              href={`mailto:${officialEmail}?subject=${encodeURIComponent(
                ""
              )}&body=${encodeURIComponent("")}`}
              target="_blank"
            >
              {officialEmail}
            </a>
          </Typography>
          <Typography className={classes.normalBigText} variant="h5">
            For further information and complaints, visit the ICO website <br />
            visit the ICO website (
            <a
              style={{color: "#B21F18"}}
              rel="noopener noreferrer"
              href="https://ico.org.uk/concerns"
              target="_blank"
            >
              https://ico.org.uk/concerns
            </a>
            ) or contact:
          </Typography>
          <Typography className={classes.normalBigText} variant="h5">
            <strong> Information Commissioner's Office</strong> <br />
            Wycliffe House, Water Lane, Wilmslow, Cheshire <br /> SK9 5AF
            <br /> Tel: 0303 123 111
          </Typography>
        </Grid>
        <Grid item sm={12} md={1} />
      </Grid>
      <EmailSubscription />

      <Footer />
      <CopyrightSection />
    </div>
  )
}

export default Policy
