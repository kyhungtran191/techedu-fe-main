import {
  AddLessonItemResult,
  PrimaryAsset,
  SectionItem,
  SectionOrderItem,
  TArticleResponse,
  TSectionCurriculum
} from '@/@types/instructor/course/curriculumn'
import { ResponseData } from '@/@types/response.type'
import { COURSE_CURRICULUM_BASE_URL, SECTION_ITEM_ASSETS } from '@/apis/course/manage/curriculumn.api'
import instanceAxios from '@/configs/axiosInstance'
import { COURSE_TYPE } from '@/constants/course'
import { File } from 'buffer'

// Get
export const GetSections = async (courseId: string) => {
  return await instanceAxios.get<ResponseData<TSectionCurriculum[]>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/sections`
  )
}

export const GetSectionByID = async (courseId: string, sectionId: string) => {
  return await instanceAxios.get<ResponseData<null>>(`${COURSE_CURRICULUM_BASE_URL}${courseId}/sections/${sectionId}`)
}

export const CreateSection = async (courseId: string, title: string) => {
  return await instanceAxios.post<ResponseData<{ id: string }>>(`${COURSE_CURRICULUM_BASE_URL}${courseId}/sections`, {
    title
  })
}

export const AddLessonItem = async (type: string, title: string, courseId: string, sectionId: number) => {
  const path =
    type == COURSE_TYPE.ARTICLE
      ? `${SECTION_ITEM_ASSETS}/article-assets`
      : type == COURSE_TYPE.VIDEO
        ? `${SECTION_ITEM_ASSETS}/video-assets`
        : `${SECTION_ITEM_ASSETS}/quiz-assets`
  return await instanceAxios.post<ResponseData<AddLessonItemResult>>(path, {
    courseId,
    sectionId,
    title
  })
}

export const UpdateOrderSection = async (courseId: string, sectionItems: SectionOrderItem[]) => {
  return await instanceAxios.put<ResponseData<null>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/instructor-curriculum-items`,
    {
      sectionItems
    }
  )
}

export const UpdateContentVideo = async (
  formData: FormData,
  options: {
    signal?: AbortSignal
    onUploadProgress?: (progressEvent: ProgressEvent) => void
    additionalHeaders?: Record<string, string>
  } = {}
) => {
  try {
    return await instanceAxios.put(`${SECTION_ITEM_ASSETS}/video-assets/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(options.additionalHeaders || {}) // Thêm header tùy chỉnh
      },
      signal: options.signal // Hỗ trợ AbortController
    })
  } catch (error) {
    console.error('Error in UpdateContentVideo:', error)
    throw error
  }
}

export const UpdateContentArticle = async (data: {
  courseId: string
  sectionId: number
  sectionItemId: number
  body: string
}) => await instanceAxios.put<ResponseData<TArticleResponse>>(`${SECTION_ITEM_ASSETS}/article-assets`, data)
