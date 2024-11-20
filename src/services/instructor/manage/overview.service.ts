import { ResponseOverviewCourse, TAddUpdateOverview } from '@/@types/instructor/course/overview'
import { ResponseData } from '@/@types/response.type'
import { COURSE_CURRICULUM_BASE_URL } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'

export const GetCourseOverview = async (courseId: string) => {
  return await instanceAxios.get<ResponseData<TAddUpdateOverview>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/course-overview`
  )
}

export const UpdateCourseOverview = async (courseId: string, data: TAddUpdateOverview) => {
  return await instanceAxios.put<ResponseData<ResponseOverviewCourse>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/course-overview`,
    data
  )
}
