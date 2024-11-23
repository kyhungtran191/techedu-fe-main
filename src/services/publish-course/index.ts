import { ResponsePrivateCourseDetail } from '@/@types/admin/courses.type'
import { CourseListConfig, ResponseListCourses, TSection } from '@/@types/course.type'
import { TSectionCurriculum } from '@/@types/instructor/course/curriculumn'
import { PublicCourse } from '@/@types/public-course.type'
import { ResponseData } from '@/@types/response.type'
import { URL } from '@/apis'
import instanceAxios from '@/configs/axiosInstance'
import axios from 'axios'

export const GetPublishSections = async (courseId: string, instructorId: string) => {
  return await instanceAxios.get<ResponseData<TSectionCurriculum[]>>(
    `${URL}courses/${courseId}/instructors/${instructorId}/sections`
  )
}

export const GetFilterCourses = async (params: CourseListConfig) => {
  return await axios.get<ResponseData<ResponseListCourses>>(`${URL}courses`, {
    params
  })
}

export const GetForYouCourses = async () => {
  return await axios.get<ResponseData<PublicCourse[]>>(`${URL}courses/get-courses-for-you`)
}

export const GetPublicDetailCourse = async (courseId: string, instructorId: string) => {
  return await axios.get<ResponseData<ResponsePrivateCourseDetail>>(
    `${URL}courses/${courseId}/instructors/${instructorId}`
  )
}

export const GetSimilarityCourse = async (courseId: string, instructorId: string) => {
  return await axios.get<ResponseData<PublicCourse[]>>(
    `${URL}courses/${courseId}/instructors/${instructorId}/similar-courses`
  )
}

//
