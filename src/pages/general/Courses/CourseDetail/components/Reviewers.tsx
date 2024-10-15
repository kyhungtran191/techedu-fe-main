import RatingStars from '@/components/RatingStars'
import React from 'react'
import { Link } from 'react-router-dom'
import Description from './Description'
import { Separator } from '@/components/ui/separator'
import Instructor from '@/assets/instructor.jfif'
export default function Reviewers({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className='flex items-center justify-between mb-[18px]'>
        <h3 className='mb-3 text-2xl font-medium'>Feedback</h3>
        <Link to='' className='text-xl text-primary-1'>
          View all
        </Link>
      </div>
      {/* Reviewers */}
      <div>
        <div className='flex items-start justify-between'>
          <div className='flex flex-wrap items-start'>
            <img className='w-[50px] h-[50px] rounded-xl object-cover' src={Instructor} alt='instructor-avatar' />
            <div className='ml-3 '>
              <h2 className='text-lg font-medium ms:text-xl text-neutral-black'>Rowan Kenelm</h2>
              <RatingStars count={5} wrapperClass='!gap-x-1'></RatingStars>
            </div>
          </div>
          <span className='text-sm text-neutral-silver-3'>4 months ago</span>
        </div>
        <Description lineclamp={2} height='45px' wrapperClass='mt-3'></Description>
        <Separator className='my-4'></Separator>
      </div>
      <div>
        <div className='flex items-start justify-between'>
          <div className='flex items-start'>
            <img className='w-[50px] h-[50px] rounded-xl object-cover' src={Instructor} alt='instructor-avatar' />
            <div className='ml-3'>
              <h2 className='text-xl font-medium text-neutral-black'>Rowan Kenelm</h2>
              <RatingStars count={5} wrapperClass='!gap-x-1'></RatingStars>
            </div>
          </div>
          <span className='text-sm text-neutral-silver-3'>4 months ago</span>
        </div>
        <Description lineclamp={2} height='45px' wrapperClass='mt-3'></Description>
        <Separator className='my-4'></Separator>
      </div>
    </div>
  )
}
