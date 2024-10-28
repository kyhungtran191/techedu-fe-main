import { useRef, useState } from 'react'
import Quote from '@/assets/quote-icon.png'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Banner from '@/assets/banner.jpg'
import { Swiper as SwiperType } from 'swiper'

import Slider1 from '@/assets/auth-slide-1.png'
import Slider2 from '@/assets/auth-slide-2.png'
import Slider3 from '@/assets/auth-slide-3.png'
import Slider4 from '@/assets/auth-slide-4.png'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import Navigate from '@/icons/Navigate'

// Review Type
type reviewType = {
  image: string
  desc: string
  by: string
  role: string
}

const arrayReviewers: reviewType[] = [
  {
    image: Slider1,
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus nisi recusandae? Quibusdam ut sed
          sapiente minima accusantium officia aut quaerat dicta, incidunt saepe quod reprehenderit nam possimus
          doloribus hic. Necessitatibus adipisci vitae rerum quae, possimus nostrum id dolores laborum nisi pariatur,
          ex, itaque tempora aut et delectus totam culpa at eius. Placeat molestias suscipit adipisci numquam,
          possimus earum laudantium.`,
    by: 'Minh An',
    role: 'UX Designer at Leetoo Company'
  },
  {
    image: Slider2,
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus nisi recusandae? Quibusdam ut sed
          sapiente minima accusantium officia aut quaerat dicta, incidunt saepe quod reprehenderit nam possimus
          doloribus hic. Necessitatibus adipisci vitae rerum quae, possimus nostrum id dolores laborum nisi pariatur,
          ex, itaque tempora aut et delectus totam culpa at eius. Placeat molestias suscipit adipisci numquam,
          possimus earum laudantium.`,
    by: 'Hieu Thu Hai',
    role: 'UX Designer at Leetoo Company'
  },
  {
    image: Slider3,
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus nisi recusandae? Quibusdam ut sed
          sapiente minima accusantium officia aut quaerat dicta, incidunt saepe quod reprehenderit nam possimus
          doloribus hic. Necessitatibus adipisci vitae rerum quae, possimus nostrum id dolores laborum nisi pariatur,
          ex, itaque tempora aut et delectus totam culpa at eius. Placeat molestias suscipit adipisci numquam,
          possimus earum laudantium.`,
    by: 'My Di',
    role: 'UX Designer at Leetoo Company'
  },
  {
    image: Slider4,
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus nisi recusandae? Quibusdam ut sed
          sapiente minima accusantium officia aut quaerat dicta, incidunt saepe quod reprehenderit nam possimus
          doloribus hic. Necessitatibus adipisci vitae rerum quae, possimus nostrum id dolores laborum nisi pariatur,
          ex, itaque tempora aut et delectus totam culpa at eius. Placeat molestias suscipit adipisci numquam,
          possimus earum laudantium.`,
    by: 'Justin',
    role: 'UX Designer at Leetoo Company'
  }
]

export default function AuthCarousel({ className }: { className?: string }) {
  const swiperRef = useRef<SwiperType>()
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <Swiper
      className={`w-full h-full flex-shrink-0 rounded-[20px] relative !hidden lg:!block`}
      // install Swiper modules
      modules={[Autoplay]}
      spaceBetween={10}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false
      }}
      slidesPerView={1}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper
      }}
      onSlideChange={(element) => setActiveIndex(element.activeIndex)}
      onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
    >
      {arrayReviewers.map((item, index) => (
        <SwiperSlide key={item.by + index}>
          <img loading='lazy' src={item?.image} alt='' className='object-cover w-full h-full rounded-[20px] relative' />
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='absolute bottom-0 p-4 text-white'>
            <img src={Quote} alt='' className='w-[58px] h-[58px]' />
            <p className=''>{item?.desc}</p>
            <div className='flex items-end justify-between my-6'>
              <div>
                <div>By {item?.by}</div>
                <div>{item?.role}</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className='absolute flex right-12 bottom-6'>
        <Navigate
          className={`z-30 w-6 h-6 ${activeIndex === 0 ? 'disabled text-neutral-silver' : 'cursor-pointer text-primary-2'}`}
          onClick={() => {
            swiperRef.current?.slidePrev()
          }}
        />
        <Navigate
          className={`z-30 w-6 h-6 rotate-180 ${activeIndex === arrayReviewers.length - 1 ? 'disabled text-neutral-silver' : 'cursor-pointer text-primary-2'}`}
          //
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </Swiper>
  )
}
