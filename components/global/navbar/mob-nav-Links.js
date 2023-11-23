import Link from 'next/link'
import React, { useState } from 'react'

export default function MobNavLinks() {
  const [activeNav, setActiveNav] = useState(false)
  const activeNavFunc = () => {
    setActiveNav(!activeNav)
  }
  const [activeDrop, setActiveDrop] = useState(false)
  const activeDropFunc = () => {
    setActiveDrop(!activeDrop)
  }
  const [activeDrop1, setActiveDrop1] = useState(false)
  const activeDrop1Func = () => {
    setActiveDrop1(!activeDrop1)
  }



  return (
    <>
    <div className="navActiveIcon" onClick={activeNavFunc}>
      <i className="fas fa-bars"></i>
    </div>
    <div className={`mobNav ${activeNav ? 'activeN' : ''}`}>
      <div className="crossIcon" onClick={activeNavFunc}>
        <div className="iconContent">
          <i className="fas fa-xmark"></i>
        </div>
      </div>
      <ul>
        <li><Link href={'/'}>Home</Link></li>
        <li onClick={activeDrop1Func}>
          <div className="dropLink">
            <Link href={'/'}>World</Link>
            <div className="linkIcon">
              <i className={`fas fa-arrow-${activeDrop1 ? 'up': 'down'}`}></i>
            </div>
          </div>
          <ul className={`mobDropdown ${activeDrop1 ? 'activeD1' : ''}`}>
            <li><Link href={'/south-asia'}>South Asia</Link></li>
            <li><Link href={'/pakistan'}>Pakistan</Link></li>
            <li><Link href={'/middle-east'}>Middle East</Link></li>
          </ul>
        </li>
        <li onClick={activeDropFunc}>
          <div className='dropLink'>
            <Link href={'/'}>Business</Link>
            <div className="linkIcon">
              <i className={`fas fa-arrow-${activeDrop ? 'up': 'down'}`}></i>
            </div>
          </div>
          <ul className={`mobDropdown ${activeDrop ? 'activeD' : ''}`}>
            <li><Link href={'/crypto'}>Crypto</Link></li>
          </ul>
        </li>
        <li><Link href={'/environment'}>Environment</Link></li>
        <li><Link href={'/health'}>Health</Link></li>
        <li><Link href={'/education'}>Education</Link></li>
        <li><Link href={'/visa-and-immigration'}>Visa and Immigration</Link></li>
        <li><Link href={'/fashion-and-style'}>Fashion & Style</Link></li>
        <li><Link href={'/sports'}>Sports</Link></li>
        <li><Link href={'/contact'}>Contact</Link></li>
      </ul>
    </div>
    </>
  )
}
