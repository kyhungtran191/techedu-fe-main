import { ResponseData } from '@/@types/response.type'
import { UserAPI } from '@/apis/user.api'
import instanceAxios from '@/configs/axiosInstance'
import axios from 'axios'

export const ConfirmEmailUser = async (data: { userId: string; token: string }) => {
  const { userId, token } = data
  console.log(userId, token)

  return await axios.get<ResponseData<null>>(
    `${UserAPI.CONFIRM_EMAIL}/${userId}/confirm?Token=${encodeURIComponent(token)}`
  )
}

export const ForgotPasswordUser = async (email: string) => {
  return await axios.post<ResponseData<null>>(`${UserAPI.FORGOT_PASSWORD}`, {
    email
  })
}

export const ResetPasswordUser = async ({
  userId,
  token,
  password,
  confirmPassword
}: {
  userId: string
  token: string
  password: string
  confirmPassword: string
}) => {
  return await axios.put<ResponseData<null>>(
    `${UserAPI.CONFIRM_EMAIL}/${userId}/reset-password?Token=${encodeURIComponent(token)}`,
    { password, confirmPassword }
  )
}

export const CompleteRegister = async (
  userId: string,
  data: { firstName: string; lastName: string; phoneNumber: string }
) => {
  return axios.put(`${UserAPI.CONFIRM_EMAIL}/${userId}/complete-registration`, data)
}

export const ResendEmailUser = async (email: string) => {
  return axios.post(`${UserAPI.RESEND_EMAIL}`, {
    email
  })
}

export const GetMe = async () => instanceAxios.get(UserAPI.ME)

export const ToggleBlockUser = async (userId: string, IsBlocked: boolean) => {
  await instanceAxios.put(`${UserAPI.CONFIRM_EMAIL}/${userId}/block-status`, {
    IsBlocked
  })
}
