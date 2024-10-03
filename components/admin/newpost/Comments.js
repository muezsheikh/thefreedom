import React, { useEffect, useState } from 'react'
import useGetData from '@/store/useGetData'
import styles from '@/styles/admin/Comments.module.css' // Styles for responsive design
import axios from 'axios'

const Comments = ({ postId,commentsModalFunc }) => {
  const { fetchComments, commentsData, commentsLoading } = useGetData()
  const { fetchReplies, repliesData, repliesLoading } = useGetData()

  const [commentId, setCommentId] = useState(null) // To fetch replies for a specific comment

  // Fetch comments for the specific post
  useEffect(() => {
    fetchComments('posts/comments/get')
  }, [])

  // Fetch replies
  useEffect(() => {
    fetchReplies('posts/comments/replies/get')
  }, [])

  // Filter comments by postId
  const postComments = commentsData?.comments?.filter(
    (item) => item.postId === postId
  )

  // Filter replies by commentId
  const getReplies = (id) => {
    return repliesData?.replies?.filter((reply) => reply.commentId === id)
  }
const [delComLoading,setDelComLoading] = useState(false)
const [delRepLoading,setDelRepLoading] = useState(false)
  const handleDeleteComment = async (id) => {
    setDelComLoading(true)
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/delete/${id}`
      )
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/delcomment/${id}`
      )
      setDelComLoading(false)
      fetchComments('posts/comments/get') // Refresh the posts list after deletion
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleDeleteReply = async (id) => {
    setDelRepLoading(true)
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/delete/${id}`
      )
      setDelRepLoading(false)
      fetchReplies('posts/comments/replies/get') // Refresh the posts list after deletion
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <div className={styles.commentsSectionOverlay} onClick={commentsModalFunc}>
      <div className={styles.commentsSection}>
        <h3>Comments {postComments?.length}</h3>
        <i onClick={commentsModalFunc} className={`fas fa-xmark ${styles.crossIcon}`} ></i>
        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : (
          postComments?.map((comment) => (
            <div key={comment._id} className={styles.commentCard}>
              <div className={styles.commentHeader}>
                <strong>{comment.name}</strong> - {comment.email}
                <span className={styles.date}>{comment.date}</span>
              </div>
              <p>{comment.comment}</p>
              <div className={styles.commentActions}>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  {delComLoading ? "Deleting..." : "Delete comment"}
                </button>
              </div>

              {/* Display Replies */}
              <div className={styles.repliesSection}>
                <h4>Replies</h4>
                {getReplies(comment._id)?.map((reply) => (
                  <div key={reply._id} className={styles.replyCard}>
                    <div className={styles.replyHeader}>
                      <strong>{reply.name}</strong> - {reply.email}
                      <span className={styles.date}>{reply.date}</span>
                    </div>
                    <p>{reply.reply}</p>
                    <div className={styles.replyActions}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteReply(reply._id)}
                      >
                        {delRepLoading ? 'Deleting...': "Delete Reply"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Comments
