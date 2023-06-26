import { Head, Html, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/img/web/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/img/web/apple-touch-icon.png" />
      </Head>

      <body>
        <div id="notification" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
