export interface TAddDraftCourse {
  title: string
  description: string
  categoryId: string
  courseThumbnailFilePath: string
  surveyAnswer: string
}
export interface TUploadData {
  file: File
  ChunkIndex: number
  totalChunks: number
}
