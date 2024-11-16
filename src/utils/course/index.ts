import { SectionOrderItem, TSectionCurriculum } from '@/@types/instructor/course/curriculumn'

export const handleFormatReorderCurriculum = (sections: TSectionCurriculum[]) => {
  const orderItems: SectionOrderItem[] = []
  sections.forEach((section) =>
    section.sectionItems.forEach((sectionItem) => {
      orderItems.push({
        id: sectionItem.id,
        sectionId: sectionItem.sectionId
      })
    })
  )
  return orderItems
}
