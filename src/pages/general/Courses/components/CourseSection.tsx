import React, { lazy, Suspense, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import NavigationButton from './NavigationButton'
import CourseListSkeleton from './CourseListSkeleton'
const CourseList = lazy(() => import('./CourseList'))
export default function CourseSection({ children }: { children?: React.ReactNode }) {
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)
  return (
    <div className='my-6'>
      <div className='flex items-center justify-between mb-[18px]'>
        {<div className='text-2xl font-bold text-neutral-black'>For you</div>}
        <NavigationButton swiperRef={swiperRef} isAtStart={isAtStart} isAtEnd={isAtEnd} />
      </div>
      <Suspense fallback={<CourseListSkeleton></CourseListSkeleton>}>
        <CourseList courses={[]} swiperRef={swiperRef} setIsAtStart={setIsAtStart} setIsAtEnd={setIsAtEnd} />
      </Suspense>
    </div>
  )
}
