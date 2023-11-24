import Link from 'next/link'
import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSection() {
  return (
    <div className="container">
      <div className='heroSection'>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            disableOnInteraction: false,
            delay: 2500
          }}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className="post-style-one post-style-one-hero">
              <div className="img">
                <img src="https://thefreedom.com.pk/wp-content/uploads/2023/07/754e58b5-6d81-49e7-9f0f-b2981deb395a-800x445.jpeg" alt="" />
              </div>
              <div className="body">
                <h3 className='catHeading'>Business</h3>
                <Link href='/asd/asd' style={{ color: 'white' }}>
                  <h1 >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
                </Link>
                <p>November 23, 2023 </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="post-style-one post-style-one-hero">
              <div className="img">
                <img src="https://thefreedom.com.pk/wp-content/uploads/2023/07/754e58b5-6d81-49e7-9f0f-b2981deb395a-800x445.jpeg" alt="" />
              </div>
              <div className="body">
                <h3>Business</h3>
                <Link href='/asd/asd' style={{ color: 'white' }}>
                  <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
                </Link>
                <p>November 23, 2023 </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>


        <div className="heroBoxes">
          <div className="post-style-one">
            <div className="img">
              <img src="https://thefreedom.com.pk/wp-content/uploads/2023/02/A90E4B50-B5B7-4507-9C44-16FA56CBFC2F-390x205.jpeg" alt="" />
            </div>
            <div className="body">
              <h3>Business</h3>
              <Link href='/asd/asd' style={{ color: 'white' }}>
                <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
              </Link>
              <p>November 23, 2023 </p>
            </div>
          </div>
          <div className="post-style-one">
            <div className="img">
              <img src="https://thefreedom.com.pk/wp-content/uploads/2023/02/A90E4B50-B5B7-4507-9C44-16FA56CBFC2F-390x205.jpeg" alt="" />
            </div>
            <div className="body">
              <h3>Business</h3>
              <Link href='/asd/asd' style={{ color: 'white' }}>
                <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod in obcaecati provident quae pariatur consectetur.</h1>
              </Link>
              <p>November 23, 2023 </p>
            </div>
          </div>
        </div>




      </div>

    </div>
  )
}


