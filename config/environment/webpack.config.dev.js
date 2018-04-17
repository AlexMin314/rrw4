const path = require('path')

const entrySetting = require('./_entry')
const loaders = require('./_loaders')
const paths = require('./_paths')
const plugins = require('./_plugins')
const server = require('./_devServer')
const optimization = require('./_optimization')

// prettier-ignore
module.exports = (env, arg) => {
  return {
    devtool: 'cheap-module-eval-source-map',
    watch: true, // cache enabled by default
    entry: entrySetting,
    context: paths.src,
    output: {
      path: paths.build,
      publicPath: '/',
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // code spliting settings
      filename: 'assets/js/[name].[hash].js',
      chunkFilename: 'assets/js/[name].chunk.[chunkhash].js',
      // Point sourcemap entries(Initiator in Network tab) to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    module: {
      rules: loaders,
      strictExportPresence: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ['node_modules', paths.src]
    },
    devServer: server(env, arg),
    plugins: plugins.dev(env, arg),
    optimization: optimization.dev
  }
}
