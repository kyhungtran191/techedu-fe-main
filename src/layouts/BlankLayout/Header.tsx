import React, { useEffect, useRef } from 'react'
import Logo from '@/assets/logo.png'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import AvatarPopover from '@/components/AvatarPopover'
import { useAppContext } from '@/hooks/useAppContext'
export default function Header({ headerOption }: { headerOption?: React.ReactNode }) {
  // Check isAuthContext
  const headerRef = useRef<null | HTMLDivElement>(null)
  const { isAuthenticated } = useAppContext()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        headerRef?.current?.classList.add('fixed', 'top-0', 'bg-white', 'shadow-lg', 'left-0', 'right-0', 'z-50')
      } else {
        headerRef?.current?.classList.remove('fixed', 'top-0', 'bg-white', 'shadow-lg', 'left-0', 'right-0', 'z-50')
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className='w-full transition-all duration-300 ease-in-out flex items-center justify-between h-[76px] text-white container-fluid z-50 relative'
      ref={headerRef}
    >
      <Link to='/'>
        <img srcSet={`${Logo} 2x`} alt='system_logo' className='w-[200px] h-[52px] object-cover flex-shrink-0' />
      </Link>
      <div className='flex items-center gap-x-3 sm:gap-x-8'>
        {/* Extends */}
        {headerOption}
        {/* Check is Auth or not */}
        {isAuthenticated && <AvatarPopover></AvatarPopover>}
      </div>
    </div>
  )
}
