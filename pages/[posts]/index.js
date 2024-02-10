import PostsLayout from "@/components/pages/posts/PostsLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)
  const postCategory = router?.query?.posts
  const getPosts = async () => {
    setLoading(true)
    if (!router.query || !router.query.posts) return
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/get`);
      if (data) {
        setPosts(data.posts)
        setLoading(false)
      } else {
        router.replace('/404')
      }
    } catch (error) {
      router.replace('/404')
      console.error('Error getting the post:', error);

    }
  };

  useEffect(() => {
    getPosts();

  }, [router.query]);
  return (
    <>
      <PostsLayout posts={posts} loading={loading} postCategory={postCategory} />
    </>
  )
}
