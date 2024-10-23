import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'
import Navigate from '@/icons/Navigate'
import { QueryConfig } from '@/@types/course.type'

const RANGE = 2
interface IProps {
  path?: string
  queryConfig?: any
  totalPage: number
  className?: string
}
export default function PaginationCustom({ path, queryConfig, totalPage, className }: IProps) {
  //
  const page = Number(queryConfig?.page as number)
  let dotAfter = false
  let dotBefore = false
  function renderDotAfter(index: number) {
    if (!dotAfter) {
      dotAfter = true
      return (
        <span
          key={index}
          className='px-2 py-1 mx-1 bg-white border rounded shadow-sm cursor-pointer sm:mx-2 sm:px-3 sm:py-2'
        >
          ...
        </span>
      )
    }
  }
  function renderDotBefore(index: number) {
    if (!dotBefore) {
      dotBefore = true
      return (
        <span key={index} className='px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-pointer'>
          ...
        </span>
      )
    }
  }
  return (
    <Pagination className={`${className}`}>
      <PaginationContent>
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryConfig,
              page: page - 1
            }).toString()
          }}
          className={`mr-2 block ${page === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer text-primary-1'}`}
        >
          <PaginationItem>
            <Navigate></Navigate>
          </PaginationItem>
        </Link>
        {Array(totalPage)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1
            if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= totalPage - RANGE) {
              return renderDotAfter(index)
            } else if (page > RANGE * 2 + 1 && page < totalPage - RANGE * 2) {
              if (pageNumber < page - RANGE && pageNumber > RANGE) {
                return renderDotBefore(index)
              } else if (pageNumber > page + RANGE && pageNumber < totalPage - RANGE + 1) {
                return renderDotAfter(index)
              }
            } else if (page >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
              return renderDotBefore(index)
            }

            return (
              <Link
                to={{
                  pathname: path,
                  search: createSearchParams({
                    ...queryConfig,
                    page: pageNumber
                  }).toString()
                }}
                key={index}
              >
                <PaginationItem>
                  <PaginationLink href='#' isActive={Number(pageNumber) == page}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              </Link>
            )
          })}
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryConfig,
              page: page + 1
            }).toString()
          }}
          className={`block ${page === totalPage ? 'opacity-50 pointer-events-none' : 'cursor-pointer text-primary-1'}`}
        >
          <PaginationItem>
            <Navigate className='rotate-180'></Navigate>
          </PaginationItem>
        </Link>
      </PaginationContent>
    </Pagination>
  )
}
