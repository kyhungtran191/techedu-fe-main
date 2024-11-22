import { TSection } from '@/@types/course.type'
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

export const GetForYouCourses = async () => {
  return await axios.get<ResponseData<PublicCourse[]>>(`${URL}courses/get-courses-for-you`)
}

//
