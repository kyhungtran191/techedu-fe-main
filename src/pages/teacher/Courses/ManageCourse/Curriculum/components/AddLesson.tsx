import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PlayBtn from '@/icons/CourseDetail/PlayBtn'
import Quiz from '@/icons/Quiz'
import Document2 from '@/icons/CourseDetail/Document2'
import Close from '@/icons/Close'
import { Input } from '@/components/ui/input'

// validate RHF
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { COURSE_TYPE } from '@/constants/course'
export default function AddLesson() {
  const [isAddLesson, setIsAddLesson] = useState(false)
  const [isApplyLesson, setApplyLesson] = useState(false)

  const schema = yup.object().shape({
    lesson_name: yup.string().required('Required_field').max(80, 'Max is 80')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    getValues
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleCancelCreateLesson = () => {
    reset({
      lesson_name: ''
    })
    setIsAddLesson(false)
    setApplyLesson(false)
  }

  const handleSubmitLessonName = () => {
    setApplyLesson(true)
  }

  const handleSelectSubmitData = (type: string) => {
    // Call api to update the lesson in section
    // Reset the form after call api successfully
  }
  return (
    <div className='mt-8'>
      <Button
        className={`${isAddLesson ? 'hidden' : 'flex'} items-center px-6 py-6 bg-white shadow-md text-neutral-black`}
        variant={'secondary'}
        onClick={() => setIsAddLesson(true)}
      >
        <Plus></Plus>
        <div className='ml-[10px] text-[18px]'>New lesson</div>
      </Button>
      <form
        className={`${!isAddLesson || isApplyLesson ? 'hidden' : 'flex'} items-center justify-between  mt-6 bg-neutral-silver border-neutral-black`}
        onSubmit={handleSubmit(handleSubmitLessonName)}
      >
        <Controller
          control={control}
          name='lesson_name'
          render={({ field }) => (
            <Input
              className='w-full outline-none focus:border-primary-1 max-w-[400px] py-6 text-xl text-neutral-black'
              placeholder='Lesson tittle'
              defaultValue={''}
              {...field}
            ></Input>
          )}
        />

        <div className='flex items-center'>
          <div
            className='py-3 px-[18px] cursor-pointer border border-neutral-black mr-3 rounded-lg'
            onClick={handleCancelCreateLesson}
          >
            Cancel
          </div>
          <Button
            disabled={!isValid}
            className={` text-white p-6 ${errors?.lesson_name?.message ? 'bg-neutral-black' : 'bg-primary-1'}`}
            variant={'custom'}
          >
            Apply
          </Button>
        </div>
      </form>
      {isApplyLesson && (
        <div className='flex items-center justify-between px-6 py-4 mt-6 bg-white rounded-lg shadow-lg'>
          <div className='flex items-center gap-x-12'>
            <div
              className='flex items-center cursor-pointer text-neutral-black group hover:text-primary-1'
              onClick={() => handleSelectSubmitData(COURSE_TYPE.VIDEO)}
            >
              <PlayBtn className='w-8 h-8 text-neutral-silver-3 group-hover:text-primary-1'></PlayBtn>
              <span className='ml-1 text-[18px]'>Video</span>
            </div>
            <div
              className='flex items-center cursor-pointer text-neutral-black group hover:text-primary-1'
              onClick={() => handleSelectSubmitData(COURSE_TYPE.QUIZ)}
            >
              <Quiz className='w-8 h-8 text-neutral-silver-3 group-hover:text-primary-1'></Quiz>
              <span className='ml-1 text-[18px]'>Quiz</span>
            </div>
            <div
              className='flex items-center cursor-pointer text-neutral-black group hover:text-primary-1'
              onClick={() => handleSelectSubmitData(COURSE_TYPE.ARTICLE)}
            >
              <Document2 className='w-8 h-8 text-neutral-silver-3 group-hover:text-primary-1'></Document2>
              <span className='ml-1 text-[18px]'>Article</span>
            </div>
          </div>
          <Close className='cursor-pointer' onClick={handleCancelCreateLesson}></Close>
        </div>
      )}
    </div>
  )
}
