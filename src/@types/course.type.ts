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

export interface CourseListConfig {
  page?: number | string
  limit?: number | string
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: number | string
  ratings?: number | string
  price_max?: number | string
  price_min?: number | string
  search?: string
  duration?: string | number
  level?: string
}

export type QueryConfig = {
  [key in keyof CourseListConfig]: string
}

