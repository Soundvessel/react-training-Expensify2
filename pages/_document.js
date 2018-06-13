import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {

    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* next-sass */}
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}
