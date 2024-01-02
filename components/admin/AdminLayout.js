import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import Link from 'next/link'

export default function AdminLayout({ children }) {

  return (
    <div>
      <Link href={'/'}>
        <div className='main-logo'>
          <img
            src='/images/freedomLogo.png'
            alt=''
          />
        </div>
      </Link>
      <AdminHeader />
      {children}
    </div>
  )
}
