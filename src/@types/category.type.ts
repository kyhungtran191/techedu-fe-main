export type Category = {
  primaryId: string
  name: string
  displayName: string
  createdDateTime: string
}
export type CategoryAll = {
  primaryId: string
  name: string
  displayName: string
  createdDateTime: string
  updatedDateTime: string
  subCategories: SubCategory
}

export type SubCategory = {
  subcategoryId: string
  name: string
  displayName: string
  createdDateTime: string
  subCategories: SubCategory[]
}
