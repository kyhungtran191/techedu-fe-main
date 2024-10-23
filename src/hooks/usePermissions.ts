import { useEffect, useState } from 'react'
import { useAppContext } from './useAppContext'
import { APP_PERMISSIONS } from '@/constants/permissions'

type TActions = 'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE'

export const usePermission = (key: string, actions: TActions[]) => {
  const { profile, permissions } = useAppContext()

  const defaultValues = {
    VIEW: false,
    CREATE: false,
    UPDATE: false,
    DELETE: false
  }

  const getObjectValue = (obj: any, key: string) => {
    const keys = key?.split('.')
    console.log(keys)
    let result = obj
    if (keys && !!key.length) {
      for (const k of keys) {
        console.log(k, k in result)
        if (k in result) {
          result = result[k]
          console.log('result', result)
        } else {
          return undefined
        }
      }
    }
    return result
  }

  const userPermission = permissions

  const [permission, setPermission] = useState(defaultValues)

  useEffect(() => {
    const mapPermission = getObjectValue(APP_PERMISSIONS, key)

    console.log(mapPermission)

    actions.forEach((mode) => {
      if (userPermission?.includes(APP_PERMISSIONS?.ADMIN)) {
        defaultValues[mode] = true
      } else if (userPermission?.includes(mapPermission[mode])) {
        defaultValues[mode] = true
      } else {
        defaultValues[mode] = false
      }
    })
    setPermission(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions])

  return permission
}