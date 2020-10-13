const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://raw.githubusercontent.com/NaveenDA/naveenda.github.io/gh-pages/' : '',
}
