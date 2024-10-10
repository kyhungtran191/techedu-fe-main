import useCourseSetUp from '@/hooks/useCourseSetUp'
import Step1 from '@/icons/CreateCourse/Step1'
import Step2 from '@/icons/CreateCourse/Step2'
import Step3 from '@/icons/CreateCourse/Step3'
import Step4 from '@/icons/CreateCourse/Step4'
import React from 'react'

const steps = [
  { id: 1, label: 'Naming', icon: <Step1></Step1> },
  { id: 2, label: 'Choose a Field', icon: <Step2></Step2> },
  { id: 3, label: 'Set Thumbnail', icon: <Step3></Step3> },
  { id: 4, label: 'Timing', icon: <Step4></Step4> }
]

export default function StepProgress() {
  const { step } = useCourseSetUp()
  return (
    <div className='container flex items-center justify-between w-full mb-6'>
      {steps.map((currentStep, index) => (
        <div key={index} className='relative z-20 flex-1'>
          <div className='flex flex-col items-center'>
            <div
              className={`relative z-20 flex items-center justify-center text-white ${step >= currentStep.id ? 'bg-primary-1' : 'bg-neutral-silver-3'} rounded-full h-9 w-9 transition-all duration-300 ease-in-out`}
            >
              {currentStep.icon}
            </div>
            <div className={`mt-2 text-sm font-medium text-center text-primary-1  h-[20px]`}>
              {currentStep.id === step ? currentStep.label : ''}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`transition-all duration-300 ease-in-out absolute w-full h-1 transform -translate-y-1/2 ${step > currentStep.id ? 'bg-primary-1' : 'bg-gray-300'} top-[30%] left-[50%] z-0`}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}
