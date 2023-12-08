import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header() {
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
    <div className='topHeader'>
      <div>
        <h3 className='H-heading'>Latest News:</h3>
        <div>
          {posts && (
            <Link 
            style={{color: 'white'}}
              href={`/${posts[0]?.category}/${posts[0]?.date}/${posts[0]?._id}`}
            >
              <h3>{posts[0]?.title}</h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
