import React, { useEffect, useState } from 'react'
import styles from '@/styles/client/singlePage/Comments.module.css'
import Replies from './Replies'
import AddReply from './AddReply'
import useGetData from '@/store/useGetData'

const Comments = ({ post }) => {
  const [activeReply, setActiveReply] = useState(false)
  const [activeReplyCheck, setActiveReplyCheck] = useState(false)
  const activeReplyFunc = (id) => {
    setActiveReplyCheck(id)
    setActiveReply(!activeReply)
  }
  const { fetchComments, commentsData, commentsLoading } = useGetData()
  useEffect(() => {
    fetchComments('posts/comments/get')
  }, [])
  const postComments = commentsData?.comments?.filter(
    (item) => item.postId === post._id
  )
  return (
    <div className={styles.comments}>
      <h3>Comments {postComments?.length}</h3>
      {postComments?.map((com) => (
        <div key={com._id} className={styles.comment}>
          <div className={styles.commentUser}>
            <p className={styles.commentName}>{com?.name}</p>
            <p className={styles.commentDate}>{com?.date}</p>
          </div>
          <p className={styles.commentText}>{com.comment}</p>

          <button
            onClick={() => activeReplyFunc(com?._id)}
            className={styles.replyButton}
          >
            Reply
          </button>
          {activeReply && activeReplyCheck === com?._id && (
            <AddReply
              styles={styles}
              commentId={com?._id}
              commentName={com?.name}
              setActiveReply={setActiveReply}
            />
          )}

          <Replies commentId={com._id} styles={styles} />
        </div>
      ))}
    </div>
  )
}

export default Comments
