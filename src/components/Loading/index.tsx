import React from 'react'

export default function index() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-center bg-no-repeat bg-cover bg-loading'>
      {/* <div className='absolute inset-0 z-40 bg-black/10'></div> */}
      <div className='absolute w-[50vw] h-10 rounded-lg overflow-hidden bg-white bottom-10 z-40'>
        <div className='absolute w-full h-full bg-primary-1 animate-progress-infinite'></div>
      </div>
    </div>
  )
}
