import React, { useEffect, useState } from 'react'
import styles from '@/styles/client/Home.module.css'
import Slider from 'react-slick'
import HeroLoader from './hero-loader'
import useGetProd from '@/store/useGetProd'
import Link from 'next/link'
import useGetData from '@/store/useGetData'
export default function HeroSection() {
  const { data, loading, fetchData } = useGetData()
  const { getCustomFunc } = useGetProd()

  useEffect(() => {
    fetchData('posts/get')
  }, [fetchData])

  const banners = data?.posts?.filter((item) => item.banner).slice(0, 5)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <>
      {loading ? (
        <>
          <HeroLoader />
        </>
      ) : (
        <>
          <Slider {...settings}>
            {banners?.map((item) => (
              <div className={styles.heroSection} key={item._id}>
                <img
                  src={item?.image}
                  alt='Event Image'
                  className={styles.heroImage}
                />
                <div className={styles.overlay}></div>
                <div className={styles.body}>
                  <Link
                    className={styles.title}
                    onClick={() => getCustomFunc(item)}
                    href={`/${item?.category}/${
                      !item.postCustomId ? item._id : item.postCustomId
                    }`}
                  >
                    <h3>{item.title}</h3>
                  </Link>
                  <p className={styles.date}>{item?.date}</p>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
    </>
  )
}
