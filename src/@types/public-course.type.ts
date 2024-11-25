export type PublicCourse = {
  courseId: string
  userId: string
  title: string
  shortDescription: string
  level: string
  courseThumbnailUrl: string
  rating: number
  instructorName: string
  viewers: number
  price: {
    currency: string
    amount: number
  }
  courseReview?: {
    rating?: number
  }
  courseThumbnailFilePath?: string
}
