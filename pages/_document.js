import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
            integrity='sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=='
            crossOrigin='anonymous'
            referrerPolicy='no-referrer'
          />
          <link rel="shortcut icon" href="/images/freedomLogo.png" type="image/x-icon" />
        <meta property='og:image' content='/images/logo.png' />

          <title>The Freedom | News, Entertainment, Sports, and More</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
          <SpeedInsights />
        </body>
      </Html>
    )
  }
}
