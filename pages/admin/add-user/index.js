import AdminLayout from '@/components/admin/admin-layout'
import Head from 'next/head'
import React, { useState } from 'react'
import styles from '@/styles/admin/AddUser.module.css'
import usePostData from '@/store/usePostData'
import withAdminAuth from '@/hoc/withAdminAuth'

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: { data: '', check: false },
    username: { data: '', check: false },
    password: { data: '', check: false },
    userRole: { data: 'regular', check: false }, // default role
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: { data: value },
    }))
  }

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      userRole: { data: e.target.value },
    }))
  }
  const { postUserFunc, postUserLoading, postUserSuccess } = usePostData()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.data === '') {
      return setFormData({ ...formData, name: { check: true } })
    }
    if (formData.username.data === '') {
      return setFormData({ ...formData, username: { check: true } })
    }
    if (formData.password.data === '') {
      return setFormData({ ...formData, password: { check: true } })
    }
    let form = {
      name: formData.name.data,
      username: formData.username.data,
      password: formData.password.data,
      userRole: formData.userRole.data,
    }

    try {
      postUserFunc(form)
      setFormData({
        name: { data: '', check: false },
        username: { data: '', check: false },
        password: { data: '', check: false },
        userRole: { data: 'Regular', check: false }, 
      })
      
    } catch (error) {}
  }

  return (
    <div>
      <Head>
        <title>Add User - Admin Panel - The Freedom</title>
      </Head>
      <AdminLayout>
        <div className={styles.addUser}>
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label
                className={formData.name.check ? styles.redLabel : ''}
                htmlFor='name'
              >
                Name
              </label>
              <input
                className={formData.name.check ? styles.redInput : ''}
                type='text'
                id='name'
                name='name'
                value={formData.name.data}
                onChange={handleChange}
                // required
              />
            </div>
            <div className={styles.inputGroup}>
              <label
                className={formData.username.check ? styles.redLabel : ''}
                htmlFor='username'
              >
                Username
              </label>
              <input
                className={formData.username.check ? styles.redInput : ''}
                type='text'
                id='username'
                name='username'
                value={formData.username.data}
                onChange={handleChange}
                // required
              />
            </div>
            <div className={styles.inputGroup}>
              <label
                className={formData.password.check ? styles.redLabel : ''}
                htmlFor='password'
              >
                Password
              </label>
              <input
                className={formData.password.check ? styles.redInput : ''}
                type='password'
                id='password'
                name='password'
                value={formData.password.data}
                onChange={handleChange}
                // required
              />
            </div>
            <div className={styles.roleGroup}>
              <label>Assign Role</label>
              <div>
                <input
                  type='radio'
                  id='regular'
                  name='userRole'
                  value='Regular'
                  checked={formData.userRole.data === 'Regular'}
                  onChange={handleRoleChange}
                />
                <label htmlFor='regular'>Regular</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='admin'
                  name='userRole'
                  value='Admin'
                  checked={formData.userRole.data === 'Admin'}
                  onChange={handleRoleChange}
                />
                <label htmlFor='admin'>Admin</label>
              </div>
            </div>
            <button
                className={`${styles.addButton} ${postUserSuccess ? styles.success : ''}`}
                disabled={postUserLoading}
                type='submit'
              >
                {postUserLoading ? (
                  <div className={styles.loader}></div>
                ) : postUserSuccess ? (
                  'User added successfully'
                ) : (
                  'Add User'
                )}
              </button>
          </form>
        </div>
      </AdminLayout>
    </div>
  )
}
export default withAdminAuth(AddUser)
