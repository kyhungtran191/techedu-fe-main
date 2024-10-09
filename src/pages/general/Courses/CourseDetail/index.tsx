import { Heart, Play } from 'lucide-react'
import { useState } from 'react'
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
import FolderNLine from '@/icons/CourseDetail/FolderNLine'
import Document from '@/icons/CourseDetail/Document'
import Certificate from '@/icons/CourseDetail/Certificate'
import { Link } from 'react-router-dom'
import RatingStars from '@/components/RatingStars'
import { Separator } from '@/components/ui/separator'
export default function CourseDetail() {
  const [playing, setPlaying] = useState(false)

  // Toggle Playing Button
  const togglePlaying = () => {
    setPlaying(!playing)
  }

  return (
    <div className='relative z-0 grid h-full md:grid-cols-[1fr_363px] gap-x-5'>
      <div className='w-full h-full overflow-y-auto bg-white rounded-xl no-scrollbar'>
        <div className='relative w-full h-[560px]'>
          <ReactPlayer
            playing={playing}
            controls={true}
            url={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4`}
            // Sau này add note hay gì đó ở đây
            onProgress={(data) => {}}
            width='100%'
            height={'100%'}
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
        <div className='px-3 py-2'>
          <h3 className='mt-3 text-2xl font-medium text-neutral-black'>Instructor</h3>
          <div className='flex items-center justify-between'>
            <div className='flex items-start my-[18px] flex-wrap'>
              <img className='w-[50px] h-[50px] rounded-xl object-cover' src={Instructor} alt='instructor-avatar' />
              <div className='max-w-[454px] ml-3'>
                <h2 className='text-xl text-primary-1'>Rowan Kenelm</h2>
                <span className='text-base text-neutral-black'>
                  30-year UX + Design Veteran; Consultant, Author & Speaker
                </span>
              </div>
            </div>
            <Button variant={'outline'} className='px-6 py-4 border-neutral-black'>
              Follow
            </Button>
          </div>
          {/* Short Desc */}
          <Description lineclamp={2} wrapperClass='pb-4'></Description>
          {/* Description */}
          <div className='py-4'>
            <h3 className='mb-3 text-2xl font-medium text-neutral-black'>Description</h3>
            <Description lineclamp={3}></Description>
          </div>
          {/* Detail */}
          <div className='grid grid-cols-4 gap-5'>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Level</h4>
              <div className='flex items-center mt-3'>
                <Level></Level>
                <span className='ml-3 text-neutral-black'>Beginner</span>
              </div>
            </div>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Language</h4>
              <div className='flex items-center mt-3'>
                <Language></Language>
                <span className='ml-3 text-neutral-black'>English</span>
              </div>
            </div>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Enrolled</h4>
              <div className='flex items-center mt-3'>
                <Student></Student>
                <span className='ml-3 text-neutral-black'>Enrolled</span>
              </div>
            </div>
            <div className='px-5 py-3 bg-primary-3 rounded-xl'>
              <h4 className='text-primary-1 text-[18px]'>Rating</h4>
              <div className='flex items-center mt-3'>
                <Star></Star>
                <span className='ml-3 text-neutral-black'>4.8</span>
              </div>
            </div>
          </div>
          {/* Content */}
          <div>
            <h3 className='my-4 text-2xl font-medium text-neutral-black'>Content</h3>
            <Accordion type='single' collapsible className='mb-4'>
              <AccordionItem value='section-1' className='!border-b-0'>
                <AccordionTrigger className='px-3 py-6 text-xl font-medium bg-primary-3 text-neutral-black hover:no-underline'>
                  Title 1
                </AccordionTrigger>
                <AccordionContent className='px-3'>
                  <div className='py-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-xl font-medium text-neutral-black'>Lession 1</h3>
                      <div className='flex items-center'>
                        <span className='mr-6 text-xl text-primary-1'>Preview</span>
                        <div className='flex items-center text-neutral-silver-3'>
                          <Clock></Clock>
                          <span className='ml-3'>1:20:20</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
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
                    </DropdownMenu>
                  </div>
                  <div className='py-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-xl font-medium text-neutral-black'>Lession 1</h3>
                      <div className='flex items-center'>
                        <span className='mr-6 text-xl text-primary-1'>Preview</span>
                        <div className='flex items-center text-neutral-silver-3'>
                          <Clock></Clock>
                          <span className='ml-3'>1:20:20</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
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
                    </DropdownMenu>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type='single' collapsible className=''>
              <AccordionItem value='section-1' className='!border-b-0'>
                <AccordionTrigger className='px-3 py-6 text-xl font-medium bg-primary-3 text-neutral-black hover:no-underline'>
                  Title 2
                </AccordionTrigger>
                <AccordionContent className='px-3'>
                  <div className='py-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-xl font-medium text-neutral-black'>Lession 1</h3>
                      <div className='flex items-center'>
                        <span className='mr-6 text-xl text-primary-1'>Preview</span>
                        <div className='flex items-center text-neutral-silver-3'>
                          <Clock></Clock>
                          <span className='ml-3'>1:20:20</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='flex items-center justify-center p-3 mt-5 ml-auto text-white rounded-xl bg-primary-1'>
                        <Folder></Folder>
                        <span className='ml-5'>Resources</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className='py-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-xl font-medium text-neutral-black'>Lession 1</h3>
                      <div className='flex items-center'>
                        <span className='mr-6 text-xl text-primary-1'>Preview</span>
                        <div className='flex items-center text-neutral-silver-3'>
                          <Clock></Clock>
                          <span className='ml-3'>1:20:20</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
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
                    </DropdownMenu>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full overflow-hidden'>
        <div className='px-3 py-6 rounded-xl bg-primary-3 text-neutral-black'>
          <h3 className='mb-3 text-2xl font-medium'>Course Include</h3>
          <div>
            <div className='flex items-center mb-6'>
              <Clock className='text-neutral-black'></Clock>
              <span className='ml-[10px] font-medium'>58 hours on-demand video</span>
            </div>
            <div className='flex items-center mb-6'>
              <Document className='text-neutral-black'></Document>
              <span className='ml-[10px] font-medium'>80 lessons</span>
            </div>
            <div className='flex items-center mb-6'>
              <FolderNLine className='text-neutral-black'></FolderNLine>
              <span className='ml-[10px] font-medium'>519 downloadable resources</span>
            </div>
            <div className='flex items-center mb-6'>
              <Certificate className='text-neutral-black'></Certificate>
              <span className='ml-[10px] font-medium'>Completion certificate</span>
            </div>
          </div>
          <div className='flex items-center gap-x-3'>
            <span className='text-2xl line-through text-neutral-silver-3'>$12</span>
            <span className='text-[32px]'>$10</span>
            <div className='p-2 rounded-md bg-[#F30000] text-center text-white uppercase'>20% OFF</div>
          </div>
          <div className='flex items-center gap-x-[18px] my-[18px]'>
            <Button className='flex-1 px-4 !py-7 text-xl text-white bg-primary-1'>Add To Cart</Button>
            <div className=' flex items-center justify-center w-[60px] h-[60px] rounded-xl bg-white shadow-md cursor-pointer'>
              <Heart className=' text-primary-1'></Heart>
            </div>
          </div>
          <span className='text-sm underline'>Refund policy within 14 days</span>
        </div>
        <div className='flex-1 px-3 py-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar'>
          <div className='flex items-center justify-between mb-[18px]'>
            <h3 className='mb-3 text-2xl font-medium'>Feedback</h3>
            <Link to='' className='text-xl text-primary-1'>
              View all
            </Link>
          </div>
          {/* Reviewers */}
          <div>
            <div className='flex items-start justify-between'>
              <div className='flex flex-wrap items-start'>
                <img className='w-[50px] h-[50px] rounded-xl object-cover' src={Instructor} alt='instructor-avatar' />
                <div className='ml-3 '>
                  <h2 className='text-xl font-medium text-neutral-black'>Rowan Kenelm</h2>
                  <RatingStars count={5} wrapperClass='!gap-x-1'></RatingStars>
                </div>
              </div>
              <span className='text-sm text-neutral-silver-3'>4 months ago</span>
            </div>
            <Description lineclamp={2} height='50px' wrapperClass='mt-3'></Description>
            <Separator className='my-4'></Separator>
          </div>
          <div>
            <div className='flex items-start justify-between'>
              <div className='flex flex-wrap items-start'>
                <img className='w-[50px] h-[50px] rounded-xl object-cover' src={Instructor} alt='instructor-avatar' />
                <div className='ml-3 '>
                  <h2 className='text-xl font-medium text-neutral-black'>Rowan Kenelm</h2>
                  <RatingStars count={5} wrapperClass='!gap-x-1'></RatingStars>
                </div>
              </div>
              <span className='text-sm text-neutral-silver-3'>4 months ago</span>
            </div>
            <Description lineclamp={2} height='50px' wrapperClass='mt-3'></Description>
            <Separator className='my-4'></Separator>
          </div>
        </div>
      </div>
    </div>
  )
}
