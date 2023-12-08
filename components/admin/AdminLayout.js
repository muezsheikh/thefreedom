import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import Link from 'next/link'

export default function AdminLayout({ children }) {

  return (
    <div>
      <Link href={'/'}>
        <div className='main-logo'>
          <img
            src='https://thefreedom.com.pk/wp-content/uploads/2021/10/The-freedom-logoo.png'
            alt=''
          />
        </div>
      </Link>
      <AdminHeader />
      {children}
    </div>
  )
}
