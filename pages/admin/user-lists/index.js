import AdminLayout from '@/components/admin/admin-layout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/admin/UserLists.module.css';
import Link from 'next/link';
import withAdminAuth from '@/hoc/withAdminAuth';
import axios from 'axios';

const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/userlists`
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    setDelLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/delete/${id}`
      );
      if (data.success) {
        getUsers();
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting the user:', error);
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>All User Lists - Admin Panel - The Freedom</title>
      </Head>
      <AdminLayout>
        <div className={styles.userLists}>
          <h2>User Lists</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Assigned Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr key={index}>
                      <td className={styles.skeleton}></td>
                      <td className={styles.skeleton}></td>
                      <td className={styles.skeleton}></td>
                      <td className={styles.skeleton}></td>
                    </tr>
                  ))
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.userRole}</td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(user._id)}
                      >
                        {delLoading ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.addUserBtn}>
          <Link href={'/admin/add-user'} className={styles.addUserLink}>
            Add New User
          </Link>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(UserLists);
