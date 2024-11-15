import { GetMainCategories } from '@/services/categories'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetListCategories = (options?: Omit<UseQueryOptions<any, unknown, any>, 'queryKey' | 'queryFn'>) => {
  return useQuery(['categories'], GetMainCategories, options)
}
