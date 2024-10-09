import React from 'react'
import TeacherCard from './TeacherCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
export default function TeacherSlide() {
  return (
    <div className='container-fluid py-[80px] sample-slider'>
      <div className='mx-auto text-center max-w-[810px] text-neutral-black'>
        <h2 className='mb-6 text-5xl font-medium text-primary-1'>Our teacher</h2>
        <p className='text-2xl'>
          Vestibulum faucibus leo nec massa tincidunt, nec dictum odio interdum. Donec vehicula, velit nec fermentum
        </p>
      </div>
      <Swiper
        className='mt-[80px]'
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: false
        }}
        speed={4000}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        loop={true}
        slidesPerView={3.5}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          960: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 20
          }
        }}
      >
        <SwiperSlide className=''>
          <TeacherCard></TeacherCard>
        </SwiperSlide>
        <SwiperSlide className=''>
          <TeacherCard></TeacherCard>
        </SwiperSlide>
        <SwiperSlide className=''>
          <TeacherCard></TeacherCard>
        </SwiperSlide>
        <SwiperSlide className=''>
          <TeacherCard short></TeacherCard>
        </SwiperSlide>
        <SwiperSlide className=''>
          <TeacherCard short></TeacherCard>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
