import { SetupProfileContextProvider } from '@/context/SetupProfileContext'
import React from 'react'
import CreateCourseHeader from './components/Header'
import StepProgress from './components/StepProgress'

export default function SetupProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <SetupProfileContextProvider>
      <div className='relative flex flex-col h-screen max-h-screen'>
        <CreateCourseHeader></CreateCourseHeader>
        <StepProgress></StepProgress>
        <div className='flex-grow h-[calc(100%-140px)] px-4'>{children}</div>
      </div>
    </SetupProfileContextProvider>
  )
}
