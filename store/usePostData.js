import { create } from 'zustand'
import axios from 'axios'

const usePostData = create((set) => ({
  postDataLoading: false,
  postDataSuccess: false,
  postMessageLoading: false,
  postMessageSuccess: false,
  postCommentLoading: false,
  postCommentSuccess: false,
  postReplyLoading: false,
  postReplySuccess: false,
  postUserLoading: false,
  postUserSuccess: false,
  postLoginLoading: false,
  postLoginSuccess: false,
  postCommentFunc: async (postCommentDetails) => {
    set({ postCommentLoading: true })
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/create`,
        postCommentDetails
      )
      if (response) {
        set({ postCommentLoading: false, postCommentSuccess: true })
        setTimeout(() => {
          set({ postCommentSuccess: false })
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  },
  postReplyFunc: async (postReplyDetails) => {
    set({ postReplyLoading: true })
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/comments/replies/create`,
        postReplyDetails
      )
      if (response) {
        set({ postReplyLoading: false, postReplySuccess: true })
        setTimeout(() => {
          set({ postReplySuccess: false })
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  },
  postUserFunc: async (postUserDetails) => {
    set({ postUserLoading: true })
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/createuser`,
        postUserDetails
      )
      if (response) {
        set({ postUserLoading: false, postUserSuccess: true })
        setTimeout(() => {
          set({ postUserSuccess: false })
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  },
  postLoginFunc: async (postLoginDetails) => {
    set({ postLoginLoading: true })
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/loginuser`,
        postLoginDetails,
        { withCredentials: true }
      )
      if (response) {
        set({ postLoginLoading: false, postLoginSuccess: true })
        setTimeout(() => {
          set({ postLoginSuccess: false })
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  },
}))

export default usePostData
