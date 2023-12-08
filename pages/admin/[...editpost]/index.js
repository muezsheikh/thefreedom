import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import EditPost from '@/components/admin/EditPost'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function EditPostPage() {
  
  const { data: session } = useSession()
  const router = useRouter()
  
  return (
    <ProtectedRoute>
      <AdminLayout>
        <EditPost />
      </AdminLayout>
    </ProtectedRoute>
  )
}
