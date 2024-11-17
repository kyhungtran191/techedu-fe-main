const test = {
  title: 'Dotnet Course 2025',
  shortDescription: 'ShortDescription',
  description: 'Help',
  categoryId: 'A451F572-0A1C-4C95-914C-96EF23F96527',
  subcategoryId: '',
  language: 'English',
  level: 'Beginner',
  thumbnailFilePath: 'courses/draft/images/78eff839-a075-4694-b6bc-e3b83cae5095-bhxh.PNG',
  videoPromotionFilePath:
    'courses/A7A520C6-8CCF-4EFE-B047-CC5F196FC6DD/videos-promotion/1109668_Stairs_Standard_1280x720.mp4',
  topicNames: ['Web Development']
}

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
  topicNames: string[]
}
