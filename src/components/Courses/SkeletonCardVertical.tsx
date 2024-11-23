import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonCardVertical() {
  return (
    <div className='flex flex-row my-5 space-x-3'>
      <Skeleton className='h-[280px] sm:h-[300px]  w-[300px] object-cover rounded-2xl' />
      <div className='flex-1 space-y-2'>
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
      </div>
    </div>
  )
}
