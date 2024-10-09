import { Button } from '@/components/ui/button'
import useCourseSetUp from '@/hooks/useCourseSetUp'
import Navigate from '@/icons/Navigate'
import { Link } from 'react-router-dom'

interface IProps {
  isFirstScreen?: boolean
  disabledPrevButton?: boolean
  disabledNextButton?: boolean
}

export default function Footer({
  isFirstScreen = false,
  disabledNextButton = false,
  disabledPrevButton = false
}: IProps) {
  const { setStep } = useCourseSetUp()
  return (
    <div className='z-10 flex items-center justify-between w-full mt-auto mb-8 container-fluid'>
      {isFirstScreen ? (
        <Link to='/' className='flex items-center'>
          <Navigate></Navigate>
          <span className='ml-[10px] text-neutral-black'>Cancel</span>
        </Link>
      ) : (
        <Button
          variant={'outline'}
          className={`border-black ${disabledPrevButton ? ' pointer-events-none cursor-not-allowed' : ''}`}
          onClick={() => setStep((step) => step - 1)}
        >
          Previous
        </Button>
      )}
      <Button
        className={`${disabledNextButton ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
        onClick={() => setStep((step) => step + 1)}
      >
        Continue
      </Button>
    </div>
  )
}
