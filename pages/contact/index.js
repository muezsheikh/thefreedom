import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const router = useRouter()
  const [inputGroup, setInputGroup] = useState({
    name: '',
    email: '',
    message: '',
  })
  const inputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputGroup({ ...inputGroup, [name]: value })
  }

  const submitMsgFunc = async () => {
    if (inputGroup.name === '') {
      return toast.error('Name Please!😊')
    }
    if (inputGroup.email === '') {
      return toast.error('Oh Come on! Where is your email?')
    }
    if (inputGroup.message === '') {
     return toast.error("bro! you didn't write a message🙄")
    }
    try {
      // Display loading message
      const loadingToast = toast.info('sending...', { autoClose: false })

      // Get present date in a nice human-readable format
      const currentDate = new Date().toLocaleString()

      // Create post details object
      const msgDetails = {
        name: inputGroup.name,
        email: inputGroup.email,
        message: inputGroup.message,
        date: currentDate,
      }

      // Send post details to the API
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/message/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msgDetails),
      })

      if (response.ok) {
        // Close the loading message
        toast.dismiss(loadingToast)
        // Display s success message
        toast.success('Send Message successfully!', { autoClose: 1500 })

        // Reload the page or handle navigation as needed
        router.reload()
      } else {
        // Display error message
        toast.error(
          `Error posting the data. Status: ${response.status}, ${response.statusText}`
        )
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
      // Display error message
      toast.error(
        `Error submitting the form. Please try again. ${error.message}`
      )
    }
  }

  return (
    <>
    <Head>
    <title>Contact - TheFreedom News - Stay Informed and Reflect</title>
    </Head>
    <div className='contactPage'>
      <div className='container'>
        <div className='AwesomeCommentSection'>
          <div className='commentTitle'>
            <h3>Wanna talk?</h3>
            <p>We Pleasure to listen you!</p>
          </div>
          <div className='commentContent'>
            <div className='inputGroup'>
              <input
                value={inputGroup.name}
                onChange={inputChangeHandler}
                name='name'
                type='text'
                placeholder='Your Name*'
              />
            </div>
            <div className='inputGroup'>
              <input
                type='email'
                value={inputGroup.email}
                onChange={inputChangeHandler}
                name='email'
                placeholder='Your Email*'
              />
            </div>
            <div className='inputGroup'>
              <textarea
                value={inputGroup.message}
                onChange={inputChangeHandler}
                name='message'
                placeholder='Your Message*'
              ></textarea>
            </div>
          </div>
          <div className='submitBtn'>
            <button onClick={submitMsgFunc}>Send</button>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}
