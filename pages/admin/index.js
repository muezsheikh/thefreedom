import AdminLayout from '@/components/admin/admin-layout'
import Head from 'next/head'
import React from 'react'
import styles from '@/styles/admin/NewPost.module.css'
import withAuth from '@/hoc/withAuth'
import NewPost from '@/components/admin/NewPost'

const AdminPage = () => {
  return (
    <div>
      <Head>
        <title>Add New Post - Admin Panel - The Freedom</title>
      </Head>
      <AdminLayout>
        <NewPost />
      </AdminLayout>
    </div>
  )
}
export default withAuth(AdminPage)
