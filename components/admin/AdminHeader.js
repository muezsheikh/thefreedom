import React, { useEffect, useState } from 'react'
import { adminHeaders } from './data'
export default function AdminHeader({getTab, tab}) {
  const [activeAdminNav, setActiveAdminNav] = useState(false)
  const adminNavFunc = () => {
    setActiveAdminNav(!activeAdminNav)
  }
  useEffect(() => {
    const handleScroll = () => {
      // Check if the navbar is active, and close it if necessary
      if (activeAdminNav) {
        setActiveAdminNav(false)
      }
    }

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeAdminNav])

  return (
    <div className='adminHeader'>
      <div className='container'>
        <div className='adminNavIcon' onClick={adminNavFunc}>
          <i className='fas fa-bars'></i>
        </div>
        <div className={`adminNav ${activeAdminNav ? 'activeAd' : ''}`}>
          <div className='AdminCrossIcon' onClick={adminNavFunc}>
            <i className='fas fa-xmark'></i>
          </div>
          <ul>
            {adminHeaders.map((link,ind) => (
            <li key={ind} className={link.tab === tab ? 'activeTab' : ''} onClick={()=> getTab(link.tab)}>{link.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
