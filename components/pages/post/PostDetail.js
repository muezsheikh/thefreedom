import React, { useEffect, useState } from 'react'
import PageLayout from '../home/PageLayout'
import CommentSection from './CommentSection'
import AddComment from './AddComment'
import RecentPosts from './RecentPosts'
import Tags from './Tags'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Head } from 'next/document'

export default function PostDetail() {
  const router = useRouter()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const getUpdatePostData = async () => {
    setLoading(true)
    if (!router.query || !router.query.postid) return
    try {
      const postId = router?.query?.postid[1]
      // let postId = ;
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/onepost/${postId}`
      )
      if (data) {
        setPost(data.post)
        setLoading(false)
        document.title = data.post.title;
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
  )
}
