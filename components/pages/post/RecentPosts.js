import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
export default function RecentPosts({ post }) {
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
  const recentPosts = posts?.filter((item) => item.category === post?.category)
  return (
    <div className='recentPost'>
      <div className='title'>
        <h3>Similar Posts</h3>
      </div>
      {recentPosts && (
        <div className='postsC'>
          {recentPosts.slice(0,3).map((post) => (
            <div className='post-style' key={post._id}>
              <div className='img'>
                {post.image && <img src={post.image} alt='' />}
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
      )}
    </div>
  )
}
