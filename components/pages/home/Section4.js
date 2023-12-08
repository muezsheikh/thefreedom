import React from 'react'
import Link from 'next/link'
export default function Section4({ posts, loading }) {
  const eduPosts = posts?.filter((item) => item.category == 'education')
  const spoPosts = posts?.filter((item) => item.category == 'sports')

  return (
    <div className='section4'>
      <div className='sectionContainer'>
        <div className='sectionContainerTitle'>
          <Link style={{ color: 'black' }} href={'/education'}>
            <h3>Education</h3>
          </Link>

          <Link href={'/education'}>
            <p>View All</p>
          </Link>
        </div>
        <div className='section4Container'>
          <div className='post-style-one'>
            <div className='img'>
              <img
                src={eduPosts[0]?.image}
                alt=''
              />
            </div>
            <div className='body'>
              <Link href={`/${eduPosts[0]?.category}`}>
              <h3>{eduPosts[0]?.category}</h3>
              </Link>
              <Link href={`/${eduPosts[0]?.category}/${eduPosts[0]?.date}/${eduPosts[0]?._id}`}>
              <h1>
                {eduPosts[0]?.title}
              </h1>
              </Link>
              <p>{eduPosts[0]?.date}</p>
            </div>
          </div>
          <div className='section4Boxes'>
            {eduPosts.slice(0,4).map((post)=>(

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
            ) )}
          </div>
        </div>
      </div>
      <div className='sectionContainer'>
        <div className='sectionContainerTitle'>
          <Link style={{ color: 'black' }} href={'/sports'}>
            <h3>Sports</h3>
          </Link>

          <Link href={'/sports'}>
            <p>View All</p>
          </Link>
        </div>
        <div className='section4Container'>
          <div className='post-style-one'>
            <div className='img'>
              <img
                src={spoPosts[0]?.image}
                alt=''
              />
            </div>
            <div className='body'>
              <Link href={`/${spoPosts[0]?.category}`}>
              <h3>{spoPosts[0]?.category}</h3>
              </Link>
              <Link href={`/${spoPosts[0]?.category}/${spoPosts[0]?.date}/${spoPosts[0]?._id}`}>
              <h1>
                {spoPosts[0]?.title}
              </h1>
              </Link>
              <p>{spoPosts[0]?.date}</p>
            </div>
          </div>
          <div className='section4Boxes'>
            {spoPosts.slice(0,4).map((post)=>(

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
            ) )}
          </div>
        </div>
      </div>
      
    </div>
  )
}
