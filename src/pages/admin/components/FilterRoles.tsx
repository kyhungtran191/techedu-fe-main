import { Role } from '@/@types/admin/role.type'
import { MultiSelect, OptionType, SelectedType } from '@/components/MultiSelect'
import { useGetListRoles } from '@/queries/role'
import { divide, omit } from 'lodash'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

type TProps = {
  queryConfig: any
  className?: string
  path: string
  clientOption?: boolean
}

export default function FilterRole({ queryConfig, className, path, clientOption = true }: TProps) {
  const navigate = useNavigate()
  const [roleSelected, setRoleSelected] = useState<SelectedType[] | []>(() => {
    return queryConfig?.roles
      ? queryConfig?.roles.split(',').map((item: string) => ({
          label: String(item[0]).toUpperCase() + String(item).slice(1),
          value: item
        }))
      : []
  })

  const [options, setOptions] = useState<OptionType[]>([])

  const { isLoading, isFetching } = useGetListRoles(
    {},
    {
      select: (data) => data.data.value.items,
      onSuccess: (data: Role[]) => {
        const newArr = data.map((item) => {
          return {
            label: item.displayName,
            value: item.name
          }
        })
        setOptions(clientOption ? newArr : newArr.filter((item) => item.value != 'client'))
      }
    }
  )
  useEffect(() => {
    const parseMultiValue = roleSelected.length > 0 ? roleSelected.map((item) => item.value).join(',') : ''
    if (parseMultiValue) {
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...queryConfig,
          pageIndex: 1,
          roles: parseMultiValue
        }).toString()
      })
    } else {
      const updatedQuery = omit(queryConfig, ['roles'])
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...updatedQuery
        }).toString()
      })
    }
  }, [roleSelected])

  return (
    <MultiSelect
      options={options}
      onChange={setRoleSelected}
      selected={roleSelected}
      name='Role'
      classNameWrapper={`${isLoading && isFetching && 'cursor-not-allowed bg-white/40'}${className}`}
    ></MultiSelect>
  )
}
