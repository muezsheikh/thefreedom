import React, { useEffect, useState } from 'react'
import styles from '@/styles/client/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderLoader from './HeaderLoader'
import SearchBar from './SearchBar'
import useGetProd from '@/store/useGetProd'
import useGetData from '@/store/useGetData'

export default function Navbar() {
  const navLinks = [
    { link: 'Home' },
    {
      link: 'World',
      nestedLink: [
        { link: 'South Asia' },
        { link: 'Pakistan' },
        { link: 'Middle East' },
      ],
    },
    { link: 'Business', nestedLink: [{ link: 'Crypto' }] },
    { link: 'Environment' },
    { link: 'Health' },
    { link: 'Education' },
    { link: 'Visa And Immigration' },
    { link: 'Fashion & Style' },
    { link: 'Sports' },
    { link: 'Contact' },
  ]

  const router = useRouter()

  const formatLink = (text) => {
    return text
      .toLowerCase()
      .replace(/ & /g, '-and-') // Replace " & " with "-and-"
      .replace(/ /g, '-') // Replace spaces with "-"
      .replace(/--+/g, '-') // Remove duplicate dashes if any
      .replace(/^[-]+|[-]+$/g, '') // Trim dashes from start and end
  }

  const getCurrentDate = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Intl.DateTimeFormat('en-US', options).format(new Date())
  }

  const isActiveLink = (link) => {
    const formattedLink = link === 'Home' ? '/' : `/${formatLink(link)}`
    return router.pathname === formattedLink
  }
  const { data, loading, fetchData, getCategoryFunc } = useGetData()
  const { getCustomFunc } = useGetProd()

  useEffect(() => {
    fetchData('posts/get')
  }, [fetchData])
  const [activeNav, setActiveNav] = useState(false)
  const activeNavFunc = () => {
    setActiveNav(!activeNav)
  }
  useEffect(() => {
    document.body.style.overflow = activeNav ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [activeNav])
  const [activeSearch, setActiveSearch] = useState(false)
  const activeSearchFunc = () => {
    setActiveSearch(!activeSearch)
  }

  const disableNavFunc = () => {
    if (activeNav) {
      activeNavFunc()
    } else {
      return
    }
  }

  const sendCategory = (name) => {
    console.log('ssssssssssssssssssssssss',name)
    const dataByCategory = data?.posts?.filter((item) => item.category === name)
    getCategoryFunc(dataByCategory)
  }
  return (
    <>
      <nav className={styles.nav}>
        {loading ? (
          <>
            <div className='loader'></div>
            <HeaderLoader />
          </>
        ) : (
          <>
            <div className={styles.header}>
              <h2>Latest News:</h2>
              {data?.posts?.slice(0, 1).map((item) => (
                <Link
                  onClick={() => getCustomFunc(item)}
                  href={`/${item?.category}/${
                    !item.postCustomId ? item._id : item.postCustomId
                  }`}
                  key={item._id}
                >
                  <h3>{item.title}</h3>
                </Link>
              ))}

              <div onClick={activeSearchFunc} className={styles.searchIcon}>
                <i className='fas fa-search'></i>
              </div>
            </div>
          </>
        )}
        {activeSearch && <SearchBar activeSearchFunc={activeSearchFunc} />}

        <hr />
        <div className={styles.navLinksContainer}>
          <div className={styles.logo}>
            {/* <img src='/images/logo1.png' alt='Freedom Logo' /> */}
            <Link href={'/'}>
              <img src='/images/logo.png' alt='Freedom Logo' />
            </Link>

            {/* <div className={styles.date}>{getCurrentDate()}</div> */}
          </div>
          <div onClick={activeNavFunc} className={styles.navIcon}>
            <i className='fas fa-bars'></i>
          </div>
          <div
            onClick={activeNavFunc}
            className={`${
              activeNav
                ? `${styles.overlay} ${styles.Block}`
                : `${styles.overlay}`
            }`}
          ></div>

          <ul
            className={`${
              activeNav
                ? `${styles.navLinks} ${styles.Mob}`
                : `${styles.navLinks}`
            }`}
          >
            {navLinks.map((x, ind) => (
              <Link
                href={x.link === 'Home' ? '/' : `/${formatLink(x.link)}`}
                legacyBehavior
                key={ind}
              >
                <li
                
                >
                  <a
                    className={`${
                      isActiveLink(x.link) ? styles.activeLink : ''
                    }`}
                    onClick={() => {
                      sendCategory(formatLink(x.link)), disableNavFunc()
                    }}
                  >
                    {x.link}
                  </a>
                  {x.nestedLink && (
                    <ul className={styles.dropdown}>
                      {x.nestedLink.map((link, ind) => (
                        <Link key={ind} href={`/${formatLink(link.link)}`}>
                          <li
                            onClick={() => {
                              sendCategory(formatLink(link.link)),
                                disableNavFunc()
                            }}
                          >
                            {link.link}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
