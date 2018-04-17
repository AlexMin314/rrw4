const path = require('path')

const entrySetting = require('./_entry')
const loaders = require('./_loaders')
const paths = require('./_paths')
const plugins = require('./_plugins')
const optimization = require('./_optimization')

module.exports = (env, arg) => ({
  bail: true,
  devtool: 'source-map',
  entry: entrySetting,
  context: paths.src,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'assets/js/[name].min.js',
    sourceMapFilename: 'assets/js/[name].min.js.map',
    chunkFilename: 'assets/js/[name].min.js',
    devtoolModuleFilenameTemplate: info => path.relative(paths.src, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', paths.src]
  },
  plugins: plugins.stat(env, arg),
  optimization: optimization.prod
})
