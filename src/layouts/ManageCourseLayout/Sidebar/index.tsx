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
      <div
        className={`fixed inset-0 z-40 bg-black/40 ${sidebarOpen ? 'block' : 'hidden'} `}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`absolute left-0 top-0 z-[9999] flex h-screen w-[264px] py-6 px-3 flex-col overflow-y- bg-white duration-300 ease-linear xl:static -translate-x-full xl:translate-x-0  text-black ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className='flex items-center justify-between gap-2 '>
          <NavLink to='/'>
            <img srcSet={`${Logo} 2x`} alt='Logo' />
          </NavLink>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
            className='block xl:hidden'
          >
            <Navigate></Navigate>
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
        <div className='flex flex-col h-full overflow-y-scroll duration-300 ease-linear no-scrollbar'>
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
                          className={`group  flex items-center gap-4 rounded-sm py-2 px-4 font-medium text-neutral-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 relative justify-start xl:justify-start ${
                            pathname === option?.link && 'bg-primary-3'
                          }`}
                        >
                          <Checkbox className='w-6 h-6 border-2 rounded-full' checked={true}></Checkbox>
                          <div className=' xl:block'> {option?.title}</div>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

            {/* <!-- Others Group --> */}
          </nav>
          <Button className='py-6 !rounded-lg px-[18px] text-base bg-neutral-silver-3' variant={'custom'} disabled>
            Submit for review
          </Button>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  )
}

export default SidebarManage
