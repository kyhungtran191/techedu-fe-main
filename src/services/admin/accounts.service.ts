import { PrivateUserQueryConfig, ResponseListPrivateUsers, TPrivateUser } from '@/@types/admin/private-user.type'
import { ResponseData } from '@/@types/response.type'
import { ACCOUNT_API } from '@/apis/admin/account.api'
import instanceAxios from '@/configs/axiosInstance'

export const GetAllAccounts = async (params: PrivateUserQueryConfig) =>
  await instanceAxios.get<ResponseData<ResponseListPrivateUsers>>(ACCOUNT_API.GET_ALL, {
    params
  })

export const GetDetailAccount = async (userId: string) =>
  await instanceAxios.get<ResponseData<TPrivateUser>>(`${ACCOUNT_API.GET_ALL}/${userId}`)
