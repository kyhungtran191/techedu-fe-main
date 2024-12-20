import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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
import { getMyCourse } from '@/services/auth.services'

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
  enrolledListCourse:string[],
  setEnrolledListCourse:  React.Dispatch<React.SetStateAction<string[]>>
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
  isLoading: false,
  enrolledListCourse: [],
  setEnrolledListCourse: ()=>{}
}

export const AppContext = React.createContext<TInitialState>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [permissions, setPermissions] = useState(initialAppContext.permissions || undefined)
  const [cart, setCart] = useState<CartResponse | undefined>(initialAppContext.cart || undefined)
  const accessToken = getAccessTokenFromLS()
  const [enrolledListCourse, setEnrolledListCourse] = useState<string[]>([]) 
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
      toast.error('Error when get cart ')
    }
  })


  const { data: enrolledCourse, isLoading: enrolledLoading } = useQuery({
    queryKey: ['my-enrolled-courses', isAuthenticated],
    queryFn: getMyCourse,
    select: (data) => data?.data?.value,
    enabled: isAuthenticated && Boolean(accessToken),
    onSuccess: (data) => {
      if (data) {
        let newListArr = data.map((item)=>item.courseId)
        setEnrolledListCourse(newListArr)
      }
    },
    onError: (err) => {
      toast.error('Error when get enrolled course ')
    }
  })

  // App Context Global Loading
  const isLoading = isAuthenticated && (cartLoading || fetchMeLoading || enrolledLoading)

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
        enrolledListCourse,
        setEnrolledListCourse,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
