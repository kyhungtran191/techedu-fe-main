import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAccessTokenFromLS, getPermissions, getUserFromLS } from '@/utils/auth'
import { Profile } from '@/@types/user.type'
import { APP_PERMISSIONS } from '@/constants/permissions'
import { User } from '@/@types/auth.type'

// Api call get me
// import { Auth } from '@/services/client'

type TInitialState = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: undefined | User
  setProfile: React.Dispatch<React.SetStateAction<User | undefined>>
  permissions: string[] | undefined
  setPermissions: React.Dispatch<React.SetStateAction<string[] | undefined>>
}

const initialAppContext: TInitialState = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  profile: getUserFromLS() || undefined,
  setProfile: () => {},
  permissions: getPermissions() || [
    APP_PERMISSIONS.DASHBOARD.VIEW,
    APP_PERMISSIONS.CATEGORY.VIEW,
    APP_PERMISSIONS.CATEGORY.CREATE,
    APP_PERMISSIONS.COURSES.VIEW,
    APP_PERMISSIONS.ACCOUNTS.VIEW,
    APP_PERMISSIONS.INSTRUCTORS.VIEW,
    APP_PERMISSIONS.PRIVATE_USER.VIEW,
    APP_PERMISSIONS.PRIVATE_USER.CREATE,
    APP_PERMISSIONS.PRIVATE_USER.UPDATE,
    APP_PERMISSIONS.ROLE.VIEW,
    APP_PERMISSIONS.ROLE.CREATE,
    APP_PERMISSIONS.ROLE.UPDATE,
    APP_PERMISSIONS.STUDENT.VIEW
  ],
  setPermissions: () => {}
}

export const AppContext = React.createContext<TInitialState>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [permissions, setPermissions] = useState(initialAppContext.permissions || undefined)

  // const { isLoading, data } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: Auth.profile,
  //   enabled: !!isAuthenticated
  // })

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        permissions,
        setPermissions
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
