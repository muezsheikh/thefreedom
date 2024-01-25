import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
const HeroSection = dynamic(() => import('./hero-section'))
const PageLayout = dynamic(() => import('./PageLayout'))
const Section2 = dynamic(() => import('./Section2'))
const Section3 = dynamic(() => import('./Section3'))
const Section4 = dynamic(() => import('./Section4'))
const Section5 = dynamic(() => import('./Section5'))

const fetchData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/get`)
    return response.data.posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}
export default function HomeLayout() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
console.log('arrra', posts)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const data = await fetchData()
      setPosts(data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <>
      <HeroSection posts={posts} loading={loading} />
      <PageLayout>
        <Section2 posts={posts} loading={loading} />
        <Section3 posts={posts} loading={loading} />
        <Section4 posts={posts} loading={loading} />
        <Section5 posts={posts} loading={loading} />
      </PageLayout>
    </>
  )
}
