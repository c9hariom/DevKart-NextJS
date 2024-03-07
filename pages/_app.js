import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import Footer from '@/components/footer'

export default function App ({ Component, pageProps }) {
  return (
    <>
    <Head>
    <title>DevKart - e-com for devs</title>
        <meta name='description' content='Your page description' />
    </Head>
    <Navbar/>
      <Component {...pageProps} />
    <Footer/>
    </>
  )
}
