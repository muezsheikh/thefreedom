import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import SearchResult from './SearchResult'
import axios from 'axios'

export default function SearchLayout({ activeSearch, activeSearchFunc }) {
  const [posts, setPosts] = useState([])
  const [postLoading, setPostLoading] = useState(false)

  const getPosts = async (input) => {
    setPostLoading(true)
    // if(!input || input === '') return setPosts([])
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_HOST
        }/api/posts/onepost/search?search=${input.trim()}`
      )
      setPosts(response.data.results)
    } catch (error) {
      console.log(error)
    } finally {
      setPostLoading(false)
    }
  }
  return (
    <div className={`searchContainer ${activeSearch ? 'activeSearch' : ''}`}>
      <div className='searchCrossIcon'>
        <i className='fas fa-xmark' onClick={activeSearchFunc}></i>
      </div>
      <SearchInput inputChangeHandler={getPosts} />
      <SearchResult
        postLoading={postLoading}
        filterPosts={posts}
      />
    </div>
  )
}
