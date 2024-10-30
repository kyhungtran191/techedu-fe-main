export type User = {
  email: string
  fullname: string
  id: string
  phoneNumber: string
  roles: string[]
}

export type Role = {
  name: string
  permissions: string[]
}

export type TLogin = {
  email: string
  password: string
}

export type TRegister = {
  email: string
  password: string
  confirmPassword: string
}

export type ResponseLogin = {
  accessToken: string
  refreshToken: string
  refreshTokenExpiryTime: string
}
