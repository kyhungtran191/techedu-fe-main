import React from 'react'
import Avatar from '@/assets/instructor.jfif'
import Quote from '@/assets/quote-icon.png'
export default function TeacherCard({ short }: { short?: boolean }) {
  return (
    <div className='p-3 rounded-xl bg-primary-1'>
      <div className='flex items-start gap-5'>
        <img src={Avatar} alt='' className='flex-shrink-0 object-cover w-12 h-12 rounded-full' />
        <div>
          <div className='text-xl text-primary-2'>Ethan Callahan</div>
          <p className='text-[18px] text-primary-3'>
            Digital Marketing at <span>Leetoo Company</span>
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        <img src={Quote} alt='' className='flex-shrink-0 w-6 h-6 my-2' />
        <p className='text-xl text-primary-3 line-clamp-3 text-ellipsis h-[85px]'>
          {short
            ? 'Master advanced social media strategies and tactics'
            : '  Master advanced social media strategies and tactics, enabling you to lead successful social media campaigns and engagement.'}
        </p>
      </div>
    </div>
  )
}
