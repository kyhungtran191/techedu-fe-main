import { CartResponse, TItemAddCart } from '@/@types/cart.type'
import { ResponseData } from '@/@types/response.type'
import { BASE_URL_BASKET } from '@/apis/cart.api'
import instanceAxios from '@/configs/axiosInstance'

export const GetMyCart = async () => {
  return await instanceAxios.get<ResponseData<CartResponse>>(`${BASE_URL_BASKET}`)
}

export const AddItemToCart = async (item: TItemAddCart) => {
  return await instanceAxios.post<null>(`${BASE_URL_BASKET}`, item)
}

export const DeleteCartItem = async (cartId: string, itemId: number) => {
  return instanceAxios.delete(`${BASE_URL_BASKET}/${cartId}/items/${itemId}`)
}
