export type CartResponse = {
  id: string
  items: CartItem[]
}

export type TItemAddCart = {
  basketId: string
  courseId: string
  courseName: string
  instructorId: string
  instructorName: string
  level: string
  courseThumbnailFilePath: string
  viewers: number
  rating: number
  currentPrice: {
    amount: number
    currency: string
  }
}

export type CartItem = {
  id: number
  basketId: string
  courseId: string
  courseName: string
  instructorId: string
  instructorName: string
  level: string
  courseThumbnailFileUrl: string
  rating: number
  viewers: number
  currentPrice: {
    amount: number
    currency: string
  }
}
