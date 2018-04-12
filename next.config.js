const path = require('path')
const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = withSass(withBundleAnalyzer({

  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },

  sassLoaderOptions: {
    includePaths: ["./styles", "./node_modules"]
  },

  webpack(config, { dev }) {
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
}))
