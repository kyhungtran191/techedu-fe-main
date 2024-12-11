/* eslint-disable react-hooks/rules-of-hooks */
import { Heart, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import Instructor from '@/assets/instructor.jfif'
import { Button } from '@/components/ui/button'
import Description from './components/Description'
import Level from '@/icons/CourseDetail/Level'
import Language from '@/icons/CourseDetail/Language'
import Student from '@/icons/CourseDetail/Student'
import Star from '@/icons/CourseDetail/Star'
import Clock from '@/icons/CourseDetail/Clock'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Folder from '@/icons/CourseDetail/Folder'

import ShortDetail from './components/ShortDetail'
import Reviewers from './components/Reviewers'
import ThreeDots from '@/icons/ThreeDots'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import CourseCard from '@/components/Courses/CourseCard'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GetPublicDetailCourse } from '@/services/publish-course'
import SectionLoading from '@/components/Loading/SectionLoading'
import { COURSE_TYPE } from '@/constants/course'
import Video from '@/icons/Video'
import Document2 from '@/icons/CourseDetail/Document2'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import { useAppContext } from '@/hooks/useAppContext'
export default function CourseDetail() {

  const [playing, setPlaying] = useState(false)
  // Toggle Playing Button
  const togglePlaying = () => {
    setPlaying(!playing)
  }

  const courseDetailState = useLocation()
  const state = courseDetailState.state
  if (!state.courseId || !state.instructorId) {
    toast.error('CourseId or InstructorId not found')
    return
  }
  const { data, isLoading } = useQuery({
    queryKey: ['course-detail', state.courseId, state.instructorId],
    queryFn: () => GetPublicDetailCourse(state.courseId, state.instructorId),
    enabled: Boolean(state.courseId && state.instructorId),
    select: (data) => data.data.value
  })


  return (
    <div className='relative z-0 grid h-full grid-cols-1 xl:grid-cols-[1fr_363px] gap-x-5'>
      {isLoading && <SectionLoading className='z-30'></SectionLoading>}
      <div className='w-full h-full overflow-y-auto bg-white rounded-xl no-scrollbar'>
        <div className='relative w-full height-video-preview'>
          <ReactPlayer
            playing={playing}
            controls={true}
            url={data?.courseLandingPage.videoPromotionUrl}
            // Sau này add note hay gì đó ở đây
            onProgress={(data) => {}}
            width='100%'
            height={'100%'}
            onContextMenu={(e: any) => e.preventDefault()}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          ></ReactPlayer>
          <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 bg-black top-1/2 left-1/2 w-[70px] h-[70px] rounded-3xl p-[10px] bg-[rgba(50, 50, 50, 0.50)] bg-opacity-20 ${playing ? 'hidden' : 'flex'} items-center justify-center`}
          >
            <div
              className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center  cursor-pointer'
              onClick={togglePlaying}
            >
              <Play fill='#666666' color='none' className='w-8 h-8' />
            </div>
          </div>
        </div>
        <div className='px-3 py-6 bg-primary-3 xl:bg-white'>
          <div className='flex items-center justify-between my-4'>
            <h4 className='text-lg font-medium ms:text-2xl'>{data?.courseLandingPage.title} </h4>
            <ThreeDots></ThreeDots>
          </div>
          <div className='hidden ms:flex items-center gap-[10px]'>
            {data?.courseLandingPage.topics.map((item) => (
              <div className='p-2 text-lg bg-white rounded-lg shadow-custom-shadow w-fit text-primary-1'>
                {item.name}
              </div>
            ))}
          </div>
          <div className='block ms:hidden'>
            <Swiper
              modules={[Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 2.5,
                  spaceBetween: 10
                }
              }}
            >
              {['UX Design', 'UI Design', 'Web Design', 'Mobile Design'].map((item) => (
                <SwiperSlide className='py-2'>
                  <div className='w-full p-2 text-sm text-center bg-white rounded-lg shadow-custom-shadow text-primary-1'>
                    {item}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <ShortDetail className='block mt-6 xl:hidden'></ShortDetail>
        </div>
        <div className='px-3 py-2'>
          <div className=''>
            <h3 className='mt-3 text-2xl font-medium text-neutral-black'>Instructor</h3>
            <div className='flex items-start justify-between ms:items-center my-[18px]'>
              <div className='flex items-start '>
                <img
                  className='w-[50px] h-[50px] rounded-xl object-cover flex-shrink-0'
                  src={Instructor}
                  alt='instructor-avatar'
                />
                <div className='ml-3'>
                  <h2 className='text-lg ms:text-xl text-primary-1'>
                    {data?.instructor.firstName} {data?.instructor.lastName}
                  </h2>
                  <div className='text-sm text-neutral-black text-ellipsis ms:text-base'>
                    {data?.instructor.headline}
                  </div>
                </div>
              </div>
              <Button variant={'outline'} className='px-3 py-1 ms:py-4 ms:px-6 border-neutral-black'>
                Follow
              </Button>
            </div>
          </div>

          {/* Short Desc */}
          <Description
            lineclamp={3}
            wrapperClass='pb-4'
            content={data?.courseLandingPage.shortDescription}
          ></Description>
          {/* Description */}
          <div className='py-4'>
            <h3 className='mb-3 text-2xl font-medium text-neutral-black'>Description</h3>
            <p className='mb-3' dangerouslySetInnerHTML={{ __html: data?.courseLandingPage.description || '' }}></p>
          </div>
          {/* Detail */}
          <div className='hidden grid-cols-4 gap-5 ms:grid'>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Level</h4>
              <div className='flex items-center mt-3'>
                <Level className='flex-shrink-0'></Level>
                <span className='ml-2 text-neutral-black'>{data?.courseLandingPage.level}</span>
              </div>
            </div>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Language</h4>
              <div className='flex items-center mt-3'>
                <Language className='flex-shrink-0'></Language>
                <span className='ml-2 text-neutral-black'>{data?.courseLandingPage?.language}</span>
              </div>
            </div>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Enrolled</h4>
              <div className='flex items-center mt-3'>
                <Student className='flex-shrink-0'></Student>
                <span className='ml-2 text-neutral-black'>{data?.totalEnrolled as any}</span>
              </div>
            </div>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Rating</h4>
              <div className='flex items-center mt-3'>
                <Star className='flex-shrink-0'></Star>
                <span className='ml-2 text-neutral-black'>4.8</span>
              </div>
            </div>
          </div>
          <div className='block ms:hidden'>
            <Swiper
              // install Swiper modules
              modules={[Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 12
                }
              }}
            >
              <SwiperSlide>
                <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                  <h4 className='text-primary-1 text-[18px]'>Level</h4>
                  <div className='flex items-center mt-3'>
                    <Level></Level>
                    <span className='ml-3 text-neutral-black'>Beginner</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                  <h4 className='text-primary-1 text-[18px]'>Language</h4>
                  <div className='flex items-center mt-3'>
                    <Language></Language>
                    <span className='ml-3 text-neutral-black'>English</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                  <h4 className='text-primary-1 text-[18px]'>Rating</h4>
                  <div className='flex items-center mt-3'>
                    <Star></Star>
                    <span className='ml-3 text-neutral-black'>{0}</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                  <h4 className='text-primary-1 text-[18px]'>Enrolled</h4>
                  <div className='flex items-center mt-3'>
                    <Student></Student>
                    <span className='ml-3 text-neutral-black'>Enrolled</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Content */}
          <div>
            <h3 className='my-4 text-2xl font-medium text-neutral-black'>Content</h3>
            {data?.sections?.map((item) => (
              <Accordion type='single' collapsible className='mb-[18px] ms:mb-4'>
                <AccordionItem value='section-1' className='!border-b-0'>
                  <AccordionTrigger className='px-3 py-6 text-xl font-medium bg-primary-3 text-neutral-black hover:no-underline [data-state=open]:text-primary-1'>
                    Section {item.position}. {item.title}
                  </AccordionTrigger>
                  <AccordionContent className='px-3'>
                    {item.sectionItems.map((item) => (
                      <div className='py-6'>
                        <div className='flex items-start justify-between ms:items-center'>
                          <h3 className='flex items-center text-xl font-medium text-neutral-black'>
                            {item.primaryAsset.type === COURSE_TYPE.VIDEO ? (
                              <PlayBtn className='mr-2'></PlayBtn>
                            ) : (
                              <Document2 className='mr-2'></Document2>
                            )}
                            <span>
                              Lesson {item.position}. {item.title}
                            </span>
                          </h3>
                          <div className='flex flex-col items-end ms:items-center ms:flex-row'>
                            {/* <span className='mb-6 text-xl ms:mr-6 text-primary-1 ms:mb-0'>Preview</span> */}
                            {item?.primaryAsset.type === COURSE_TYPE.VIDEO && (
                              <div className='flex items-center text-neutral-silver-3'>
                                <Clock></Clock>
                                <span className='w-10 ml-3'>{item.primaryAsset.contentSummary}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <DropdownMenu>
                          <DropdownMenuTrigger className='flex items-center justify-center p-3 mt-5 ml-auto text-white rounded-xl bg-primary-1'>
                            <Folder></Folder>
                            <span className='ml-5'>Resources</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu> */}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          <Reviewers className='mt-6 xl:hidden'></Reviewers>
          <div className='block py-4 sm:hidden'>
            <h3 className='mb-3 text-2xl font-medium text-neutral-black'>Similar courses </h3>
            {Array(4)
              .fill(0)
              .map((item) => (
                <CourseCard vertical={false} wrapperClass='mb-[18px]'></CourseCard>
              ))}
          </div>
        </div>
      </div>
      <div className='flex-col hidden w-full h-full overflow-hidden xl:flex'>
        <ShortDetail
          courseData={data && data}
          className='px-3 py-6 rounded-xl bg-primary-3 text-neutral-black'
        ></ShortDetail>
        <div className='flex-1 px-3 py-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar'>
          <Reviewers></Reviewers>
        </div>
      </div>
    </div>
  )
}
