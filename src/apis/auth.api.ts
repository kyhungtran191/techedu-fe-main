import { URL } from '.'

export const BASE_URL = `${URL}/auth`

export const AUTH_API = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: '',
  LOGOUT: '',
  REFRESH_TOKEN: `${BASE_URL}/refresh-token`,
  ME: ''
}
