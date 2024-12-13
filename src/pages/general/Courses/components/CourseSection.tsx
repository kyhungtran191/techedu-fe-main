import React, { lazy, Suspense, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import NavigationButton from './NavigationButton'
import CourseListSkeleton from './CourseListSkeleton'
import { useQuery } from '@tanstack/react-query'
import { GetForYouCourses } from '@/services/publish-course'
const CourseList = lazy(() => import('./CourseList'))
export default function CourseSection({ children }: { children?: React.ReactNode }) {
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['for-you-courses'],
    queryFn: () => GetForYouCourses(),
    select: (data) => data.data.value
  })
  return (
    <div className='my-6'>
      <div className='flex items-center justify-between mb-[18px]'>
        {<div className='text-2xl font-bold text-neutral-black'>For you</div>}
        <NavigationButton swiperRef={swiperRef} isAtStart={isAtStart} isAtEnd={isAtEnd} />
      </div>
      {isLoading && <CourseListSkeleton></CourseListSkeleton>}
      <CourseList courses={data || []} swiperRef={swiperRef} setIsAtStart={setIsAtStart} setIsAtEnd={setIsAtEnd} />
    </div>
  )
}
