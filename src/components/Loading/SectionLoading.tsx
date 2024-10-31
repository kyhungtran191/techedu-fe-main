import React from 'react'

interface IProps {
  className?: string
}
export default function SectionLoading({ className }: IProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-white/60 ${className}`}
    >
      <div className='w-12 h-12 border-4 rounded-full border-primary-1 animate-spin border-t-transparent'></div>
    </div>
  )
}
