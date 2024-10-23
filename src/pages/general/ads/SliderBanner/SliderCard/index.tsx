import SampleImage5 from '@/assets/slider-5.png'
import SampleImage1 from '@/assets/slider-1.png'
import SampleImage2 from '@/assets/slider-2.png'
import SampleImage3 from '@/assets/slider-3.png'
import SampleImage4 from '@/assets/slider-4.png'
import Play from '@/icons/Play'
import { User } from 'lucide-react'
interface IProps {
  name?: string
  role?: string
  courses?: number
  students?: number
  image?: number
}
export default function SliderCard(props: IProps) {
  const { name, courses, role, students, image } = props
  const images = [SampleImage1, SampleImage2, SampleImage3, SampleImage4, SampleImage5]
  return (
    <div className='relative w-full h-[400px] rounded-xl mb-2'>
      <img src={images[image as number]} className='object-cover w-full h-full rounded-xl'></img>
      <div className='absolute inset-0 z-10 bg-black/20 rounded-xl'></div>
      <div className='absolute z-20 px-3 text-white bottom-6'>
        <h4 className='text-xl font-medium text-primary-2'>Ethan Davis</h4>
        <div className='text-[18px] my-2'>UX Designer</div>
        <div className='flex items-center text-sm'>
          <div className='flex items-center'>
            <Play className='w-4 h-4 mr-1'></Play>
            <span>10 Courses</span>
          </div>
          <div className='w-[0.5px] h-4 bg-white mx-1'></div>
          <div className='flex items-center'>
            <User className='w-4 h-4 mr-1'></User>
            <span>3k Students</span>
          </div>
        </div>
      </div>
    </div>
  )
}
