import { AppContext } from '@/context/AppContext'
import { useContext } from 'react'

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (typeof context === 'undefined') throw new Error('Please Wrap App Context Provider outside off App Context')
  return context
}
