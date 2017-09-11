const path = require('path')
const webpack = require('webpack')
const pkgInfo = require('./package.json')

const resolve = file => path.resolve(__dirname, file)

const banner = `All rights reserved. Author: ${pkgInfo.author} License: ${pkgInfo.license}`

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    filename: 'components.js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('src'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: resolve('src')
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
