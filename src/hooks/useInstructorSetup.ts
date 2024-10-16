import { IInstructorSetUp, SetupProfileContext } from '@/context/SetupProfileContext'
import { useContext } from 'react'

const useInstructorSetup = () => {
  const context: IInstructorSetUp = useContext(SetupProfileContext)
  if (typeof context === 'undefined') throw new Error('Wrap the Provider in side')
  return context
}

export default useInstructorSetup
