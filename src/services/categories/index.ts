import { CategoryAll } from '@/@types/category.type'
import { ResponseData } from '@/@types/response.type'
import { URL } from '@/apis'
import { CATEGORIES } from '@/apis/categories'
import axios from 'axios'

export const GetMainCategories = async () => await axios.get(CATEGORIES)
export const GetSubCategories = async (catId: string) => await axios.get(`${CATEGORIES}/${catId}/subcategories`)
export const GetTopics = async () =>
  await axios.get<
    ResponseData<
      {
        name: string
      }[]
    >
  >(`${URL}/topics`)

export const GetCategoriesWithSubCategories = async () =>
  await axios.get<ResponseData<CategoryAll[]>>(`${CATEGORIES}/all`)
