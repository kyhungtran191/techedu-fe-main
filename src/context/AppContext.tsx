import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAccessTokenFromLS, getPermissions, getUserFromLS } from '@/utils/auth'
import { Profile } from '@/@types/user.type'

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
  isAuthenticated: true,
  setIsAuthenticated: () => {},
  profile: getUserFromLS() || undefined,
  setProfile: () => {},
  permissions: getPermissions() || undefined,
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
