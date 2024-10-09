import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SystemNotification from '../components/SystemNotification'

// Validation schema
const validationSchema = Yup.object().shape({
  courseHighlights: Yup.array()
    .of(Yup.string().required('This field is required'))
    .min(4, 'You need at least 4 highlights'),
  courseRequirements: Yup.array()
    .of(Yup.string().required('This field is required'))
    .min(1, 'At least 1 requirement is required'),
  intendedLearners: Yup.array()
    .of(Yup.string().required('This field is required'))
    .min(1, 'At least 1 learner is required')
})

export default function Overview() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      courseHighlights: ['', '', '', ''], // 4 initial highlights
      courseRequirements: [''], // 1 initial requirement
      intendedLearners: [''] // 1 initial learner
    },
    resolver: yupResolver(validationSchema)
  })

  const [courseHighlights, setCourseHighlights] = useState(['', '', '', ''])
  const [courseRequirements, setCourseRequirements] = useState([''])
  const [intendedLearners, setIntendedLearners] = useState([''])

  const handleAddInput = (section: string) => {
    if (section === 'highlights') {
      setCourseHighlights([...courseHighlights, ''])
    } else if (section === 'requirements') {
      setCourseRequirements([...courseRequirements, ''])
    } else if (section === 'learners') {
      setIntendedLearners([...intendedLearners, ''])
    }
  }

  const handleDelete = (section: string, index: number) => {
    if (section === 'highlights') {
      if (index <= 3) return
      setCourseHighlights((prev) => {
        const newArr = prev.splice(index, 1)
        return newArr
      })
    } else if (section === 'requirements') {
      if (index <= 0) return
      setCourseRequirements((prev) => {
        const newArr = prev.splice(index, 1)
        return newArr
      })
    } else if (section === 'learners') {
      if (index <= 0) return

      setIntendedLearners((prev) => {
        const newArr = prev.splice(index, 1)
        return newArr
      })
    }
  }

  const onSubmit = (data: unknown) => {
    console.log('Form Data:', data)
    // Submit form logic here
  }

  // Watch the form data
  const watchCourseHighlights = watch('courseHighlights')
  const watchCourseRequirements = watch('courseRequirements')
  const watchIntendedLearners = watch('intendedLearners')

  return (
    <div className='flex flex-col h-full'>
      <SystemNotification></SystemNotification>
      <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar text-neutral-black'>
        {/* Course Highlights */}
        <div className='flex items-center mb-[18px]'>
          <div className='h-[40px] w-[2px] bg-primary-1 mr-5'></div>
          <div className='text-2xl font-medium '>Course highlights</div>
        </div>

        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          {courseHighlights.map((_, index) => (
            <div
              key={index}
              className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'
            >
              <Controller
                name={`courseHighlights.${index}`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className='p-0 text-xl border-none outline-none'
                    placeholder={`Ex: Enter course highlight ${index + 1}`}
                  />
                )}
              />
              <span className='pl-6'>160</span>
            </div>
          ))}
          {/* Add More Button for Course Highlights */}
          {watchCourseHighlights && watchCourseHighlights.filter(Boolean).length >= 4 && (
            <div
              className='flex items-center py-4 cursor-pointer text-primary-1 w-fit'
              onClick={() => handleAddInput('highlights')}
            >
              <Plus className='mr-[10px]' />
              <span>Add more to your response</span>
            </div>
          )}

          {/* Course Requirements */}
          <div className='flex items-center mb-[18px] mt-6'>
            <div className='h-[40px] w-[2px] bg-primary-1 mr-5'></div>
            <div className='text-2xl font-medium'>Course requirements</div>
          </div>
          {courseRequirements.map((_, index) => (
            <div
              key={index}
              className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'
            >
              <Controller
                name={`courseRequirements.${index}`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className='p-0 text-xl border-none outline-none'
                    placeholder='Ex: No prior coding experience necessary'
                  />
                )}
              />
              <span className='pl-6'>160</span>
            </div>
          ))}
          {watchCourseRequirements && watchCourseRequirements.filter(Boolean).length >= 1 && (
            <div
              className='flex items-center py-4 cursor-pointer text-primary-1 w-fit'
              onClick={() => handleAddInput('requirements')}
            >
              <Plus className='mr-[10px]' />
              <span>Add more to your response</span>
            </div>
          )}

          {/* Intended Learners */}
          <div className='flex items-center mb-[18px] mt-6'>
            <div className='h-[40px] w-[2px] bg-primary-1 mr-5'></div>
            <div className='text-2xl font-medium'>Intended learners</div>
          </div>
          {intendedLearners.map((_, index) => (
            <div
              key={index}
              className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'
            >
              <Controller
                name={`intendedLearners.${index}`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className='p-0 text-xl border-none outline-none'
                    placeholder='Ex: No prior experience necessary'
                  />
                )}
              />
              <span className='pl-6'>160</span>
              {index > 0 && (
                <div
                  className='flex items-center p-2 mx-2 text-white bg-red-500 rounded-lg cursor-pointer bg-re hover:bg-red-600'
                  onClick={() => handleDelete('learners', index)}
                >
                  <Trash></Trash>
                </div>
              )}
            </div>
          ))}
          {watchIntendedLearners && watchIntendedLearners.filter(Boolean).length >= 1 && (
            <div
              className='flex items-center py-4 cursor-pointer text-primary-1 w-fit'
              onClick={() => handleAddInput('learners')}
            >
              <Plus className='mr-[10px]' />
              <span>Add more to your response</span>
            </div>
          )}

          {/* Save Button */}
          <Button
            className={`bg-neutral-silver-3 min-w-[300px] py-8 text-xl mt-4 ${isValid ? 'bg-primary-1' : 'bg-neutral-silver-3'}`}
            disabled={!isValid}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
