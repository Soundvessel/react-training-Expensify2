import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Layout from '../components/Layout'
import ExpenseList from '../components/ExpenseList'
import requireFireAuth from '../lib/requireFireAuth'
import ExpenseListFilters from '../components/ExpenseListFilters'
import ExpensesSummary from '../components/ExpensesSummary'
// Prismic <3 Nextjs
import { initPrismic, queryPrismic, RichText } from 'prismic-next'

const Dashboard = (props) => (
  <>
    <Head>
      <title>{props.siteDoc['meta-title']}</title>
      <meta name="description" content="{props.siteDoc['meta-description']}"  key="metaNameDescription" />
    </Head>
    <Layout showHead={true}>
      <ExpensesSummary/>
      <ExpenseListFilters/>
      <ExpenseList />
      <div className="content-container">
        <RichText linkResolver={linkResolver} data={props.siteDoc['dashboard_instructions']} />
      </div>
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
  siteDoc: PropTypes.shape({
    'meta-title': PropTypes.string.isRequired,
    'meta-description': PropTypes.string.isRequired,
    'dashboard_instructions': PropTypes.array.isRequired,
  }).isRequired,
}

// Fetch site doc.
Dashboard.getInitialProps = async () => {
  initPrismic({
    endpoint: 'https://expensify2.cdn.prismic.io/api/v2',
  });
  const siteDocRes = await queryPrismic([['at', 'document.type', 'dashboard']])
  return { siteDoc: siteDocRes.results[0].data }
}

export default requireFireAuth(Dashboard)