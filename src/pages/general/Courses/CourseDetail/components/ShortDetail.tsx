import { ResponsePrivateCourseDetail } from '@/@types/admin/courses.type'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/hooks/useAppContext'
import Certificate from '@/icons/CourseDetail/Certificate'
import Clock from '@/icons/CourseDetail/Clock'
import Document from '@/icons/CourseDetail/Document'
import FolderNLine from '@/icons/CourseDetail/FolderNLine'
import { Heart } from 'lucide-react'
import React, { useMemo } from 'react'

export default function ShortDetail({
  className,
  courseData
}: {
  className?: string
  courseData?: ResponsePrivateCourseDetail | null
}) {
  //
  const { cart, isAuthenticated } = useAppContext()

  const isHavingCourseCart = useMemo(() => {
    if (!isAuthenticated || !cart?.id) return
    return cart.items.some((item) => {
      return item.courseId === courseData?.courseId
    })
  }, [courseData])
  if (!courseData) return
  return (
    <div className={`${className} min-h-[300px]`}>
      <h3 className='mb-3 text-2xl font-medium'>Course Include</h3>
      <div>
        <div className='flex items-center mb-6'>
          <Clock className='text-neutral-black'></Clock>
          <span className='ml-[10px] font-medium'>{courseData?.totalVieoDuration} on-demand video</span>
        </div>
        <div className='flex items-center mb-6'>
          <Document className='text-neutral-black'></Document>
          <span className='ml-[10px] font-medium'>{courseData?.totalSectionItems} lessons</span>
        </div>
        <div className='flex items-center mb-6'>
          <FolderNLine className='text-neutral-black'></FolderNLine>
          <span className='ml-[10px] font-medium'>{courseData?.totalResources} downloadable resources</span>
        </div>
        <div className='flex items-center mb-6'>
          <Certificate className='text-neutral-black'></Certificate>
          <span className='ml-[10px] font-medium'>Completion certificate</span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        {/* <span className='text-2xl line-through text-neutral-silver-3'>${courseData?.price}</span> */}
        <span className='text-[32px]'>$ {courseData?.price?.amount}</span>
        {/* <div className='p-2 rounded-md bg-[#F30000] text-center text-white uppercase'>20% OFF</div> */}
      </div>
      <div className='flex items-center gap-x-[18px] my-[18px]'>
        <Button className='flex-1 px-4 !py-7 text-xl text-white bg-primary-1' variant={'custom'}>
          {isHavingCourseCart ? 'Go to Cart' : 'Add To Cart'}
        </Button>
        <div className=' flex items-center justify-center w-[60px] h-[60px] rounded-xl bg-white shadow-md cursor-pointer'>
          <Heart className=' text-primary-1'></Heart>
        </div>
      </div>
      <span className='text-sm underline'>Refund policy within 14 days</span>
    </div>
  )
}
