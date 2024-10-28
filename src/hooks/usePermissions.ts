import { useEffect, useState } from 'react'
import { useAppContext } from './useAppContext'
import { APP_PERMISSIONS } from '@/constants/permissions'

type TActions = 'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE'

export const usePermission = (key: string, actions: TActions[]) => {
  const { profile, permissions: userPermission } = useAppContext()

  const defaultValues = {
    VIEW: false,
    CREATE: false,
    UPDATE: false,
    DELETE: false
  }

  const getObjectValue = (obj: any, key: string) => {
    const keys = key?.split('.')
    let result = obj
    if (keys && key.length > 0) {
      for (const k of keys) {
        if (k in result) {
          result = result[k]
        } else {
          return undefined
        }
      }
    }
    return result
  }

  const [permission, setPermission] = useState(defaultValues)

  useEffect(() => {
    const mapPermission = getObjectValue(APP_PERMISSIONS, key)
    const updatedPermissions = { ...defaultValues }

    actions.forEach((mode) => {
      if (userPermission?.includes(APP_PERMISSIONS.ADMIN)) {
        updatedPermissions[mode] = true
      } else if (mapPermission && userPermission?.includes(mapPermission[mode])) {
        updatedPermissions[mode] = true
      } else {
        updatedPermissions[mode] = false
      }
    })

    setPermission(updatedPermissions)
  }, [userPermission])

  return permission
}
