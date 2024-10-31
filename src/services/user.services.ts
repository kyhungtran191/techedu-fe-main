import { ResponseData } from '@/@types/response.type'
import { UserAPI } from '@/apis/user.api'
import axios from 'axios'

export const ConfirmEmailUser = async (data: { userId: string; token: string }) => {
  const { userId, token } = data
  return await axios.get<ResponseData<null>>(`${UserAPI.CONFIRM_EMAIL}/${userId}/confirm?Token=${token}`)
}
