import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { deleteObject, ref } from 'firebase/storage'
import { storages } from '@/utils/fire-base'
import AdminComments from './components/adminComments'

export default function AllPosts() {
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [postLoading, setPostLoading] = useState(false)

  const [formattedDate, setFormattedDate] = useState(null)

  const handleDateChange = (e) => {
    const inputDate = e.target.value
    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    const formattedDate = new Date(inputDate).toLocaleDateString(
      'en-US',
      options
    )
    setFormattedDate(formattedDate)
  }
  const [filterSearch, setFilterSearch] = useState(null)

  const getPosts = async () => {
    setPostLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get`
      )
      setPosts(response.data)
    } catch (error) {
      toast.error(
        `Error: ${error.message || 'An error occurred while fetching data.'}`
      )
    } finally {
      toast.dismiss()
      setPostLoading(false)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  const editFunc = (id) => {
    router.push(`/admin/editpost/${id}`)
  }
  const deleteImage = async (imageUrls) => {
    try {
      // Extract the path from the image URL

      // Create a reference to the image in Firebase Storage
      const imageRef = ref(storages, imageUrls)

      // Display a toast message indicating the deletion process has started
      const deletingToast = toast.info('Deleting image...', {
        autoClose: false,
      })

      // Delete the image from Firebase Storage
      await deleteObject(imageRef)

      // Display a success toast message
      toast.success('Image deleted successfully', { autoClose: 1500 })

      // Close the deletion in progress toast
      toast.dismiss(deletingToast)
    } catch (error) {
      console.error('Error deleting the image:', error)
      // Display an error toast message
      toast.error('Error deleting the image. Please try again.')
    }
  }
  const deletePost = async (postId, imgUrl) => {
    try {
      await deleteImage(imgUrl)
      const loadingToast = toast.info('deleting...', { autoClose: false })
      // Assuming postId is defined somewhere in your component state
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/deletepost/${postId}`
      )
      if (data.success) {
        toast.dismiss(loadingToast)
        toast.success('Post Deleted!')
        getPosts()
      } else {
        toast.error('Oops! please try again!')
      }
    } catch (error) {
      console.error('Error deleting the post:', error)
      toast.error(`Error deleting the post. Please try again. ${error.message}`)
    }
  }

  const [postId, setPostId] = useState(null)
  const [commentsS, setCommentsS] = useState(false)
  const viewComments = (id) => {
    setPostId(id)
    setCommentsS(!commentsS)
    if (!commentsS) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const filteredPosts = posts?.posts?.filter((item) => {
    const titleMatches =
      filterSearch &&
      item.title.toLowerCase().includes(filterSearch.toLowerCase())

    // Show the item only if titleMatches is true (when search filter is applied)
    return !filterSearch || titleMatches
  })

  const [activeConfirmModal, setActiveConfirmModal] = useState(false)
  const [delPostDetail, setDelPostDetail] = useState({
    postId: null,
    postImg: null,
  })
  const activeConfirmModalFunc = (id, image) => {
    setDelPostDetail({ postId: id, postImg: image })
    setActiveConfirmModal(!activeConfirmModal)
    if (!activeConfirmModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
  const deleteFunc = () => {
    console.log('first')
    if (delPostDetail.postId || delPostDetail.postImg) {
      deletePost(delPostDetail.postId, delPostDetail.postImg)
      activeConfirmModalFunc()
    }
  }
  return (
    <div className='allPostsContainer'>
      <div className='container'>
        <div className='allPostsContent'>
          <div className='title'>
            <h1>All Posts</h1>
          </div>
          <div className='filterOptions'>
            <div className='dateSearchSystem'>
              {/* <input type='date' name='' id='' onChange={handleDateChange} /> */}
            </div>
            <div className='searchSystem'>
              <input
                type='text'
                placeholder='Search...'
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </div>
          </div>
          {postLoading ? (
            <div className='heroSkeletonContainer'>
              <div className='skeleton-element'></div>
              <div className='skeleton-element'></div>
              <div className='skeleton-element'></div>
              <div className='skeleton-element'></div>
            </div>
          ) : (
            posts && (
              <>
                <div className='postsList'>
                  {filteredPosts?.map((post, ind) => (
                    <div className='post'>
                      <div className='postImg'>
                        <img src={post.image} alt='' />
                        {post.banner && (
                          <div className='bannerTag'>
                            <p>Banner</p>
                          </div>
                        )}
                      </div>
                      <div className='body'>
                        <div className='categoryTag'>
                          <p>Category: {post.category}</p>
                        </div>
                        <div className='postTitle'>
                          <h3>{post.title}</h3>
                        </div>
                        <div className='postDate'>
                          <p>{post.date}</p>
                        </div>
                        <button
                          className='commentsButton'
                          onClick={() => viewComments(post._id)}
                        >
                          View Comments
                        </button>
                        <button
                          onClick={() => editFunc(post._id)}
                          className='commentsButton editButton'
                        >
                          Edit Post
                        </button>
                        <button
                          // onClick={() => deletePost(post._id, post.image)}
                          onClick={() =>
                            activeConfirmModalFunc(post._id, post.image)
                          }
                          className='commentsButton deleteButton'
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </div>
      {commentsS && (
        <AdminComments viewComments={viewComments} postId={postId} />
      )}
      {activeConfirmModal && (
        <div className='modalOverlay'>
          <div className='confirmModalBox'>
            <div className='confirmMsg'>
              <p>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
            </div>
            <div className='confirmButtons'>
              <button className='delBtn' onClick={deleteFunc}>Delete</button>
              <button className='cnBtn' onClick={activeConfirmModalFunc}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
