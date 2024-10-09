import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AlignJustify, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useRef } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatPathToTitle, formatSlugToTitleCourseDetail } from '@/utils'
import CircularProgressBar from '@/components/CircularProgressBar'
import Share from '@/icons/Share'

const LearningSpaceHeader = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  const location = useLocation()
  const titleRef = useRef<HTMLDivElement | null>(null)
  // const navigate = useNavigate()
  const params = useParams()

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
          {formatSlugToTitleCourseDetail(params?.lecture as string)}
        </div>
        <div className='flex items-center'>
          <CircularProgressBar percentage={50}></CircularProgressBar>
          <Separator orientation='vertical' className='hidden h-6 mx-2 bg-black sm:mx-6 xs:block'></Separator>
          <Button
            className='hidden xs:flex text-sm sm:text-base text-neutral-black px-[18px] py-3 rounded-lg h-10 sm:h-[48px] border-neutral-black'
            variant={'outline'}
          >
            <Share className='w-4 h-4 sm:w-6 sm:h-6'></Share>
            <span className='ml-[10px] '>Share</span>
          </Button>
          <Popover>
            <PopoverTrigger className='ml-2 xs:ml-5 sm:ml-[38px]'>
              <div className='flex items-center gap-x-2'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default LearningSpaceHeader
// return
