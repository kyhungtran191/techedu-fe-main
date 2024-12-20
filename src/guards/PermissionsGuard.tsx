import { ACLObj, buildAbilityFor } from '@/configs/acl'
import { APP_PERMISSIONS } from '@/constants/permissions'
import { BASIC_ROLE } from '@/constants/role'
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
  // ** Props
  const { children, permissions } = props

  //   check auth User
  const { isAuthenticated, permissions: userPermissions, profile } = useAppContext()

  let ability: any

  if (isAuthenticated && !ability && userPermissions) {
    ability = buildAbilityFor(userPermissions, permissions)
  }

  const aclAbilities: ACLObj = {
    action: 'manage',
    subject: 'all'
  }

  if (profile && profile?.roles?.includes(BASIC_ROLE.DIRECTOR)) {
    return <>{children}</>
  } else if (ability && isAuthenticated && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <>{children}</>
  }
  return <Navigate to={'/401'}></Navigate>
}
export default PermissionsGuard
