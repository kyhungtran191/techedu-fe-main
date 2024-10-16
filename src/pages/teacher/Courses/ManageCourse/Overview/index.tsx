import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SystemNotification from '../components/SystemNotification'
import Description from '@/pages/general/Courses/CourseDetail/components/Description'
import CourseTitle from '@/components/CourseTittle'
import CourseNote from '@/components/CourseNote'

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

type TFormData = {
  courseHighlights?: string[]
  courseRequirements?: string[]
  intendedLearners?: string[]
}

export default function Overview() {
  // Set up form using useForm with yupResolver
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange' // Enables validation as fields are changed
  })

  const onSubmit = (data: TFormData) => {
    console.log('Form Data:', data)
  }

  return (
    <div className='flex flex-col h-full'>
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
          <Controller
            name={`courseHighlights.${0}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                <Input
                  {...field}
                  className='p-0 text-xl border-none outline-none'
                  placeholder='Ex: Enter course highlight 1'
                />
                <span className='pl-6'>160</span>
              </div>
            )}
          />

          <Controller
            name={`courseHighlights.${1}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                <Input
                  {...field}
                  className='p-0 text-xl border-none outline-none'
                  placeholder='Ex: Enter course highlight 2'
                />
                <span className='pl-6'>160</span>
              </div>
            )}
          />

          <Controller
            name={`courseHighlights.${2}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                <Input
                  {...field}
                  className='p-0 text-xl border-none outline-none'
                  placeholder='Ex: Enter course highlight 3'
                />
                <span className='pl-6'>160</span>
              </div>
            )}
          />

          <Controller
            name={`courseHighlights.${3}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
                <Input
                  {...field}
                  className='p-0 text-xl border-none outline-none'
                  placeholder='Ex: Enter course highlight 4'
                />
                <span className='pl-6'>160</span>
              </div>
            )}
          />
          {/* Display Error for Highlights */}
          {errors.courseHighlights && <p className='text-red-500'>{errors.courseHighlights.message}</p>}

          {/* Course Requirements */}
          <CourseTitle>Course highlights</CourseTitle>
          <p className='mb-6 text-xl'>
            You must enter at least 4 <span className='underline text-primary-1'>learning objectives</span> that
            learners can expect to achieve after completing your course
          </p>

          <Controller
            name={`courseRequirements.${0}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
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
          {errors.courseRequirements && <p className='text-red-500'>{errors.courseRequirements.message}</p>}

          {/* Intended Learners */}
          <CourseTitle>Course requirements</CourseTitle>
          <p className='mb-6 text-xl'>
            You must enter at least 4 <span className='underline text-primary-1'>learning objectives</span> that
            learners can expect to achieve after completing your course
          </p>

          <Controller
            name={`intendedLearners.${0}`}
            control={control}
            render={({ field }) => (
              <div className='flex items-center justify-between border rounded-lg border-neutral-black max-w-[916px] p-3 text-neutral-silver-3 text-xl mb-6'>
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
            className={`min-w-[300px] py-8 text-xl mt-4 ${isValid ? 'bg-primary-1' : 'bg-neutral-silver-3'}`}
            disabled={!isValid}
            variant={'custom'}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
