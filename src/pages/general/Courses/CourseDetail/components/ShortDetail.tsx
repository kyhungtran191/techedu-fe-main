import { Button } from '@/components/ui/button'
import Certificate from '@/icons/CourseDetail/Certificate'
import Clock from '@/icons/CourseDetail/Clock'
import Document from '@/icons/CourseDetail/Document'
import FolderNLine from '@/icons/CourseDetail/FolderNLine'
import { Heart } from 'lucide-react'
import React from 'react'

export default function ShortDetail({ className }: { className?: string }) {
  //
  return (
    <div className={`${className}`}>
      <h3 className='mb-3 text-2xl font-medium'>Course Include</h3>
      <div>
        <div className='flex items-center mb-6'>
          <Clock className='text-neutral-black'></Clock>
          <span className='ml-[10px] font-medium'>58 hours on-demand video</span>
        </div>
        <div className='flex items-center mb-6'>
          <Document className='text-neutral-black'></Document>
          <span className='ml-[10px] font-medium'>80 lessons</span>
        </div>
        <div className='flex items-center mb-6'>
          <FolderNLine className='text-neutral-black'></FolderNLine>
          <span className='ml-[10px] font-medium'>519 downloadable resources</span>
        </div>
        <div className='flex items-center mb-6'>
          <Certificate className='text-neutral-black'></Certificate>
          <span className='ml-[10px] font-medium'>Completion certificate</span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <span className='text-2xl line-through text-neutral-silver-3'>$12</span>
        <span className='text-[32px]'>$10</span>
        <div className='p-2 rounded-md bg-[#F30000] text-center text-white uppercase'>20% OFF</div>
      </div>
      <div className='flex items-center gap-x-[18px] my-[18px]'>
        <Button className='flex-1 px-4 !py-7 text-xl text-white bg-primary-1' variant={'custom'}>
          Add To Cart
        </Button>
        <div className=' flex items-center justify-center w-[60px] h-[60px] rounded-xl bg-white shadow-md cursor-pointer'>
          <Heart className=' text-primary-1'></Heart>
        </div>
      </div>
      <span className='text-sm underline'>Refund policy within 14 days</span>
    </div>
  )
}
