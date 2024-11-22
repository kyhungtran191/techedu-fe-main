export type PublicCourse = {
  courseId: string
  userId: string
  title: string
  shortDescription: string
  level: string
  courseThumbnailUrl: string
  rating: number
  viewers: number
  price: {
    currency: string
    amount: number
  }
}
