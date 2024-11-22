import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { COURSE_LEVEL, COURSE_STATUS } from '@/constants/course'

type TProps = {
  queryConfig: any
  className?: string
  path: string
}

export default function FilterCourseLevel({ queryConfig, className, path }: TProps) {
  const navigate = useNavigate()

  const handleFilterStatus = (value: string) => {
    if (value != 'all') {
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...queryConfig,
          pageIndex: 1,
          level: value
        }).toString()
      })
    } else {
      const updatedQuery = omit(queryConfig, ['level'])
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...updatedQuery
        }).toString()
      })
    }
  }

  return (
    <Select defaultValue={queryConfig.level} onValueChange={handleFilterStatus}>
      <SelectTrigger className='font-medium rounded-lg outline-none text-neutral-black'>
        <SelectValue placeholder='Filter Course Level' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All Status</SelectItem> {/* Default option */}
        <SelectItem value={COURSE_LEVEL.BEGINNER}>Beginner</SelectItem>
        <SelectItem value={COURSE_LEVEL.IMMEDIATELY}>Immediately</SelectItem>
        <SelectItem value={COURSE_LEVEL.SENIOR}>Senior</SelectItem>
        <SelectItem value={COURSE_LEVEL.EXPERT}>Expert</SelectItem>
      </SelectContent>
    </Select>
  )
}
