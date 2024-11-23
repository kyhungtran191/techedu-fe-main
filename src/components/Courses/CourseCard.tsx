import CardImage from '@/assets/course-img2.png'
import StartIcon from '@/assets/star.png'
import PeopleIcon from '@/assets/people_alt.png'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { CourseInfo } from '@/@types/course.type'
import { PublicCourse } from '@/@types/public-course.type'
import { useNavigate } from 'react-router-dom'

interface IProps {
  courseInfo?: PublicCourse
  vertical?: boolean
  wrapperClass?: string
  isCartItem?: boolean
}

export default function CourseCard({ courseInfo, vertical = true, wrapperClass = '', isCartItem = false }: IProps) {
  const navigate = useNavigate()

  const handleOnClickCard = (courseId: string, instructorId: string, courseName: string) => {
    navigate(`/courses/${courseId}`, {
      state: { courseId, instructorId, courseName }
    })
  }

  return (
    <div
      className={`flex ${vertical ? 'flex-col' : 'flex-row'} w-full ${wrapperClass} bg-primary-3 cursor-pointer`}
      onClick={() => {
        handleOnClickCard(courseInfo?.courseId as string, courseInfo?.userId as string, courseInfo?.title as string)
      }}
    >
      <div
        className={` ${vertical ? 'h-[200px] w-full' : 'w-[30%] h-[30%] sm:w-[250px] tb:w-[300px] sm:h-[200px]'} relative `}
      >
        <img loading='lazy' src={CardImage} alt='course-thumb' className={`h-full w-full object-cover rounded-xl`} />
        <div className='absolute  hidden sm:flex items-center justify-center w-[38px] h-[38px] rounded-full bg-white shadow-md cursor-pointer right-[14px] top-4'>
          <Heart className=' text-primary-1'></Heart>
        </div>
      </div>
      <div className={`rounded-xl ${vertical ? 'w-auto px-2 py-4' : 'flex-1 px-2 sm:px-3   tb:px-5 py-2'}`}>
        <div className='flex items-center justify-between text-sm'>
          <div className=''>{courseInfo?.level}</div>
          <div className='flex items-center gap-x-3'>
            <div className='flex items-center'>
              <img src={PeopleIcon} className={`h-full w-full object-cover`} />
              <span className='ml-1'>{courseInfo?.viewers}</span>
            </div>
            <div className='flex items-center'>
              <img src={StartIcon} className={`h-full w-full object-cover`} />
              <span className='ml-1'>{courseInfo?.rating || (courseInfo as any)?.courseReview?.rating}</span>
            </div>
          </div>
        </div>
        <h2 className='text-ellipsis line-clamp-2 h-[45px] sm:h-[55px] font-medium text-base sm:text-lg tb:text-xl mt-3'>
          {courseInfo?.title}
        </h2>
        <div className='flex items-center mt-2 mb-3 text-xs text-center sm:text-sm'>
          <span>{courseInfo?.instructorName}</span>
          <span className='w-[1px] h-4 bg-black sm:mx-2 mx-1'></span>
          <span className='text-primary-1'>Latest update in 2024</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            {/* <span className='text-sm line-through text-neutral-silver-3'>$12</span> */}
            <span className='text-sm font-medium sm:text-xl text-neutral-black'>${courseInfo?.price?.amount}</span>
          </div>
          {!isCartItem && (
            <Button className='px-2 py-2 sm:py-3 sm:px-[18px]' variant={'custom'}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
