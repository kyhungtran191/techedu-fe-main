import useCourseSetUp from '@/hooks/useCourseSetUp'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Screen4 from './Screen4'
import { useEffect } from 'react'

const screenMap: { [key: number]: React.FC } = {
  1: Screen1,
  2: Screen2,
  3: Screen3,
  4: Screen4
}

export default function CreateCourse() {
  const { step, isHavingValues, handleExit } = useCourseSetUp()

  const ScreenComponent = screenMap[step]

  // Render the corresponding screen component if it exists
  return <>{ScreenComponent ? <ScreenComponent /> : null}</>
}
