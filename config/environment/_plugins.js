const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('./plugins/_WatchMissingNodeModulesPlugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const CompressionPlugin = require('compression-webpack-plugin')

const StatsPlugin = require('stats-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const paths = require('./_paths')
const { isHttps, getPort, ip } = require('./_utils')

const commonPlugins = (env, arg) => [
  // Clean files in root option before start
  new CleanWebpackPlugin([paths.build], {
    root: process.cwd(),
    // Write logs to console.
    verbose: true
  }),
  // Webpack 4 sets process.env.NODE_ENV based on the given mode.
  new webpack.EnvironmentPlugin({
    NODE_ENV: arg.mode || env.NODE_ENV || process.env.NODE_ENV,
    PORT: getPort(env, arg),
    HTTPS: isHttps(env, arg)
  }),
  // Automatically load modules instead of having to import or require them everywhere
  new webpack.ProvidePlugin({
    React: 'react',
    PropTypes: 'prop-type',
    moment: 'moment',
    _: 'lodash',
    R: 'Rambda'
  }),
  new DuplicatePackageCheckerPlugin()
]
/**
 * mode: 'development'
 * Provides process.env.NODE_ENV with value development. Enables NamedChunksPlugin and NamedModulesPlugin already.
 */
const devPlugins = (env, arg) => [
  ...commonPlugins(env, arg),
  new HtmlWebPackPlugin({
    title: 'DEVELPOMENT',
    template: paths.pathSrc('index.html'),
    filename: paths.pathBuild('index.html')
  }),
  // display logger
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [
        `App is running:\n
          [INTERNAL] : http://localhost:${getPort(env, arg)}\n
          [EXTERNAL] : http://${ip}:${getPort(env, arg)}
          `
      ],
      notes: [`* Production: yarn build    * Bundle Stats: yarn stats`]
    }
  }),
  // Emit hot updates
  new webpack.HotModuleReplacementPlugin(),
  // New dependancy added, will restart the development server automatically for Webpack to discover it.
  new WatchMissingNodeModulesPlugin(paths.nodeModules)
]

/**
 * mode: 'production'
 * nables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin,
 * NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin already.
 */
const prodPlugins = (env, arg) => [
  ...commonPlugins(env, arg),
  new HtmlWebPackPlugin({
    template: paths.pathSrc('index.html'),
    filename: paths.pathBuild('index.html'),
    minify: {
      caseSensitive: true, // Treat attributes in case sensitive manner (useful for custom HTML tags)
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeRedundantAttributes: true, // Remove attributes when value matches default.
      minifyCSS: true
    },
    xhtml: true
  }),
  new webpack.HashedModuleIdsPlugin(),
  // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CompressionPlugin({
    test: /\.(js|css|html)$/,
    cache: true,
    algorithm: 'gzip',
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: !(arg.env && arg.env.STAT)
  })
]

const statPlugins = (env, arg) => [
  ...prodPlugins(env, arg),
  /// /webpack-bundle-analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: './stats-analyzer.html',
    openAnalyzer: true
  }),
  // create statistics.json
  new StatsPlugin('./statistics.json', {
    source: false,
    modules: false
  })
]

module.exports = {
  dev: devPlugins,
  prod: prodPlugins,
  stat: statPlugins
}
