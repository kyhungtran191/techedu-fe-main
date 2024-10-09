import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Upload from '@/icons/Upload'
import Footer from '@/layouts/TeacherLayout/CreateCourseLayout/components/Footer'
import React, { useState } from 'react'

export default function Screen3() {
  const [checkedOption, setCheckedOption] = useState(1)
  return (
    <>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div className='relative z-10 flex flex-col justify-center h-full text-xl text-neutral-black'>
        <div className='mb-12 text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>Capture Attention with thumbnail</h2>
          <p className='max-w-[570px] mx-auto'>Upload one now or choose one later</p>
        </div>
        <div className='max-w-[813px] mx-auto w-full'>
          <div>
            <Label
              className={`flex text-xl items-center p-6 border ${checkedOption == 1 ? 'rounded-t-lg ' : 'rounded-lg'} cursor-pointer border-silver-3 group`}
              htmlFor='thumb'
              onClick={() => setCheckedOption(1)}
            >
              <Checkbox className='w-6 h-6 mr-5 rounded-full' checked={checkedOption === 1}></Checkbox>
              <span>Upload an image</span>
            </Label>
            <div
              className={`rounded-b-lg overflow-hidden  ${checkedOption == 1 ? 'p-6 border-x border-b' : 'p-0 border-0'}`}
            >
              <div
                className={`w-full border-2 border-dashed rounded-lg   ${checkedOption == 1 ? 'h-[180px]  opacity-100' : 'h-0  opacity-0'} transition-all duration-300`}
              >
                <div className='flex flex-col items-center justify-center p-3 text-neutral-silver-3 '>
                  <Upload></Upload>
                  <p className='mt-5 font-medium'>Upload your file</p>
                  <div className='text-[18px] mt-3'>
                    Drag and drop your file here or <span className='text-primary-1'>choose files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label
              className='flex items-center p-6 mt-6 text-xl border rounded-lg cursor-pointer border-silver-3 group'
              htmlFor='skip'
              onClick={() => setCheckedOption(2)}
            >
              <Checkbox className='w-6 h-6 mr-5 rounded-full' checked={checkedOption === 2}></Checkbox>
              <span>Skip this step for now, I will add it later</span>
            </Label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
