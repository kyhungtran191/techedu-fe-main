import React, { useEffect, useRef } from 'react'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { formatPathToTitle } from '@/utils'
import Settings from '@/icons/Settings'
import { Menu } from 'lucide-react'
export default function ManageHeader({
  setSidebarOpen,
  sidebarOpen
}: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) {
  const navigate = useNavigate()
  const titleRef = useRef<HTMLDivElement | null>(null)
  // const navigate = useNavigate()

  useEffect(() => {
    const currentTitle: HTMLDivElement | null = titleRef.current
    if (currentTitle) {
      currentTitle.textContent = location.pathname !== '/' ? formatPathToTitle(location.pathname, true) : 'Curiculumn'
    }
  }, [location.pathname])

  return (
    <div className='flex items-center justify-between  text-black container-fluid h-[76px] w-full'>
      <Menu
        onClick={() => {
          setSidebarOpen(true)
        }}
        className='block w-6 h-6 mr-3 cursor-pointer xl:hidden'
      ></Menu>
      <div ref={titleRef} className='text-[32px] font-medium flex-1 capitalize'>
        Course
      </div>
      <Link to='/' className='flex items-center gap-x-8'>
        <Settings></Settings>
      </Link>
    </div>
  )
}
