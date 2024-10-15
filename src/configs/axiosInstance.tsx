import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshToken,
  saveAccessTokenToLS,
  saveRefreshTokenToLS,
  clearPermissions
} from '@/utils/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/hooks/useAppContext'
import { useQueryClient } from '@tanstack/react-query'
import { URL } from '@/apis/index'
import { refreshTokenAPI } from '@/apis/auth.api'

const instanceAxios = axios.create({
  baseURL: URL
})

let isRefreshing = false
let refreshQueue: any[] = []

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const { setProfile, setIsAuthenticated } = useAppContext()
  const queryClient = useQueryClient()
  instanceAxios.interceptors.request.use(async function (config) {
    const accessToken = getAccessTokenFromLS()
    const refreshToken = getRefreshToken()
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      if ((decoded.exp as number) > Date.now() / 1000) {
        config.headers.authorization = ` Bearer ${accessToken}`
        return config
      } else {
        if (refreshToken) {
          if (!isRefreshing) {
            isRefreshing = true
            await axios
              .post(refreshTokenAPI, { accessToken, refreshToken })
              .then((res) => {
                if (res && res?.data?.responseData) {
                  const responseData = res?.data?.responseData
                  if (responseData) {
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = responseData

                    if (newRefreshToken) {
                      saveRefreshTokenToLS(newRefreshToken)
                    }

                    if (newAccessToken) {
                      config.headers.authorization = `Bearer ${newAccessToken}`
                      saveAccessTokenToLS(newAccessToken)
                      refreshQueue.forEach((cb) => cb(newAccessToken))
                      refreshQueue = []
                      isRefreshing = false // Check false
                    } else {
                      toast.error('Dont have access token and refresh token')
                    }
                  }
                }
                return config
              })
              .catch((error) => {
                toast.error('Refresh Token Timeout!')
                clearLS()
                setProfile(undefined)
                setIsAuthenticated(false)
                queryClient.clear()
                return navigate('/login')
              })
          } else {
            return new Promise<any>((resolve) => {
              refreshQueue.push((newAccessToken: string) => {
                if (config && config.headers) {
                  config.headers.authorization = `Bearer ${newAccessToken}`
                  return resolve(config)
                }
              })
            })
          }
        } else {
          clearLS()
          setProfile(undefined)
          setIsAuthenticated(false)
          queryClient.clear()
          return navigate('/login')
        }
      }
    }
    return config
  })
  instanceAxios.interceptors.response.use((response) => {
    return response
  })
  return <>{children}</>
}

// eslint-disable-next-line react-refresh/only-export-components
export default instanceAxios
export { AxiosInterceptor }
