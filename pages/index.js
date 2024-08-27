import Head from 'next/head'
import HomeLayout from '@/components/pages/home/home-layout'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>TheFreedom News - Stay Informed and Reflect</title>
        <meta name="description" content="Stay updated with TheFreedom News, your source for blogs on news, health, education, and the environment. Learn and reflect on important topics with us." />
        <meta property="og:title" content="TheFreedom News - Stay Informed and Reflect" />
        <meta property="og:description" content="Stay updated with TheFreedom News, your source for blogs on news, health, education, and the environment. Learn and reflect on important topics with us." />
        <meta property="og:image" content="/images/freedomLogo.png" />
        <meta property="og:url" content="https://thefreedom.com.pk" />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <HomeLayout />
    </>
  )
}
