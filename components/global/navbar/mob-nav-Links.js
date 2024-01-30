import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    const handleScroll = () => {
      // Check if the navbar is active, and close it if necessary
      if (activeNav || activeDrop || activeDrop1) {
        setActiveNav(false);
        setActiveDrop(false);
        setActiveDrop1(false);
      }
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeNav, activeDrop, activeDrop1]);





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
          <li onClick={() => setActiveNav(false)}><Link href={'/'}>Home</Link></li>
          <li onClick={activeDrop1Func}>
            <div className="dropLink">
              <Link href={'/'}>World</Link>
              <div className="linkIcon">
                <i className={`fas fa-arrow-${activeDrop1 ? 'up' : 'down'}`}></i>
              </div>
            </div>
            <ul className={`mobDropdown ${activeDrop1 ? 'activeD1' : ''}`}>
              <li onClick={() => setActiveNav(false)}><Link href={'/south-asia'}>South Asia</Link></li>
              <li onClick={() => setActiveNav(false)}><Link href={'/pakistan'}>Pakistan</Link></li>
              <li onClick={() => setActiveNav(false)}><Link href={'/middle-east'}>Middle East</Link></li>
            </ul>
          </li>
          <li onClick={activeDropFunc}>
            <div className='dropLink'>
              <Link href={'/business'}>Business</Link>
              <div className="linkIcon">
                <i className={`fas fa-arrow-${activeDrop ? 'up' : 'down'}`}></i>
              </div>
            </div>
            <ul className={`mobDropdown ${activeDrop ? 'activeD' : ''}`}>
              <li onClick={() => setActiveNav(false)}><Link href={'/crypto'}>Crypto</Link></li>
            </ul>
          </li>
          <li onClick={() => setActiveNav(false)}><Link href={'/environment'}>Environment</Link></li>
          <li onClick={() => setActiveNav(false)}><Link href={'/health'}>Health</Link></li>
          <li onClick={() => setActiveNav(false)}><Link href={'/education'}>Education</Link></li>
          <li onClick={() => setActiveNav(false)}><Link href={'/visa-and-immigration'}>Visa and Immigration</Link></li>
          <li onClick={() => setActiveNav(false)}><Link href={'/fashion-and-style'}>Fashion & Style</Link></li>
          <li onClick={() => setActiveNav(false)}><Link href={'/sports'}>Sports</Link></li>
          <li onClick={() => setActiveNav(false)}><Link href={'/contact'}>Contact</Link></li>
        </ul>
      </div>
    </>
  )
}
