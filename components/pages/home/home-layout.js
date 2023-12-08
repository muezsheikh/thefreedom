import React, { useEffect, useState } from 'react'
import HeroSection from './hero-section'
import Section2 from './Section2'
import Section3 from './Section3'
import PageLayout from './PageLayout'
import Section4 from './Section4'
import Section5 from './Section5'
import axios from 'axios'

export default function HomeLayout() {
  const [loading, setLoading] = useState(false)

  const [posts, setPosts] = useState([])
  const getPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts/get`
      )
      setPosts(response.data.posts)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <HeroSection posts={posts} loading={loading} />
      <PageLayout>
        <Section2 posts={posts} loading={loading} />
        <Section3 posts={posts} loading={loading} />
        <Section4  posts={posts} loading={loading} />
        <Section5 posts={posts} loading={loading} />
      </PageLayout>
    </>
  )
}
