import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useInstructorSetup from '@/hooks/useInstructorSetup'
import Navigate from '@/icons/Navigate'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  acceptTerms: boolean
}

export default function Screen3() {
  const { instructorData, setStep, setLocalStorageData, setInstructorData, handleExit } = useInstructorSetup()

  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      acceptTerms: instructorData.approveTerm || false
    }
  })

  const checkedTerms = watch('acceptTerms')

  const handleSubmit = () => {
    setStep((step) => step + 1)
    setInstructorData((prev) => ({ ...prev, approveTerm: checkedTerms }))
    setLocalStorageData({
      instructorInfo: { ...instructorData, approveTerm: checkedTerms },
      step: 4
    })
  }

  return (
    <form className='flex flex-col h-full'>
      <div className='absolute inset-0 w-full h-full opacity-40 bg-gradient-to-b from-transparent via-primary-3 to-parent'></div>
      <div
        className='relative z-20 flex-grow pt-10 overflow-y-auto text-xl text-neutral-black no-scrollbar
      w-full max-w-[1008px] mx-auto
      '
      >
        <h2 className='text-4xl font-medium text-center text-primary-1'>Review Instructor Terms</h2>
        <div className='px-3 py-6 mt-8 text-xl'>
          <div className='leading-7'>
            By registering as an instructor on the TechEdu platform, you are confirming your agreement to comply with
            the <span className='font-medium underline text-primary-1'>Instructor Terms</span> that govern your role and
            responsibilities within the platform.
          </div>
          <div className='my-8 leading-7'>
            These terms provide essential details about the platform, including pricing, payments, and your
            responsibilities, so it’s important to read them carefully.
          </div>
          <div className='flex items-center '>
            <Checkbox
              className='w-8 h-8'
              checked={checkedTerms}
              onClick={() => {
                setValue('acceptTerms', !checkedTerms)
              }}
            ></Checkbox>
            <Label>
              <input
                type='checkbox'
                {...register('acceptTerms', {
                  required: 'You must accept the terms and conditions'
                })}
                className='hidden'
              />
              <span className='ml-6 text-xl'>I accept the terms and conditions</span>
            </Label>
          </div>
        </div>
      </div>
      <div className='z-10 flex items-center justify-between w-full py-8 mt-auto bg-white p container-fluid'>
        <div className='flex items-center cursor-pointer' onClick={() => setStep((step) => step - 1)}>
          <Navigate />
          <span className='ml-[10px] text-neutral-black'>Previous</span>
        </div>
        <Button
          type='submit'
          className={`${!checkedTerms ? 'bg-neutral-silver-3 pointer-events-none cursor-not-allowed' : 'bg-primary-1 cursor-pointer pointer-events-auto'}`}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
