import { Input } from '@/components/ui/input'
import { debounce, omit } from 'lodash'
import { Search } from 'lucide-react'
import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

type IProps = {
  queryConfig: any
  path: string
  placeholder: string
}

export default function SearchInput({ queryConfig, path, placeholder }: IProps) {
  const navigate = useNavigate()

  const onSearchChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    if (searchValue) {
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...queryConfig,
          page: 1,
          search: searchValue
        }).toString()
      })
    } else {
      const updatedQuery = omit(queryConfig, ['search'])
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...updatedQuery
        }).toString()
      })
    }
  }, 300)

  return (
    <div className='py-1 px-2 bg-white rounded-xl flex items-center gap-x-[10px] flex-1 max-w[50vw] border '>
      <Search className='flex-shrink-0 w-4 h-4'></Search>
      <Input
        className='px-0 py-0 text-sm bg-transparent border-none outline-none md:text-base '
        placeholder={placeholder}
        defaultValue={queryConfig?.search}
        onChange={onSearchChange}
      ></Input>
    </div>
  )
}
