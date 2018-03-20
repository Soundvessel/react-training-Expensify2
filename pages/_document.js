import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    return { html, head, errorHtml, chunks }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png"/>
          <link rel="manifest" href="/static/favicons/manifest.json"/>
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#24afdf"/>
          <link rel="shortcut icon" href="/static/favicons/favicon.ico"/>
          <meta name="msapplication-config" content="/static/favicons/browserconfig.xml"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}
