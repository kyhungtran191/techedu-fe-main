import React from 'react'

export default function CourseTitle({ children }: { children: string }) {
  return (
    <div className='flex items-center mb-[18px]'>
      <div className='h-[40px] w-[2px] bg-primary-1 mr-5'></div>
      <div className='text-2xl font-medium '>{children}</div>
    </div>
  )
}
