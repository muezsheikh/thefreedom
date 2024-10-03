import React, { useState } from 'react'
import styles from '@/styles/admin/Login.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import usePostData from '@/store/usePostData'

export default function LoginPage() {
  // const [loading]
  const [username, setUsername] = useState({ data: '', check: '' })
  const [password, setPassword] = useState({ data: '', check: '' })
  const router = useRouter()

  const { postLoginFunc, postLoginLoading, postLoginSuccess } = usePostData()
  const handleSubmit = async (e) => {
    if (username.data === '') {
      return setUsername({ check: true })
    }
    if (password.data === '') {
      return setPassword({ check: true })
    }
    const form = { username: username.data, password: password.data }
    try {
      await postLoginFunc(form)
      router.push('/admin')
    } catch (err) {
      console.error('Error login form', err)
    }
  }
  return (
    <>
      <Head>
        <title>Login - The Freedom </title>
      </Head>
      <div className={styles.loginPage}>
        <img className={styles.logImg} src='/images/favicon.png' alt='' />
        <h2>Login</h2>
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor='username'>Username</label>
            <input
              className={username.check ? styles.redInput : ''}
              type='text'
              id='username'
              value={username.data}
              onChange={(e) =>
                setUsername({ ...username, data: e.target.value })
              }
              placeholder='Enter your username'
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='password'>Password</label>
            <input
              className={password.check ? styles.redInput : ''}

              type='password'
              id='password'
              value={password.data}
              onChange={(e) =>
                setPassword({ ...password, data: e.target.value })
              }
              placeholder='Enter your password'
            />
          </div>
          <button
                className={`${styles.button} ${postLoginSuccess ? styles.success : ''}`}
                onClick={handleSubmit}
                disabled={postLoginLoading}
              >
                {postLoginLoading ? (
                  <div className={styles.loader}></div>
                ) : postLoginSuccess ? (
                  'Logged In Successfully'
                ) : (
                  'Login'
                )}
              </button>
        </div>
      </div>
    </>
  )
}
