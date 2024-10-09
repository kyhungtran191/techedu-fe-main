import Navigate from '@/icons/Navigate'
import React from 'react'
import { Swiper as SwiperType } from 'swiper'
interface NavigationButtonsProps {
  swiperRef: React.MutableRefObject<SwiperType | null>
  isAtStart: boolean
  isAtEnd: boolean
}
const NavigationButton: React.FC<NavigationButtonsProps> = ({ swiperRef, isAtStart, isAtEnd }) => {
  return (
    <div className='items-center hidden tb:flex xl:hidden'>
      <Navigate
        className={`${isAtStart ? 'disabled text-neutral-silver-3' : 'cursor-pointer text-primary-1'}`}
        onClick={() => swiperRef.current?.slidePrev()}
      ></Navigate>
      <Navigate
        className={`rotate-180 ${isAtEnd ? 'disabled text-neutral-silver-3' : 'cursor-pointer text-primary-1'}`}
        onClick={() => swiperRef.current?.slideNext()}
      ></Navigate>
    </div>
  )
}
export default NavigationButton
