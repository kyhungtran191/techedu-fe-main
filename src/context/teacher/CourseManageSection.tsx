import { createContext, useContext, useMemo, useState } from 'react'

export interface ICourseManage {
  sections: {
    curriculum: boolean
    caption: boolean
    learners: boolean
    message: boolean
    price: boolean
    coupon: boolean
  }
  setSections: React.Dispatch<
    React.SetStateAction<{
      curriculum: boolean
      caption: boolean
      learners: boolean
      message: boolean
      price: boolean
      coupon: boolean
    }>
  >
  isValidSection: boolean
}

const initState: ICourseManage = {
  sections: {
    curriculum: false,
    caption: false,
    learners: false,
    message: false,
    price: false,
    coupon: false
  },
  setSections: () => {},
  isValidSection: false
}

export const CourseManageContext = createContext<ICourseManage>(initState)

export const CourseManageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [sections, setSections] = useState(initState.sections)
  const isValidSection = useMemo(() => {
    return Object.values(initState.sections).every((value) => value)
  }, [])

  return (
    <CourseManageContext.Provider value={{ sections, isValidSection, setSections }}>
      {children}
    </CourseManageContext.Provider>
  )
}
