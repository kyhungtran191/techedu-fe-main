import React from 'react'

export default function LoadingCircle() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='w-10 h-10 border-4 rounded-full border-primary-1 animate-spin border-t-transparent'></div>
    </div>
  )
}
