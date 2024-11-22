import SkeletonCard from '@/components/Courses/SkeletonCard'
import React from 'react'

type TProps = {
  numberItems?: number
}
export default function CourseListSkeleton({ numberItems = 6 }: TProps) {
  return (
    <div className='grid grid-cols-3 gap-[18px]'>
      {Array(numberItems)
        .fill(0)
        .map((item, index) => (
          <SkeletonCard key={index}></SkeletonCard>
        ))}
    </div>
  )
}
