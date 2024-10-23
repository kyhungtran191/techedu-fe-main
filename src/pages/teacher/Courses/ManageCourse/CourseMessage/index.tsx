import SystemNotification from '../components/SystemNotification'
import CourseTitle from '@/components/CourseTittle'
import AIButton from '@/components/AIButton'
import Tiptap from '@/components/TipTap'
import CourseNote from '@/components/CourseNote'
import { Button } from '@/components/ui/button'

export default function CourseMessage() {
  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
      <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar text-neutral-black'>
        <div className='flex items-start bg-[#FFF5CC] p-3 text-neutral-black font-medium mb-6'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            className='mr-[18px]'
          >
            <g clipPath='url(#clip0_3294_8371)'>
              <path
                d='M11.5 7.79688H13.5V9.79688H11.5V7.79688ZM11.5 11.7969H13.5V17.7969H11.5V11.7969ZM12.5 2.79688C6.98 2.79688 2.5 7.27688 2.5 12.7969C2.5 18.3169 6.98 22.7969 12.5 22.7969C18.02 22.7969 22.5 18.3169 22.5 12.7969C22.5 7.27688 18.02 2.79688 12.5 2.79688ZM12.5 20.7969C8.09 20.7969 4.5 17.2069 4.5 12.7969C4.5 8.38688 8.09 4.79688 12.5 4.79688C16.91 4.79688 20.5 8.38688 20.5 12.7969C20.5 17.2069 16.91 20.7969 12.5 20.7969Z'
                fill='#588E58'
              />
            </g>
            <defs>
              <clipPath id='clip0_3294_8371'>
                <rect width='24' height='24' fill='white' transform='translate(0.5 0.796875)' />
              </clipPath>
            </defs>
          </svg>
          <div className='text-[18px]'>
            Your course landing page is essential for your success on Udemy. If executed well, it can also enhance your
            visibility on search engines like Google. Learn more about{' '}
            <span className='underline text-primary-1'>the standards for creating your course landing page</span>
          </div>
        </div>
        <form action=''>
          <div>
            <div className='flex items-center justify-between'>
              <CourseTitle>Welcome message</CourseTitle>
              <AIButton></AIButton>
            </div>
            <Tiptap description='This is your content' onChange={(e) => console.log('e' + e)} className='my-6'></Tiptap>
            <CourseNote>Description should have minimum 1000 words.</CourseNote>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <CourseTitle>Congratulation message</CourseTitle>
              <AIButton></AIButton>
            </div>
            <Tiptap description='This is your content' onChange={(e) => console.log('e' + e)} className='my-6'></Tiptap>
            <CourseNote>Description should have minimum 1000 words.</CourseNote>
          </div>
          <Button disabled className='w-[250px] py-7'>
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
