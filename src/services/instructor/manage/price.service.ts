import { ResponseData } from '@/@types/response.type'
import { COURSE_API } from '@/apis/course/draft.api'
import instanceAxios from '@/configs/axiosInstance'

export const UpdatePrice = async (courseId: string, data: { amount: number; currency: string }) => {
  return await instanceAxios.put<ResponseData<null>>(`${COURSE_API.COURSE}${courseId}/prices`, data)
}

export const GetCoursePrice = async (courseId: string) => {
  return await instanceAxios.get<ResponseData<{ amount: number; currency: string }>>(
    `${COURSE_API.COURSE}${courseId}/prices`
  )
}
