import React from 'react'
import PageLayout from '../home/PageLayout'
import Link from 'next/link'

export default function PostsLayout({ posts, loading, postCategory }) {
  const filteredPosts = posts?.filter((post) => post.category === postCategory)
  return (
    <PageLayout>
      {filteredPosts && (
        <>
          <div className='postsPage'>
            <div className='post-style-one'>
              <div className='img'>
                {filteredPosts && <img src={filteredPosts[0]?.image} alt='' />}
              </div>
              <div className='body'>
                <h3>{filteredPosts[0]?.category}</h3>
                <Link
                  href={`/${filteredPosts[0]?.category}/posts/${
                    filteredPosts[0]?.postCustomId
                      ? `${filteredPosts[0]?.postCustomId}`
                      : `${filteredPosts[0]?._id}`
                  }`}
                >
                  <h1>{filteredPosts[0]?.title}</h1>
                </Link>
                <p>{filteredPosts[0]?.date}</p>
              </div>
            </div>
          </div>
          <div className='postsContainer'>
            {filteredPosts &&
              filteredPosts?.map((post) => (
                <div className='post-style'>
                  <div className='img'>
                    <img src={post.image} alt='' />
                  </div>
                  <div className='body'>
                    <h3>{post.category}</h3>
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
              ))}
          </div>
        </>
      )}
    </PageLayout>
  )
}
