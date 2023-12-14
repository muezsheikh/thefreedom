import Link from 'next/link'
import React from 'react'

export default function Section3({ posts, loading }) {
  const enPosts = posts.filter((item) => item.category == 'environment')

  return (
    <div className='sectionContainer section3'>
      <div className='sectionContainerTitle'>
      <Link style={{color: 'black'}} href={'/environment'}>

        <h3>Environment</h3>
        </Link>

        <Link href={'/environment'}>
          <p>View All</p>
        </Link>
      </div>
      <div className='section3Container'>
        {loading ? (
          <>
            <div className='heroSkeletonContainer' style={{width: "100%"}}> 
              <div className='skeleton-element' style={{width: "100%"}}></div>
            </div>
          </>
        ) : (
          enPosts &&
          enPosts.slice(0, 6).map((post) => {
            return (
                <div className='post-style' key={post._id}>
                  <div className='img'>
                    {post.image &&
                    <img
                      src={post.image}
                      alt=''
                    />
                    }
                  </div>
                  <div className='body'>
                    <h3>{post.category}</h3>
                    <Link href={`/${post.category}/${post.date}/${post._id}`}>
                    <h1>
                      {post.title}
                    </h1>
                    </Link>
                    <p>{post.date}</p>
                  </div>
                </div>
            )
          })
        )}
      </div>
    </div>
  )
}
