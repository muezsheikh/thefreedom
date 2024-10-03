import React from 'react'
import AdminNav from './AdminNav'

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNav />
      <div>{children}</div>
    </>
  )
}
