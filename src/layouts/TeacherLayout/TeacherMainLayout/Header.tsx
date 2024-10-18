import { Link, useLocation } from 'react-router-dom'
import { AlignJustify, ArrowBigLeft, Navigation, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Cart from '@/icons/Cart'
import { Separator } from '@/components/ui/separator'
import Bell from '@/icons/Bell'
import { useEffect, useRef } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatPathToTitle } from '@/utils'
import AvatarPopover from '@/components/AvatarPopover'
import BecomeTeacherBtn from '@/components/BlankOptions/BecomeTeacherBtn'
import { Button } from '@/components/ui/button'
import Navigate from '@/icons/Navigate'
const Header = ({
  setSidebarOpen,
  sidebarOpen
}: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  const location = useLocation()
  const titleRef = useRef<HTMLDivElement | null>(null)
  // const navigate = useNavigate()

  useEffect(() => {
    const currentTitle: HTMLDivElement | null = titleRef.current
    if (currentTitle) {
      currentTitle.textContent = location.pathname !== '/' ? formatPathToTitle(location.pathname, true) : 'Teacher'
    }
  }, [location.pathname])

  const { pathname } = location
  return (
    <header className='z-30 flex w-full px-3 py-6 bg-white drop-shadow-1'>
      <div className='flex items-center justify-between flex-grow shadow-2 h-[48px] relative flex-wrap'>
        <div className='flex items-center gap-x-2 sm:gap-x-3'>
          <Button
            onClick={(e) => {
              setSidebarOpen(true)
            }}
            className={`block z-30  rounded-sm focus:bg-white focus:text-black bg-white text-black p-1.5 shadow-sm  xl:hidden`}
          >
            <AlignJustify />
          </Button>

          <div ref={titleRef} className='text-[18px] sm:text-[32px] font-medium tb:w-full capitalize'>
            Course
          </div>
        </div>

        <div className='flex items-center gap-x-2 tb:gap-x-4 xl:gap-x-6 2xl:gap-x-9'>
          <Link to='/' className='text-lg font-light text-primary-1'>
            Student
          </Link>
          <Separator orientation='vertical' className='h-[24px]'></Separator>
          <Popover>
            <PopoverTrigger>
              <Bell className='text-neutral-black'></Bell>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
          {/* Login */}
          <AvatarPopover></AvatarPopover>
          {/* Unauthorized */}
        </div>
      </div>
    </header>
  )
}

export default Header
