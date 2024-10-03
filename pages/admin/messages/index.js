import AdminLayout from '@/components/admin/admin-layout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/admin/Messages.module.css'
import withAdminAuth from '@/hoc/withAdminAuth'
import axios from 'axios'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/message/get`
      )
      setMessages(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  console.log(messages)
  const [delLoading, setDelLoading] = useState(false)
  const deleteMessage = async (id) => {
    setDelLoading(true)
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/message/delete/${id}`
      )
      fetchMessages() // Refresh the messages after deletion
      setDelLoading(false)
    } catch (error) {
      console.error('Error deleting the message:', error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div>
      <Head>
        <title>Messages - Admin Panel - The Freedom</title>
      </Head>
      <AdminLayout>
        <div className={styles.messages}>
          {loading ? (
            <p>Loading messages...</p>
          ) : (
            messages?.data?.map((msg) => (
              <div className={styles.messageBox} key={msg._id}>
                <div className={styles.messageContent}>
                  <h3>{msg.name}</h3>
                  <p>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p>
                    <strong>Message:</strong> {msg.message}
                  </p>
                  <p>
                    <small>
                      <strong>Date:</strong> {msg.date}
                    </small>
                  </p>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteMessage(msg._id)}
                >
                  {delLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))
          )}
        </div>
      </AdminLayout>
    </div>
  )
}

export default withAdminAuth(Messages)
