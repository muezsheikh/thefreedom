import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import NewPost from '@/components/admin/NewPost'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function NewPostPage() {
  
  return (
    <ProtectedRoute>

    <AdminLayout>
      <NewPost />
    </AdminLayout>
    </ProtectedRoute>
  )
}
