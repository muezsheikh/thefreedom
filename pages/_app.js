import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/global/navbar/Navbar';
import Footer from '@/components/global/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

// Import CSS files
import '@/styles/globals.css';
import '@/styles/navbar.css';
import '@/styles/home.css';
import '@/styles/sidebar.css';
import '@/styles/footer.css';
import '@/styles/posts.css';
import '@/styles/contact.css';
import '@/styles/search.css';
import '@/styles/error.css';
import '@/styles/admin/admin.css';
import '@/styles/admin/login.css';
import '@/styles/admin/modals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  // Define an array of routes where you want to hide the Navbar and Footer
  const routesWithoutNavbarFooter = ['/admin', '/admin/allposts', '/admin/editpost', '/admin/messages', '/admin/newpost', '/login', '/404'];

  // Check if the current route is in the array
  const shouldHideNavbarFooter = routesWithoutNavbarFooter.some(route =>
    router.pathname.startsWith(route)
  );

  useEffect(() => {
    // Check if the user is on a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Redirect to m.muez.dev for mobile devices
      window.location.href = 'https://m.muez.dev';
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider session={session}>
        {!shouldHideNavbarFooter && <Navbar />}
        <Component {...pageProps} />
        {!shouldHideNavbarFooter && <Footer />}
        <ToastContainer />
      </SessionProvider>
    </>
  );
}
