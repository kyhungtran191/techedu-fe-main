import { PublicCourse } from './public-course.type'

export type CourseInfo = {
  image: string
  title: string
  student: number
  star: number
  category: string
  author: string
  update_at: Date
  price: number
}

export type TLesson = {
  id: string | number
  name: string
  type: string
  content?: string
  resource?: File | string
}

export type TSection = {
  id: string | number
  title: string
  isPublished: boolean
  position: number
  sectionItems: TLesson[]
}

export type TAddSection = {
  courseId: string
  title: string
}

export interface CourseListParams {
  categoryId?: string
  subCategoryId?: string
  level?: string
  language?: string
  videoDurationInSeconds?: number | string
  searchTerm?: string
  pageIndex?: number | string
  pageSize?: number | string
  rating?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
}

export type CourseListConfig = {
  [key in keyof CourseListParams]: string
}

export type ResponseListCourses = {
  items: PublicCourse[]
  pageIndex: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPage: number
}
