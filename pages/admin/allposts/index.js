import AdminLayout from '@/components/admin/AdminLayout'
import AllPosts from '@/components/admin/AllPosts'
import withAuth from '@/hoc/withAuth'
import React, { useEffect } from 'react'
 function AllPostsPage() {
  return (
    <div>
      <AdminLayout>
        <AllPosts />
      </AdminLayout>
    </div>
  )
}


export default withAuth(AllPostsPage)