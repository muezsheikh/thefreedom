import React, { useEffect } from 'react'
import styles from '@/styles/client/Home.module.css'
import HeroLoader from './hero-loader'
import useGetProd from '@/store/useGetProd'
import Link from 'next/link'
import useGetData from '@/store/useGetData'
export default function Section2() {
  const { data, loading, fetchData } = useGetData()
  const { getCustomFunc } = useGetProd()

  useEffect(() => {
    fetchData('posts/get')
  }, [fetchData])

  return (
    <>
      {loading ? (
        <>
          <HeroLoader />
        </>
      ) : (
        <>
          <div className={styles.section2}>
            <h2>Most Recent Posts</h2>
            <div className={styles.posts}>
              {data?.posts?.slice(0, 5).map((item) => (
                <div className={styles.post} key={item._id}>
                  <div className={styles.postImg}>
                    <img src={item.image} alt='' />
                  </div>
                  <div className={styles.postBody}>
                    <Link
                      onClick={() => getCustomFunc(item)}
                      href={`/${item?.category}/${
                        !item.postCustomId ? item._id : item.postCustomId
                      }`}
                    >
                      <p className={styles.postTitle}>{item.title}</p>
                    </Link>
                    <p className={styles.postDate}>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
