import { useAppContext } from '@/hooks/useAppContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminGuard() {
  const { isAuthenticated, profile } = useAppContext()

  return isAuthenticated && profile?.roles && !profile?.roles?.includes('Clients') ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to='*'></Navigate>
  )
}
