import React, { useState,useEffect } from 'react'
import ReactQuillSection from '@/components/admin/newpost/ReactQuillSection'
import { SubmitBtn } from '@/components/admin/newpost/SubmitBtn'
import Categories from '@/components/admin/newpost/Categories'
import ImageUp from '@/components/admin/newpost/ImageUp'
import axios from 'axios'

export default function NewPost() {
  const [userInfo, setUserInfo] = useState()
  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/getuser`,
        { withCredentials: true }
      )
      setUserInfo(data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    } 
  }
  useEffect(() => {
    fetchUserInfo()
  }, [])

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
    uploadedImageUrl: '',
  })

  const postContentHandler = (name, value) => {
    if (name === 'uploadImg' && value) {
      const imageUrl = URL.createObjectURL(value)
      setPostContent({
        ...postContent,
        [name]: value,
        uploadedImageUrl: imageUrl,
      })
    } else {
      setPostContent({ ...postContent, [name]: value })
    }
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
              <ReactQuillSection
                postContent={postContent}
                postContentHandler={postContentHandler}
              />
            </div>
            <div className='inputGroup'>
              <ImageUp
                postContent={postContent}
                postContentHandler={postContentHandler}
              />
            </div>
            <div className='inputGroup inputGroupB'>
              <label>Banner</label>
              <input
                type='checkbox'
                onChange={(e) => postContentHandler('banner', e.target.checked)}
              />
            </div>
            <div className='inputGroup'>
              <Categories
                postContent={postContent}
                postContentHandler={postContentHandler}
              />
            </div>

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
            {/* <div className='inputGroup' style={{ marginTop: '1rem' }}>
              <label>Custom Date:</label>
              <input type='date' onChange={handleDateChange} />
            </div> */}
            <div className='inputGroup'>
              <label>Post by:</label>
              <input
                name='userinfo'
                value={userInfo?.username}
                type='text'
                disabled
              />
            </div>
            <div className='submitButton'>
              <SubmitBtn
                postContent={postContent}
                imageUrl={postContent.uploadedImageUrl}
                formattedDate={formattedDate}
                username={userInfo?.username}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
