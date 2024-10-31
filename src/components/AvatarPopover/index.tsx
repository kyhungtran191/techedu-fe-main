import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { Separator } from '../ui/separator'
import Language from '@/icons/CourseDetail/Language'
import { Switch } from '../ui/switch'
import { useAppContext } from '@/hooks/useAppContext'
import { clearLS } from '@/utils/auth'
import { BASIC_ROLE } from '@/constants/role'
import { Lock } from 'lucide-react'
import { toast } from 'react-toastify'
export default function AvatarPopover({ isAvatarName = false }: { isAvatarName?: boolean }) {
  const { isAuthenticated, setProfile, setIsAuthenticated, profile, setPermissions } = useAppContext()

  // Logout function
  const handleLogout = () => {
    clearLS()
    setIsAuthenticated(false), setProfile(undefined)
    setProfile(undefined)
    setPermissions(undefined)
    toast.success('Log out successfully !')
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex items-center gap-x-2'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {isAvatarName && (
            <div className='flex items-center'>
              <div className='text-neutral-black'>Lily Morris</div>
              <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
                <path
                  d='M7.91 8.87744L12.5 13.4674L17.09 8.87744L18.5 10.2974L12.5 16.2974L6.5 10.2974L7.91 8.87744Z'
                  fill='#444444'
                />
              </svg>
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className='py-[18px] px-3 text-neutral-black max-w-[242px]' align='end'>
        <div className='flex flex-col space-y-1'>
          <p className='text-sm font-medium leading-none'>Ky Hung</p>
          <p className='text-xs leading-none text-muted-foreground'>kyhung@gmail.com</p>
        </div>
        <Separator className='my-3 bg-neutral-silver-3'></Separator>
        {profile && profile?.roles?.includes(BASIC_ROLE.CLIENT) ? (
          <div className='flex flex-col gap-y-6'>
            <Link to='' className=''>
              My Course
            </Link>
            <Link to='' className='flex items-center justify-between'>
              Wishlist
              <div className='w-[22px] h-[22px] rounded-full bg-secondary-1 flex items-center justify-center text-white'>
                2
              </div>
            </Link>
            <Link to='' className=''>
              Profile
            </Link>
          </div>
        ) : (
          <div className='flex flex-col gap-y-6'>
            <Link to='/admin' className='flex items-center gap-2'>
              <Lock className='w-4 h-4'></Lock>
              Manage Center
            </Link>
          </div>
        )}

        <Separator className='my-3 bg-neutral-silver-3'></Separator>
        <div className='flex flex-col gap-y-6'>
          <Link to='' className='flex items-center justify-between'>
            Language
            <div className='flex items-center'>
              <span>English</span>
              <Language className='w-[18px] h-[18px] ml-2'></Language>
            </div>
          </Link>
          <Link to='' className='flex items-center justify-between'>
            Dark mode
            <Switch className='rounded-lg w-11 bg-[#7D7A7A] py-[2px]'></Switch>
          </Link>
        </div>
        <Separator className='my-6 bg-neutral-silver-3'></Separator>
        <div className='flex flex-col gap-y-6'>
          <Link to='' className=''>
            Support Center
          </Link>
          <div className='cursor-pointer text-secondary-2' onClick={handleLogout}>
            Log out
          </div>
        </div>
        <Separator className='my-6 bg-neutral-silver-3'></Separator>
        <div>
          <h3 className='font-medium text-primary-1'>Business plan</h3>
          <div className='mt-1 text-sm font-light'>Knowledge is vital for business sustainability</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
