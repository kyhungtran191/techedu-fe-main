export type SectionOrderItem = {
  id: number
  sectionId: number
}

export type TSectionCurriculum = {
  id: number
  title: string
  isPublished: false
  position?: number
  sectionItems: SectionItem[]
}

export type SectionItem = {
  id: number
  sectionId: number
  description?: string
  itemType: string
  title: string
  position?: number
  createdDateTime?: string
  primaryAsset: PrimaryAsset
  supplementaryAssets: SupplementaryAssetItem[]
}

export type PrimaryAsset = {
  sectionItemId: number
  timeEstimation: number
  fileSize: number
  type: string
  status: string
  thumnailUrl: string
  body?: string
  fileUrl: string
  contentSummary: string
  title?: string
  processingErrors: never[]
  isPrimary: boolean
}

export type SupplementaryAssetItem = {
  id: number
  sectionItemId: number
  timeEstimation: number
  fileSize: number
  type: string
  status: string
  thumnailUrl: string
  title?: string
  fileUrl: string
  contentSummary: string
  processingErrors: never[]
  isPrimary: boolean
}

export type AddLessonItemResult = {
  sectionId: number
  primaryAsset: PrimaryAsset
}

export type TArticleResponse = {
  sectionId: number
  articleAsset: PrimaryAsset
}
