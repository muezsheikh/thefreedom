import React from 'react'
import Link from 'next/link'

export default function Section2({ loading, posts }) {
  const pakPosts = posts.filter((item) => item.category === 'pakistan')

  return (
    <div className='section2MainContainer sectionContainer'>
      <div className='sectionContainerTitle'>
        <h3>Pakistan</h3>
        <Link href={'/pakistan'}>
          <p>View All</p>
        </Link>
      </div>
      <div className='section2Container'>
        {loading ? (
          <>
            <div className='heroSkeletonContainer'>
              <div className='skeleton-element'></div>
            </div>
          </>
        ) : (
          <>
            <div className='post-style-one'>
              <div className='img'>
                {pakPosts && <img src={pakPosts[0]?.image} alt='' />}
              </div>
              <div className='body'>
                <h3>{pakPosts[0]?.category}</h3>
                <Link
                  href={`/${pakPosts[0]?.category}/posts/${
                    pakPosts[0]?.postCustomId
                      ? `${pakPosts[0]?.postCustomId}`
                      : `${pakPosts[0]?._id}`
                  }`}
                >
                  <h1>{pakPosts[0]?.title}</h1>
                </Link>
                <p>{pakPosts[0]?.date}</p>
              </div>
            </div>
          </>
        )}

        <div className='section2Boxes'>
          {loading ? (
            <>
              <div className='heroSkeletonContainer heroSkeletonContainerSection2'>
                <div className='skeleton-element'></div>
                <div className='skeleton-element'></div>
                <div className='skeleton-element'></div>
                <div className='skeleton-element'></div>
              </div>
            </>
          ) : (
            pakPosts &&
            pakPosts.slice(0, 4).map((post) => {
              return (
                <div className='post-style' key={post._id}>
                  <div className='img'>
                    {post.image && <img src={post?.image} alt='' />}
                  </div>
                  <div className='body'>
                    <h3 className='categoryName'>{post.category}</h3>
                    <Link
                      href={`/${post?.category}/posts/${
                        post?.postCustomId
                          ? `${post?.postCustomId}`
                          : `${post?._id}`
                      }`}
                    >
                      <h1>{post.title}</h1>
                    </Link>
                    <p>{post.date}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
