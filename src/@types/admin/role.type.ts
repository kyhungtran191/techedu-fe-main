export type Role = {
  roleId: string
  name: string
  displayName: string
  roleStatus: string
  description: string
  createdDateTime: string
  updatedDateTime: null | string
}

export type ResponseListRole = {
  items: Role[]
  pageIndex: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type RoleParams = Pick<Role, 'displayName' | 'name' | 'description'>

export type RoleUpdateParams = Partial<Omit<RoleParams, 'name'>>

export type RolePermission = {
  selected: boolean
  function: string
  command: string
}

export type ResponsePermission = {
  roleId: string
  permissionsSelected: RolePermission[]
  permissionsUnSelected: RolePermission[]
}
