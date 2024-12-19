import { string } from 'yup'
import { CategoryAll, SubCategory } from '../category.type'
import { TSectionCurriculum } from '../instructor/course/curriculumn'

export type PrivateCourseQueryParams = {
  searchTerm?: string
  courseStatus?: 'Draft' | 'Reviewing' | 'Reject' | 'Publish '
  level?: string
  pageIndex?: string
  pageSize?: string
}

export type PrivateCourseQueryConfig = {
  [key in keyof PrivateCourseQueryParams]: string
}

export type PrivateCourse = {
  id: string
  thumbnailUrl: string
  title: string
  level: string
  status: string
  createdDateTime: string
  updatedDateTime: string
  instructor: {
    userId: string
    firstName: string
    lastName: string
    avatarUrl: string
  }
}

export type ResponseListPrivateCourses = {
  items: PrivateCourse[]
  pageIndex: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPage: number
}

export type ResponsePrivateCourseDetail = {
  courseId: string //check
  courseLandingPage: CourseLandingPage
  price: Price //check
  courseOverview: CourseOverview
  instructor: Instructor //check
  totalResources: number //check
  totalVieoDuration: string // check
  totalSectionItems: number //check
  courseStatus: string //check
  totalEnrolled?: string
  welcomeMessage: string
  congratulationMessage: string
  createdDatetime: string
  updatedDatetime: string
  rating?:number
  viewers?:number
  sections?: TSectionCurriculum[]
}

type Price = {
  currency: string
  amount: number
}

type CourseOverview = {
  requirements: {
    text: string
  }[]
  highlights: {
    text: string
  }[]
  intendedLearners: {
    text: string
  }[]
}
type Instructor = {
  userId: string
  firstName: string
  lastName: string
  headline: string
  bio: string
  avatarUrl: string
}

type CourseLandingPage = {
  title: string
  shortDescription: string
  description: string
  primaryCategory: CategoryAll
  subCategory: SubCategory
  language: string
  level: string
  thumbnailUrl: string
  videoPromotionUrl: string
  videoPromotionFilePath: string
  videoPromotionThumbnailUrl: string
  videoPromotionThumbnailFilePath: string
  videoPromotionFileSize: number
  thumbnailFilePath?:string
  topics: { id: string; name: string }[]
}
