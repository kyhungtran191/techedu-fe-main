import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[280px] sm:h-[360px] w-full object-cover rounded-2xl' />
      <div className='space-y-2'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
      </div>
    </div>
  )
}
