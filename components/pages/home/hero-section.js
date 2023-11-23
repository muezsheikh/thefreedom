import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <div className="container">
    <div className='heroSection'>
      <Link href='/asd/asd'>
      <div className="post-style-one">
        <div className="img">
          <img src="https://thefreedom.com.pk/wp-content/uploads/2023/07/754e58b5-6d81-49e7-9f0f-b2981deb395a-800x445.jpeg" alt="" />
        </div>
        <div className="body">
          <h3>Business</h3>
          <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
          <p>November 23, 2023 </p>
        </div>
      </div>
      </Link>
      <div className='heroBox2'>
      <div className="post-style-one">
        <div className="img">
          <img src="https://thefreedom.com.pk/wp-content/uploads/2023/07/754e58b5-6d81-49e7-9f0f-b2981deb395a-800x445.jpeg" alt="" />
        </div>
        <div className="body">
          <h3>Business</h3>
          <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
          <p>November 23, 2023 </p>
        </div>
      </div>
      <div className="post-style-one">
        <div className="img">
          <img src="https://thefreedom.com.pk/wp-content/uploads/2023/07/754e58b5-6d81-49e7-9f0f-b2981deb395a-800x445.jpeg" alt="" />
        </div>
        <div className="body">
          <h3>Business</h3>
          <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
          <p>November 23, 2023 </p>
        </div>
      </div>
      </div>

    </div>
    </div>
  )
}
