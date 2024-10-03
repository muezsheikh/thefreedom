import useGetData from '@/store/useGetData'
import React, { useEffect } from 'react'

const Replies = ({ styles, commentId }) => {
  const { fetchReplies, repliesData } = useGetData()

  useEffect(() => {
    fetchReplies('posts/comments/replies/get')
  }, [])
  const replies = repliesData?.replies?.filter((item) => item.commentId === commentId)
  return (
    <div className={styles.replies}>
      {replies?.map((rep) => (
        <div key={rep?._id} className={styles.reply}>
          <div className={styles.commentUser}>
            <p className={styles.commentName}>{rep?.name}</p>
            <p className={styles.commentDate}>{rep?.date}</p>
          </div>
          <p className={styles.commentText}>{rep?.reply}</p>
          {/* <button className={styles.replyButton}>Reply</button> */}
        </div>
      ))}
    </div>
  )
}

export default Replies
