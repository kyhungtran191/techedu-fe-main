import { LandingPageResponseData, TAddUpdateCourseLandingPage } from '@/@types/instructor/course/landing-page'
import { ResponseData } from '@/@types/response.type'
import { COURSE_CURRICULUM_BASE_URL } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'

export const UpdateCourseLandingPage = async (courseId: string, data: TAddUpdateCourseLandingPage) =>
  await instanceAxios.put(`${COURSE_CURRICULUM_BASE_URL}${courseId}/course-landing-page`, data)

export const GetCourseLandingPage = async (courseId: string) =>
  await instanceAxios.get<ResponseData<LandingPageResponseData>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/course-landing-page`
  )

export const UploadVideoPromotion = async (courseId: string, formData: FormData) => {
  return await instanceAxios.put<
    ResponseData<{
      fileId: string
      videoPromotionFilePath: string
      videoPromotionFileUrl: string
      videoPromotionFileSize: number
    }>
  >(`${COURSE_CURRICULUM_BASE_URL}${courseId}/videos-promotion/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
