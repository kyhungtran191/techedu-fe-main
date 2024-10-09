import RatingStars from '@/components/RatingStars'
import React from 'react'
import Description from '../../CourseDetail/components/Description'
import Instructor from '@/assets/instructor.jfif'

interface IProps {
  name?: string
  time?: Date
  star?: number
  description?: string
  wrapperClass?: string
  children?: React.ReactNode
  circleImg?: boolean
}

export default function Reviewer({ wrapperClass, children, circleImg }: IProps) {
  return (
    <div className={`${wrapperClass} flex items-start my-3 sm:my-[18px] flex-wrap`}>
      <img
        className={`w-[40px] sm:w-[50px] sm:h-[40px]  ${circleImg ? 'rounded-full' : 'rounded-xl'} object-cover`}
        src={Instructor}
        alt='instructor-avatar'
      />
      <div className='flex items-start justify-between'>
        <h2 className='text-base sm:text-xl text-primary-1'>Rowan Kenelm</h2>
        <div className='text-sm text-neutral-silver-3 sm:text-base'>1 year ago</div>
      </div>
      {children}
      <Description lineclamp={2} wrapperClass='mt-3'></Description>
    </div>
  )
}
