import { CourseSetUpContextProvider } from '@/context/CourseSetUpContext'
import React from 'react'
import CreateCourseHeader from './components/Header'
import Footer from './components/Footer'
import StepProgress from './components/StepProgress'

export default function CreateCourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <CourseSetUpContextProvider>
      <div className='flex flex-col h-screen max-h-screen'>
        <CreateCourseHeader></CreateCourseHeader>
        <StepProgress></StepProgress>
        <div className='flex flex-col flex-grow'>{children}</div>
      </div>
    </CourseSetUpContextProvider>
  )
}
