const path = require('path')
const webpack = require('webpack')
const mergeConfig = require('webpack-merge')

const pkgInfo = require('./package.json')

const resolve = file => path.resolve(__dirname, file)

const banner = `All rights reserved. Author: ${pkgInfo.author} License: ${pkgInfo.license}`

const commonConfig = {
  entry: resolve('src/index.js'),
  output: {
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
        exclude: /node_modules/,
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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = [
  mergeConfig(commonConfig, {
    output: {
      filename: 'vd-doodle.min.js',
      libraryTarget: 'umd',
      library: 'VDDoodle'
    }
  }),
  mergeConfig(commonConfig, {
    output: {
      filename: 'vd-doodle.js',
      libraryTarget: 'umd',
      library: 'vd-doodle',
      umdNamedDefine: true
    }
  })
]
