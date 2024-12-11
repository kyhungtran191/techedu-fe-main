import { useAppContext } from '@/hooks/useAppContext'
import React, { useContext } from 'react'
import GlobalLoading from '../Loading'

const AppLoading = () => {
  const { isLoading } = useAppContext()

  if (!isLoading) return null

  return <GlobalLoading></GlobalLoading>
}

export default AppLoading
