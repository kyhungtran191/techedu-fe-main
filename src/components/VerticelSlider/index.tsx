import React from 'react'
// Import Swiper styles
// Import css files
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SliderCard from '@/pages/general/ads/SliderBanner/SliderCard'

const VerticalSlider = ({ isTop = false, time: number }: { isTop?: boolean; time?: number }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: number || 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    rtl: isTop
  }
  return (
    <Slider className='h-screen gap-2 overflow-hidden' {...settings}>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <SliderCard image={index}></SliderCard>
        ))}
    </Slider>
  )
}

export default VerticalSlider
