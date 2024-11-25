import { createContext, useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'

export type TCourseSetUpData = {
  title: string
  description: string
  categoryId: string
  thumbnail: {
    courseThumbnailFilePath: string
    courseThumbnailFileUrl: string
  }
  surveyAnswer: string
}

interface ILocal {
  courseData: TCourseSetUpData
  step: number
}

export interface ICourseSetUp {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  isHavingValues: boolean
  courseData: TCourseSetUpData
  setCourseData: React.Dispatch<React.SetStateAction<TCourseSetUpData>>
  handleExit: () => void
  setLocalStorageData: React.Dispatch<React.SetStateAction<ILocal | null>>
  handleResetData: () => void
}

export const initState: ICourseSetUp = {
  step: 1,
  setStep: () => {},
  isHavingValues: false,
  courseData: {
    title: '',
    description: '',
    categoryId: '',
    thumbnail: {
      courseThumbnailFilePath: '',
      courseThumbnailFileUrl: ''
    },
    surveyAnswer: ''
  },
  setCourseData: () => {},
  handleExit: () => {},
  setLocalStorageData: () => {},
  handleResetData: () => {}
}

export const CourseStepContext = createContext<ICourseSetUp>(initState)

export const CourseSetUpContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorageData, setLocalStorageData] = useLocalStorage<ILocal | null>({
    key: 'courseData',
    defaultValue: {
      courseData: initState.courseData,
      step: initState.step
    }
  })

  const [step, setStep] = useState(localStorageData?.step || initState.step)
  const [courseData, setCourseData] = useState<TCourseSetUpData>(localStorageData?.courseData || initState.courseData)

  const navigate = useNavigate()
  const location = useLocation()

  async function handleResetData() {
    setLocalStorageData({
      courseData: initState.courseData,
      step: 1
    })
    setStep(1)
    setCourseData(initState.courseData)
  }

  const isHavingValues = useMemo(() => {
    return Object.values(courseData).some((value) => value)
  }, [courseData])

  const handleExit = async () => {
    if (isHavingValues) {
      const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?')
      if (confirmCancel) {
        await handleResetData()
        navigate('/')
      }
    } else {
      setStep(1)
      navigate('/')
    }
  }

  // Reset dữ liệu chỉ khi gõ URL mới
  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
      handleResetData()
    }
  }, [location.pathname])

  return (
    <CourseStepContext.Provider
      value={{
        step,
        setStep,
        isHavingValues,
        courseData,
        setCourseData,
        handleExit,
        handleResetData,
        setLocalStorageData
      }}
    >
      {children}
    </CourseStepContext.Provider>
  )
}
