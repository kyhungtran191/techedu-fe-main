import {
  PrivateUserQueryConfig,
  ResponseListPrivateUsers,
  TPrivateUser,
  TPrivateUserAdd,
  TPrivateUserUpdate
} from '@/@types/admin/private-user.type'
import { ResponseData } from '@/@types/response.type'
import { PRIVATE_USER_API } from '@/apis/admin/private-users.api'
import instanceAxios from '@/configs/axiosInstance'
import axios from 'axios'

export const GetAllPrivateUsers = async (params: PrivateUserQueryConfig) =>
  await instanceAxios.get<ResponseData<ResponseListPrivateUsers>>(PRIVATE_USER_API.GET_ALL, {
    params
  })

export const GetDetailPrivateUser = async (userId: string) =>
  await instanceAxios.get<ResponseData<TPrivateUser>>(`${PRIVATE_USER_API.GET_ALL}/${userId}`)

export const AddNewPrivateUser = async (data: TPrivateUserAdd) =>
  await instanceAxios.post(`${PRIVATE_USER_API.GET_ALL}`, data)

export const UpdatePrivateUser = async (data: TPrivateUserUpdate) => {
  return await instanceAxios.put(`${PRIVATE_USER_API.GET_ALL}`, data)
}

export const ResendMail = async (email: string) => {
  return await instanceAxios.post(`${PRIVATE_USER_API.GET_ALL}/resend-email`, {
    email
  })
}

export const ActivePrivateUser = async (userId: string, data: { password: string; confirmPassword: string }) =>
  await axios.put(`${PRIVATE_USER_API.GET_ALL}/accounts/${userId}/reset-password`, data)

// export const UpdateRolePermission = async (roleId: string, permissions: RolePermission[]) => {
//   await instanceAxios.put(`${ROLE_API.GET_ALL}/${roleId}/permissions`, permissions)
// }
