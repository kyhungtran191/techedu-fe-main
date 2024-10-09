import Counter from '@/components/Counter'
import ScrollText from '@/components/Counter'
import { Button } from '@/components/ui/button'
import VerticalSlider from '@/components/VerticelSlider'
import React from 'react'
import Frame1 from '@/assets/frame-1.jpg'
import Frame2 from '@/assets/frame-2.jpg'
import Navigate from '@/icons/Navigate'
import Service1 from '@/assets/service-1.png'
import Service2 from '@/assets/service-2.png'
import Service3 from '@/assets/service-3.png'
import { Link } from 'react-router-dom'
import TeacherCard from './TeacherSlide/TeacherCard'
import TeacherSlide from './TeacherSlide'
import Start from '@/assets/welcome-back.png'
import { motion } from 'framer-motion'
interface ITutorial {
  image: string
  title: string
  desc: string
  btnGuide: string
  href: string
}

interface IService {
  image: string
  title: string
  desc: string
  btnGuide: string
  href: string
}
const listTutorial: ITutorial[] = [
  {
    btnGuide: 'Course Creation Features',
    desc: 'Effortlessly build customized courses, engaging quizzes, and interactive webinars. Our platform provides the flexibility to design each element to suit your unique teaching approach.',
    href: '/',
    image: Frame1,
    title: 'Design Tailored Courses with Flexible Creation Tools'
  },
  {
    btnGuide: 'Custom Marketing Features',
    desc: 'Elevate your course’s visibility with advanced marketing tools, including flexible pricing strategies, promotional codes, and compelling visuals to enhance its appeal and prominence on the platform.',
    href: '/',
    image: Frame2,
    title: 'Enhance Visibility with Powerful Marketing Features'
  },
  {
    btnGuide: 'Built-in Advanced Analytics Tools',
    desc: 'Unlock detailed insights with advanced analytics and tracking tools. Monitor performance, explore learner behavior, and refine your course based on in-depth data for optimal results.',
    href: '/',
    image: Frame1,
    title: 'Gain Deep Insights with Advanced Analytics & Tracking'
  }
]

const listService: IService[] = [
  {
    image: Service1,
    title: 'Training for Beginners',
    desc: 'Get started easily with our beginner training. Learn to create and manage your first course with step-by-step guidance',
    btnGuide: 'Join the Training',
    href: ''
  },
  {
    image: Service2,
    title: 'Live Chat ',
    desc: 'Live Chat provides instant support for any questions you have, ensuring you get immediate assistance whenever needed',
    btnGuide: 'Open Live Chat',
    href: ''
  },
  {
    image: Service3,
    title: 'Teaching Center',
    desc: 'A dedicated platform for educators to exchange ideas, share information, and ask questions, fostering a collaborative community',
    btnGuide: 'Join the Teaching Center',
    href: ''
  }
]
export default function Ads() {
  return (
    <div className='min-h-[3500px] scroll-smooth'>
      {/* Slider */}
      <div className='grid h-screen grid-cols-2 container-fluid'>
        <div className='relative flex flex-col justify-center col-span-1'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary-3/80 to-transparent blur-sm'></div>
          <div className='relative z-20 max-w-[500px]'>
            <h2 className='text-5xl font-medium text-primary-1  leading-[67.2px] mb-6'>
              Develop your own career path today with us
            </h2>
            <p className='mb-12 text-xl font-light text-neutral-black'>
              Sign up today and join us in teaching and making a global impact from anywhere!
            </p>
            <Button className='w-[290px] py-8 ' variant={'custom'}>
              Get Started
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-3 col-span-1 gap-[10px] text-black'>
          <VerticalSlider></VerticalSlider>
          <VerticalSlider isTop></VerticalSlider>
          <VerticalSlider></VerticalSlider>
        </div>
      </div>
      {/* End Slider */}
      {/* Number Run */}
      <div className='container-fluid '>
        <div className='z-30 flex justify-around py-8 rounded-xl bg-primary-1 shadow-[0_-20px_100px_rgba(255,255,255,1),_0_-40px_200px_rgba(255,255,255,0.9),_0_-60px_300px_rgba(255,255,255,0.8)] backdrop-blur-3xl '>
          <Counter target={50000} name='Students'></Counter>
          <Counter target={74} name='Languages'></Counter>
          <Counter target={180} name='Countries'></Counter>
          <Counter target={10000} name='Business Customers'></Counter>
        </div>
      </div>
      {/* End Number Run */}
      {/* Tutorial */}
      <div className='container-fluid py-[80px] bg-primary-3 text-neutral-black'>
        <div className='max-w-[530px]'>
          <div className='text-5xl font-medium text-primary-1'>Build a learning space your way</div>
          <p className='mt-6 text-2xl'>
            Create and customize your courses effortlessly with powerful tools and insights
          </p>
        </div>
        <div className='mt-[80px] mb-[20px]'>
          {listTutorial.map((item, index) => (
            <div className={`flex items-start gap-[30px] mb-[60px] ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className='flex-1 h-[525px]'>
                <img src={item.image} alt='' className='object-cover w-full h-full' />
              </div>
              <div className='flex-1'>
                <h2 className='text-4xl font-medium'>Design Tailored Courses with Flexible Creation Tools</h2>
                <p className='mt-3 mb-12 text-2xl font-light'>
                  Effortlessly build customized courses, engaging quizzes, and interactive webinars. Our platform
                  provides the flexibility to design each element to suit your unique teaching approach.
                </p>
                <Button
                  variant='ghost'
                  className='flex items-center justify-between px-6 py-6 border border-neutral-black hover:bg-inherit'
                >
                  Course Creation Features
                  <Navigate className='rotate-180'></Navigate>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Tutorial */}
      {/* Service */}
      <div className='container-fluid py-[80px] bg-neutral-silver'>
        <div className='mx-auto text-center max-w-[810px] text-neutral-black'>
          <h2 className='mb-6 text-5xl font-medium text-primary-1'>Support in every way impossible</h2>
          <p className='text-2xl'>
            Vestibulum faucibus leo nec massa tincidunt, nec dictum odio interdum. Donec vehicula, velit nec fermentum{' '}
          </p>
        </div>
        <div className='mt-[80px] grid grid-cols-3 gap-5'>
          {listService.map((item, index) => (
            <div className='w-full px-6'>
              <div className='w-full h-[320px] flex items-center justify-center'>
                <img src={item.image} alt='' className='flex-shrink-0' />
              </div>
              <div className='mt-[42px] text-neutral-black'>
                <h2 className='text-4xl font-medium'>{item.title}</h2>
                <p className='my-3 text-xl h-[84px] line-clamp-3 text-ellipsis'>{item.desc}</p>
                <Link to={item.href} className='flex items-center mt-6 text-primary-1'>
                  {item.btnGuide}
                  <Navigate className='rotate-180 ml-[10px]'></Navigate>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Service */}
      {/* Our Teacher */}
      <TeacherSlide></TeacherSlide>
      {/* End Our Teacher */}
      {/* Share your work */}
      <div className='container-fluid py-[80px] bg-primary-3'>
        <div className='mx-auto text-center max-w-[810px] text-neutral-black'>
          <h2 className='mb-6 text-5xl font-medium text-primary-1 leading-[67.2px]'>
            Share your work.<br></br> Someone out there needs it. ✨
          </h2>
          <p className='text-2xl'>Vestibulum faucibus leo nec massa tincidunt</p>
          <Button className='mt-16 min-w-[200px] h-[60px] text-xl' variant={'custom'}>
            Get started
          </Button>
        </div>
      </div>
      {/* End Share your Work */}
    </div>
  )
}
