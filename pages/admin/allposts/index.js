import AdminLayout from '@/components/admin/admin-layout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/admin/AllPosts.module.css'
import axios from 'axios'
import withAuth from '@/hoc/withAuth'
import DeleteModal from '@/components/admin/DeleteModal'
import Comments from '@/components/admin/newpost/Comments'
import Link from 'next/link'

const AllPosts = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filteredPostsCheck, setFilteredPostsCheck] = useState(false)

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get`
      )
      setPosts(response.data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Truncate content for better display
  const truncateContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content
  }

  // Filter posts by date
  const filteredFunc = () => {
    if (filteredPostsCheck) {
      // Cancel search and reset to show all posts
      setSearchInput('')
      setFilteredPostsCheck(false)
      fetchPosts() // Fetch all posts again
    } else if (searchInput.trim()) {
      // Filter posts based on the search input (date)
      const filteredPosts = posts?.filter((item) =>
        item?.date?.includes(searchInput)
      )
      setPosts(filteredPosts)
      setFilteredPostsCheck(true)
    }
  }

  // Initial fetch of posts
  useEffect(() => {
    fetchPosts()
  }, [])

  // Modal state for delete confirmation and comments
  const [deleteModal, setDeleteModal] = useState(false)
  const [deletePostId, setDeletePostId] = useState('')
  const deleteModalFunc = (id) => {
    setDeletePostId(id)
    setDeleteModal(!deleteModal)
  }

  const [commentsModal, setCommentsModal] = useState(false)
  const [commentId, setCommentId] = useState('')
  const commentsModalFunc = (id) => {
    setCommentId(id)
    setCommentsModal(!commentsModal)
  }

  return (
    <div>
      <Head>
        <title>All Posts - Admin Panel - The Freedom</title>
      </Head>
      <AdminLayout>
        <div className={styles.allPosts}>
          <div className={styles.inputGroup}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              placeholder='Search by date e.g. 5-Aug-24'
            />
            <button onClick={filteredFunc}>
              {filteredPostsCheck ? 'Cancel' : 'Search'}
            </button>
          </div>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts?.map((post) => (
              <div className={styles.postCard} key={post._id}>
                <div className={styles.imageContainer}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles.postImage}
                  />
                </div>
                <div className={styles.postDetails}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <div
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{
                      __html: truncateContent(post.content, 150),
                    }}
                  />
                  {post.postby && (
                    <p className={styles.postBy}>Posted by: {post.postby}</p>
                  )}
                  <p className={styles.postDate}>Date: {post.date}</p>
                  <div className={styles.actions}>
                    <Link
                      href={`/admin/editposts/${post._id}`}
                      className={styles.editButton}
                    >
                      Edit
                    </Link>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteModalFunc(post?._id)}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.commentsButton}
                      onClick={() => commentsModalFunc(post?._id)}
                    >
                      Comments
                    </button>
                  </div>
                  <div>
                    <div className='input'>
                      <input type='checkbox' name='' id='public' />
                      <label htmlFor='public'>Public</label>
                    </div>
                    <div className='input'>
                      <input type='checkbox' name='' id='private' />
                      <label htmlFor='private'>Private</label>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {deleteModal && (
          <DeleteModal
            postId={deletePostId}
            deleteModalFunc={deleteModalFunc}
          />
        )}

        {commentsModal && (
          <Comments postId={commentId} commentsModalFunc={commentsModalFunc} />
        )}
      </AdminLayout>
    </div>
  )
}

export default withAuth(AllPosts)
