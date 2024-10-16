import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import useInstructorSetup from '@/hooks/useInstructorSetup'
import Navigate from '@/icons/Navigate'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Tiptap from '@/components/TipTap'
import useBeforeUnload from '@/hooks/useBeforeunload'
type FormData = {
  firstName: string
  lastName: string
  headline: string
  biography: string
}
export default function Screen1() {
  const { instructorData, setStep, setLocalStorageData, setInstructorData, handleExit } = useInstructorSetup()

  const schema = yup.object().shape({
    firstName: yup.string().required('first name is require'),
    lastName: yup.string().required('lastName is require'),
    headline: yup.string().required('headline is require').max(60, 'headline max length is 60'),
    biography: yup.string().required('biography is required')
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, dirtyFields }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver<FormData>(schema),
    defaultValues: {
      firstName: instructorData.firstName || '',
      lastName: instructorData.lastName || '',
      headline: instructorData.headline || '',
      biography: instructorData.biography || ''
    }
  })

  const handleSubmitValue = (data: FormData) => {
    setStep((step) => step + 1)
    setInstructorData((prev) => ({ ...prev, ...data }))
    setLocalStorageData({
      instructorInfo: { ...instructorData, ...data },
      step: 2
    })
  }

  useBeforeUnload(isDirty)

  return (
    <form className='flex flex-col h-full' onSubmit={handleSubmit(handleSubmitValue)}>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div
        className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black no-scrollbar
      w-full max-w-[1008px] mx-auto
      '
      >
        <h2 className='text-4xl font-medium text-center text-primary-1'>Introduce yourself</h2>
        <div className='px-3 py-6 mt-8'>
          <div className='flex items-center justify-between gap-x-[64px] mb-6'>
            <div className='flex-1'>
              <Label className='mb-[18px] block text-xl'>First name</Label>
              <div className='relative w-full p-3 border rounded-lg border-primary-1'>
                {/* Title input */}
                <Controller
                  control={control}
                  name='firstName'
                  render={({ field }) => (
                    <Input
                      placeholder='Enter your first name'
                      className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex-1'>
              <Label className='mb-[18px] block text-xl'>Last name </Label>
              <div className='relative w-full p-3 border rounded-lg border-primary-1'>
                {/* Title input */}
                <Controller
                  control={control}
                  name='lastName'
                  render={({ field }) => (
                    <Input
                      placeholder='Enter your last name'
                      className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <Label className='mb-[18px] block text-xl'>Headline</Label>
            <div className='relative w-full p-3 border rounded-lg border-primary-1'>
              {/* Title input */}
              <Controller
                control={control}
                name='headline'
                render={({ field }) => (
                  <Input
                    placeholder='Ex: Visual Design for UX '
                    className='px-0 py-0 text-xl border-none focus:outline-none text-neutral-black pr-[30px] placeholder:text-neutral-silver-3'
                    {...field}
                  />
                )}
              />
              <div className='absolute -translate-y-1/2 right-3 top-1/2 text-neutral-silver-3'>60</div>
            </div>
          </div>
          <div>
            <Label className='mb-[18px] block text-xl'>Biography</Label>
            <Controller
              control={control}
              name='biography'
              render={({ field }) => (
                <Tiptap
                  placeholder='Introduce yourself to the students.To help learners connect with you on a deeper level, your bio should showcase your Credibility, Empathy, Passion, and Personality.'
                  className='min-h-[206px] w-full text-xl rounded-lg border border-primary-1 py-[18px] px-3 outline-none placeholder:text-neutral-silver-3'
                  description={instructorData.biography}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
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
