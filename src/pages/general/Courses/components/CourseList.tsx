import React from 'react'
import CourseCard from '@/components/Courses/CourseCard'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { PublicCourse } from '@/@types/public-course.type'

interface IProps {
  courses: PublicCourse[]
  swiperRef: React.MutableRefObject<SwiperType | null>
  setIsAtStart: (value: boolean) => void
  setIsAtEnd: (value: boolean) => void
}

export default function CourseList({ courses, setIsAtEnd, setIsAtStart, swiperRef }: IProps) {
  const handleSlideChange = (swiper: SwiperType) => {
    setIsAtStart(swiper.isBeginning)
    setIsAtEnd(swiper.isEnd)
  }

  return (
    <>
      <div className='hidden xl:grid grid-cols-3 gap-[18px]'>
        {courses.map((course) => (
          <CourseCard courseInfo={course} key={course.courseId}></CourseCard>
        ))}
      </div>
      <div className='block xl:hidden'>
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            if (swiperRef) {
              swiperRef.current = swiper
            }
          }}
          slidesPerView={3}
          spaceBetween={18}
          onReachBeginning={() => setIsAtStart(true)}
          onFromEdge={() => {
            setIsAtStart(false)
            setIsAtEnd(false)
          }}
          onReachEnd={() => setIsAtEnd(true)}
          onSlideChange={handleSlideChange}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 18
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 18
            },
            864: {
              slidesPerView: 3,
              spaceBetween: 18
            }
          }}
        >
          {courses.map((course) => (
            <SwiperSlide>
              <CourseCard courseInfo={course}></CourseCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
