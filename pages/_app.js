import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/home.css'
import '@/styles/sidebar.css'
import '@/styles/footer.css'
import '@/styles/posts.css'
import '@/styles/contact.css'
import Navbar from '@/components/global/navbar/Navbar'
import Footer from '@/components/global/footer/Footer'

export default function App({ Component, pageProps }) {
  return (

    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
