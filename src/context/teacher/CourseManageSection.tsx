import { createContext, useContext, useState } from 'react'



export interface ICourseManage {
  
}

const initState: ICourseManage = {}

export const CourseManageContext = createContext<ICourseManage>(initState)

export const CourseManageContextProvider = ({ children }: { children: React.ReactNode }) => {
  // return <CourseManageContext.Provider>{children}</CourseManageContext.Provider>
}
