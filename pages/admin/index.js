import ProtectedRoute from '@/components/ProtectedRoute'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, } from 'react'
export default function AdminPage() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.user?.name === process.env.NEXT_PUBLIC_ADMIN_URL ) {
      router.replace('/admin/newpost')
    }else{
      router.replace('/login')
    }
  }, [router,session])
  return (
    <ProtectedRoute>

    </ProtectedRoute>
  )
}
