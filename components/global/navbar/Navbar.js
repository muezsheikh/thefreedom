import React, { useState } from 'react'
import Header from './Header'
import NavLinks from './Nav-links'
import MobNavLinks from './mob-nav-Links'
import Link from 'next/link'
import SearchLayout from '../searchPage/SearchLayout'

export default function Navbar() {
  const [activeSearch, setActiveSearch] = useState(false)
  const activeSearchFunc = () => {
    setActiveSearch(!activeSearch)
  }
  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
    return new Date(date).toLocaleDateString('en-US', options)
  }

  const currentDate = formatDate(new Date())

  return (
    <>
      <Header />
      <div className='main-logo'>
        <div className='date'>
          <p>{currentDate}</p>
        </div>
        <Link href={'/'}>
          <div className='mainLogo'>
            <img
              src='/images/freedomLogo.png'
              alt=''
            />
          </div>
        </Link>
        <div className='searchBar' onClick={activeSearchFunc}>
          <i className='fas fa-search'></i>
        </div>
        <SearchLayout
          activeSearch={activeSearch}
          activeSearchFunc={activeSearchFunc}
        />
      </div>
      <div className='largeScreen'>
        <NavLinks />
      </div>
      <div className='mobScreen'>
        <MobNavLinks />
      </div>
    </>
  )
}
