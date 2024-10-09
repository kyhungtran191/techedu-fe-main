import { CourseStepContext, ICourseSetUp } from '@/context/CourseSetUpContext'
import { useContext } from 'react'

const useCourseSetUp = () => {
  const context: ICourseSetUp = useContext(CourseStepContext)
  if (typeof context === 'undefined') throw new Error('Wrap the Provider in side')
  return context
}

export default useCourseSetUp
