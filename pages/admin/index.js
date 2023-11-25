import AdminLayout from '@/components/admin/AdminLayout'
import SecurityPage from '@/components/admin/SecurityPage'
import React, { useState } from 'react'

export default function AdminPage() {
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  return (
    <>
      {isUserAdmin ? (
        <AdminLayout />
      ) : (
        <SecurityPage setIsUserAdmin={setIsUserAdmin} />
      )}
    </>
  )
}
