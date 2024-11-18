import { TAddUpdateCourseLandingPage } from '@/@types/instructor/course/landing-page'
import { COURSE_CURRICULUM_BASE_URL } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'

export const UpdateCourseLandingPage = async (courseId: string, data: TAddUpdateCourseLandingPage) =>
  await instanceAxios.put(`${COURSE_CURRICULUM_BASE_URL}${courseId}/course-landing-page`, data)

export const GetCourseLandingPage = async (courseId: string) =>
  await instanceAxios.get(`${COURSE_CURRICULUM_BASE_URL}${courseId}/course-landing-page`)

export const UploadVideoPromotion = async (
  formData: FormData,
  options: {
    additionalHeaders?: Record<string, string>
  } = {}
) => {
  try {
    return await instanceAxios.put(`${COURSE_CURRICULUM_BASE_URL}/video-assets/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(options.additionalHeaders || {})
      }
    })
  } catch (error) {
    console.error('Error in UpdateContentVideo:', error)
    throw error
  }
}
