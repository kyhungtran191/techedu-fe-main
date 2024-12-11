import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  clearLS,
  getAccessTokenFromLS,
  getCartFromLS,
  getPermissions,
  getUserFromLS,
  saveCartToLocalStorage,
  savePermissions,
  saveUserToLS
} from '@/utils/auth'

import { User } from '@/@types/auth.type'
import { GetMe } from '@/services/user.services'
import { Role } from '@/@types/admin/role.type'
import { toast } from 'react-toastify'
import { CartResponse } from '@/@types/cart.type'
import { GetMyCart } from '@/services/client/cart.service'

// Api call get me
// import { Auth } from '@/services/client'

type TInitialState = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: undefined | User
  setProfile: React.Dispatch<React.SetStateAction<User | undefined>>
  permissions: string[] | undefined
  setPermissions: React.Dispatch<React.SetStateAction<string[] | undefined>>
  cart: CartResponse | undefined
  setCart: React.Dispatch<React.SetStateAction<CartResponse | undefined>>
  isLoading: boolean
}

const initialAppContext: TInitialState = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
  profile: getUserFromLS() || undefined,
  setProfile: () => {},
  permissions: getPermissions() || undefined,
  setPermissions: () => {},
  cart: getCartFromLS() || undefined,
  setCart: () => {},
  isLoading: false
}

export const AppContext = React.createContext<TInitialState>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [permissions, setPermissions] = useState(initialAppContext.permissions || undefined)
  const [cart, setCart] = useState<CartResponse | undefined>(initialAppContext.cart || undefined)
  const accessToken = getAccessTokenFromLS()
  const { data, isLoading: fetchMeLoading } = useQuery({
    queryKey: ['me', isAuthenticated],
    queryFn: GetMe,
    select: (data) => data?.data?.value,
    enabled: isAuthenticated && Boolean(accessToken),
    onSuccess: (data) => {
      if (data) {
        const {
          email,
          firstName,
          lastName,
          avatar,
          roles,
          permisisons,
          userId,
          userStatus,
          phoneNumber,
          bio,
          headline
        } = data
        saveUserToLS({
          email,
          firstName,
          lastName,
          avatar,
          userStatus,
          bio,
          headline,
          userId,
          phoneNumber,
          roles: roles.map((item: Role) => item.name)
        })
        const permissionConvert = permisisons.map((item: any) => `${item.function}.${item.command}`)
        savePermissions(permissionConvert)
        setProfile({
          email,
          firstName,
          lastName,
          avatar,
          userStatus,
          bio,
          headline,
          userId,
          phoneNumber,
          roles: roles.map((item: Role) => item.name)
        })
        setPermissions(permissionConvert)
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

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ['my-cart', isAuthenticated],
    queryFn: GetMyCart,
    select: (data) => data?.data?.value,
    enabled: isAuthenticated && Boolean(accessToken),
    onSuccess: (data) => {
      if (data) {
        saveCartToLocalStorage(data)
        setCart(data)
      }
    },
    onError: (err) => {
      toast.error('Error when getCart me')
    }
  })

  const isLoading = cartLoading || fetchMeLoading
  // GetMyCart
  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        permissions,
        setCart,
        cart,
        setPermissions,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
