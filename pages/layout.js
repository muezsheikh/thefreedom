import Footer from '@/components/global/Footer'
import Navbar from '@/components/global/Navbar'
import React from 'react'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
