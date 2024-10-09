import Instructor from '@/assets/instructor.jfif'
import WebIcon from '@/assets/website-icon.png'
import Facebook from '@/assets/facebook-icon.png'
import LinkedIn from '@/assets/linkedin-icon.png'
import Youtube from '@/assets/youtube-icon.png'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Video from '@/icons/Video'
import Follower from '@/icons/Follower'
import Description from '../Courses/CourseDetail/components/Description'
import CourseCard from '@/components/Courses/CourseCard'

const profileLinks = [
  { icon: WebIcon, title: 'Website' },
  { icon: Facebook, title: 'Facebook' },
  { icon: LinkedIn, title: 'Linkedin' },
  { icon: Youtube, title: 'Youtube' }
]

export default function Profile() {
  return (
    <div className='relative h-full p-6 overflow-y-auto bg-white rounded-xl no-scrollbar'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-x-6'>
          <img src={Instructor} alt='' className='w-[136px] h-[136px] object-cover rounded-xl flex-shrink-0' />
          <div className=''>
            <h2 className='text-2xl font-medium text-primary-1'>Rowan Kenelm</h2>
            <p className='mt-2 text-lg'>15-year UX + Design Veteran</p>
            <div className='flex items-center gap-x-[18px] mt-[18px]'>
              {profileLinks.map((item) => (
                <div className='flex items-center gap-x-[10px] py-3 px-[18px] rounded-lg bg-[#E0E0E0] cursor-pointer'>
                  <img srcSet={`${item.icon} 2x`} alt={item.title} />
                  <div>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button className='p-6 text-lg border-neutral-black' variant={'outline'}>
          Follow
        </Button>
      </div>
      <div className='grid grid-cols-4 my-6 gap-x-3'>
        <div className='px-5 py-3 bg-primary-3 rounded-xl min-h-[86px]'>
          <h2 className='mb-3 text-lg text-primary-1'>Courses</h2>
          <div className='flex items-center text-neutral-black'>
            <PlayBtn></PlayBtn>
            <p className='ml-[11px] text-base'>26</p>
          </div>
        </div>

        <div className='px-5 py-3 bg-primary-3 rounded-xl min-h-[86px]'>
          <h2 className='mb-3 text-lg text-primary-1'>Webinars</h2>
          <div className='flex items-center text-neutral-black'>
            <Video></Video>
            <p className='ml-[11px] text-base'>26</p>
          </div>
        </div>

        <div className='px-5 py-3 bg-primary-3 rounded-xl min-h-[86px]'>
          <h2 className='mb-3 text-lg text-primary-1'>Students</h2>
          <div className='flex items-center text-neutral-black'>
            <Users></Users>
            <p className='ml-[11px] text-base'>26</p>
          </div>
        </div>

        <div className='px-5 py-3 bg-primary-3 rounded-xl min-h-[86px]'>
          <h2 className='mb-3 text-lg text-primary-1'>Followers</h2>
          <div className='flex items-center text-neutral-black'>
            <Follower></Follower>
            <p className='ml-[11px] text-base'>26</p>
          </div>
        </div>
      </div>
      <div className='mb-6'>
        <h2 className='text-2xl font-medium mb-[18px]'>About me</h2>
        <Description wrapperClass='text-lg'></Description>
      </div>
      <div className='mb-6'>
        <h2 className='text-2xl font-medium mb-[18px]'>My Courses</h2>
        <div>
          <CourseCard vertical={false} wrapperClass='mb-3'></CourseCard>
          <CourseCard vertical={false} wrapperClass='mb-3'></CourseCard>
          <CourseCard vertical={false} wrapperClass='mb-3'></CourseCard>
          <CourseCard vertical={false} wrapperClass='mb-3'></CourseCard>
        </div>
      </div>
      <div className='mb-6'>
        <h2 className='text-2xl font-medium mb-[18px]'>My webinars</h2>
        <p className='text-lg text-neutral-silver-3'>This instructor has no current webinars</p>
      </div>
    </div>
  )
}
