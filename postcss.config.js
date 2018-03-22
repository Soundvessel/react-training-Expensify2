module.exports = {
  plugins: [
    require('postcss-import')(), // consumes local files, node modules or web_modules with import rules
    require('autoprefixer')({ /* ...options */ }) // so imports are auto-prefixed too
  ]
}
