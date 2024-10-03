import React, { useEffect, useState } from 'react'
import styles from '@/styles/admin/AdminNav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useGetData from '@/store/useGetData'
import axios from 'axios'

const AdminNav = () => {
  const route = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }
  const { logoutFunc, logoutLoading, logoutLoadingSuccess } = useGetData()
  const handleLogout = async () => {
    try {
      await logoutFunc()
      route.push('/')
    } catch (error) {
      console.log(error)
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

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>
        <img src='/images/logo.png' alt='Logo' className={styles.logo} />
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
        <button className={styles.toggleButton} onClick={toggleNav}>
          <FontAwesomeIcon icon={isNavOpen ? faXmark : faBars} />
        </button>
      </div>
      <div
        className={`${styles.overlay} ${isNavOpen ? '' : styles.none}`}
        onClick={toggleNav}
      >
        <ul className={`${styles.navLinks} ${isNavOpen ? styles.open : ''}`}>
          <li>
            <Link
              className={route.pathname === '/admin' ? styles.activeLink : ''}
              href='/admin'
            >
              New Post
            </Link>
          </li>
          <li>
            <Link
              className={
                route.pathname === '/admin/allposts' ? styles.activeLink : ''
              }
              href='/admin/allposts'
            >
              All Posts
            </Link>
          </li>
          {userInfo?.userRole === 'Admin' && (
            <li>
              <Link
                className={
                  route.pathname === '/admin/messages' ? styles.activeLink : ''
                }
                href='/admin/messages'
              >
                Messages
              </Link>
            </li>
          )}
          {userInfo?.userRole == 'Admin' && (
            <li>
              <Link
                className={
                  route.pathname === '/admin/add-user' ? styles.activeLink : ''
                }
                href='/admin/add-user'
              >
                Add User
              </Link>
            </li>
          )}
          {userInfo?.userRole === 'Admin' && (
            <li>
              <Link
                className={
                  route.pathname === '/admin/user-lists'
                    ? styles.activeLink
                    : ''
                }
                href='/admin/user-lists'
              >
                User Lists
              </Link>
            </li>
          )}
          <li>
            <button
              className={`${styles.logout} ${styles.mob}`}
              onClick={handleLogout}
            >
              {logoutLoading ? (
                <div className={styles.loader}></div>
              ) : logoutLoadingSuccess ? (
                'Logged Out'
              ) : (
                'Logout'
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default AdminNav
