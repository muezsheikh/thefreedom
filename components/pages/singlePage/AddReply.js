import useGetData from '@/store/useGetData'
import usePostData from '@/store/usePostData'
import React, { useState } from 'react'

const AddReply = ({ styles, commentId, commentName,setActiveReply }) => {
  const [inputGroup, setInputGroup] = useState({
    name: { data: '', check: false },
    email: { data: '', check: false },
    message: { data: '', check: false },
  })
  const inputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputGroup({ ...inputGroup, [name]: { data: value } })
  }
  const { fetchReplies } = useGetData()
  const { postReplyFunc, postReplyLoading, postReplySuccess } = usePostData()
  const addingReplyFunc = async () => {
    if (inputGroup.name.data === '') {
      return setInputGroup({
        ...inputGroup,
        name: { ...inputGroup.name, check: true },
      })
    }
    if (inputGroup.email.data === '') {
      return setInputGroup({
        ...inputGroup,
        email: { ...inputGroup.email, check: true },
      })
    }
    if (inputGroup.message.data === '') {
      return setInputGroup({
        ...inputGroup,
        message: { ...inputGroup.message, check: true },
      })
    }
    try {
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const replyDetails = {
        commentId: commentId,
        commenterName: commentName,
        name: inputGroup.name.data,
        email: inputGroup.email.data,
        reply: inputGroup.message.data,
        date: currentDate,
      }
      await postReplyFunc(replyDetails)
      await fetchReplies('posts/comments/replies/get')
      setInputGroup({
        name: { data: '', check: false },
        email: { data: '', check: false },
        message: { data: '', check: false },
      })
      setActiveReply(false)
      
    } catch (error) {
      console.error('Error adding the comment:', error)
    }
  }
  return (
    <div className={styles.addComment}>
      <div className={styles.form}>
        <div className={styles.input}>
          <input
            className={inputGroup.name.check ? styles.inputMsg : ''}
            name='name'
            value={inputGroup.name.data}
            type='text'
            placeholder='Your Name*'
            onChange={inputChangeHandler}
          />
        </div>
        <div className={styles.input}>
          <input
            className={inputGroup.email.check ? styles.inputMsg : ''}
            name='email'
            value={inputGroup.email.data}
            type='email'
            placeholder='Your Email*'
            onChange={inputChangeHandler}
          />
        </div>
        <div className={styles.input}>
          <textarea
            className={inputGroup.message.check ? styles.inputMsg : ''}
            name='message'
            value={inputGroup.message.data}
            placeholder='Your Reply*'
            id=''
            onChange={inputChangeHandler}
          ></textarea>
        </div>
        <button
          className={`${styles.button} ${
            postReplySuccess ? styles.success : ''
          }`}
          onClick={addingReplyFunc}
          disabled={postReplyLoading}
        >
          {postReplyLoading ? (
            <div className={styles.loader}></div>
          ) : postReplySuccess ? (
            'Reply Added successfully'
          ) : (
            'Add Reply'
          )}
        </button>
      </div>
    </div>
  )
}

export default AddReply
