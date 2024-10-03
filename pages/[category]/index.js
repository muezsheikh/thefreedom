import React, { useEffect } from 'react'
import Layout from '../layout'
import styles from '@/styles/client/Category.module.css'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import useGetProd from '@/store/useGetProd'
import PageLayout from '@/components/pages/page-layout'
import useGetData from '@/store/useGetData'
export default function Category() {
  const { data, loading, fetchData, getCategory } = useGetData()
  const { getCustomFunc } = useGetProd()
  const route = useRouter()
  useEffect(() => {
    fetchData('/api/posts/get')
  }, [fetchData])
  const categoryProd = data?.posts?.filter(
    (item) => item.category === route?.query?.category
  )
  const capitalize = (str) => {
    if (!str) return ''
    return str
      .toLowerCase() // Convert all characters to lowercase first
      .split(' ') // Split the string by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ') // Join them back into a single string
  }
  console.log(categoryProd?.length)
  console.log(categoryProd)
  const filteredCategory = getCategory ? getCategory : categoryProd
  console.log('fast data', getCategory)
  return (
    <>
      <Head>
        <title>
          {capitalize(route?.query?.category)} - The Freedom - Stay Informed and
          Reflect
        </title>
      </Head>
      <Layout>
        <PageLayout>
          <div className={styles.section3}>
            <h2 style={{ textTransform: 'capitalize' }}>
              {route?.query?.category}
            </h2>
            {filteredCategory?.length === 0 && (
              <h3 style={{ textAlign: 'center' }}>Data not Found</h3>
            )}
            <div className={styles.posts}>
              {filteredCategory?.map((item) => (
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
        </PageLayout>
      </Layout>
    </>
  )
}
