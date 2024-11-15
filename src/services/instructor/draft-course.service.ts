import { TAddDraftCourse, TUploadData } from '@/@types/instructor/course/draft'
import { ResponseData } from '@/@types/response.type'
import { COURSE_API } from '@/apis/course/draft.api'
import instanceAxios from '@/configs/axiosInstance'

export const UploadThumbnail = async (formData: FormData) => {
  return await instanceAxios.post<
    ResponseData<{
      courseThumbnailFilePath: string
      courseThumbnailFileUrl: string
    }>
  >(`${COURSE_API.UPLOAD_THUMBNAIL}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const CreateDraftCourse = async (data: TAddDraftCourse) => {
  return await instanceAxios.post<ResponseData<null>>(`${COURSE_API.COURSE}`, data)
}
