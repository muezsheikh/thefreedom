import Link from "next/link"
import React from "react"
export default function SearchResult({ filterPosts,postLoading }) {
  return (
    <div className='searchResult'>
      {/* {postLoading}  */}

      {filterPosts.map((post, ind) => (
        <div className='post-style' key={post._id}>
          <div className='img'>
            <img
              src={post.image}
              alt=''
            />
          </div>
          <div className='body'>
            <Link href={`/${post.category}`} style={{color: 'black'}}>
            <h3>{post.category}</h3>
            </Link>
            <Link href={`/${post.category}/${post.date}/${post._id}`} style={{color: 'black'}}>
            <h1>
              {post.title}
            </h1>
            </Link>
            <p>{post.date}</p>
          </div>
        </div>
      ))}
      <div className='post-style'>
        <div className='img'>
          <img
            src='https://thefreedom.com.pk/wp-content/uploads/2023/07/0ba11419-1135-4189-8747-73de4a211354-800x445.jpeg'
            alt=''
          />
        </div>
        <div className='body'>
          <h3>Business</h3>
          <h1>
            Lorem ipsum, dolor sit amet consectetur...
          </h1>
          <p>November 23, 2023</p>
        </div>
      </div>
      <div className='post-style'>
        <div className='img'>
          <img
            src='https://thefreedom.com.pk/wp-content/uploads/2023/07/0ba11419-1135-4189-8747-73de4a211354-800x445.jpeg'
            alt=''
          />
        </div>
        <div className='body'>
          <h3>Business</h3>
          <h1>
            Lorem ipsum, dolor sit amet consectetur....
          </h1>
          <p>November 23, 2023</p>
        </div>
      </div>
      <div className='post-style'>
        <div className='img'>
          <img
            src='https://thefreedom.com.pk/wp-content/uploads/2023/07/0ba11419-1135-4189-8747-73de4a211354-800x445.jpeg'
            alt=''
          />
        </div>
        <div className='body'>
          <h3>Business</h3>
          <h1>
            Lorem ipsum, dolor sit amet consectetur....
          </h1>
          <p>November 23, 2023</p>
        </div>
      </div>
    </div>
  )
}