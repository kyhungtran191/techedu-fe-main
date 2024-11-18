import { Heart, Play } from 'lucide-react'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Instructor from '@/assets/instructor.jfif'
import Description from '../CourseDetail/components/Description'
import { Button } from '@/components/ui/button'
import Level from '@/icons/CourseDetail/Level'
import Language from '@/icons/CourseDetail/Language'
import Student from '@/icons/CourseDetail/Student'
import Star from '@/icons/CourseDetail/Star'
import LearningAccordion from './components/LearningAccordion'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RatingProcess from './components/RatingProcess'
import RatingStars from '@/components/RatingStars'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import ListContent from './components/ListContent'

export default function CourseLearningSpace() {
  const [playing, setPlaying] = useState(false)

  // Toggle Playing Button
  const togglePlaying = () => {
    setPlaying(!playing)
  }

  return (
    <div className='relative z-0 grid h-full grid-cols-1 lg:grid-cols-[1fr_363px] gap-x-5'>
      <div className='relative w-full h-full overflow-y-auto bg-white rounded-xl no-scrollbar'>
        <div className='relative w-full height-video'>
          <ReactPlayer
            playing={playing}
            controls={true}
            url={`https://res.cloudinary.com/demo/video/upload/fl_splice,l_video:cld_opener_preroll_sd,so_0/what_is_cloudinary_sd.mp4`}
            onProgress={(data) => {}}
            onContextMenu={(e: any) => e.preventDefault()}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
            width='100%'
            height='100%'
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
        <div className='relative'>
          <Tabs defaultValue='overview' className='w-full'>
            <TabsList className='hidden tb:grid h-full overflow-x-auto grid-cols-3 tb:grid-cols-5 p-3 rounded-b-none bg-primary-3 rounded-tl-xl rounded-tr-xl gap-[10px] sticky top-0 z-10  w-full mt-6'>
              <TabsTrigger
                value='course-content'
                className='block lg:hidden col-span-1 text-xs tb:text-sm px-1 text-center sm:px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1  break-words data-[state=active]:text-white data-[state=active]:shadow-sm text-ellipsis line-clamp-1'
              >
                Course content
              </TabsTrigger>
              <TabsTrigger
                value='overview'
                className='col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value='discussion'
                className='col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Discussion
              </TabsTrigger>
              <TabsTrigger
                value='announcement'
                className='col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Announcement
              </TabsTrigger>
              <TabsTrigger
                value='rating'
                className='col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
              >
                Rating
              </TabsTrigger>
            </TabsList>
            <TabsList className='block tb:hidden rounded-b-none bg-primary-3 rounded-tl-xl rounded-tr-xl gap-[10px] sticky top-0 z-10  w-full mt-6 p-3 h-full'>
              <Swiper
                // install Swiper modules
                modules={[Navigation]}
                breakpoints={{
                  0: {
                    slidesPerView: 2.5,
                    spaceBetween: 18
                  },
                  460: {
                    slidesPerView: 3.5,
                    spaceBetween: 18
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 18
                  },
                  864: {
                    slidesPerView: 5,
                    spaceBetween: 18
                  }
                }}
              >
                <SwiperSlide>
                  <TabsTrigger
                    value='course-content'
                    className='tb:col-span-1 px-3 text-xs tb:text-sm text-center tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm break-words w-full'
                  >
                    Course content
                  </TabsTrigger>
                </SwiperSlide>
                <SwiperSlide>
                  <TabsTrigger
                    value='overview'
                    className='w-full tb:col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
                  >
                    Overview
                  </TabsTrigger>
                </SwiperSlide>
                <SwiperSlide>
                  <TabsTrigger
                    value='discussion'
                    className='w-full tb:col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
                  >
                    Discussion
                  </TabsTrigger>
                </SwiperSlide>
                <SwiperSlide>
                  <TabsTrigger
                    value='announcement'
                    className='w-full tb:col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
                  >
                    Announcement
                  </TabsTrigger>
                </SwiperSlide>
                <SwiperSlide>
                  <TabsTrigger
                    value='rating'
                    className='w-full tb:col-span-1 text-xs tb:text-sm px-3 tb:px-6 py-3 tb:py-[18px] bg-white data-[state=active]:bg-primary-1 data-[state=active]:text-white data-[state=active]:shadow-sm'
                  >
                    Rating
                  </TabsTrigger>
                </SwiperSlide>
              </Swiper>
            </TabsList>
            <div className='py-3 px-2 sm:py-[18px] sm:px-5'>
              {/* Overview */}
              <TabsContent value='course-content'>
                <ListContent></ListContent>
              </TabsContent>
              <TabsContent value='overview'>
                <h3 className='mt-3 text-2xl font-medium text-neutral-black'>Instructor</h3>
                <div className='flex flex-wrap items-center justify-between sm:flex-nowrap'>
                  <div className='flex items-start my-[18px]'>
                    <img
                      className='w-[50px] h-[50px] rounded-xl object-cover'
                      src={Instructor}
                      alt='instructor-avatar'
                    />
                    <div className='max-w-[454px] ml-3'>
                      <h2 className='text-base sm:text-xl text-primary-1'>Rowan Kenelm</h2>
                      <span className='text-sm text-neutral-silver-3 sm:text-base'>
                        30-year UX + Design Veteran; Consultant, Author & Speaker
                      </span>
                    </div>
                  </div>
                  <Button variant={'outline'} className='w-full px-6 py-4 my-2 sm:w-auto border-neutral-black sm:my-0'>
                    Follow
                  </Button>
                </div>
                {/* Short Desc */}
                <Description wrapperClass='pb-4' lineclamp={2}></Description>
                {/* Description */}
                <div className='py-4'>
                  <h3 className='mb-3 text-2xl font-medium text-neutral-black'>Description</h3>
                  <Description lineclamp={2}></Description>
                </div>
                <div className='grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-4'>
                  <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                    <h4 className='text-primary-1 text-[18px]'>Level</h4>
                    <div className='flex items-center mt-3'>
                      <Level className='flex-shrink-0'></Level>
                      <span className='ml-3 text-neutral-black'>Beginner</span>
                    </div>
                  </div>
                  <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                    <h4 className='text-primary-1 text-[18px]'>Language</h4>
                    <div className='flex items-center mt-3'>
                      <Language className='flex-shrink-0'></Language>
                      <span className='ml-3 text-neutral-black'>English</span>
                    </div>
                  </div>
                  <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                    <h4 className='text-primary-1 text-[18px]'>Enrolled</h4>
                    <div className='flex items-center mt-3'>
                      <Student className='flex-shrink-0'></Student>
                      <span className='ml-3 text-neutral-black'>Enrolled</span>
                    </div>
                  </div>
                  <div className='px-5 py-3 bg-primary-3 rounded-xl'>
                    <h4 className='text-primary-1 text-[18px]'>Rating</h4>
                    <div className='flex items-center mt-3'>
                      <Star className='flex-shrink-0'></Star>
                      <span className='ml-3 text-neutral-black'>4.8</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='announcement'>
                {/* <div className='flex items-center'>
                  <div className='flex items-start my-[18px] flex-wrap'>
                    <img
                      className='w-[50px] h-[50px] rounded-xl object-cover'
                      src={Instructor}
                      alt='instructor-avatar'
                    />
                    <div className='max-w-[454px] ml-3'>
                      <h2 className='text-xl text-primary-1'>Rowan Kenelm</h2>
                      <div className='flex items-center text-neutral-black'>
                        <span className='text-base '>Posted a announcement</span>
                        <Separator orientation='vertical' className='h-4 mx-1 bg-neutral-black'></Separator>
                        <span>1 year ago</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* dangerousHTML here */}
                {/* No announcement */}
                <div className='py-4 text-center'>
                  <h3 className='mb-4 text-2xl font-bold'>No announcements posted yet</h3>
                  <p className='text-center max-w-[700px] mx-auto text-sm text-neutral-black'>
                    The instructor hasn’t added any announcements to this course yet. Announcements are used to inform
                    you of updates or additions to the course.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value='discussion'>
                <div className='mb-[18px]'>
                  <h2 className='text-xl font-medium sm:text-2xl'>Your Activity</h2>
                  <div className='text-base sm:text-[18px] text-neutral-silver-3 my-3'>
                    You don't have any activities yet
                  </div>
                  <div className='text-sm underline sm:text-base text-primary-1'>Make a question</div>
                </div>
                {/* Review Card */}
                <div>
                  <div className='flex items-center justify-between mb-[18px]'>
                    <h4 className='text-base font-medium xs:text-xl xs text-ellipsis line-clamp-1 sm:text-2xl'>
                      Discussions in this course
                    </h4>
                    <Select>
                      <SelectTrigger className='sm:py-4 sm:px-[18px] w-fit border-neutral-black text-neutral-black rounded-lg'>
                        <SelectValue placeholder='All' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='light'>Light</SelectItem>
                        <SelectItem value='dark'>Dark</SelectItem>
                        <SelectItem value='system'>System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Review Card */}
                  <div className='flex items-start my-[18px] flex-wrap'>
                    <img
                      className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-xl object-cover'
                      src={Instructor}
                      alt='instructor-avatar'
                    />
                    <div className='flex-1 ml-5'>
                      <div className='text-lg sm:text-xl text-primary-1'>
                        When would you typically start applying auto-layout in real world project?
                      </div>
                      <Description lineclamp={2} wrapperClass='mt-3'></Description>
                      <div className='flex items-center my-4 text-neutral-silver-3'>
                        <span className='ml-1 text-sm sm:text-base'>
                          By <span className='underline text-primary-1'>Ryan Walker</span>
                        </span>
                        <Separator orientation='vertical' className='h-4 mx-1 bg-neutral-silver-3'></Separator>
                        <span className='text-sm sm:text-base'>1 year ago</span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          {/* Image Reviewers */}
                          <div className='flex items-center'>
                            <img src={Instructor} alt='' className='w-[38px] h-[38px] object-cover rounded-full z-10' />
                            <img
                              src={Instructor}
                              alt=''
                              className='w-[38px] h-[38px] object-cover rounded-full z-[8] -ml-[20px] sm:-ml-[15px]'
                            />
                            <img
                              src={Instructor}
                              alt=''
                              className='w-[38px] h-[38px] object-cover rounded-full z-[7] -ml-[20px] sm:-ml-[15px]'
                            />
                          </div>
                          <div className='ml-6 underline sm:ml-5 text-primary-1'>and 5 others responded</div>
                        </div>
                        {/* Heart */}
                        <div className='flex items-center'>
                          <span className='mr-3 font-bold text-primary-1'>10</span>
                          <div className='flex items-center justify-center w-[38px] h-[38px] rounded-full bg-primary-3 cursor-pointer shadow-md'>
                            <Heart className=' text-primary-1' fill='#588E58'></Heart>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='rating' className='my-[18px]'>
                <h2 className='mb-[18px] text-neutral-black text-2xl font-medium'>Feedback</h2>
                <div className='flex flex-wrap items-center sm:flex-nowrap'>
                  <h3 className='w-full mb-3 text-5xl font-medium text-center text-primary-1 sm:w-auto sm:mb-0'>4.8</h3>
                  <RatingProcess></RatingProcess>
                </div>
                <div>
                  <h3 className='text-base text-neutral-silver-3 sm:text-lg'>
                    Create your feedback about the course and receive our promo code.
                  </h3>
                  <div className='mt-2 text-base sm:text-xl underline text-primary-1 mb-[18px]'>Add your feedback</div>
                  {/* Review Section */}
                  <div>
                    <div className='flex items-center justify-between mb-[18px]'>
                      <h4 className='text-2xl font-medium'>Review</h4>
                      <Select>
                        <SelectTrigger className='!py-4 !px-[18px] w-fit border-neutral-black text-neutral-black rounded-lg'>
                          <SelectValue placeholder='All' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='light'>Light</SelectItem>
                          <SelectItem value='dark'>Dark</SelectItem>
                          <SelectItem value='system'>System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className='flex items-start my-3 sm:my-[18px] flex-wrap'>
                        <img
                          className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-xl object-cover'
                          src={Instructor}
                          alt='instructor-avatar'
                        />
                        <div className='flex-1 ml-3'>
                          <div className='flex items-start justify-between'>
                            <h2 className='text-base sm:text-xl text-primary-1'>Rowan Kenelm</h2>
                            <div className='text-neutral-silver-3'>1 year ago</div>
                          </div>
                          <RatingStars count={5} wrapperClass='!gap-x-2' customStar='w-[18px] h-[18px]'></RatingStars>
                          <Description lineclamp={2} wrapperClass='mt-3'></Description>
                          {/* Replier List */}
                          <div className='mt-6 max-h-[400px] overflow-y-auto no-scrollbar'>
                            {Array(3)
                              .fill(0)
                              .map((item) => (
                                <div className='flex items-start my-[18px] flex-wrap'>
                                  <img
                                    className='w-[40px] h-[40px] rounded-full object-cover'
                                    src={Instructor}
                                    alt='instructor-avatar'
                                  />
                                  <div className='flex-1 ml-3'>
                                    <div className='flex items-start justify-between'>
                                      <h2 className='text-base sm:text-xl text-primary-1'>Rowan Kenelm</h2>
                                      <div className='text-neutral-silver-3'>1 year ago</div>
                                    </div>
                                    <span className='text-base text-neutral-silver-3'>Instructor</span>
                                    <Description lineclamp={2}></Description>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      <div className='hidden w-full h-full py-3 overflow-y-auto bg-white lg:block no-scrollbar rounded-xl'>
        <ListContent></ListContent>
      </div>
    </div>
  )
}
