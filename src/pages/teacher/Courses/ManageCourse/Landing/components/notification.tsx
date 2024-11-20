import { useAppContext } from '@/hooks/useAppContext'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Notification() {
  const { profile } = useAppContext()
  if (profile?.avatar && profile?.bio && profile?.firstName && profile?.lastName && profile?.headline) return <></>
  return (
    <div className='flex items-start p-3 mb-6 font-medium text-white bg-red-500'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='25'
        viewBox='0 0 25 25'
        fill='none'
        className='mr-[18px]'
      >
        <g clipPath='url(#clip0_3294_8371)'>
          <path
            d='M11.5 7.79688H13.5V9.79688H11.5V7.79688ZM11.5 11.7969H13.5V17.7969H11.5V11.7969ZM12.5 2.79688C6.98 2.79688 2.5 7.27688 2.5 12.7969C2.5 18.3169 6.98 22.7969 12.5 22.7969C18.02 22.7969 22.5 18.3169 22.5 12.7969C22.5 7.27688 18.02 2.79688 12.5 2.79688ZM12.5 20.7969C8.09 20.7969 4.5 17.2069 4.5 12.7969C4.5 8.38688 8.09 4.79688 12.5 4.79688C16.91 4.79688 20.5 8.38688 20.5 12.7969C20.5 17.2069 16.91 20.7969 12.5 20.7969Z'
            fill='white'
          />
        </g>
        <defs>
          <clipPath id='clip0_3294_8371'>
            <rect width='24' height='24' fill='white' transform='translate(0.5 0.796875)' />
          </clipPath>
        </defs>
      </svg>
      <div className='text-[18px]'>
        Note that your account not fully setup. You can not submit this landing page if your information is not fully
        filled!
        <Link to='/teacher/profile/basic-info' className='underline'>
          {'   '}
          {'   '}
          Set up now
        </Link>
      </div>
    </div>
  )
}
