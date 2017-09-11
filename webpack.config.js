const path = require('path')
const webpack = require('webpack')
const mergeConfig = require('webpack-merge')

const pkgInfo = require('./package.json')

const resolve = file => path.resolve(__dirname, file)

const banner = `All rights reserved. Author: ${pkgInfo.author} License: ${pkgInfo.license}`

const commonConfig = {
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
    entry: resolve('src/plugin.js'),
    output: {
      filename: 'doodle-vue.min.js',
      libraryTarget: 'window',
      library: 'DoodleVue'
    }
  }),
  mergeConfig(commonConfig, {
    entry: resolve('src/Doodle.vue'),
    output: {
      filename: 'doodle-vue.js',
      libraryTarget: 'umd',
      library: 'doodle-vue',
      umdNamedDefine: true
    }
  })
]
