import { ResponseLogin, TLogin, TRegister, User } from '@/@types/auth.type'
import { ResponseData } from '@/@types/response.type'
import { MyCourse } from '@/@types/user.type'
import { URL } from '@/apis'
import { AUTH_API } from '@/apis/auth.api'
import instanceAxios from '@/configs/axiosInstance'
import axios from 'axios'

export const login = async (data: TLogin) => await axios.post<ResponseData<ResponseLogin>>(AUTH_API.LOGIN, data)

export const register = async (data: TRegister) => {
  return await axios.post<ResponseData<null>>(AUTH_API.REGISTER, data)
}

export const getMe = async () => {
  return await instanceAxios.get<ResponseData<User>>(AUTH_API.ME)
}

export const updateMe = async (body: { firstName: string; lastName: string; headline: string; bio: string }) => {
  return await instanceAxios.put<ResponseData<User>>(AUTH_API.ME, body)
}

export const getMyCourse = async () => {
  return await instanceAxios.get<ResponseData<MyCourse[]>>(`${URL}courses/me/enrolled-courses`)
}

export const logout = async () => await instanceAxios.post<ResponseData<null>>(AUTH_API.LOGOUT)
