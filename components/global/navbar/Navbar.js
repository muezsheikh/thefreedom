import React from 'react'
import Header from './Header'
import NavLinks from './Nav-links';
import MobNavLinks from './mob-nav-Links';
import Link from 'next/link';

export default function Navbar() {
   const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const currentDate = formatDate(new Date());

  return (
    <>
      <Header />
      <div className="main-logo">
        <div className="date">
          <p>{currentDate}</p>
        </div>
        <Link href={"/"}>
          <div className='mainLogo'>
            <img src="https://thefreedom.com.pk/wp-content/uploads/2021/10/The-freedom-logoo.png" alt="" />
          </div>
        </Link>
        {/* <img src="/images/logo.png" alt="" /> */}
      </div>
      <div className='largeScreen'>
        <NavLinks />
      </div>
      <div className="mobScreen">
        <MobNavLinks />
      </div>

    </>
  )
}
