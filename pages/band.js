import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import BandGrid from '../components/BandGrid'
// Prismic <3 Nextjs
import queryPrismic, { initPrismic } from '../lib/queryPrismicCustom'
import requireFireAuth from '../lib/requireFireAuth'

const Band = ({pcPage, pcBands}) => (
  <>
    <Head>{console.log(pcPage)}
      <title>Band: {pcPage.name}</title>
    </Head>
    <Layout showHead={true}>
      <div className="content-container">
        <h1>{pcPage.name}</h1>
        <picture>
          <source media="(max-width: 432px)" srcSet={pcPage.image.Half.url}/>
          <img className="img-responsive" src={pcPage.image.url} alt={pcPage.image.alt} />
        </picture>
        <BandGrid pcBands={pcBands} />
      </div>
    </Layout>
  </>
)

Band.getInitialProps = async ({query}) => {

  const uid = query.slug

  // fetch Prismic content (pc)
  initPrismic( {
    endpoint: 'https://expensify2.cdn.prismic.io/api/v2'
  } )

  const prismicRes = await Promise.all([
    queryPrismic([['at', 'my.band.uid', uid]]), // [0] result data
    queryPrismic(
      [
        ['at', 'document.type', 'band'],
        ['not', 'my.band.uid', uid] // filter out current uid
      ], // [1] results array
      {
        fetch: ['band.name', 'band.image', 'band.uid'],
        orderings: '[my.band.name]'
      }
    )
  ])

  // cleanup and assign Prismic content to props
  return {
    pcPage: prismicRes[0].results[0].data,
    pcBands: prismicRes[1].results.map(
      pcBand => ({
        uid:        pcBand.uid,
        name:       pcBand.data.name,
        thumbUrlSm: pcBand.data.image.thumb_200.url,
        thumbUrlLg: pcBand.data.image.thumb_400.url,
        thumbAlt:   pcBand.data.image.alt
      })
    )
  }
}

export default requireFireAuth(Band)