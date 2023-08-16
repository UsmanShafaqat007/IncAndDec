import {Button, styled} from "@mui/material"

import background from '../../assets/buttonBackground.svg'

export const RedButton = styled(Button)(({theme}) => ({
  color: `${theme.palette.getContrastText('#B21F18')} !important`,
  fontFamily: "Inter",
  fontWeight:'bold',
  height: "3.5rem",
  width:'90%',
  maxWidth: "15rem",
  padding:'0 1.3rem',
  backgroundImage: `url(${background})`,
  transition: 'background-position .235s cubic-bezier(.86,0,.2,1) !important',
  backgroundSize: '202% auto !important',
  backgroundPosition: '100% !important',
  backgroundRepeat: 'no-repeat !important',
  "&:hover": {
    color:'#B21F18 !important',
    backgroundPosition: '-0.9375rem !important'
  }
}))