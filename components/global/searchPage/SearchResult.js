import Link from 'next/link'
import React from 'react'
export default function SearchResult({ filterPosts, postLoading }) {
  return (
    <div className='searchResult'>
      {/* {postLoading}  */}

      {filterPosts.map((post, ind) => (
        <div className='post-style' key={post._id}>
          <div className='img'>
            <img src={post.image} alt='' />
          </div>
          <div className='body'>
            <Link href={`/${post.category}`} style={{ color: 'black' }}>
              <h3>{post.category}</h3>
            </Link>
            <Link
              href={`/${post.category}/${post.date}/${post._id}`}
              style={{ color: 'black' }}
            >
              <h1>{post.title}</h1>
            </Link>
            <p>{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
