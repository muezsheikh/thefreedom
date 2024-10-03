import React from 'react'
import styles from '@/styles/client/Footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src='/images/fLogo.png' alt='' />
      </div>
      <div className={styles.desc}>
        <h3>About us</h3>
        <p>
          TheFreedom News is your go-to place for informative blog posts
          covering news, health, education, and the environment. We aim to help
          you learn and reflect on important topics. Explore the latest updates
          and thought-provoking ideas on TheFreedom News, where we discuss
          global events, health insights, and ways to care for the environment
          together!
        </p>
      </div>
      <p>© 2023 The Freedom. All rights reserved.</p>
    </footer>
  )
}
