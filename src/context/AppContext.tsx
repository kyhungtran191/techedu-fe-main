import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  clearLS,
  getAccessTokenFromLS,
  getPermissions,
  getUserFromLS,
  savePermissions,
  saveUserToLS
} from '@/utils/auth'
import { Profile } from '@/@types/user.type'
import { APP_PERMISSIONS } from '@/constants/permissions'
import { User } from '@/@types/auth.type'
import { GetMe } from '@/services/user.services'
import { Role } from '@/@types/admin/role.type'
import { toast } from 'react-toastify'

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
  isAuthenticated: Boolean(getAccessTokenFromLS()),
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
  const [permissions, setPermissions] = useState(initialAppContext.permissions || undefined)

  // const { isLoading, data } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: Auth.profile,
  //   enabled: !!isAuthenticated
  // })
  const accessToken = getAccessTokenFromLS()
  const { data } = useQuery({
    queryKey: ['me', isAuthenticated],
    queryFn: GetMe,
    select: (data) => data?.data?.value,
    enabled: isAuthenticated && Boolean(accessToken),
    onSuccess: (data) => {
      if (data) {
        const { email, firstName, lastName, avatar, roles, permissions, userId } = data
        saveUserToLS({
          email,
          fullname: `${firstName} ${lastName}`,
          id: userId,
          phoneNumber: '',
          roles: roles.map((item: Role) => item.name)
        })
        savePermissions(permissions)
        setProfile({
          email,
          fullname: `${firstName} ${lastName}`,
          id: userId,
          phoneNumber: '',
          roles: roles.map((item: Role) => item.name)
        })
        setPermissions(permissions)
      }
    },
    onError: (err) => {
      setIsAuthenticated(false)
      setProfile(undefined)
      setPermissions(undefined)
      clearLS()
      toast.error('Error when fetch me')
    }
  })

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
