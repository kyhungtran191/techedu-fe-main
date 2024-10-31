import { Role } from '@/@types/admin/role.type'
import moment from 'moment'

export const formatPathToTitle = (path: string, last = false): string => {
  // Remove leading and trailing slashes
  path = path.replace(/^\/|\/$/g, '')
  // Split the path into segments
  const segments = path.split('/')

  // Capitalize the first letter of each segment
  return last ? segments[segments.length - 1].split('-').join(' ').toString() : segments[0].toString()
}

export const formatSlugToTitleCourseDetail = (slug: string) => {
  const items = slug.split('-').join(' ')
  return items
}

export function formatCounterNumber(value: number): {
  number: number
  text: string
} {
  if (value >= 10000000) {
    return {
      number: Number((value / 1000000).toFixed(0)),
      text: 'm+'
    }
  } else if (value >= 1000000) {
    return {
      number: Number((value / 1000000).toFixed(1)),
      text: 'm+'
    }
  } else if (value >= 10000) {
    return {
      number: Number((value / 1000).toFixed(0)),
      text: 'k+'
    }
  } else if (value >= 1000) {
    return {
      number: Number((value / 1000).toFixed(1)),
      text: 'k+'
    }
  } else {
    return {
      number: value,
      text: '' // Trả về chuỗi rỗng nếu chưa vượt quá ngưỡng
    }
  }
}

export function formatPrice(amount: number, currency: string) {
  if (currency === 'vnd') {
    return `${(amount * 1000).toLocaleString('vi-VN')} VNĐ`
  } else if (currency === 'usd') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } else {
    throw new Error('Unsupported currency format')
  }
}

export function formatRolesDisplay(roles: Role[]) {
  return roles.map((role) => role.displayName).join(',')
}

export function formatSystemDate(value: string) {
  return moment(value).format('DD/MM/YYYY')
}
