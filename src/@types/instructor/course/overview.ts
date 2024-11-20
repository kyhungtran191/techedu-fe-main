export type TAddUpdateOverview = {
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

export type ResponseOverviewCourse = {
  requirements: string[] | []
  highlights: string[] | []
  intendedLearners: string[] | []
}
