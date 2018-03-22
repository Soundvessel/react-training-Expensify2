const path = require('path')
const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const { ANALYZE } = process.env

module.exports = withSass({

  sassLoaderOptions: {
    includePaths: ["styles"]
  },

  webpack(config, { dev }) {
    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    // Only load specific locales for moment.js
    // See: https://stackoverflow.com/a/25426019/956688
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/))

    const DotEnv = require('dotenv-webpack')
    config.plugins.push(
      new DotEnv({
        path: './.env.dev'
      })
    )

    return config
  }
})
