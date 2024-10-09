import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Welcome from '@/assets/welcome-back.png'
import Footer from '@/layouts/TeacherLayout/CreateCourseLayout/components/Footer'
import { useState } from 'react'
import AIButton from '@/components/AIButton'
export default function Screen1() {
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false)
  return (
    <>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-10 flex flex-col justify-center h-full text-xl transition-transform duration-500 transform translate-x-0 text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>Tell us about your course</h2>
          <p className='max-w-[570px] mx-auto'>
            Don't worry if you can't come up with a good title right now. You can change it later.
          </p>
        </div>
        <div className='max-w-[813px] mx-auto w-full'>
          <div className='mb-6'>
            <Label className='mb-[18px] block text-xl'>Course Title</Label>
            <div className='relative w-full p-3 border rounded-lg border-primary-1'>
              <Input className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px]' />
              <div className='absolute -translate-y-1/2 right-3 top-1/2 text-neutral-silver-3'>30</div>
            </div>
          </div>
          <div>
            <div className='mb-[18px] flex items-center justify-between'>
              <Label className='block text-xl'>Describe your course</Label>
              <AIButton></AIButton>
            </div>
            <textarea className='min-h-[206px] w-full rounded-lg border border-primary-1 py-[18px] px-3 outline-none'></textarea>
          </div>
        </div>
      </div>
      <Footer isFirstScreen disabledNextButton={disabledNextButton} />
    </>
  )
}
