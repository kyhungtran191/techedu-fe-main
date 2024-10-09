import { createContext, useContext, useState } from 'react'

export interface ICourseSetUp {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const initState: ICourseSetUp = {
  step: 1,
  setStep: () => {}
}

export const CourseStepContext = createContext<ICourseSetUp>(initState)

export const CourseSetUpContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1)
  return <CourseStepContext.Provider value={{ step, setStep }}>{children}</CourseStepContext.Provider>
}
