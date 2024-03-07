import '@/styles/globals.css'
import Head from 'next/head'

export default function App ({ Component, pageProps }) {
  return (
    <>
    <Head>
    <title>DevKart - e-com for devs</title>
        <meta name='description' content='Your page description' />
    </Head>
      <Component {...pageProps} />
    </>
  )
}
