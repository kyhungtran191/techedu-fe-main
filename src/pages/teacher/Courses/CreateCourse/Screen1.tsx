import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AIButton from '@/components/AIButton'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import useCourseSetUp from '@/hooks/useCourseSetUp'
import Tiptap from '@/components/TipTap'
import Navigate from '@/icons/Navigate'
import { Button } from '@/components/ui/button'
import useBeforeUnload from '@/hooks/useBeforeunload'
import { useNavigate } from 'react-router-dom'

type FormData = {
  title: string
  description?: string
}

export default function Screen1() {
  const { handleExit, courseData, setCourseData, setStep, step, setLocalStorageData } = useCourseSetUp()

  const schema = yup.object().shape({
    title: yup.string().required('Course title is require').max(180, 'Course title limit 180 characters'),
    description: yup.string().max(180, 'Course subtitle limit 180 characters')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver<FormData>(schema),
    defaultValues: {
      description: courseData.description || '',
      title: courseData.title || ''
    }
  })

  const handleSubmitValue = (data: FormData) => {
    setStep((step) => step + 1)
    setCourseData((prev) => ({ ...prev, ...data }))
    setLocalStorageData({
      courseData: { ...courseData, ...data },
      step: 2
    })
  }

  useBeforeUnload(isDirty)

  return (
    <form className='flex flex-col h-full' onSubmit={handleSubmit(handleSubmitValue)}>
      {/* Background gradient */}
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      {/* Content Area */}
      <div className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black'>
        <div className='text-center'>
          <h2 className='mb-[18px] text-4xl font-medium text-primary-1'>Tell us about your course</h2>
          <p className='max-w-[570px] mx-auto'>
            Don't worry if you can't come up with a good title right now. You can change it later.
          </p>
        </div>
        <div className='max-w-[813px] mx-auto w-full'>
          <div className='mb-6'>
            <Label className='mb-[18px] block text-xl'>Course Title</Label>
            <div className='relative w-full p-3 border rounded-lg border-primary-1'>
              {/* Title input */}
              <Controller
                control={control}
                name='title'
                render={({ field }) => (
                  <Input
                    placeholder='Ex: Visual Design for UX '
                    className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                    {...field}
                  />
                )}
              />
              <div className='absolute -translate-y-1/2 right-3 top-1/2 text-neutral-silver-3'>30</div>
            </div>
          </div>

          <div>
            <div className='mb-[18px] flex items-center justify-between'>
              <Label className='block text-xl'>Describe your course</Label>
              <AIButton></AIButton>
            </div>
            <Controller
              control={control}
              name='description'
              render={({ field }) => (
                <Tiptap
                  placeholder='Briefly summarize the knowledge you want to convey through the course'
                  className='min-h-[206px] w-full text-xl rounded-lg border border-primary-1 py-[18px] px-3 outline-none placeholder:text-neutral-silver-3'
                  description={courseData.description}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Footer specific to the screen */}
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div className='flex items-center cursor-pointer' onClick={handleExit}>
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Cancel</span>
        </div>
        <Button
          type='submit'
          className={`${!isValid ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
