import {
  PrivateCourseQueryConfig,
  PrivateCourseQueryParams,
  ResponseListPrivateCourses,
  ResponsePrivateCourseDetail
} from '@/@types/admin/courses.type'
import { ResponseData } from '@/@types/response.type'
import { PRIVATE_COURSE } from '@/apis/admin/course.api'
import instanceAxios from '@/configs/axiosInstance'

export const GetAllPrivateCourses = async (params: PrivateCourseQueryConfig) =>
  await instanceAxios.get<ResponseData<ResponseListPrivateCourses>>(PRIVATE_COURSE.GET_ALL, {
    params
  })

export const GetPrivateDetailCourse = async (courseID: string, userId: string) =>
  await instanceAxios.get<ResponseData<ResponsePrivateCourseDetail>>(`${PRIVATE_COURSE.GET_ALL}/${courseID}/${userId}`)

export const ApproveCourse = async (courseId: string, userId: string) => {
  return await instanceAxios.post(`${PRIVATE_COURSE.COURSE_PRIVATE}/${courseId}/approve`, {
    userId
  })
}
export const RejectCourse = async (courseId: string, data: { userId: string; reason: string }) => {
  return await instanceAxios.post(`${PRIVATE_COURSE.COURSE_PRIVATE}/${courseId}/reject`, data)
}
