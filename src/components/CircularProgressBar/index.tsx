import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Navigate from '@/icons/Navigate'
const CircularProgressBar = ({ percentage }: { percentage: number }) => {
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className='flex items-center'>
      <Popover>
        <PopoverTrigger className='flex items-center justify-between ml-2 font-medium sm:w-auto sm:ml-5 text-neutral-black'>
          <div className='flex items-center justify-center w-9 h-9'>
            <svg className='w-full h-full transform -rotate-90'>
              <circle
                cx='20'
                cy='20'
                r={radius}
                strokeWidth='3'
                stroke='white' // Màu nền (chưa điền)
                fill='transparent'
              />
              <circle
                cx='18'
                cy='20'
                r={radius}
                strokeWidth='3'
                stroke='#D1EBD0' // Màu chính (đã điền)
                fill='transparent'
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className='transition-all duration-300 ease-in-out'
              />
            </svg>
            <div className='absolute flex items-center justify-center text-sm font-semibold'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 25 25' fill='none'>
                <g clipPath='url(#clip0_2135_5322)'>
                  <path
                    d='M19.5 5.77271H17.5V3.77271H7.5V5.77271H5.5C4.4 5.77271 3.5 6.67271 3.5 7.77271V8.77271C3.5 11.3227 5.42 13.4027 7.89 13.7127C8.52 15.2127 9.87 16.3427 11.5 16.6727V19.7727H7.5V21.7727H17.5V19.7727H13.5V16.6727C15.13 16.3427 16.48 15.2127 17.11 13.7127C19.58 13.4027 21.5 11.3227 21.5 8.77271V7.77271C21.5 6.67271 20.6 5.77271 19.5 5.77271ZM5.5 8.77271V7.77271H7.5V11.5927C6.34 11.1727 5.5 10.0727 5.5 8.77271ZM12.5 14.7727C10.85 14.7727 9.5 13.4227 9.5 11.7727V5.77271H15.5V11.7727C15.5 13.4227 14.15 14.7727 12.5 14.7727ZM19.5 8.77271C19.5 10.0727 18.66 11.1727 17.5 11.5927V7.77271H19.5V8.77271Z'
                    fill='#588E58'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_2135_5322'>
                    <rect width='24' height='24' fill='white' transform='translate(0.5 0.772705)' />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <p className='hidden ml-2 sm:block'>Your Progress</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            className='sm:ml-5'
          >
            <g clipPath='url(#clip0_2135_5325)'>
              <path
                d='M7.91 9.36279L12.5 13.9428L17.09 9.36279L18.5 10.7728L12.5 16.7728L6.5 10.7728L7.91 9.36279Z'
                fill='#444444'
              />
            </g>
            <defs>
              <clipPath id='clip0_2135_5325'>
                <rect width='24' height='24' fill='white' transform='translate(0.5 0.772705)' />
              </clipPath>
            </defs>
          </svg>
        </PopoverTrigger>
        <PopoverContent className='w-full px-8 py-6'>
          <div className='mb-2 font-bold'>223 of 342 complete.</div>
          <p className='text-sm'>Finish course to get your certificate</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CircularProgressBar
