import AdminLayout from '@/components/admin/AdminLayout'
import withAuth from '@/hoc/withAuth'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
function AdminPage() {
  return (
    <div>
      <AdminLayout></AdminLayout>
    </div>
  )
}
export default withAuth(AdminPage)
