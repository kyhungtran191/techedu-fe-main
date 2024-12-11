import { createContext, useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'

export type TInstructorInfo = {
  firstName: string
  lastName: string
  headline: string
  biography: string
  image: string | ''
  approveTerm: boolean
  country: string
  payment: string
}

interface ILocal {
  instructorInfo: TInstructorInfo
  step: number
}

export interface IInstructorSetUp {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  isHavingValues: boolean
  instructorData: TInstructorInfo
  setInstructorData: React.Dispatch<React.SetStateAction<TInstructorInfo>>
  handleExit: () => void
  setLocalStorageData: React.Dispatch<React.SetStateAction<ILocal | null>>
}

const initState: IInstructorSetUp = {
  step: 1,
  setStep: () => {},
  isHavingValues: false,
  instructorData: {
    firstName: '',
    lastName: '',
    headline: '',
    biography: '',
    image: '',
    approveTerm: false,
    country: '',
    payment: ''
  },
  setInstructorData: () => {},
  handleExit: () => {},
  setLocalStorageData: () => {}
}

export const SetupProfileContext = createContext<IInstructorSetUp>(initState)

export const SetupProfileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorageData, setLocalStorageData] = useLocalStorage<ILocal | null>({
    key: 'instructorData',
    defaultValue: {
      instructorInfo: initState.instructorData,
      step: initState.step
    }
  })

  const [step, setStep] = useState(localStorageData?.step || initState.step)
  const [instructorData, setInstructorData] = useState<TInstructorInfo>(
    localStorageData?.instructorInfo || initState.instructorData
  )

  const navigate = useNavigate()
  const location = useLocation()

  async function handleResetData() {
    setLocalStorageData({
      instructorInfo: initState.instructorData,
      step: initState.step
    })
    setStep(initState.step)
    setInstructorData(initState.instructorData)
  }

  const isHavingValues = useMemo(() => {
    return Object.values(instructorData).some((value) => value)
  }, [instructorData])

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

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
      handleResetData()
    }
  }, [location.pathname])

  return (
    <SetupProfileContext.Provider
      value={{
        step,
        setStep,
        isHavingValues,
        instructorData,
        setInstructorData,
        handleExit,
        setLocalStorageData
      }}
    >
      {children}
    </SetupProfileContext.Provider>
  )
}
