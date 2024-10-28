import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAccessTokenFromLS, getPermissions, getUserFromLS } from '@/utils/auth'
import { Profile } from '@/@types/user.type'
import { APP_PERMISSIONS } from '@/constants/permissions'

// Api call get me
// import { Auth } from '@/services/client'

type TInitialState = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: undefined | Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>
  permissions: string[]
  setPermissions: React.Dispatch<React.SetStateAction<string[]>>
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
    APP_PERMISSIONS.STUDENT.VIEW
  ],
  setPermissions: () => {}
}

export const AppContext = React.createContext<TInitialState>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [permissions, setPermissions] = useState(initialAppContext.permissions)

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
