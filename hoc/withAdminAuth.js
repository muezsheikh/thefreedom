// hoc/withAdminAuth.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAdminAuth = (WrappedComponent) => {
  const AdminAuthHOC = (props) => {
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

          if (data.userRole !== 'Admin') {
            // Redirect if user role is not Admin
            router.push('/'); // Redirect to home page or another page
          } else {
            setUserInfo(data);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          router.push('/'); // Redirect on error
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
      return null; // Optionally show nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return AdminAuthHOC;
};

export default withAdminAuth;
