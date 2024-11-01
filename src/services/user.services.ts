import { ResponseData } from '@/@types/response.type'
import { UserAPI } from '@/apis/user.api'
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
