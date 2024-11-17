import { TAddUpdateCourseMessage } from '@/@types/instructor/course/course-message'
import { COURSE_CURRICULUM_BASE_URL } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'

export const UpdateCourseLandingPage = async (courseId: string, data: TAddUpdateCourseMessage) =>
  await instanceAxios.put(`${COURSE_CURRICULUM_BASE_URL}${courseId}/course-landing-page`, data)

export const GetCourseLandingPage = async (courseId: string) =>
  await instanceAxios.get(`${COURSE_CURRICULUM_BASE_URL}${courseId}/course-landing-page`)
