import { CATEGORIES } from '@/apis/categories'
import axios from 'axios'

export const GetMainCategories = async () => await axios.get(CATEGORIES)
