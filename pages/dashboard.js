import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Layout from '../components/Layout'
import ExpenseList from '../components/ExpenseList'
import requireFireAuth from '../lib/requireFireAuth'
import ExpenseListFilters from '../components/ExpenseListFilters'
import ExpensesSummary from '../components/ExpensesSummary'
import BandGrid from '../components/BandGrid'
// Prismic <3 Nextjs
import { RichText } from 'prismic-next'
import queryPrismic, { initPrismic } from '../lib/queryPrismicCustom'

if (process.browser) {
  require('picturefill');
}

const Dashboard = ({pcPage, pcBands}) => (
  <>
    <Head>
      <title>{pcPage['meta-title']}</title>
      <meta name="description" content="{pageContent['meta-description']}"  key="metaNameDescription" />
    </Head>
    <Layout showHead={true}>
      <ExpensesSummary/>
      <ExpenseListFilters/>
      <ExpenseList />
      <div className="content-container">
        <BandGrid pcBands={pcBands} />
        <RichText linkResolver={linkResolver} data={pcPage['dashboard_instructions']} />
      </div>
      <ul>
        {

        }
      </ul>
    </Layout>
  </>
)

// Sample linkResolver function.
function linkResolver(data) {
  // If this is a web link, simply use the URL.
  if (data.link_type === 'Web') {
    return { href: data.url }
  }

  // If we don't know what this is, simply redirect to the home page.
  return { href: '/' };
}

Dashboard.propTypes = {
  pcPage: PropTypes.shape({
    'meta-title':             PropTypes.string.isRequired,
    'meta-description':       PropTypes.string.isRequired,
    'dashboard_instructions': PropTypes.array.isRequired,
  }).isRequired,
  pcBands: PropTypes.arrayOf(PropTypes.shape({
    uid:        PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    thumbUrlSm: PropTypes.string.isRequired,
    thumbUrlLg: PropTypes.string.isRequired,
    thumbAlt:   PropTypes.string.isRequired,
  })).isRequired,
}

Dashboard.getInitialProps = async () => {

  // fetch Prismic content (pc)
  initPrismic({
    endpoint: 'https://expensify2.cdn.prismic.io/api/v2'
  })
  const prismicRes = await Promise.all([
    queryPrismic([['at', 'document.type', 'dashboard']]), // [0] result data
    queryPrismic(
      [['at', 'document.type', 'band']], // [1] results array
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

export default requireFireAuth(Dashboard)