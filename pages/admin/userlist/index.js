import AdminLayout from '@/components/admin/AdminLayout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Userlists() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/userlists`
      )
      setUsers(response.data.data)
    } catch (error) {
      toast.error(
        `Error: ${error.message || 'An error occurred while fetching data.'}`
      )
    } finally {
      toast.dismiss()
      setLoading(false)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  const deleteUser = async (id) => {
    try {
      const loadingToast = toast.info('deleting...', { autoClose: false });
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/auth/delete/${id}`);
      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success('Message Deleted!')
        getUsers()

      } else {
        toast.error("Oops! please try again!");
      }
    } catch (error) {
      console.error('Error deleting the message:', error);
      toast.error(`Error deleting the message. Please try again. ${error.message}`);
    }
  };
  return (
    <AdminLayout>
      <div className='user-list-body'>
        <div className='userlists'>
          {users?.map((user) => (
            <div className='user' key={user?._id}>
              <div className='user-body'>
                <h3 className='username'>{user?.name}</h3>
                <h5 className='user-username'>{user?.username}</h5>
                <p className='userrole'>{user?.userRole}</p>
              </div>
              <div className='user-rem'>
                <button onClick={() => deleteUser(user?._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
