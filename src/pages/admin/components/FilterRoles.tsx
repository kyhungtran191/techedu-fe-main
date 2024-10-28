import { MultiSelect, OptionType, SelectedType } from '@/components/MultiSelect'
import { omit } from 'lodash'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

type TProps = {
  queryConfig: any
  className?: string
  path: string
}
const options: OptionType[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  {
    label: 'Client',
    value: 'client'
  }
]
export default function FilterRole({ queryConfig, className, path }: TProps) {
  const navigate = useNavigate()
  const [roleSelected, setRoleSelected] = useState<SelectedType[] | []>(() => {
    return queryConfig?.roles
      ? queryConfig?.roles.split(',').map((item: string) => ({
          label: String(item[0]).toUpperCase() + String(item).slice(1),
          value: item
        }))
      : []
  })
  useEffect(() => {
    const parseMultiValue = roleSelected.length > 0 ? roleSelected.map((item) => item.value).join(',') : ''
    if (parseMultiValue) {
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...queryConfig,
          page: 1,
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
      classNameWrapper={className}
    ></MultiSelect>
  )
}
