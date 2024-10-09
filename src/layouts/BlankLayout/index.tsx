import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function BlankLayout({
  headerOption,
  children,
  isFooter = false
}: {
  headerOption?: React.ReactNode
  children: React.ReactNode
  isFooter?: boolean
}) {
  return (
    <>
      <Header headerOption={headerOption}></Header>
      {children}
      {isFooter && <Footer></Footer>}
    </>
  )
}
