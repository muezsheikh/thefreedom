import React, { useEffect } from 'react'
import styles from '@/styles/client/home/Section3.module.css'
import useGetProd from '@/store/useGetProd'
import Link from 'next/link'
import useGetData from '@/store/useGetData'
export default function Section3() {
  const { data, loading, fetchData } = useGetData()
  const { getCustomFunc } = useGetProd()

  useEffect(() => {
    fetchData('posts/get')
  }, [fetchData])

  const categories = [
    'pakistan',
    'environment',
    'education',
    'sports',
    'fashion-and-style',
  ]
  const categoryProd = (cat) => {
    return data?.posts?.filter((item) => item.category === cat).slice(0, 6)
  }

  return (
    <>
      {categories.map((category, ind) => (
        <React.Fragment key={ind}>
          <div className={styles.section3}>
            <h2 style={{ textTransform: 'capitalize' }}>{category}</h2>
            <div className={styles.posts}>
              {categoryProd(category)?.map((item) => (
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
            <h3 className={styles.btn}>View more</h3>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </>
  )
}
