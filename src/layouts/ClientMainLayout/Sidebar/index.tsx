/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '@/assets/logo.png'
import Ads from '@/assets/ads.png'
import { Button } from '@/components/ui/button'
import Navigate from '@/icons/Navigate'
import CourseItem from '@/assets/course.png'
import ClickOutside from '@/hooks/useClickOutside'
import { ChevronsLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { GetSimilarityCourse } from '@/services/publish-course'
import SectionLoading from '@/components/Loading/SectionLoading'
import { PublicCourse } from '@/@types/public-course.type'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation()
  const { pathname } = location

  // Save local storage

  type GroupOption = {
    link: string
    icon: React.ReactElement
    title: string
  }
  type sideBarOption = {
    parent?: string
    groupOptions: GroupOption[]
  }

  const sidebarOptions: sideBarOption[] = [
    // {
    //   groupOptions: [
    //     {
    //       link: '/',
    //       icon: (
    //         <svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='currentColor'>
    //           <g clipPath='url(#clip0_2067_1566)'>
    //             <path
    //               d='M19 5.29736V7.29736H15V5.29736H19ZM9 5.29736V11.2974H5V5.29736H9ZM19 13.2974V19.2974H15V13.2974H19ZM9 17.2974V19.2974H5V17.2974H9ZM21 3.29736H13V9.29736H21V3.29736ZM11 3.29736H3V13.2974H11V3.29736ZM21 11.2974H13V21.2974H21V11.2974ZM11 15.2974H3V21.2974H11V15.2974Z'
    //               fill='currentColor'
    //             />
    //           </g>
    //           <defs>
    //             <clipPath id='clip0_2067_1566'>
    //               <rect width='24' height='24' fill='white' transform='translate(0 0.297363)' />
    //             </clipPath>
    //           </defs>
    //         </svg>
    //       ),
    //       title: 'Dashboard'
    //     }
    //   ]
    // },
    {
      parent: 'Explore',
      groupOptions: [
        {
          link: '/',
          icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <g clipPath='url(#clip0_2067_501)'>
                <path
                  d='M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16Z'
                  fill='#444444'
                />
              </g>
              <defs>
                <clipPath id='clip0_2067_501'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
          ),
          title: 'Courses'
        },
        {
          link: '/webinars',
          icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='17' viewBox='0 0 22 17' fill='none'>
              <path
                d='M20 5C18.55 5 17.74 6.44 18.07 7.51L14.52 11.07C14.22 10.98 13.78 10.98 13.48 11.07L10.93 8.52C11.27 7.45 10.46 6 9 6C7.55 6 6.73 7.44 7.07 8.52L2.51 13.07C1.44 12.74 0 13.55 0 15C0 16.1 0.9 17 2 17C3.45 17 4.26 15.56 3.93 14.49L8.48 9.93C8.78 10.02 9.22 10.02 9.52 9.93L12.07 12.48C11.73 13.55 12.54 15 14 15C15.45 15 16.27 13.56 15.93 12.48L19.49 8.93C20.56 9.26 22 8.45 22 7C22 5.9 21.1 5 20 5Z'
                fill='#444444'
              />
              <path d='M14 6L14.94 3.93L17 3L14.94 2.07L14 0L13.08 2.07L11 3L13.08 3.93L14 6Z' fill='#444444' />
              <path d='M2.5 8L3 6L5 5.5L3 5L2.5 3L2 5L0 5.5L2 6L2.5 8Z' fill='#444444' />
            </svg>
          ),
          title: 'Webinars'
        }
      ]
    },
    {
      parent: 'Extensions',
      groupOptions: [
        {
          link: '/schedules',
          icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <g clipPath='url(#clip0_2067_519)'>
                <path
                  d='M3 9H17V7H3V9ZM3 13H17V11H3V13ZM3 17H17V15H3V17ZM19 17H21V15H19V17ZM19 7V9H21V7H19ZM19 13H21V11H19V13Z'
                  fill='#444444'
                />
              </g>
              <defs>
                <clipPath id='clip0_2067_519'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
          ),
          title: 'Schedules'
        },
        {
          link: '/message',
          icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <g clipPath='url(#clip0_2067_526)'>
                <path
                  d='M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z'
                  fill='#444444'
                />
              </g>
              <defs>
                <clipPath id='clip0_2067_526'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
          ),
          title: 'Messages'
        }
      ]
    }
  ]

  const isCourseLearningDetail = /\/courses\/\d+\/learn\/\d+/.test(pathname)

  const courseCardLocationState = useLocation()
  const state = courseCardLocationState.state
  console.log('state', state)

  // Nếu không phải trang học tập, nhưng là trang chi tiết khóa học
  const isCourseDetail = !isCourseLearningDetail && /\/courses\/\d+/.test(pathname)

  const {
    data: similarityData,
    isLoading: similarityLoading,
    status,
    isFetching,
    isPaused
  } = useQuery({
    queryKey: ['get-similarity', isCourseDetail, state?.courseId, state?.instructorId],
    queryFn: () => GetSimilarityCourse(state?.courseId, state?.instructorId),
    enabled: Boolean(state?.courseId && state?.instructorId && isCourseDetail),
    select: (data) => data.data.value
  })

  const isDisabled = !(state?.courseId && state?.instructorId && isCourseDetail)

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <div
        className={`fixed inset-0 z-40 bg-black/40 ${sidebarOpen ? 'block' : 'hidden'} xl:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`absolute left-0 top-0 z-[99] flex h-screen w-[264px] py-6 px-3 flex-col overflow-y-hidden bg-white duration-300 ease-linear xl:static -translate-x-full xl:translate-x-0  text-black ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className='flex items-center justify-between gap-2 '>
          <NavLink to='/'>
            <img srcSet={`${Logo} 2x`} alt='Logo' />
          </NavLink>

          <div
            onClick={() => setSidebarOpen(false)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
            className='block xl:hidden'
          >
            <ChevronsLeft></ChevronsLeft>
          </div>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}
        {!isCourseDetail && !isCourseLearningDetail && (
          <div className='flex flex-col duration-300 ease-linear no-scrollbar'>
            {/* <!-- Sidebar Menu --> */}
            <nav className='mt-5'>
              {sidebarOptions.map((item: sideBarOption, index) => (
                <div key={index}>
                  {item?.parent && (
                    <h3 className='mb-4 text-sm font-semibold text-neutral-black text-opacity-70'>{item?.parent}</h3>
                  )}
                  <ul className='flex flex-col gap-6 mb-6'>
                    {item?.groupOptions &&
                      item.groupOptions.map((option, index) => (
                        <li key={index}>
                          <NavLink
                            to={option?.link}
                            className={`group  flex items-center gap-4 rounded-sm py-2 px-4 font-medium text-neutral-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 relative justify-start ${
                              pathname === option?.link && 'bg-primary-3'
                            }`}
                          >
                            <div>{option?.icon}</div>
                            <div className='block'> {option?.title}</div>
                            {option.title === 'Messages' && (
                              <div className='flex items-center justify-center w-8 h-8 ml-5 text-white bg-red-600 rounded-full'>
                                1
                              </div>
                            )}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <div className='flex flex-col items-start justify-center w-full '>
                <img src={Ads} alt='ads' className='w-[170px] h-[140px] object-cover mx-auto' />
                <p className='text-center mt-6 mb-[10px]'>Unlimited courses with premium account</p>
                <Button className='w-full text-white bg-primary-1 max-w-[170px] mx-auto'>Upgrade</Button>
              </div>
              {/* <!-- Others Group --> */}
              <div>
                <ul className='flex flex-col mt-6'>
                  <li>
                    <NavLink
                      to={'/help'}
                      className={`group  flex items-center gap-4 rounded-sm py-2 px-4 font-medium text-neutral-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 relative justify-start ${
                        pathname.includes('/help') && 'bg-primary-2'
                      }`}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <g clipPath='url(#clip0_2067_543)'>
                          <path
                            d='M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z'
                            fill='#444444'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_2067_543'>
                            <rect width='24' height='24' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className='block'>Help</div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            {/* <!-- Sidebar Menu --> */}
          </div>
        )}
        {(isCourseDetail || isCourseLearningDetail) && (
          <div className='mt-6'>
            <Link to='/' className='flex items-center group'>
              <Navigate className='transition-transform duration-150 ease-in-out group-hover:-translate-x-1'></Navigate>
              <span className='ml-3 text-neutral-black group-hover:text-black group-hover:font-medium'>
                Back to courses
              </span>
            </Link>
            <div className='my-6'>
              <span className='text-neutral-silver-3'>Course</span>
              <h3 className='mt-2 text-xl font-bold text-neutral-black'>
                {state?.courseName || 'Rapid prototyping in the Chrome Browser'}{' '}
              </h3>
            </div>
            {!isDisabled && similarityLoading && <SectionLoading className='z-99999'></SectionLoading>}
            {isCourseDetail && state?.courseId && (similarityData as PublicCourse[])?.length > 0 && (
              <div className='min-h-[200px] relative'>
                <h3 className='text-2xl font-medium text-neutral-black'>Similar courses</h3>
                {/* Course Card */}
                {similarityData &&
                  similarityData.map((item) => (
                    <div className='flex items-start p-2 my-6 rounded-lg cursor-pointer gap-x-3 hover:bg-slate-50'>
                      <img
                        src={item?.courseThumbnailUrl}
                        alt=''
                        className='w-[45px] h-[45px] object-cover rounded-2xl'
                      />
                      <div className='text-neutral-black'>
                        <h3 className='text-[18px] font-medium line-clamp-1 text-ellipsis'>
                          {(item as any).courseName}
                        </h3>
                        <div className='text-sm font-light'>{item?.instructorName}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </aside>
    </ClickOutside>
  )
}

export default Sidebar
