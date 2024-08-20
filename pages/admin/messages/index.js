import AdminLayout from '@/components/admin/AdminLayout'
import Messages from '@/components/admin/Messages'
import withAdminAuth from '@/hoc/withAdminAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

 function MessagesPage() {
 
  return (
    <div>
    <AdminLayout>
      <Messages />
    </AdminLayout>
    </div>
  )
}

export default withAdminAuth(MessagesPage)