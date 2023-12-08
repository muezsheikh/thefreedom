// components/ProtectedRoute.js
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const allowedUsername = process.env.NEXT_PUBLIC_ADMIN_URL; // Change this to the allowed username

const ProtectedRoute = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check on the client side
    if (!session || session.user.name !== allowedUsername) {
      // Temporarily remove the redirect for debugging
      // router.replace('/login'); // Change '/login' to your actual login page
      console.log('Not authenticated or wrong username');
    }
  }, [session, router]);

  // Render children only if the conditions are met
  return session && session.user.name === allowedUsername ? children : null;
};

export default ProtectedRoute;
