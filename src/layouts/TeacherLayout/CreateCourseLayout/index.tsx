import { CourseSetUpContextProvider } from '@/context/CourseSetUpContext'
import React from 'react'
import CreateCourseHeader from './components/Header'
import StepProgress from './components/StepProgress'
import { useBeforeUnload } from 'react-router-dom'

export default function CreateCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <CourseSetUpContextProvider>
      <div className='relative flex flex-col h-screen max-h-screen'>
        <CreateCourseHeader></CreateCourseHeader>
        <StepProgress></StepProgress>
        <div className='flex-grow h-[calc(100%-140px)] px-4'>{children}</div>
      </div>
    </CourseSetUpContextProvider>
  )
}
