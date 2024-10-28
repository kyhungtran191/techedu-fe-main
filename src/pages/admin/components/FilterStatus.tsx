import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'

type TProps = {
  queryConfig: any
  className?: string
  path: string
}

export default function FilterStatus({ queryConfig, className, path }: TProps) {
  const navigate = useNavigate()

  const handleFilterStatus = (value: string) => {
    if (value != 'all') {
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...queryConfig,
          page: 1,
          status: value
        }).toString()
      })
    } else {
      const updatedQuery = omit(queryConfig, ['status'])
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...updatedQuery
        }).toString()
      })
    }
  }

  return (
    <Select defaultValue={queryConfig.status} onValueChange={handleFilterStatus}>
      <SelectTrigger className='font-medium rounded-lg outline-none text-neutral-black'>
        <SelectValue placeholder='Filter Status' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All Status</SelectItem> {/* Default option */}
        <SelectItem value='active'>Active</SelectItem>
        <SelectItem value='inactive'>Inactive</SelectItem>
        <SelectItem value='blocked'>Block</SelectItem>
      </SelectContent>
    </Select>
  )
}
