import React from 'react'
import { posts } from './data'

export default function AllPosts() {
  return (
    <div className='allPostsContainer'>
      <div className='container'>
        <div className='allPostsContent'>
          <div className='title'>
            <h1>All Posts</h1>
          </div>
          <div className='filterOptions'>
            <div className='dateSearchSystem'>
              <input type='date' name='' id='' />
            </div>
            <div className='searchSystem'>
              <input type='text' placeholder='Search...' />
            </div>
          </div>
          <div className='postsList'>
            {posts.map((post, ind) => (
              <div
                className={`post ${post.banner ? 'bannerPost' : ''}`}
                key={ind}
              >
                <div className='img'>
                  <img
                    src='https://thefreedom.com.pk/wp-content/uploads/2023/01/12D607FC-A56E-4BF8-9904-E2DACFEAB69D-130x90.jpeg'
                    alt=''
                  />
                </div>
                <div className='body'>
                  <h3>{post.title}</h3>
                  <p>{post.content.slice(0, 80)}...</p>
                  <p className='date'>{post.date}</p>
                  {post.banner && <p className='bannerTag'>Banner</p>}

                  <div className='editPostBtn'>
                    <button>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
