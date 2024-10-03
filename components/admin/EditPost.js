import React, { useEffect, useRef, useState } from 'react'
import { storages } from '@/utils/fire-base'
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function EditPost() {
  const router = useRouter()
  console.log(router)
  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
    banner: '',
    sCategory: '',
    nCategory: '',
    uploadImg: '',
    tags: [],
    tagInputValue: '',
  })

  const postContentHandler = (name, value) => {
    setPostContent((prev) => ({ ...prev, [name]: value }))
  }
  const handleInputKeydown = (e) => {
    if (e.key === 'Enter')
      setPostContent({
        ...postContent,
        tags: [...postContent.tags, e.target.value],
      })
  }
  const handleDeleteTag = (index) => {
    const newTags = [...postContent.tags]
    newTags.splice(index, 1)
    setPostContent({ ...postContent, tags: newTags })
  }

  const [imageUrl, setImageUrl] = useState('')
  const prevUploadImg = useRef(postContent.uploadImg)

  const uploadImage = async (uploadImg) => {
    try {
      const imageRef = ref(storages, `/images/${uploadImg.name + v4()}`)
      await uploadBytes(imageRef, uploadImg)
      const imageUrl = await getDownloadURL(imageRef)
      return imageUrl
    } catch (error) {
      console.error('Error uploading the image:', error)
      throw error // Rethrow the error to handle it in the caller function
    }
  }

  const handleUploadButtonClick = async () => {
    try {
      const uploadedImageUrl = await uploadImage(postContent.uploadImg)
      setImageUrl(uploadedImageUrl)
      // Display a success toast message
      toast.success('Image uploaded successfully', { autoClose: 1500 })
    } catch (error) {
      // Display an error toast message
      toast.error('Error uploading the image. Please try again.')
    }
  }
  const [oldImg, setOldImg] = useState(true)

  useEffect(() => {
    // Check if postContent.uploadImg has changed before triggering the upload
    if (oldImg) {
      return
    }
    if (prevUploadImg.current !== postContent.uploadImg) {
      handleUploadButtonClick()
      prevUploadImg.current = postContent.uploadImg // Update the ref with the new value
    }
  }, [postContent.uploadImg])

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
      setImageUrl('')
      setOldImg(false)

      // Close the deletion in progress toast
      toast.dismiss(deletingToast)
    } catch (error) {
      console.error('Error deleting the image:', error)
      // Display an error toast message
      toast.error('Error deleting the image. Please try again.')
    }
  }

  const [categories, setCategories] = useState([])
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/categories/get`
      )
      setCategories(response.data)
    } catch (error) {
      toast.error(
        `Error: ${error.message || 'An error occurred while fetching data.'}`
      )
    } finally {
      toast.dismiss()
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  const getUpdatePostData = async () => {
    try {
      const loadingToast = toast.info('Loading...', { autoClose: false })
      // Assuming postId is defined somewhere in your component state
      const postId = router?.query.editpost[1]
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/onepost/${postId}`
      )
      if (data) {
        toast.dismiss(loadingToast)
        setPostContent({
          ...data.post,
          uploadImg: data.post.image,
          sCategory: data.post.category,
        })
      } else {
        toast.error('Oops! please try again!')
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
      toast.error(
        `Error submitting the form. Please try again. ${error.message}`
      )
    }
  }

  useEffect(() => {
    getUpdatePostData()
  }, [router?.query?.editpost[1]])

  const updateData = async () => {
    try {
      const loadingToast = toast.info('Updating...', { autoClose: false })
      const postIds = router.query.editpost[1]
      const postDetails = {
        title: postContent.title,
        image: oldImg ? postContent.uploadImg : imageUrl,
        category: postContent.sCategory,
        content: postContent.content,
        banner: postContent.banner,
        tags: postContent.tags,
      }

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/updatepost/${postIds}`,
        postDetails
      )

      if (data.success) {
        toast.dismiss(loadingToast)
        toast.success(data.msg, { autoClose: 1500 })
        router.push('/admin/allposts')
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      console.error('Error updating the post:', error)
      toast.error(`Error updating the post. Please try again. ${error.message}`)
    }
  }

  const cancelUpdate = () => {
    router.push('/admin/allposts')
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'list',
    'bullet',
  ]

  return (
    <div className='newPost'>
      <div className='container'>
        <div className='newPostContainer'>
          <div className='title'>
            <h1>Edit Post</h1>
          </div>
          <div className='newPostContent'>
            <div className='inputGroup'>
              <label>Title:</label>
              <input
                onChange={(e) => postContentHandler('title', e.target.value)}
                name='title'
                value={postContent?.title}
                type='text'
                placeholder='Enter Title...'
              />
            </div>
            <div className='inputGroup'>
              <label>Content:</label>
              <ReactQuill
                theme='snow'
                value={postContent?.content}
                onChange={(value) => postContentHandler('content', value)}
                modules={modules}
                formats={formats}
                placeholder='Enter Content...'
              />
            </div>
            <div className='inputGroup'>
              <label>Upload Image:</label>
              <input
                type='file'
                onChange={(e) =>
                  postContentHandler('uploadImg', e.target.files[0])
                }
              />
              {oldImg && postContent.uploadImg && (
                <div className='uploadedImg'>
                  <img
                    style={{ width: '200px' }}
                    className='uploadText'
                    src={postContent?.uploadImg}
                  />
                  <button>
                    <i
                      onClick={() => deleteImage(postContent.uploadImg)}
                      className='fas fa-xmark'
                    ></i>
                  </button>
                </div>
              )}
              {imageUrl && (
                <div className='uploadedImg'>
                  <img
                    style={{ width: '200px' }}
                    className='uploadText'
                    src={imageUrl}
                  />
                  <button>
                    <i
                      onClick={() => deleteImage(imageUrl)}
                      className='fas fa-xmark'
                    ></i>
                  </button>
                </div>
              )}
            </div>
            <div className='inputGroup inputGroupB'>
              <label>Banner</label>
              <input
                type='checkbox'
                checked={postContent.banner}
                value={postContent?.banner}
                onChange={(e) => postContentHandler('banner', e.target.checked)}
              />
            </div>
            <div className='inputGroup'>
              <div className='categories'>
                <label>Choose Category:</label>
                <select
                  value={postContent?.sCategory}
                  onChange={(e) =>
                    postContentHandler('sCategory', e.target.value)
                  }
                >
                  <option value={null} disabled>
                    Choose Category
                  </option>
                  {categories &&
                    categories?.categories?.map((cat) => (
                      <option key={cat._id} value={cat.link}>
                        {cat.category}
                      </option>
                    ))}
                </select>
              </div>
              <div className='inputGroup'>
                <label>Tags:</label>
                <input
                  onKeyDown={handleInputKeydown}
                  type='text'
                  placeholder='Enter Tags...'
                />
                <div
                  style={{ display: 'flex', gap: '10px' }}
                  className='tagsContainer'
                >
                  {postContent?.tags?.map((tag, index) => (
                    <div key={index} className='tagsContent'>
                      <span>{tag}</span>
                      <button onClick={() => handleDeleteTag(index)}>X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='submitButton'>
              <button onClick={updateData}>Update Post</button>
              <button
                onClick={cancelUpdate}
                style={{ marginLeft: '10px', backgroundColor: 'red' }}
              >
                Cancel Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
