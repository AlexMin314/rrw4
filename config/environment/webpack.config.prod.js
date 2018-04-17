const path = require('path')

const entrySetting = require('./_entry')
const loaders = require('./_loaders')
const paths = require('./_paths')
const plugins = require('./_plugins')
const optimization = require('./_optimization')

module.exports = (env, arg) => ({
  bail: true,
  devtool: 'hidden-source-map',
  entry: entrySetting,
  context: paths.src,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'assets/js/[hash].min.js',
    chunkFilename: 'assets/js/[chunkhash].min.js',
    devtoolModuleFilenameTemplate: info => path.relative(paths.src, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', paths.src]
  },
  plugins: plugins.prod(env, arg),
  optimization: optimization.prod
})
