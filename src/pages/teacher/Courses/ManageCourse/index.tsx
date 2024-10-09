import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Play from '@/icons/Play'
import { Plus } from 'lucide-react'
import SystemNoti from './components/SystemNotification'
export default function ManageCourse() {
  // Hiện cái add title
  const [isAddSection, setIsAddSection] = useState<false>(false)

  return (
    <div className='flex flex-col h-full'>
      <SystemNoti></SystemNoti>
      <div className='flex-grow p-6 mt-4 bg-white rounded-xl'>
        <div className='flex items-center justify-between'>
          <p>0 min of video content uploaded</p>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center text-white bg-primary-1 py-3 px-[18px] rounded-lg'>
              <Play></Play>
              <div className='ml-[10px]'>Preview</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=''>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>View as Student</DropdownMenuItem>
              <DropdownMenuItem className='w-full px-2 py-3 cursor-pointer'>View as Instructor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex items-center p-6 mt-6 shadow-md cursor-pointer bg-neutral-silver rounded-xl'>
          <Plus></Plus>
          <span className='ml-[10px] text-xl '>New section</span>
        </div>
      </div>
    </div>
  )
}
