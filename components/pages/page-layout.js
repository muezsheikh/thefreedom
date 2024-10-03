import React from 'react'
import Sidebar from '../global/Sidebar'

export default function PageLayout({ children }) {
  return (
    <div className='page-layout'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='content'>{children}</div>
    </div>
  )
}
