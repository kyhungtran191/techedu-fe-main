export type TAddUpdateCourseLandingPage = {
  title: string
  shortDescription: string
  description: string
  categoryId: string
  subcategoryId: string
  language: string
  level: string
  thumbnailFilePath: string
  videoPromotionFilePath: string
  videoPromotionFileSize: number
  topicNames: string[]
}

export type LandingPageResponseData = {
  title: string
  shortDescription: string
  description: string
  primaryCategory: PrimaryCategory
  subCategory: SubCategory
  language: string
  level: string
  topics: string[]
  thumbnailUrl: string
  videoPromotionUrl: string
  videoPromotionThumbnailUrl: string
  videoPromotionFilePath: ''
  videoPromotionThumbnailFilePath: ''
  videoPromotionFileSize: 0
}

export type PrimaryCategory = {
  primaryId: string
  name: string
  displayName: string
  createdDateTime: string
}
export type SubCategory = {
  primaryId: string
  subcategoryId: string
  name: string
  displayName: string
  createdDateTime: string
}

export type VideoLandingPageAsset = {
  videoPromotionFilePath: string
  videoPromotionFileUrl: string
  videoPromotionFileSize: number
}
