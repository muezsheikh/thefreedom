import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CatTags() {
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
  const pakistan = posts?.filter((item) => item.category === 'pakistan')
  const education = posts?.filter((item) => item.category === 'education')
  const environment = posts?.filter((item) => item.category === 'environment')
  const sports = posts?.filter((item) => item.category === 'sports')
  const fashionAndStyle = posts?.filter(
    (item) => item.category === 'fashion-and-style'
  )
  return (
    <div className='sidebarThree'>
      <div className='sidebarThreeTitle'>
        <h3>Main Categories</h3>
      </div>
      <div className='sidebarThreeContent'>
        {pakistan && (
          <div>
            <Link style={{ color: 'black' }} href={'/pakistan'}>
              <p>Pakistan</p>
            </Link>
            <p className='catTagQuantity'>{pakistan?.length}</p>
          </div>
        )}
        {education && (
          <div>
            <Link style={{ color: 'black' }} href={'/education'}>
              <p>Education</p>
            </Link>
            <p className='catTagQuantity'>{education?.length}</p>
          </div>
        )}
        {environment && (
          <div>
            <Link style={{ color: 'black' }} href={'/environment'}>
              <p>Environment</p>
            </Link>
            <p className='catTagQuantity'>{environment?.length}</p>
          </div>
        )}
        {sports && (
          <div>
            <Link style={{ color: 'black' }} href={'/sports'}>
              <p>Sports</p>
            </Link>
            <p className='catTagQuantity'>{sports?.length}</p>
          </div>
        )}
        {fashionAndStyle && (
          <div>
            <Link style={{ color: 'black' }} href={'/fashion-and-style'}>
              <p>Fashion And Style</p>
            </Link>
            <p className='catTagQuantity'>{fashionAndStyle?.length}</p>
          </div>
        )}
      </div>
    </div>
  )
}
