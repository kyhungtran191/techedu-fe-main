import React, { useEffect, useState } from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'
import Navigate from '@/icons/Navigate'

const RANGE = 2
interface IProps {
  path?: string
  queryConfig?: any
  totalPage: number
  className?: string
}

export default function PaginationCustom({ path, queryConfig, totalPage, className }: IProps) {
  const navigate = useNavigate()
  const page = Number(queryConfig?.page) || Number(queryConfig?.pageIndex) || 1

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

  // Add smooth scroll to top after page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const handlePageChange = (newPage: number) => {
    navigate({
      pathname: path,
      search: createSearchParams({
        ...queryConfig,
        page: newPage.toString() // Ensure page is a string
      }).toString()
    })
  }

  return (
    <Pagination className={`${className}`}>
      <PaginationContent>
        <button
          onClick={() => handlePageChange(page - 1)}
          className={`mr-2 block ${page === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer text-primary-1 transition-all duration-300'}`}
        >
          <PaginationItem>
            <Navigate />
          </PaginationItem>
        </button>

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
              <button
                onClick={() => handlePageChange(pageNumber)}
                key={index}
                className='transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-95'
              >
                <PaginationItem>
                  <PaginationLink isActive={Number(pageNumber) === page}>{pageNumber}</PaginationLink>
                </PaginationItem>
              </button>
            )
          })}

        <button
          onClick={() => handlePageChange(page + 1)}
          className={`block ${page === totalPage ? 'opacity-50 pointer-events-none' : 'cursor-pointer text-primary-1 transition-all duration-300'}`}
        >
          <PaginationItem>
            <Navigate className='rotate-180' />
          </PaginationItem>
        </button>
      </PaginationContent>
    </Pagination>
  )
}
