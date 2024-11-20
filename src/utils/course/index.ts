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

export const formatErrorMessagesSubmitCourse = (errors: Record<string, string[]>): string => {
  return Object.entries(errors)
    .map(([field, messages]) => {
      if (messages.length <= 0) return
      return `${field.toUpperCase()}:\n \n${messages.join('\n\n')}\n\n\t---------------------------------------------`
    })
    .join('\n\n')
}

export const mapToJson = (data: any) => ({
  requirements: data.requirements.filter((value: any) => value.trim() !== '').map((value: string) => ({ text: value })),
  highlights: data.highlights.filter((value: any) => value.trim() !== '').map((value: string) => ({ text: value })),
  intendedLearners: data.intendedLearners
    .filter((value: any) => value.trim() !== '')
    .map((value: string) => ({ text: value }))
})
