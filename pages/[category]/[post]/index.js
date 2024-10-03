import PageLayout from '@/components/pages/page-layout'
import Layout from '@/pages/layout'
import useGetProd from '@/store/useGetProd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styles from '@/styles/client/SinglePage.module.css'
import Head from 'next/head'
import AddComment from '@/components/pages/singlePage/AddComment'
import Comments from '@/components/pages/singlePage/Comments'
export default function PostPage() {
  const { data, fetchProd, loading, getCustom } = useGetProd()
  const route = useRouter()
  useEffect(() => {
    if (route?.query?.post) {
      fetchProd(route?.query?.post)
    }
  }, [route?.query?.post, fetchProd])

  console.log(getCustom)
  const post = getCustom ? getCustom : data?.post
  const capitalize = (str) => {
    if (!str) return ''
    return str
      .toLowerCase() // Convert all characters to lowercase first
      .split(' ') // Split the string by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ') // Join them back into a single string
  }

  const postTitle = capitalize(post?.title) || 'Post Title'
  const postDescription =
    post?.description || 'Read this insightful post on The Freedom.'
  const postImage = post?.image || '/default-image.jpg' // Fallback image if none is provided
  const postUrl = `${process.env.NEXT_PUBLIC_HOST}/${post?.category}/${route?.query?.post}` // Replace with your actual URL structure

  return (
    <>
      <Head>
        <title>{postTitle} - The Freedom - Stay Informed and Reflect</title>
        <meta name='description' content={postDescription} />
        <meta
          name='keywords'
          content={post?.tags?.join(', ') || 'blog, article, news'}
        />
        <meta name='author' content='The Freedom' />
        {/* Open Graph Meta Tags */}
        <meta property='og:title' content={postTitle} />
        <meta property='og:description' content={postDescription} />
        <meta property='og:image' content={postImage} />
        <meta property='og:url' content={postUrl} />
        <meta property='og:type' content='article' />
        {/* Twitter Card Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={postTitle} />
        <meta name='twitter:description' content={postDescription} />
        <meta name='twitter:image' content={postImage} />
        {/* <meta name='twitter:site' content='@yourwebsitehandle' />{' '} */}
        {/* Optional if you have a Twitter handle */}
        {/* Canonical URL */}
        <link rel='canonical' href={postUrl} />
      </Head>
      <Layout>
        <div className={styles.singlePost}>
          <PageLayout>
            <div className={styles.post}>
              <div className={styles.postImg}>
                <img src={post?.image} alt={post?.title || 'Post image'} />
              </div>
              <h3 className={styles.postTitle}>{post?.title}</h3>
              <p className={styles.postDate}>{post?.date}</p>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: post?.content }}
              />
              <div className={styles.postTags}>
                {post?.tags.map((tag, ind) => (
                  <p key={ind} className={styles.postTag}>
                    {tag}
                  </p>
                ))}
              </div>
            </div>
            {post && <AddComment postId={post?._id} />}
            {post && <Comments post={post} />}
          </PageLayout>
        </div>
      </Layout>
    </>
  )
}
