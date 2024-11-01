import { URL } from '.'

export const BASE_URL = `${URL}users`

export const UserAPI = {
  CONFIRM_EMAIL: `${BASE_URL}/accounts`,
  FORGOT_PASSWORD: `${BASE_URL}/accounts/forgot-password`
}
