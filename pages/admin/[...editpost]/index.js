import AdminLayout from '@/components/admin/admin-layout'
import EditPost from '@/components/admin/EditPost'
import withAuth from '@/hoc/withAuth'

function EditPostPage() {
  return (
    <div>
      <AdminLayout>
        <EditPost />
      </AdminLayout>
    </div>
  )
}
export default withAuth(EditPostPage)
