import ProtectedRoute from '@/components/ProtectedRoute'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminLayout from '@/components/admin/AdminLayout'
import AllPosts from '@/components/admin/AllPosts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
export default function AllPostsPage() {
  const { data: session } = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   if (session?.user?.name === process.env.NEXT_PUBLIC_ADMIN_URL ) {
  //     router.replace('/admin/newpost')
  //   }else{
  //     router.replace('/login')
  //   }
  // }, [router,session])
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AllPosts />
      </AdminLayout>
    </ProtectedRoute>
  )
}
