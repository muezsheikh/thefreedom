import Sidebar from '@/components/global/sidebar/Sidebar'
import React from 'react'

export default function PageLayout({ children }) {
  return (
    <div className='container pageLayout'>
      <div className="pageLayoutContent">
        {children}
      </div>
      <Sidebar />
    </div>
  )
}
