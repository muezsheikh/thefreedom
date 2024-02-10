import React, { useEffect, useState } from 'react'
import PageLayout from '../home/PageLayout'
import CommentSection from './CommentSection'
import AddComment from './AddComment'
import RecentPosts from './RecentPosts'
import Tags from './Tags'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'
import Head from 'next/head'

export default function PostDetail() {
  const router = useRouter()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const getUpdatePostData = async () => {
    setLoading(true)
    if (!router.query || !router.query.postid) return
    try {
      const postId = router?.query?.postid[1]
      let apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/posts/onepost/${postId}`
      let apiUrl2 = `${process.env.NEXT_PUBLIC_HOST}/api/posts/postCustomId/${postId}`
      const finalUrl = postId >= 34 ? apiUrl2 : apiUrl

      const { data } = await axios.get(finalUrl)

      if (data) {
        setPost(data.post)
        setLoading(false)
      } else {
        router.replace('/404')
      }
    } catch (error) {
      router.replace('/404')
      console.error('Error getting the post:', error)
      toast.error(`Error getting the post. Please try again. ${error.message}`)
    }
  }

  useEffect(() => {
    getUpdatePostData()
  }, [router.query])
  return (
    <>
      <Head>
        <title>
          Trump attacks Haley for absence of her husband, who is deployed | CNN
          Politics
        </title>
        <meta
          name='description'
          content='Former President Donald Trump, riding high after one of the best days of his campaign, used a rally in South Carolina on Saturday to attack rival Nikki Haley in her home state — and to mock the absence of her husband, who is deployed overseas.'
        />

        <meta
          property='og:url'
          content='https://edition.cnn.com/2024/02/10/politics/trump-south-carolina-primary-haley/index.html'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='Trump attacks Haley for absence of her husband, who is deployed | CNN Politics'
        />
        <meta
          property='og:description'
          content='Former President Donald Trump, riding high after one of the best days of his campaign, used a rally in South Carolina on Saturday to attack rival Nikki Haley in her home state — and to mock the absence of her husband, who is deployed overseas.'
        />
        <meta
          property='og:image'
          content='https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1996862067.jpg?c=16x9&q=w_800,c_fill'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='edition.cnn.com' />
        <meta
          property='twitter:url'
          content='https://edition.cnn.com/2024/02/10/politics/trump-south-carolina-primary-haley/index.html'
        />
        <meta
          name='twitter:title'
          content='Trump attacks Haley for absence of her husband, who is deployed | CNN Politics'
        />
        <meta
          name='twitter:description'
          content='Former President Donald Trump, riding high after one of the best days of his campaign, used a rally in South Carolina on Saturday to attack rival Nikki Haley in her home state — and to mock the absence of her husband, who is deployed overseas.'
        />
        <meta
          name='twitter:image'
          content='https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1996862067.jpg?c=16x9&q=w_800,c_fill'
        ></meta>
      </Head>
      <PageLayout>
        <div className='postDetailPage'>
          {loading ? (
            <div className='heroSkeletonContainer'>
              <div className='skeleton-element'></div>
            </div>
          ) : (
            post && (
              <>
                <div className='image'>
                  <img src={post?.image} alt='' />
                </div>
              </>
            )
          )}
          {post && (
            <div className='title'>
              <h1>{post?.title}</h1>
            </div>
          )}
          {loading ? (
            <div className='heroSkeletonContainer'>
              <div className='skeleton-element'></div>
            </div>
          ) : (
            post && (
              <>
                <div
                  id='quill-container'
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </>
            )
          )}
        </div>
        {post && <Tags post={post} />}
        <RecentPosts post={post} />
        {loading ? (
          <div className='heroSkeletonContainer'>
            <div className='skeleton-element'></div>
          </div>
        ) : (
          post && (
            <>
              <CommentSection postId={post._id} />
            </>
          )
        )}
      </PageLayout>
    </>
  )
}
