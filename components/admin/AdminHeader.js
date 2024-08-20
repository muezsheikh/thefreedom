import React, { useEffect, useState } from 'react'
import { adminHeaders } from './data'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
export default function AdminHeader() {
  const router = useRouter()
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

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`,
        {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      // Handle the data if needed
      console.log('Logout successful:')
      router.push('/')

      // Optionally redirect to another page
      // window.location.href = '/';
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
  const [userInfo, setUserInfo] = useState(null)

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/getuser`,
        { withCredentials: true }
      )
      setUserInfo(data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    } finally {
    }
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])

  console.log(userInfo)
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
            {adminHeaders.map((link, ind) => (
              <li
                key={ind}
                className={
                  router.pathname === `/admin/${link.tab}` ? 'activeTab' : ''
                }
              >
                <Link href={`/admin/${link.tab}`} legacyBehavior>
                  {link.name}
                </Link>
              </li>
            ))}
            {userInfo?.userRole === 'Admin' && (
              <>
                <li
                  className={
                    router.pathname === `/admin/messages` ? 'activeTab' : ''
                  }
                >
                  {userInfo?.userRole !== 'Admin' ? (
                    <></>
                  ) : (
                    <Link href={`/admin/messages`} legacyBehavior>
                      Messages
                    </Link>
                  )}
                </li>
                <li
                  className={
                    router.pathname === `/admin/adduser` ? 'activeTab' : ''
                  }
                >
                  {userInfo?.userRole !== 'Admin' ? (
                    <></>
                  ) : (
                    <Link href={`/admin/adduser`} legacyBehavior>
                      Add User
                    </Link>
                  )}
                </li>

                <li
                  className={
                    router.pathname === `/admin/userlist` ? 'activeTab' : ''
                  }
                >
                  {userInfo?.userRole !== 'Admin' ? (
                    <></>
                  ) : (
                    <Link href={`/admin/userlist`} legacyBehavior>
                      User List
                    </Link>
                  )}
                </li>
              </>
            )}
          </ul>
          <div className='logout-btn'>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
