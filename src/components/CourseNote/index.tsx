import React from 'react'

export default function CourseNote({ children }: { children: string }) {
  return (
    <div className='text-[18px] font-light mb-8'>
      <span className='font-normal'>Note:</span> {children}
    </div>
  )
}
