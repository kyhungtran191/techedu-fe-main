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
      ? `${SECTION_ITEM_ASSETS}article-assets`
      : type == COURSE_TYPE.VIDEO
        ? `${SECTION_ITEM_ASSETS}video-assets`
        : `${SECTION_ITEM_ASSETS}quiz-assets`
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

export const UpdateContentVideo = async (formData: FormData) => {
  return await instanceAxios.put(`${SECTION_ITEM_ASSETS}video-assets/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getAssets = async (courseId: string, sectionId: number, sectionItemId: number) => {
  return await instanceAxios.get<ResponseData<PrimaryAsset[]>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/sections/${sectionId}/section-items/${sectionItemId}/assets/lectures`
  )
}

// Supplementary assets

export const UpdateContentArticle = async (data: {
  courseId: string
  sectionId: number
  sectionItemId: number
  body: string
}) => await instanceAxios.put<ResponseData<TArticleResponse>>(`${SECTION_ITEM_ASSETS}article-assets`, data)

export const UpdateDescriptionSectionItem = async (
  courseId: string,
  sectionId: number,
  sectionItemId: number,
  description: string
) =>
  await instanceAxios.put<ResponseData<{ description: string }>>(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/sections/${sectionId}/section-items/${sectionItemId}`,
    {
      description
    }
  )

export const UploadSupplementaryResource = async (formData: FormData) => {
  return await instanceAxios.post(`${SECTION_ITEM_ASSETS}file-assets/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const DeleteAsset = async (courseId: string, sectionId: number, sectionItemId: number, assetId: number) => {
  return await instanceAxios.delete(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/sections/${sectionId}/section-items/${sectionItemId}/assets/${assetId}`
  )
}

export const DeleteSectionItem = async (courseId: string, sectionId: number, sectionItemId: number) =>
  await instanceAxios.delete(
    `${COURSE_CURRICULUM_BASE_URL}${courseId}/sections/${sectionId}/section-items/${sectionItemId}`
  )

export const DeleteSection = async (courseId: string, sectionId: number) =>
  await instanceAxios.delete(`${COURSE_CURRICULUM_BASE_URL}${courseId}/sections/${sectionId}`)
