// ** React Imports
import {useState} from "react"

// ** MUI Imports
import {Box, Avatar, Badge} from "@mui/material"

// ** Icon Imports
import {ChevronRight, ChevronLeft} from "@mui/icons-material"

// ** Third Party Components
import clsx from "clsx"
import {useKeenSlider} from "keen-slider/react"
import KeenSliderWrapper from "./keenStyle"

const SwiperControls = ({images}) => {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    rtl: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <KeenSliderWrapper>
      <Box className="navigation-wrapper">
        <Box ref={sliderRef} className="keen-slider">
          {images?.map((val, index) => (
            <Box className="keen-slider__slide" sx={{display: 'flex', justifyContent: 'center'}}>
              <img
                style={{height: '70vh'}}
                src={`https://swiftproperty.triolabz.com/apis/${val}`}
                alt={`swiper ${index + 1}`}
              />
            </Box>
          ))}
        </Box>
        {loaded && instanceRef.current && (
          <>
            <Avatar
              className={clsx("arrow arrow-left", {
                "arrow-disabled": currentSlide === 0
              })}
            >
              <ChevronLeft
                sx={{fontSize: '2.5rem'}}
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              />
            </Avatar>
            <Avatar
              className={clsx("arrow arrow-right", {
                "arrow-disabled":
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
              })}
            >
              <ChevronRight
              sx={{fontSize: '2.5rem'}}
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              />
            </Avatar>
          </>
        )}
      </Box>
      {loaded && instanceRef.current && (
        <Box className="swiper-dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys()
          ].map((idx) => {
            return (
              <Badge
                key={idx}
                variant="dot"
                component="div"
                className={clsx({
                  active: currentSlide === idx
                })}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
              />
            )
          })}
        </Box>
      )}
    </KeenSliderWrapper>
  )
}

export default SwiperControls
