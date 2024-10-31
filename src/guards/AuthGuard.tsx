import { useAppContext } from '@/hooks/useAppContext'
import React from 'react'
import { Navigate, Outlet, useNavigation } from 'react-router-dom'

export default function AuthGuard() {
  const { isAuthenticated } = useAppContext()


  return isAuthenticated ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>
}
