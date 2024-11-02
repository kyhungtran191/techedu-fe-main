import { URL } from '.'

export const BASE_URL = `${URL}auth`

export const AUTH_API = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${URL}users/register`,

  LOGOUT: `${BASE_URL}/logout`,
  REFRESH_TOKEN: `${URL}tokens/refresh`,
  ME: ''
}
