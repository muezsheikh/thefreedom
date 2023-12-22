import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/posts/get`);
      setPosts(response.data.posts);
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // Fetch posts only once when the component mounts

  useEffect(() => {
    // Rotate posts every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % Math.min(posts.length, 10));
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [posts]); // Update the interval when the posts array changes

  return (
    <div className='topHeader'>
      <div>
        <h3 className='H-heading'>Latest News:</h3>
        <div>
          {posts.length > 0 && (
            <Link
              style={{ color: 'white' }}
              href={`/${posts[currentPostIndex]?.category}/${posts[currentPostIndex]?.date}/${posts[currentPostIndex]?._id}`}
            >
              <h3>{posts[currentPostIndex]?.title}</h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
