import { ResponseListRole, RoleParams, RolePermission, RoleUpdateParams } from '@/@types/admin/role.type'
import { ResponseData } from '@/@types/response.type'
import { ROLE_API } from '@/apis/admin/role.api'
import instanceAxios from '@/configs/axiosInstance'

export const GetAllRoles = async (params: { searchTerm?: string; pageIndex?: string }) =>
  await instanceAxios.get<ResponseData<ResponseListRole>>(ROLE_API.GET_ALL, {
    params
  })

export const GetDetailRole = async (roleId: string) => await instanceAxios.get(`${ROLE_API.GET_ALL}/${roleId}`)

export const AddNewRole = async (roleData: RoleParams) =>
  await instanceAxios.post(`${ROLE_API.GET_ALL}`, { ...roleData })

export const UpdateRole = async (roleData: RoleParams) => {
  return await instanceAxios.put(`${ROLE_API.GET_ALL}`, { ...roleData })
}

export const GetRolePermission = async (roleId: string) =>
  await instanceAxios.get(`${ROLE_API.GET_ALL}/${roleId}/permissions`)

export const UpdateRolePermission = async (roleId: string, permissions: RolePermission[]) => {
  await instanceAxios.put(`${ROLE_API.GET_ALL}/${roleId}/permissions`, permissions)
}
