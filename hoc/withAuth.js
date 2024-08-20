// hoc/withAuth.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_HOST}/api/auth/getuser`,
            { withCredentials: true }
          );
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
          router.push('/'); // Redirect to home page on error
        } finally {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>; // Optionally show a loading state
    }

    if (!userInfo) {
      router.push('/'); // Redirect if no user info
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
