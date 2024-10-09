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
  name: string
  lessons: TLesson[]
}
