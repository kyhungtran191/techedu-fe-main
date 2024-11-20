import { ResponseData } from '@/@types/response.type'
import { COURSE_CURRICULUM_BASE_URL } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'

export type SubmitCourseReviewResponse = {
  courseValidationErrors?: Record<string, string[]>
}
export const SubmitReviewCourse = async (courseId: string) => {
  return await instanceAxios.post<ResponseData<SubmitCourseReviewResponse>>(
    `${COURSE_CURRICULUM_BASE_URL}/${courseId}/submit-for-review`
  )
}
