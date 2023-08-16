import React, {useState} from "react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  accordion: {
    marginBottom: theme.spacing(1),
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2) !important'
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  heading: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center"
  },
  content: {
    paddingTop: theme.spacing(2)
  },
  plusIcon: {
    marginRight: theme.spacing(1)
  },
  crossIcon: {
    marginLeft: theme.spacing(1),
    cursor: "pointer"
  },
  icon: {
    cursor: "pointer"
  },
  noSpacing: {
    margin: 0
  }
}))

const AccordionComponent = ({items}) => {
  const classes = useStyles()

  const [openState, setOpenState] = useState(Array(items.length).fill(false))

  const handleToggleAccordion = (index) =>
    setOpenState((prevState) => {
      const newState = [...prevState]
      newState[index] = !newState[index]
      console.log(newState)
      return newState
    })

  const handleIconClick = (e, index) => {
    e.stopPropagation()
    handleToggleAccordion(index)
  }

  return (
    <>
      {items.map((item, index) => (
        <Accordion
          key={index}
          className={classes.accordion}
          expanded={openState[index]}
        >
          <AccordionSummary onClick={() => handleToggleAccordion(index)}>
            <div className={classes.summary}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "18px",
                  lineHeight: "25px",
                  fontWeight: 500,
                  fontFamily: "Inter",
                  color: "#1D242A",
                  marginBottom: "20px"
                }}
                className={classes.heading}
              >
                {item.title}
              </Typography>
              <Typography variant="h6" className={classes.heading}>
                {openState[index] ? (
                  <CloseIcon
                    style={{
                      backgroundColor: "#B21F18",
                      color: "white",
                      padding: "8px",
                      borderRadius: "50%"
                    }}
                    className={`${classes.crossIcon} ${classes.icon}`}
                    onClick={(e) => handleIconClick(e, index)}
                  />
                ) : (
                  <AddIcon
                    style={{
                      backgroundColor: "#B21F18",
                      padding: "8px",
                      color: "white",
                      borderRadius: "50%"
                    }}
                    className={`${classes.plusIcon} ${classes.icon}`}
                    onClick={(e) => handleIconClick(e, index)}
                  />
                )}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              style={{
                fontSize: "16px",
                color: "#889099",
                lineHeight: "28px",
                fontWeight: 400,
                fontFamily: "Inter",
                whiteSpace: "break-spaces"
              }}
              variant="body1"
              className={classes.content}
            >
              {item.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

export default AccordionComponent
