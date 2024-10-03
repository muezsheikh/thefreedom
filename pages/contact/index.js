import React, { useState } from 'react'
import styles from '@/styles/client/Contact.module.css'
import Layout from '../layout'
import Head from 'next/head'
import axios from 'axios'
export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [inputGroup, setInputGroup] = useState({
    name: { data: '', check: false },
    email: { data: '', check: false },
    message: { data: '', check: false },
  })
  const inputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputGroup({ ...inputGroup, [name]: { data: value } })
  }

  const successMsgDisable = () => {
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }
  const reset = () => {
    setInputGroup({
      name: { data: '', check: false },
      email: { data: '', check: false },
      message: { data: '', check: false },
    })
  }
  const submitMsgFunc = async () => {
    if (inputGroup.name.data === '') {
      return setInputGroup({ ...inputGroup, name: {...inputGroup.name, check: true} })
    }
    if (inputGroup.email.data === '') {
      return setInputGroup({ ...inputGroup, email: {...inputGroup.email, check: true} })

    }
    if (inputGroup.message.data === '') {
      return setInputGroup({ ...inputGroup, message: {...inputGroup.message, check: true} })

    }
    try {
      setLoading(true)
      setSuccess(false)

      const currentDate = new Date().toLocaleString()

      const msgDetails = {
        name: inputGroup.name.data,
        email: inputGroup.email.data,
        message: inputGroup.message.data,
        date: currentDate,
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/message/send`,
        msgDetails
      )

      if (response) {
        setLoading(false)
        setSuccess(true)
        successMsgDisable()
        reset()
      } else {
        console.log(
          `Error posting the data. Status: ${response.status}, ${response.statusText}`
        )
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
    }
  }
  return (
    <>
      <Head>
        <title>Contact - The Freedom - Stay informed and reflect</title>
      </Head>
      <Layout>
        <div className={styles.contactContainer}>
          <div className={styles.contact}>
            <h3>Wanna talk?</h3>
            <p>We plasure to listen you!</p>
            <div className={styles.form}>
              <div className={styles.input}>
                <input
                  className={inputGroup.name.check ? styles.inputMsg : ''}
                  name='name'
                  value={inputGroup.name.data}
                  type='text'
                  placeholder='Your Name*'
                  onChange={inputChangeHandler}
                />
              </div>
              <div className={styles.input}>
                <input
                  className={inputGroup.email.check ? styles.inputMsg : ''}
                  name='email'
                  value={inputGroup.email.data}
                  type='email'
                  placeholder='Your Email*'
                  onChange={inputChangeHandler}
                />
              </div>
              <div className={styles.input}>
                <textarea
                  className={inputGroup.message.check ? styles.inputMsg : ''}
                  name='message'
                  value={inputGroup.message.data}
                  onChange={inputChangeHandler}
                  placeholder='Your Message*'
                  id=''
                ></textarea>
              </div>
              <button
                className={`${styles.button} ${success ? styles.success : ''}`}
                onClick={submitMsgFunc}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loader}></div>
                ) : success ? (
                  'Sent successfully'
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
