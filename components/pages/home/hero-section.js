import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

export default function HeroSection({ posts, loading }) {
  const banners = posts?.filter((item) => item.banner)

  return (
    <div className='container'>
      {loading ? (
        <>
          <div className='heroSkeletonContainer'>
            <div className='skeleton-element'></div>
          </div>
        </>
      ) : (
        <div className='heroSection'>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              disableOnInteraction: false,
              delay: 2500,
            }}
            navigation
            pagination={{ clickable: true }}
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner._id}>
                <div className='post-style-one post-style-one-hero'>
                  <div className='img'>
                    {banner.image && (
                      <Image
                        src={banner.image}
                        alt=''
                        width={500}
                        height={300}
                      />
                    )}
                  </div>
                  <div className='body'>
                    {banner.category && (
                      <h3 className='catHeading'>{banner.category}</h3>
                    )}
                    {banner.title && (
                      <Link
                        href={`/${banner.category}/posts/${
                          banner.postCustomId
                            ? `${banner.postCustomId}`
                            : `${banner._id}`
                        }`}
                        style={{ color: 'white' }}
                      >
                        <h1>{banner.title}</h1>
                      </Link>
                    )}
                    {banner.date && <p>{banner.date}</p>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='heroBoxes'>
            {banners &&
              banners.slice(0, 2).map((banner) => (
                <div className='post-style-one' key={banner._id}>
                  <div className='img'>
                    <img src={banner.image} alt='' />
                  </div>
                  <div className='body'>
                    <h3>{banner.category}</h3>
                    <Link
                    href={`/${banner.category}/posts/${
                      banner.postCustomId
                        ? `${banner.postCustomId}`
                        : `${banner._id}`
                    }`}
                      style={{ color: 'white' }}
                    >
                      <h1>{banner.title}</h1>
                    </Link>
                    <p>{banner.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
