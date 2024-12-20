import { TAddUpdateCourseMessage } from '@/@types/instructor/course/course-message'
import { ResponseData } from '@/@types/response.type'
import { COURSE_CURRICULUM_BASE_URL } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'

export const UpdateCourseMessage = async (courseId: string, data: TAddUpdateCourseMessage) =>
  await instanceAxios.put(`${COURSE_CURRICULUM_BASE_URL}${courseId}/course-messages`, data)

export const GetCourseMessage = async (courseId: string) =>
  await instanceAxios.get<ResponseData<TAddUpdateCourseMessage>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/course-messages`
  )
