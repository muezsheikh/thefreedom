import React from 'react'
import Layout from './layout'
import HomeLayout from '@/components/pages/home/home-layout'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>The Freedom - Stay informed and reflect</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='The Freedom - Stay informed with the latest articles on news, lifestyle, and more.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='The Freedom' />
        <meta
          property='og:description'
          content='Stay informed with the latest articles on news, lifestyle, and more.'
        />
        <meta property='og:image' content='/images/logo.png' />{' '}
        {/* Default Open Graph image */}
        <meta property='og:url' content='https://thefreedom.com.pk/' />{' '}
        {/* Global site URL */}
        <meta name='twitter:card' content='summary_large_image' />
        {/* <meta name='twitter:site' content='@TheFreedomBlog' />{' '} */}
        {/* Global Twitter handle */}
      </Head>
      <Layout>
        <HomeLayout />
      </Layout>
    </>
  )
}
