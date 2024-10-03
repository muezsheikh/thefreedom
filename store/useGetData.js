import { create } from 'zustand'
import axios from 'axios'

const useGetData = create((set) => ({
  data: null,
  commentsData: null,
  repliesData: null,
  loading: true,
  repliesLoading: true,
  commentsLoading: true,
  getCategory: null,
  logoutLoading: false,
  logoutLoadingSuccess: false,
  getCategoryFunc: (categories) => {
    set({ getCategory: categories })
  },
  fetchData: async (api) => {
    set({ loading: true })
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/${api}`
      )
      const result = response.data
      set({ data: result, loading: false })
    } catch (error) {
      console.error('Error fetching data:', error)
      set({ loading: false })
    }
  },
  fetchReplies: async (api) => {
    set({ repliesLoading: true })
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/${api}`
      )
      const result = response.data
      set({ repliesData: result, repliesLoading: false })
    } catch (error) {
      console.error('Error fetching data:', error)
      set({ loading: false })
    }
  },
  fetchComments: async (api) => {
    set({ commentsLoading: true })
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/${api}`
      )
      const result = response.data
      set({ commentsData: result, commentsLoading: false })
    } catch (error) {
      console.error('Error fetching data:', error)
      set({ loading: false })
    }
  },
  logoutFunc: async () => {
    set({ logoutLoading: true })
    try {
      const response = axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`,
        { withCredentials: true }
      )
      if (response) {
        set({ logoutLoading: false, logoutLoadingSuccess: true })
        setTimeout(() => {
          set({ logoutLoadingSuccess: false })
        }, 2000)
      }
    } catch (error) {}
  },
}))

export default useGetData
