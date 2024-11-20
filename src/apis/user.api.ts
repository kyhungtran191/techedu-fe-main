import { URL } from '.'

export const BASE_URL = `${URL}users`

export const UserAPI = {
  ME: `${BASE_URL}/me`,
  CONFIRM_EMAIL: `${BASE_URL}/accounts`,
  FORGOT_PASSWORD: `${BASE_URL}/accounts/forgot-password`,
  RESEND_EMAIL: `${BASE_URL}/resend-email`,
  UPLOAD_PROFILE_AVATAR: `${BASE_URL}/accounts/profile/image`
}
