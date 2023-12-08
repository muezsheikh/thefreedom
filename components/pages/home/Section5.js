import React from 'react'
import Link from 'next/link'
export default function Section5({ posts }) {
  const faPosts = posts?.filter((item) => item.category == 'fashion-and-style')

  return (
    <div className='sectionContainer section5'>
      <div className='sectionContainerTitle'>
        <Link style={{ color: 'black' }} href={'/fashion-and-style'}>
          <h3>Fashion And Style</h3>
        </Link>

        <Link href={'/fashion-and-style'}>
          <p>View All</p>
        </Link>
      </div>
      <div className='section5Container'>
        {faPosts.map((post) => (
          <div className='post-style' key={post._id}>
            {post.image && (
              <div className='img'>
                <img src={post.image} alt='' />
              </div>
            )}
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
  )
}
