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
import AddCategory from './components/AddCategory'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function NewPost() {
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
  const [activeCat, setActiveCat] = useState(false)
  const [categories, setCategories] = useState([])
  console.log('look', categories.categories)

  const activeCatFunc = () => {
    setActiveCat(!activeCat)
  }
  const router = useRouter()
  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
    banner: false,
    sCategory: '',
    nCategory: '',
    categoryLink: '',
    uploadImg: null,
    tags: [],
    tagInputValue: '',
  })

  const postContentHandler = (name, value) => {
    setPostContent({ ...postContent, [name]: value })
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
  useEffect(() => {
    // Check if postContent.uploadImg has changed before triggering the upload
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

      // Close the deletion in progress toast
      toast.dismiss(deletingToast)
    } catch (error) {
      console.error('Error deleting the image:', error)
      // Display an error toast message
      toast.error('Error deleting the image. Please try again.')
    }
  }

  const submitFunc = async () => {
    try {
      // Input validation
      if (!postContent.title || !postContent.content) {
        // Show message if title or content is missing
        toast.error('Title and content are required.')
        return;
      }
  
      if (postContent.banner && !imageUrl) {
        // Show message if banner is true but no image is uploaded
        toast.error('Image is required for banner.')
        return;
      }
  
      if (!postContent.sCategory) {
        // Show message if category is not selected
        toast.error('Category is required.')
        return;
      }
  
      const loadingToast = toast.info('Submitting...', { autoClose: false })
  
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
  
      const postDetails = {
        title: postContent.title,
        image: imageUrl && imageUrl,
        category: postContent.sCategory,
        content: postContent.content,
        banner: postContent.banner,
        tags: postContent.tags,
        date: formattedDate === 'Invalid Date' ? currentDate : formattedDate,
      }
  
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/create`,
        postDetails
      )
  
      if (data.success) {
        toast.dismiss(loadingToast)
        toast.success(data.msg, { autoClose: 1500 })
        router.reload()
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
      toast.error(
        `Error submitting the form. Please try again. ${error.message}`
      )
    }
  }
  
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
  }, [toast])

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
            <h1>Add New Post</h1>
          </div>
          <div className='newPostContent'>
            <div className='inputGroup'>
              <label>Title:</label>
              <input
                onChange={(e) => postContentHandler('title', e.target.value)}
                name='title'
                value={postContent.title}
                type='text'
                placeholder='Enter Title...'
              />
            </div>
            <div className='inputGroup'>
              <label>Content:</label>
              <ReactQuill
                theme='snow'
                value={postContent.content}
                onChange={(value)=> postContentHandler('content',value)}
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
              {imageUrl && (
                <div className='uploadedImg'>
                  <img
                    src={imageUrl}
                    alt='Uploaded'
                    style={{ width: '200px' }}
                    className='uploadText'
                  />
                  <button onClick={() => deleteImage(imageUrl)}>
                    <i className='fas fa-xmark'></i>
                  </button>
                </div>
              )}
            </div>
            <div className='inputGroup inputGroupB'>
              <label>Banner</label>
              <input
                type='checkbox'
                onChange={(e) => postContentHandler('banner', e.target.checked)}
              />
            </div>
            <div className='inputGroup'>
              <div className='categories'>
                <label>Choose Category:</label>
                <select
                  onChange={(e) =>
                    postContentHandler('sCategory', e.target.value)
                  }
                  defaultValue={null}
                >
                  <option value={null} disabled selected>
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
              <div className='submitButton' onClick={activeCatFunc}>
                <button>Add New Category</button>
              </div>
              <AddCategory
                getCategories={getCategories}
                activeCat={activeCat}
                postContent={postContent}
                postContentHandler={postContentHandler}
              />
              <div className='inputGroup' style={{ marginTop: '1rem' }}>
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
                  {postContent.tags.map((tag, index) => (
                    <div key={index} className='tagsContent'>
                      <span>{tag}</span>
                      <button onClick={() => handleDeleteTag(index)}>X</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='inputGroup' style={{ marginTop: '1rem' }}>
                <label>Custom Date:</label>
                <input type='date' onChange={handleDateChange} />
              </div>
            </div>
            <div className='submitButton'>
              <button onClick={submitFunc}>Add Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
