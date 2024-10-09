/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import ClickOutside from '@/hooks/useClickOutside'
import { Checkbox } from '@/components/ui/checkbox'
import Navigate from '@/icons/Navigate'

interface SidebarManageProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const SidebarManage = ({ sidebarOpen, setSidebarOpen }: SidebarManageProps) => {
  const location = useLocation()
  const { pathname } = location
  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  // Save local storage

  type GroupOption = {
    link: string
    title: string
  }
  type sideBarOption = {
    parent?: string
    groupOptions: GroupOption[]
  }

  const sidebarOptions: sideBarOption[] = [
    {
      parent: 'Create your course',
      groupOptions: [
        {
          link: '/courses',

          title: 'Curriculum'
        },
        {
          link: '/webinars',
          title: 'Caption'
        }
      ]
    },
    {
      parent: 'Plan your course',
      groupOptions: [
        {
          link: '/schedules',

          title: 'Intended learners'
        },
        {
          link: '/message',
          title: 'Course messages '
        }
      ]
    },
    {
      parent: 'Publish your course',
      groupOptions: [
        {
          link: '/schedules',
          title: 'Landing page'
        },
        {
          link: '/message',
          title: 'Price'
        },
        {
          link: '/message',
          title: 'Coupon'
        }
      ]
    }
  ]

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-[9999]  hidden xl:flex h-screen xl:w-[264px] py-6 px-3 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static -translate-x-full lg:translate-x-0  text-black ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className='flex items-center justify-between gap-2 '>
          <NavLink to='/'>
            <img src={Logo} alt='Logo' />
          </NavLink>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
            className='block lg:hidden'
          >
            <svg
              className='fill-current'
              width='20'
              height='18'
              viewBox='0 0 20 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
                fill=''
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}
        <Link to='/courses' className='flex items-center mt-8 mb-[18px] group'>
          <Navigate className='transition-transform duration-150 ease-in-out group-hover:-translate-x-1'></Navigate>
          <span className='ml-3 text-neutral-black group-hover:text-black group-hover:font-medium'>
            Back to courses
          </span>
        </Link>
        <div className='flex items-center gap-2'>
          <div className='text-neutral-silver-3'>Course 1231232133211</div>
          <div className='px-3 py-2 rounded-lg bg-neutral-silver-1'>Draft</div>
        </div>
        <h2 className='mt-2 mb-1 text-xl font-bold bg-white text-neutral-black'>UI animation for UX/UI Designers</h2>
        <div className='flex flex-col h-full py-5 overflow-y-scroll duration-300 ease-linear  no-scrollbar'>
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
                          className={`group  flex items-center gap-4 rounded-sm py-2 px-4 font-medium text-neutral-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 relative justify-center xl:justify-start ${
                            pathname === option?.link && 'bg-primary-3'
                          }`}
                        >
                          <Checkbox className='w-6 h-6 border-2 rounded-full'></Checkbox>
                          <div className='hidden xl:block'> {option?.title}</div>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

            {/* <!-- Others Group --> */}
          </nav>
          <Button className='py-6 !rounded-lg px-[18px] text-base bg-neutral-silver-3'>Submit for review</Button>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  )
}

export default SidebarManage
