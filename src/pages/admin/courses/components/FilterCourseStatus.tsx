import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { COURSE_STATUS } from '@/constants/course'

type TProps = {
  queryConfig: any
  className?: string
  path: string
}

export default function FilterCourseStatus({ queryConfig, className, path }: TProps) {
  const navigate = useNavigate()

  const handleFilterStatus = (value: string) => {
    if (value != 'all') {
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...queryConfig,
          pageIndex: 1,
          courseStatus: value
        }).toString()
      })
    } else {
      const updatedQuery = omit(queryConfig, ['courseStatus'])
      return navigate({
        pathname: path,
        search: createSearchParams({
          ...updatedQuery
        }).toString()
      })
    }
  }

  return (
    <Select defaultValue={queryConfig.courseStatus} onValueChange={handleFilterStatus}>
      <SelectTrigger className='font-medium rounded-lg outline-none text-neutral-black'>
        <SelectValue placeholder='Filter Status' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All Status</SelectItem> {/* Default option */}
        <SelectItem value={COURSE_STATUS.DRAFT}>Draft</SelectItem>
        <SelectItem value={COURSE_STATUS.PUBLISH}>Publish</SelectItem>
        <SelectItem value={COURSE_STATUS.REJECT}>Reject</SelectItem>
        <SelectItem value={COURSE_STATUS.REVIEW}>Reviewing</SelectItem>
      </SelectContent>
    </Select>
  )
}
