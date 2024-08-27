import PostsLayout from '@/components/pages/posts/PostsLayout'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)
  const postCategory = router?.query?.posts
  const getPosts = async () => {
    setLoading(true)
    if (!router.query || !router.query.posts) return
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get`
      )
      if (data) {
        setPosts(data.posts)
        setLoading(false)
      } else {
        router.replace('/404')
      }
    } catch (error) {
      router.replace('/404')
      console.error('Error getting the post:', error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [router.query])

  const capitalizeText = (text) => {
    // Ensure 'text' is defined and is a string before calling 'replace'
    if (typeof text !== 'string') {
      return '';
    }
    return text.replace(/\b\w/g, char => char.toUpperCase());
  };
  
  const capitalizedCategory = postCategory && capitalizeText(postCategory);
  
  return (
    <>
      <Head>
        {postCategory && (
          <title>
            {capitalizedCategory} - TheFreedom News - Stay Informed and Reflect
          </title>
        )}
      </Head>
      <PostsLayout
        posts={posts}
        loading={loading}
        postCategory={postCategory}
      />
    </>
  )
}
