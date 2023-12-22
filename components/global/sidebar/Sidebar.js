import React, { useState, useEffect } from 'react'
import MainTags from './MainTags'
import CatTags from './CatTags'
import Link from 'next/link'
import axios from 'axios'

export default function () {
  const [posts, setPosts] = useState([])
  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get`
      )
      setPosts(response.data.posts)
    } catch (error) {
    } finally {
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebarOne'>
        <div className='sidebarOneTitle'>
          <h3>Recent Posts</h3>
        </div>
        <div className='post-style-ones'>
          <div className='img'>
            <img src={posts[0]?.image} alt='' />
          </div>
          <div className='body'>
            <h3>{posts[0]?.category}</h3>
            <Link
              href={`/${posts[0]?.category}/${posts[0]?.date}/${posts[0]?._id}`}
            >
              <h1>{posts[0]?.title}</h1>
            </Link>
            <p>{posts[0]?.date}</p>
          </div>
        </div>
        <div className='sidebarBoxes'>
          {posts &&
            posts.slice(0, 3).map((post) => (
              <div className='post-style' key={post._id}>
                <div className='img'>
                  <img src={post.image} alt='' />
                </div>
                <div className='body'>
                  <h3>{post.category}</h3>
                  <Link href={`/${post.category}/${post.date}/${post._id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{post.date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <MainTags /> */}
      <CatTags />
    </div>
  )
}
