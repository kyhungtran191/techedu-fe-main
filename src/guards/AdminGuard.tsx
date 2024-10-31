import { BASIC_ROLE } from '@/constants/role'
import { useAppContext } from '@/hooks/useAppContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminGuard() {
  const { isAuthenticated, profile } = useAppContext()
  return isAuthenticated && profile?.roles && !profile?.roles?.includes(BASIC_ROLE.CLIENT) ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to='*'></Navigate>
  )
}
