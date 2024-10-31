import { Role } from './role.type'

export type TPrivateUser = {
  userId: string
  firstName: string
  lastName: string
  email: string
  avatar: null | string
  bio: null | string
  userStatus: string
  createdDateTime: string
  updatedDateTime: null | string
  roles: Role[]
}

export type TPrivateUserAdd = {
  firstName: string
  lastName: string
  email: string
  roleId: string
}

export type TPrivateUserUpdate = Omit<TPrivateUserAdd, 'email'> & {
  password: string
  userId: string
}

export type ResponseListPrivateUsers = {
  items: TPrivateUser[]
  pageIndex: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPage: number
}

export type PrivateUserQueryParams = {
  roles?: string
  userStatus?: 'inactive' | 'active'
  searchTerm?: string
  pageIndex?: string
  pageSize?: string
}

export type PrivateUserQueryConfig = {
  [key in keyof PrivateUserQueryParams]: string
}
