import React from 'react'
import Logo from '@/assets/logo.png'

export default function index() {
  return (
    <div className='fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white'>
      {/* <div className='absolute inset-0 z-40 bg-black/10'></div> */}
      <img
        srcSet={`${Logo} 2x`}
        alt=''
        className='w-[450px] h-auto object-cover
      '
      />
      <div className='w-12 h-12 mt-12 border-8 rounded-full border-primary-1 animate-spin border-t-transparent'></div>
    </div>
  )
}
