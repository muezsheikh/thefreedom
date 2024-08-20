import AdminLayout from '@/components/admin/AdminLayout'
import withAdminAuth from '@/hoc/withAdminAuth'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function AddUserPage() {
  const [role, setRole] = useState('')
  const roleFunc = (get) => {
    setRole(get)
  }

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  })

  const { name, username, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/createuser`,
        { ...formData, userRole: role },
        { withCredentials: true }
      )

      const data = response.data // Access the response data directly

      if (response.status === 200) {
        // or response.status >= 200 && response.status < 300
        toast.success('User has been Created!')
        console.log('Signup successful', data)
        setFormData({
          name: '',
          username: '',
          password: '',
        })
        // You can redirect the user or show a success message here
      } else {
        console.error('Signup failed', data)
        // Handle errors here, e.g., show an error message
      }
    } catch (err) {
      console.error('Error submitting form', err)
    }
  }
  return (
    <AdminLayout>
      <div className='form-body'>
        <div className='form'>
          <div className='heading'>
            <h2>Add User</h2>
          </div>
          <div className='inputs'>
            <div className='input'>
              <input
                name='name'
                value={name}
                onChange={handleChange}
                type='text'
                placeholder='Enter Name'
              />
            </div>
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
                placeholder='Enter Password'
              />
            </div>
            <div className='role-input'>
              <h4>Assign Role:</h4>
              <div className='role-boxes'>
                <div className='role-box' onClick={() => roleFunc('Regular')}>
                  <div
                    className={`tick-box ${role === 'Regular' ? 'active' : ''}`}
                  ></div>
                  <p>Regular</p>
                </div>
                <div className='role-box' onClick={() => roleFunc('Admin')}>
                  <div
                    className={`tick-box ${role === 'Admin' ? 'active' : ''}`}
                  ></div>
                  <p>Admin</p>
                </div>
              </div>
            </div>
          </div>
          <div className='adduser-btn'>
            <button onClick={handleSubmit}>Create User</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default withAdminAuth(AddUserPage)
