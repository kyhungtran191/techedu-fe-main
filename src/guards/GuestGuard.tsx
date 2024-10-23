import { useAppContext } from '@/hooks/useAppContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuestGuard() {
  const { isAuthenticated } = useAppContext()
  return !isAuthenticated ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
}
