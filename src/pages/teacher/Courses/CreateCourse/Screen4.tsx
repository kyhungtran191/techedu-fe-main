import { useState } from 'react'
import Footer from '@/layouts/TeacherLayout/CreateCourseLayout/components/Footer'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const stepOptions = [
  {
    id: 1,
    value: "I'm currently very busy (less than 2 hours)"
  },
  {
    id: 2,
    value: "I'll work on this simultaneously with my other tasks (2-5 hours)"
  },
  {
    id: 3,
    value: 'I have plenty of flexibility (more than 5 hours)'
  },
  {
    id: 4,
    value: 'I’m not sure if I have the time yet'
  }
]

export default function Screen4() {
  const [option, setOption] = useState(0)

  return (
    <>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-10 flex flex-col justify-center h-full text-xl transition-transform duration-500 transform translate-x-0 text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>
            How much time can you spend each week on your course?
          </h2>
          <p className='mx-auto'>
            There’s no wrong answer. Even with limited time, we’re here to help you reach your goals.
          </p>
        </div>
        <div className='max-w-[813px] w-full mx-auto text-neutral-black'>
          {stepOptions.map((item) => (
            <Label
              className='flex items-center p-6 mb-6 text-xl border rounded-lg cursor-pointer border-silver-3 group'
              htmlFor='skip'
              key={item.id}
              onClick={() => setOption(item.id)}
            >
              <Checkbox className='w-6 h-6 mr-5 rounded-full' checked={item.id === option}></Checkbox>
              <span>{item.value}</span>
            </Label>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
