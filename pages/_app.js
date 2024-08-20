import { useRouter } from 'next/router'
import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/home.css'
import '@/styles/sidebar.css'
import '@/styles/footer.css'
import '@/styles/posts.css'
import '@/styles/contact.css'
import '@/styles/search.css'
import '@/styles/error.css'
import '@/styles/admin/admin.css'
import '@/styles/admin/login.css'
import '@/styles/admin/modals.css'
import '@/styles/admin/adduser.css'
import Navbar from '@/components/global/navbar/Navbar'
import Footer from '@/components/global/footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from "next-auth/react"



export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define an array of routes where you want to hide the Navbar and Footer
  const routesWithoutNavbarFooter = [
    '/admin',
    '/admin/allposts',
    '/admin/editpost',
    '/admin/messages',
    '/admin/newpost',
    '/login',
    '/404',
  ];

  // Check if the current route is in the array
  const shouldHideNavbarFooter = routesWithoutNavbarFooter.some((route) =>
    router.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <Component {...pageProps} />
      {!shouldHideNavbarFooter && <Footer />}
      <ToastContainer />
    </>
  );
}

