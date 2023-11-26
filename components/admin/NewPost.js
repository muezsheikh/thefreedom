import React, { useEffect, useState } from 'react'
import { storages } from '@/utils/fire-base'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import axios from 'axios'
export default function NewPost() {
  const router = useRouter()
  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
    banner: false,
    sCategory: '',
    nCategory: '',
    uploadImg: null,
    tags: [],
    tagInputValue: ''
  })

  const postContentHandler = (name, value) => {
    setPostContent({ ...postContent, [name]: value })
  }
  const handleInputKeydown = (e) => {
    if (e.key === 'Enter') setPostContent({ ...postContent, tags: [...postContent.tags, e.target.value] })

  }

  const submitFunc = async () => {
    try {
      const loadingToast = toast.info('Submitting...', { autoClose: false });
      const imageRef = ref(storages, `/images/${postContent.uploadImg.name + v4()} `);
      await uploadBytes(imageRef, postContent.uploadImg);
      const imageUrl = await getDownloadURL(imageRef);
      const currentDate = new Date().toLocaleString();
      const postDetails = {
        title: postContent.title,
        image: imageUrl,
        category: !postContent.sCategory ? postContent.sCategory : postContent.nCategory,
        content: postContent.content,
        banner: postContent.banner,
        tags: postContent.tags,
        date: currentDate,
      };
      const {data} = await axios.get(`${process.env.HOST}/api/posts/create`, postDetails);
      if (data.success) {
        toast.dismiss(loadingToast);
        toast.success(data.msg, { autoClose: 1500 });
        router.reload();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error(`Error submitting the form. Please try again. ${error.message}`);
    }
  };


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
              <textarea
                placeholder='Enter Content...'
                onChange={(e) => postContentHandler('content', e.target.value)}
                value={postContent.content}
                name='content'
              ></textarea>
            </div>
            <div className='inputGroup'>
              <label>Upload Image:</label>
              <input
                type='file'
                onChange={(e) => postContentHandler('uploadImg', e.target.files[0])}
              />
              <p className='uploadText'>Upload Image</p>
            </div>
            <div className='inputGroup inputGroupB'>
              <label>Banner</label>
              <input type='checkbox' onChange={(e) => postContentHandler('banners', e.target.checked)} />
            </div>
            <div className='inputGroup'>
              <div className='categories'>
                <label>Select Category:</label>
                <select onChange={(e) => postContentHandler('sCategory', e.target.value)} defaultValue={null}>
                  <option value={null}>No Selected Category</option>
                  <option value='business'>Business</option>
                  <option value='technology'>Technology</option>
                  <option value='travel'>Travel</option>
                  <option value='fashion'>Fashion</option>
                  <option value='food'>Food</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              {!postContent.sCategory && (
                <div className='newCategory'>
                  <label>Add New Category:</label>
                  <div className='input'>
                    <input
                      type='text'
                      onChange={() => postContentHandler('nCategory', e.target.value)}
                      value={postContent.nCategory}
                      placeholder='Write New Category Name'
                    />
                  </div>
                </div>
              )}
              <div className='inputGroup'>
                <label>Tags:</label>
                <input
                  onKeyDown={handleInputKeydown}
                  type='text'
                  placeholder='Enter Tags...'
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  {postContent.tags.map((tag, ind) => (
                    <span key={ind}>{tag}</span>
                  ))}
                </div>
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
