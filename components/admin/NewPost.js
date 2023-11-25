import React, { useEffect, useState } from 'react'
import { storages } from '@/utils/fire-base'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import { imgUploadingFunc } from '@/utils/imgUploading'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
export default function NewPost() {
  const router = useRouter()
  const [titleContent, setTitleContent] = useState({
    title: '',
    content: '',
  })
  const [banner, setBanner] = useState(false)
  const bannerHandler = (e) => {
    setBanner(e.target.checked)
  }
  const [sCategory, setSCategory] = useState('null')
  const sCategoryHandler = (e) => {
    setSCategory(e.target.value)
  }
  // console.log(sCategory)
  const [nCategory, setNCategory] = useState('')
  const nCategoryHandler = (e) => {
    setNCategory(e.target.value)
  }
  // console.log(nCategory)

  const titleContentHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setTitleContent({ ...titleContent, [name]: value })
  }

  // useEffect(() => {
  //   uploadImg && imgUploadingFunc(uploadImg)
  // }, [uploadImg])
  const [uploadImg, setUploadImage] = useState()
  const submitFunc = async () => {
    try {
      // Display loading message
      const loadingToast = toast.info('Submitting...', { autoClose: false });
  
  
      // Upload image to Firebase Cloud
      const imageRef = ref(storages, `/images/${uploadImg.name + v4()} `);
      await uploadBytes(imageRef, uploadImg);
  
  
      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
  
  
      // Get present date in a nice human-readable format
      const currentDate = new Date().toLocaleString();
  
      // Create post details object
      const postDetails = {
        title: titleContent.title,
        image: imageUrl,
        category: sCategory !== 'null' ? sCategory : nCategory,
        content: titleContent.content,
        banner: banner,
        date: currentDate,
      };
  
  
      // Send post details to the API
      const response = await fetch('http://localhost:3000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postDetails),
      });
  
  
      if (response.ok) {
        // Close the loading message
        toast.dismiss(loadingToast);
        // Display s success message
        toast.success('Posted successfully!', { autoClose: 1500 });
  
        // Clear the image URL state
        setUploadImage(null);
        
  
        // Reload the page or handle navigation as needed
        router.reload();
      } else {
        // Display error message
        toast.error(`Error posting the data. Status: ${response.status}, ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Display error message
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
                onChange={titleContentHandler}
                name='title'
                value={titleContent.title}
                type='text'
                placeholder='Enter Title...'
              />
            </div>
            <div className='inputGroup'>
              <label>Content:</label>
              <textarea
                placeholder='Enter Content...'
                onChange={titleContentHandler}
                value={titleContent.content}
                name='content'
              ></textarea>
            </div>
            <div className='inputGroup'>
              <label>Upload Image:</label>
              <input
                type='file'
                onChange={(e) => setUploadImage(e.target.files[0])}
              />
              <p className='uploadText'>Upload Image</p>
            </div>
            <div className='inputGroup inputGroupB'>
              <label>Banner</label>
              <input type='checkbox' onChange={bannerHandler} />
            </div>
            <div className='inputGroup'>
              <div className='categories'>
                <label>Select Category:</label>
                <select onChange={sCategoryHandler} defaultValue={'null'}>
                  <option value={'null'}>No Selected Category</option>
                  <option value='business'>Business</option>
                  <option value='technology'>Technology</option>
                  <option value='travel'>Travel</option>
                  <option value='fashion'>Fashion</option>
                  <option value='food'>Food</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              {sCategory === 'null' && (
                <div className='newCategory'>
                  <label>Add New Category:</label>
                  <div className='input'>
                    <input
                      type='text'
                      onChange={nCategoryHandler}
                      value={nCategory}
                      placeholder='Write New Category Name'
                    />
                  </div>
                </div>
              )}
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
