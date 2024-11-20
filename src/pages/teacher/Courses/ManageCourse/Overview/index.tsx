/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SystemNotification from '../components/SystemNotification'
import CourseTitle from '@/components/CourseTittle'
import { useMemo } from 'react'
import { mapToJson } from '@/utils/course'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ResponseOverviewCourse, TAddUpdateOverview } from '@/@types/instructor/course/overview'
import { GetCourseOverview, UpdateCourseOverview } from '@/services/instructor/manage/overview.service'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SectionLoading from '@/components/Loading/SectionLoading'

// Validation schema
const validationSchema = Yup.object().shape({
  highlights: Yup.array().of(Yup.string()),
  requirements: Yup.array().of(Yup.string()),
  intendedLearners: Yup.array().of(Yup.string())
})

type TFormData = {
  highlights: string[]
  requirements: string[]
  intendedLearners: string[]
}

export default function Overview() {
  const { id } = useParams()
  if (!id) {
    toast.error('No Course ID found')
    return
  }
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isDirty },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      highlights: ['', '', '', ''],
      requirements: [''],
      intendedLearners: ['']
    }
  })

  // Query
  const { isLoading, data } = useQuery({
    queryKey: ['course-overview', id],
    queryFn: () => GetCourseOverview(id),
    enabled: Boolean(id),
    select: (data) => data?.data?.value,
    onSuccess(data) {
      reset(data as ResponseOverviewCourse)
    }
  })

  // Mutation
  const updateOverviewMutation = useMutation({
    mutationFn: (data: TAddUpdateOverview) => UpdateCourseOverview(id as string, data)
  })

  const onSubmit = (data: any) => {
    const newData = mapToJson(data)
    updateOverviewMutation.mutate(newData, {
      onSuccess() {
        toast.success('Update course overview success!')
      }
    })
  }

  const { highlights, requirements, intendedLearners } = watch()

  const isValidSubmitBtn = useMemo(() => {
    if (!highlights || !requirements || !intendedLearners) return false
    const hasFilledInput = (arr: string[]) => arr.some((value) => value?.trim() !== '')

    return (
      hasFilledInput((highlights as string[]) || []) ||
      hasFilledInput((requirements as string[]) || []) ||
      hasFilledInput((intendedLearners as string[]) || [])
    )
  }, [watch])

  return (
    <div className='flex flex-col h-full'>
      {(updateOverviewMutation.isLoading || isLoading) && <SectionLoading></SectionLoading>}
      <SystemNotification></SystemNotification>
      <div className='flex-grow p-6 mt-4 overflow-y-auto bg-white rounded-xl no-scrollbar text-neutral-black'>
        {/* Course Highlights */}
        <CourseTitle>Course highlights</CourseTitle>
        <p className='text-xl '>
          You must enter at least 4 <span className='underline text-primary-1'>learning objectives</span> that learners
          can expect to achieve after completing your course
        </p>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          {/* Highlights Input */}
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              name={`highlights.${index}`}
              control={control}
              render={({ field }) => (
                <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 [place-holder]:text-neutral-silver-3 text-xl mb-6'>
                  <Input
                    {...field}
                    className='p-0 text-xl border-none outline-none'
                    placeholder={`Ex: Enter course highlight ${index + 1}`}
                  />
                  <span className='pl-6'>160</span>
                </div>
              )}
            />
          ))}

          {/* Display Error for Highlights */}
          {errors.highlights && <p className='text-red-500'>{errors.highlights.message}</p>}

          {/* Course Requirements */}
          <CourseTitle>Course requirements</CourseTitle>
          <p className='mb-6 text-xl '>
            List any required skills, experience, tools, or equipment needed before taking the course. If there are no
            requirements, let users know they can start without any prior background or knowledge
          </p>

          <Controller
            name={`requirements.${0}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3  [place-holder]:text-neutral-silver-3 text-xl mb-6'>
                <Input
                  {...field}
                  className='p-0 text-xl border-none outline-none'
                  placeholder='Ex: No prior coding experience necessary'
                />
                <span className='pl-6'>160</span>
              </div>
            )}
          />
          {/* Display Error for Requirements */}
          {errors.requirements && <p className='text-red-500'>{errors.requirements.message}</p>}

          {/* Intended Learners */}
          <CourseTitle>Intended learners</CourseTitle>
          <p className='mb-6 text-xl'>
            Provide a clear description of who this course is for and who will find the content valuable. This will help
            you attract the right participants to your course
          </p>

          <Controller
            name={`intendedLearners.${0}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 [place-holder]:text-neutral-silver-3 text-xl mb-6'>
                <Input
                  {...field}
                  className='p-0 text-xl border-none outline-none'
                  placeholder='Ex: No prior experience necessary'
                />
                <span className='pl-6'>160</span>
              </div>
            )}
          />
          {/* Display Error for Intended Learners */}
          {errors.intendedLearners && <p className='text-red-500'>{errors.intendedLearners.message}</p>}

          {/* Save Button */}
          <Button
            className={`min-w-[300px] py-8 text-xl mt-4 ${isValidSubmitBtn ? 'bg-primary-1' : 'bg-neutral-silver-3'}`}
            disabled={!isValidSubmitBtn}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
