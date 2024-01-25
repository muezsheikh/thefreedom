import axios from 'axios'
import { storages } from '@/utils/fire-base'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const SubmitBtn = ({ postContent, formattedDate }) => {
  console.log('image', postContent.uploadedImageUrl)
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [postDetails, setPostDetails] = useState(null)

  useEffect(() => {
    if (imageUrl !== '') {
      // Construct postDetails after imageUrl is set
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const constructedPostDetails = {
        title: postContent.title,
        image: imageUrl,
        category: postContent.sCategory,
        content: postContent.content,
        banner: postContent.banner,
        tags: postContent.tags,
        date: formattedDate === null ? currentDate : formattedDate,
      }

      setPostDetails(constructedPostDetails)
    }
  }, [imageUrl, postContent, formattedDate])

  const uploadImage = async (uploadImg) => {
    try {
      const imageRef = ref(storages, `/images/${uploadImg.name}`)
      await uploadBytes(imageRef, uploadImg)
      const imageUrl = await getDownloadURL(imageRef)
      console.log('Image uploaded successfully. URL:', imageUrl)
      return imageUrl
    } catch (error) {
      console.error('Error uploading the image:', error)
      throw error
    }
  }

  const submitFunc = async () => {
    try {
      // Check if an image is selected
      if (!postContent.uploadImg) {
        console.error('No image selected.')
        return
      }

      // Upload image and wait for the URL
      const uploadedImageUrl = await uploadImage(postContent.uploadImg)
      setImageUrl(uploadedImageUrl)
      toast.success('Image uploaded successfully', { autoClose: 1500 })

      // Construct post details
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const postDetails = {
        title: postContent.title,
        image: uploadedImageUrl, // Use the uploaded image URL
        category: postContent.sCategory,
        content: postContent.content,
        banner: postContent.banner,
        tags: postContent.tags,
        date: formattedDate === null ? currentDate : formattedDate,
      }

      // Submit postDetails to the API
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/create`,
        postDetails
      )

      if (data.success) {
        toast.success(data.msg, { autoClose: 1500 })
        // Optionally reload the page or perform any other actions upon successful submission
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
      toast.error('Error submitting the form. Please try again.')
    }
  }

  console.log('imageUrl:', imageUrl)
  console.log('postDetails:', postDetails) // Check if postDetails is correctly constructed

  return <button onClick={submitFunc}>Add Post</button>
}
