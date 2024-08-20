import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/loginuser`,
        formData,
        { withCredentials: true }
      )

      const data = response.data // Access the response data directly

      if (data) {
        toast.success('Login Successful')
        router.push('/admin')
        console.log('Login successful')

        // The session data is now stored in cookies, so no need to manually store the token
        // Redirect or perform other actions here
      } else {
        console.error('Login failed:', data.msg)
        // Handle errors here, e.g., show an error message
      }
    } catch (err) {
      console.error('Error submitting form', err)
    }
  }
  return (
    <div className='login-body'>
      <div className='login-form'>
        <h1 className='heading'>The Freedom</h1>
        <div className='inputs'>
          <div className='input'>
            <input
              name='username'
              value={username}
              onChange={handleChange}
              type='text'
              placeholder='Enter Username'
            />
          </div>
          <div className='input'>
            <input
              name='password'
              value={password}
              onChange={handleChange}
              type='password'
              placeholder='Enter Passowrd'
            />
          </div>
        </div>
        <div className='login-btn'>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}
