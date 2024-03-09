import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document () {
  useEffect(() => {
    console.log('from_document')
  }, [])

  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
