import { CATEGORIES } from '@/apis/categories'
import axios from 'axios'

export const GetMainCategories = async () => await axios.get(CATEGORIES)
export const GetSubCategories = async (catId: string) => await axios.get(`${CATEGORIES}/${catId}/subcategories`)
