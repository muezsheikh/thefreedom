import axios from 'axios'
import { storages } from '@/utils/fire-base'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const SubmitBtn = ({ postContent, formattedDate,username }) => {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [posts, setPosts] = useState([])
  const getPosts = async () => {
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
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (imageUrl !== '') {
      // Construct postDetails after imageUrl is set
      const currentDate = new Date()
      const year = currentDate.getFullYear().toString().slice(2) // Extract last two digits of the year
      const month = currentDate.toLocaleString('default', { month: 'short' }) // Get abbreviated month name
      const day = currentDate.getDate() // Get the day of the month

      const formattedDates = `${day}-${month}-${year}`


      const constructedPostDetails = {
        title: postContent.title,
        image: imageUrl,
        category: postContent.sCategory,
        content: postContent.content,
        banner: postContent.banner,
        tags: postContent.tags,
        date: formattedDates,
        postCustomId: posts?.posts?.length + 1,
        postby: username
      }

      submitPost(constructedPostDetails) // Submit the post once constructed
    }
  }, [imageUrl, postContent, formattedDate])

  const uploadImage = async (uploadImg) => {
    try {
      const imageRef = ref(
        storages,
        `/images/${uploadImg.name}${posts?.posts?.length + 1}`
      )
      await uploadBytes(imageRef, uploadImg)
      const imageUrl = await getDownloadURL(imageRef)
      return imageUrl
    } catch (error) {
      console.error('Error uploading the image:', error)
      throw error
    }
  }

  const submitPost = async (postDetails) => {
    try {
      // Submit postDetails to the API
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/create`,
        postDetails
      )

      if (data.success) {
        toast.success(data.msg, { autoClose: 1500 })
        router.reload()
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
      toast.error('Error submitting the form. Please try again.')
    }
  }

  const submitFunc = async () => {
    try {
      // Check if an image is selected
     
      if (!postContent.title) {
        toast.error('Please enter your title. ')
        return
      }
      if (!postContent.content) {
        toast.error('Please enter your Content.')
        return
      }
      if (!postContent.sCategory) {
        toast.error('Please select your Category.')
        return
      }
      if (!postContent.uploadImg) {
        toast.error('image is required')
        return
      }
      toast.loading('posting...')

      // Upload image and wait for the URL
      const uploadedImageUrl = await uploadImage(postContent.uploadImg)
      setImageUrl(uploadedImageUrl)
      toast.dismiss()
      toast.success('Image uploaded successfully', { autoClose: 1500 })
    } catch (error) {
      console.error('Error uploading the image:', error)
      toast.error('Error uploading the image. Please try again.')
    }
  }

  const currentDate = new Date()
  const year = currentDate.getFullYear().toString().slice(2) // Extract last two digits of the year
  const month = currentDate.toLocaleString('default', { month: 'short' }) // Get abbreviated month name
  const day = currentDate.getDate() // Get the day of the month

  const formattedDates = `${day}-${month}-${year}`

  return <button onClick={submitFunc}>Add Post</button>
}
