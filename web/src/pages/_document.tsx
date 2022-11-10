import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        <meta property="og:image" content="https://i.imgur.com/DVOJBlb.png" />
        <meta name="description" content="Landing page para criação de bolão da World Cup 2022" />
        <meta property="og:title" content="NLW Copa Rocketseat" />
        <meta property="og:url" content="https://nlwcopa-rocketseat.vercel.app/" />
        <title>NLW Copa - Trilha Ignite | Rocketseat</title>
      </Head>
      <body className='bg-gray-900 bg-app bg-no-repeat bg-cover'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
