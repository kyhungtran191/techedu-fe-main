import { RoleParams } from '@/@types/admin/role.type'
import { GetAllRoles } from '@/services/admin/role.service'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetListRoles = (
  params: { searchTerm?: string; pageIndex?: string },
  options?: Omit<UseQueryOptions<any, unknown, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery(['roles', params], () => GetAllRoles(params), options)
}
