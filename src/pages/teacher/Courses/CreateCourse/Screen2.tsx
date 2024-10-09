import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Footer from '@/layouts/TeacherLayout/CreateCourseLayout/components/Footer'
import { useState } from 'react'
export default function Screen2() {
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false)

  return (
    <>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-10 flex flex-col justify-center h-full text-xl transition-transform duration-500 transform translate-x-0 text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>
            Which field best matches the knowledge you share?
          </h2>
          <p className='max-w-[570px] mx-auto'>
            If you aren’t sure about the appropriate field, you can change it later.
          </p>
        </div>
        <Select>
          <SelectTrigger className='max-w-[813px] mx-auto w-full py-6 outline-none text-xl text-neutral-black border-neutral-black'>
            <SelectValue placeholder='Choose A Field' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose A Field</SelectLabel>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>Blueberry</SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple'>Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Footer disabledNextButton={disabledNextButton} />
    </>
  )
}
