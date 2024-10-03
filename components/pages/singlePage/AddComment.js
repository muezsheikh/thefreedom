import React, { useState } from 'react'
import styles from '@/styles/client/singlePage/AddComment.module.css'
import usePostData from '@/store/usePostData'
import useGetData from '@/store/useGetData'
const AddComment = ({ postId }) => {
  const { fetchComments } = useGetData()
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
  const { postCommentFunc, postCommentLoading, postCommentSuccess } =
    usePostData()
  const addingCommentFunc = async () => {
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

      const commentDetails = {
        postId: postId,
        name: inputGroup.name.data,
        email: inputGroup.email.data,
        comment: inputGroup.message.data,
        date: currentDate,
      }
      await postCommentFunc(commentDetails)
      await fetchComments('posts/comments/get')
      setInputGroup({
        name: { data: '', check: false },
        email: { data: '', check: false },
        message: { data: '', check: false },
      })
    } catch (error) {
      console.error('Error adding the comment:', error)
    }
  }
  return (
    <div className={styles.addComment}>
      <div className={styles.head}>
        <h3>Join the conversation</h3>
        <p>Your thoughts matter! Share them with us below.</p>
        <p>
          Note: Your email address will not be published. Required fields are
          marked*
        </p>
      </div>
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
            onChange={inputChangeHandler}
            value={inputGroup.message.data}
            placeholder='Your Comment*'
            id=''
          ></textarea>
        </div>
        <button
          className={`${styles.button} ${
            postCommentSuccess ? styles.success : ''
          }`}
          onClick={addingCommentFunc}
          disabled={postCommentLoading}
        >
          {postCommentLoading ? (
            <div className={styles.loader}></div>
          ) : postCommentSuccess ? (
            'Added Comment successfully'
          ) : (
            'Add Comment'
          )}
        </button>
      </div>
    </div>
  )
}

export default AddComment
