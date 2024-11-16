import { SectionOrderItem } from '@/@types/instructor/course/curriculumn'
import { ResponseData } from '@/@types/response.type'
import { UpdateOrderSection } from '@/services/instructor/manage/curriculumn.service'
import { ToggleBlockUser } from '@/services/user.services'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

interface HandleOrderSectionItem {
  courseId: string
  sectionsItem: SectionOrderItem[]
}

export const useHandleOrderSectionItemMutation = (
  refetchData?: () => void,
  options: UseMutationOptions<
    AxiosResponse<ResponseData<null>>,
    Error,
    { courseId: string; sectionItems: SectionOrderItem[] }
  > = {}
) => {
  return useMutation(
    ({ courseId, sectionItems }: { courseId: string; sectionItems: SectionOrderItem[] }) =>
      UpdateOrderSection(courseId, sectionItems),
    {
      ...options
    }
  )
}
