import SkeletonCard from '@/components/Courses/SkeletonCard'
import React from 'react'

export default function CourseListSkeleton() {
  return (
    <div className='grid grid-cols-3 gap-[18px]'>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
    </div>
  )
}
