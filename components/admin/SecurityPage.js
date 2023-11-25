import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function SecurityPage({ setIsUserAdmin }) {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const inputsHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs({ ...inputs, [name]: value })
  }

  const submitUserFunc = async () => {
    // Display loading notification
    const loading = toast.info('Verifying...', { autoClose: false })

    try {
      const response = await fetch('http://localhost:3000/api/admin-user/get')
      const apiData = await response.json()
      // Assuming the structure of apiData is like { username: '...', password: '...' }
      if (
        inputs.username === apiData.users[0].username &&
        inputs.password === apiData.users[0].password
      ) {
        // Data matched
        toast.dismiss(loading)
        toast.success('Verified', { autoClose: 1500 })
        setIsUserAdmin(true)
      } else {
        // Data did not match
        toast.dismiss(loading)

        toast.error('Verification failed', { autoClose: 1500 })
      }
    } catch (error) {
      // Handle error
      toast.dismiss(loading)

      toast.error('Error verifying user', { autoClose: 1500 })
      console.error(error)
    }
  }

  return (
    <div className='adminLoginPage'>
      <div className='loginImg'>
        <img
          src='https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className='mainImg'
        />
        <div className='ALogo'>
          <img src='/images/logo1.png' alt='' />
        </div>
      </div>
      <div className='container'>
        <div className='loginContainer'>
          <div className='input'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={inputsHandler}
              value={inputs.username}
            />
          </div>
          <div className='input'>
            <input
              type='password'
              name='password'
              onChange={inputsHandler}
              value={inputs.password}
              placeholder='Password'
            />
          </div>
          <div className='loginBtn'>
            <button onClick={submitUserFunc}>Login Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  )
}
