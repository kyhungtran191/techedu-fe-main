import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AlignJustify, ArrowBigLeft, Navigation, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Cart from '@/icons/Cart'
import { Separator } from '@/components/ui/separator'
import Bell from '@/icons/Bell'
import { useEffect, useRef } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatPathToTitle } from '@/utils'
import CategoriesMenu from '../Menu'
import AvatarPopover from '@/components/AvatarPopover'
import BecomeTeacherBtn from '@/components/BlankOptions/BecomeTeacherBtn'
import { Button } from '@/components/ui/button'
import Navigate from '@/icons/Navigate'
import { useAppContext } from '@/hooks/useAppContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GetCategoriesWithSubCategories } from '@/services/categories'
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
  const { pathname } = location
  const pageState = location.state
  const isCourseLearningDetail = /\/courses\/\d+\/learn\/\d+/.test(pathname)
  const isCourseDetail = !isCourseLearningDetail && /\/courses\/[\w-]+/.test(pathname)
  useEffect(() => {
    const currentTitle: HTMLDivElement | null = titleRef.current
    if (currentTitle) {
      currentTitle.textContent =
        location.pathname !== '/'
          ? isCourseDetail
            ? pageState.courseName
            : formatPathToTitle(location.pathname, true)
          : 'Courses'
    }
  }, [location.pathname])

  console.log(isCourseDetail)

  const { isAuthenticated, cart } = useAppContext()

  const navigate = useNavigate()
  const courseCardLocationState = useLocation()
  const state = courseCardLocationState.state

  return (
    <header className='z-30 flex w-full px-3 py-6 bg-white drop-shadow-1'>
      <div className='flex items-center justify-between flex-grow shadow-2 h-[48px] relative flex-wrap'>
        <div className='flex items-center gap-x-2 sm:gap-x-3'>
          <Button
            onClick={(e) => {
              setSidebarOpen(true)
            }}
            className={`${isCourseDetail ? 'hidden' : 'block'} z-30  rounded-sm focus:bg-white focus:text-black bg-white text-black p-1.5 shadow-sm  xl:hidden`}
          >
            <AlignJustify />
          </Button>
          <Link to='/courses' className={`${isCourseDetail ? 'flex' : 'hidden'}  items-center xl:hidden mr-2`}>
            <Navigate></Navigate>
            <span className='ml-1 text-sm font-medium'>Back</span>
          </Link>
          {!isCourseDetail ? (
            <div ref={titleRef} className='text-[18px] sm:text-[32px] font-medium tb:w-full capitalize'>
              Course
            </div>
          ) : (
            <div className='text-[18px] sm:text-[32px] font-medium tb:w-full capitalize'>{state.courseName}</div>
          )}

          <CategoriesMenu className='hidden sm:block'></CategoriesMenu>
        </div>

        <div className='items-center justify-center flex-1 hidden mx-2 gap-x-2 tb:flex tb:gap-x-3'>
          <div className='py-1 px-[10px] bg-neutral-silver-2  rounded-xl flex items-center gap-x-[10px] flex-1 md:max-w-[350px]'>
            <Search className='w-4 h-4 md:h-6 md:w-6'></Search>
            <Input
              className='flex-1 flex-shrink-0 px-0 py-0 text-sm bg-transparent border-none outline-none md:text-base'
              placeholder='Enter what you are looking for'
            ></Input>
          </div>
          <BecomeTeacherBtn className='hidden xl:block'></BecomeTeacherBtn>
        </div>

        <div className='flex items-center gap-x-2 tb:gap-x-4 xl:gap-x-6 2xl:gap-x-9'>
          <Popover>
            <PopoverTrigger onClick={() => navigate('/my-cart')} className='relative'>
              <div className='absolute flex items-center justify-center w-5 h-5 text-sm text-white bg-red-500 rounded-full -top-2 -right-1'>
                {cart?.items && cart?.items?.length > 0 ? cart?.items?.length : 0}
              </div>
              <Cart className='text-neutral-black'></Cart>
            </PopoverTrigger>
          </Popover>
          <Separator orientation='vertical' className='h-[24px]'></Separator>
          {/* Login */}
          {isAuthenticated ? (
            <AvatarPopover></AvatarPopover>
          ) : (
            <>
              <Link className='inline-block text-lg text-primary-1' to='/login'>
                Login
              </Link>
              <Button
                variant={'outline'}
                className='border-neutral-black text-neutral-black'
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
