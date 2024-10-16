import React from 'react'
import Logo from '@/assets/logo.png'
import useInstructorSetup from '@/hooks/useInstructorSetup'
export default function CreateCourseHeader() {
  const { handleExit } = useInstructorSetup()

  return (
    <div className='h-[76px]'>
      <div className='relative z-20 flex items-center justify-between h-full text-white container-fluid'>
        <div onClick={handleExit}>
          <img
            srcSet={`${Logo} 2x`}
            alt='system_logo'
            className='w-[200px] h-[52px] object-cover flex-shrink-0 cursor-pointer'
          />
        </div>
        <div className='z-10 cursor-pointer' onClick={handleExit}>
          <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none' className=''>
            <g clipPath='url(#clip0_2570_1898)'>
              <path
                d='M19.5 6.41L18.09 5L12.5 10.59L6.91 5L5.5 6.41L11.09 12L5.5 17.59L6.91 19L12.5 13.41L18.09 19L19.5 17.59L13.91 12L19.5 6.41Z'
                fill='#444444'
              />
            </g>
            <defs>
              <clipPath id='clip0_2570_1898'>
                <rect width='24' height='24' fill='white' transform='translate(0.5)' />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
