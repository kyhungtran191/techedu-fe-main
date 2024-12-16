import { URL } from '@/apis'
import { BASE_URL_BASKET } from '@/apis/cart.api'
import instanceAxios from '@/configs/axiosInstance'

export const checkoutBasket = async (basketId: string) => {
  return await instanceAxios.post(`${BASE_URL_BASKET}/${basketId}/checkout`)
}

export const getOrderTranStatusById = async (orderId: string, transactionId: string) => {
  return await instanceAxios.get(`${URL}orders`, {
    params: {
      orderId,
      transactionId
    }
  })
}

export const getPaymentStatusById = async (orderId: string, transactionId: string) => {
  return await instanceAxios.get(`${URL}payments/complete-checkout`, {
    params: {
      orderId,
      transactionId
    }
  })
}
