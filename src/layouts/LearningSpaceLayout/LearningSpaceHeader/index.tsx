import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AlignJustify, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useRef, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatPathToTitle, formatSlugToTitleCourseDetail } from '@/utils'
import CircularProgressBar from '@/components/CircularProgressBar'
import Share from '@/icons/Share'
import AvatarPopover from '@/components/AvatarPopover'
import { useAppContext } from '@/hooks/useAppContext'
import ShareButton from '@/pages/general/Courses/CourseLearningSpace/components/ShareButton'

const LearningSpaceHeader = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  const location = useLocation()
  const titleRef = useRef<HTMLDivElement | null>(null)
  // const navigate = useNavigate()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAppContext()
  const { courseId } = useParams()
  return (
    <header className='sticky top-0 flex w-full px-3 py-6 bg-white z-[30] drop-shadow-1'>
      <div className='flex items-center gap-x-3 h-[48px] flex-wrap justify-between w-full'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className='z-50 block rounded-sm border border-black bg-white p-1.5 shadow-sm  lg:hidden'
          >
            <AlignJustify />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>
        <div
          ref={titleRef}
          className='text-[18px] sm:text-[32px] font-medium flex-1 line-clamp-1 text-ellipsis capitalize'
        >
          
        </div>
        <div className='flex items-center'>
          <CircularProgressBar percentage={50}></CircularProgressBar>
          <Separator orientation='vertical' className='hidden h-6 mx-2 bg-black sm:mx-6 xs:block'></Separator>
          <ShareButton courseId={courseId as string} isOpen={open} onClose={()=>setOpen(false)} onOpenChange={setOpen}></ShareButton>
          {isAuthenticated && <AvatarPopover></AvatarPopover>}
        </div>
      </div>
    </header>
  )
}

export default LearningSpaceHeader
// return
