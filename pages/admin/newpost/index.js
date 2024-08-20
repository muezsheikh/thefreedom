import AdminLayout from '@/components/admin/AdminLayout'
import NewPost from '@/components/admin/NewPost'
import withAuth from '@/hoc/withAuth'

function NewPostPage() {
  return (
    <div>
      <AdminLayout>
        <NewPost />
      </AdminLayout>
    </div>
  )
}
export default withAuth(NewPostPage)
