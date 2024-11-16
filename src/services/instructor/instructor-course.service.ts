import { TMyCourse } from '@/@types/instructor/my-course'
import { ResponseData } from '@/@types/response.type'
import { instructorCourse } from '@/apis/course/instructor-courses'
import instanceAxios from '@/configs/axiosInstance'

export const GetAllInstructorCourse = async () => {
  return await instanceAxios.get<ResponseData<TMyCourse[]>>(instructorCourse)
}
