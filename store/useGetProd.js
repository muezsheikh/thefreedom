import { create } from 'zustand'
import axios from 'axios'

const useGetProd = create((set) => ({
  data: null,
  loading: true,
  getCustom: null,
  getCustomFunc: (post) => {
    set({ getCustom: post })
  },
  fetchProd: async (id) => {
    set({ loading: true })
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get-one/${id}`
      )
      const result = response.data
      set({ data: result, loading: false })
    } catch (error) {
      console.error('Error fetching data:', error)
      set({ loading: false })
    }
  },
}))

export default useGetProd
