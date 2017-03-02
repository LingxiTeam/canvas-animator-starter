var webpack = require('webpack')
var path = require('path')
var ManifestPlugin = require('webpack-manifest-plugin')

var postcss = require('./postcss.config')

module.exports = function (env) {
  var config = {
    entry: {
      // index: ['babel-polyfill', './src/index.js']
      index: ['./src/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: '[name].bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss
        }
      }, {
        test: /\.png$/,
        loader: 'url-loader',
        options: { mimetype: 'image/png' }
      }, {
        test: /\.jpg$/,
        loader: 'url-loader',
        options: { mimetype: 'image/jpg' }
      }, {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }]
    },
    devtool: '#source-map',
    devServer: {
      port: 8828,
      host: '0.0.0.0'
    },
    plugins: [
      new ManifestPlugin({
        fileName: 'rev-manifest.json',
        basePath: ''
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.production ? '"production"' : '"development"'
        }
      })
    ]
  }
  // if (env.debug === 'static') {
  //   config.entry['index.static-debug'] = ['./src/index.static-debug.js']
  //   config.output.filename = '[name].bundle.js'
  // }
  return config
}
