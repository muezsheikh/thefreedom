import React from 'react';
import styles from '@/styles/admin/Modals.module.css';
import axios from 'axios';
const DeleteModal = ({ deleteModalFunc,postId }) => {
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get`
      )
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }
  const deletePost = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/deletepost/${id}`
      )
      fetchPosts() // Refresh the posts list after deletion
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Are you sure?</h3>
        <p>This action cannot be undone. Do you want to proceed?</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={deleteModalFunc}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={()=>deletePost(postId)} >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
