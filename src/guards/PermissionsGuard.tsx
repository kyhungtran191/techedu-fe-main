import { ACLObj, buildAbilityFor } from '@/configs/acl'
import { APP_PERMISSIONS } from '@/constants/permissions'
import { useAppContext } from '@/hooks/useAppContext'
import Unauthorized from '@/pages/errors/Unauthorized'
import { ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

// ** Types

interface AclGuardProps {
  children: ReactNode
  permissions: string[]
}

const PermissionsGuard = (props: AclGuardProps) => {
  //user app context

  // ** Props
  const { children, permissions } = props

  //   check auth User
  const { isAuthenticated, permissions: userPermissions, profile } = useAppContext()

  let ability: any
  //   const router = useRouter();
  const navigate = useNavigate()
  // manage user permissions
  // const permissionUser = user?.role?.permissions
  //   ? user?.role?.permissions?.includes(PERMISSIONS.BASIC)
  //     ? [PERMISSIONS.DASHBOARD]
  //     : user?.role?.permissions
  //   : []

  if (isAuthenticated && !ability && userPermissions) {
    ability = buildAbilityFor(userPermissions, permissions)
  }

  const aclAbilities: ACLObj = {
    action: 'manage',
    subject: 'all'
  }

  if (profile && profile.roles.includes(BASIC_ROLE.DIRECTOR)) {
    return <>{children}</>
  } else if (ability && isAuthenticated && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <>{children}</>
  }
  return <Navigate to={'/501'}></Navigate>
}
export default PermissionsGuard
