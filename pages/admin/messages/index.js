import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import Messages from '@/components/admin/Messages'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function MessagesPage() {
  // const { data: session } = useSession()
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
      <Messages />
    </AdminLayout>
    </ProtectedRoute>
  )
}
