import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="container footerSection">
        <div className="logo">
          <img src="/images/logo1.png" alt="" />
        </div>
        <div className="briefDesc">
          <h3>About us</h3>
          <p>TheFreedom News is your go-to place for informative blog posts covering news, health, education, and the environment. We aim to help you learn and reflect on important topics. Explore the latest updates and thought-provoking ideas on TheFreedom News, where we discuss global events, health insights, and ways to care for the environment together!</p>
        </div>
        <div className="icons">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-pinterest"></i>
          <i className="fa-brands fa-youtube"></i>
        </div>
        <div className="copyright">
          <p>&copy; 2023 The Freedom. All rights reserved. Developed by Muez Sheikh.</p>
        </div>
      </div>


    </footer>
  )
}
