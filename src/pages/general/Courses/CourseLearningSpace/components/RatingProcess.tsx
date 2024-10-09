import RatingStars from '@/components/RatingStars'
import { Progress } from '@/components/ui/progress'

export default function RatingProcess() {
  return (
    <div className='w-full ml-8'>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <div className='flex items-center justify-center h-4 mb-6 mr-6'>
            <Progress className='h-[14px] sm:h-[16px]  flex-1' value={60}></Progress>
            <RatingStars count={5 - index} wrapperClass='!gap-x-2 ml-6 w-[152px]'></RatingStars>
          </div>
        ))}
    </div>
  )
}
