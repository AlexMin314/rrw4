const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const codeSplit = {
  chunks: 'async',
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all'
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}
// https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
const commons = {
  removeAvailableModules: true, // Modules are removed from chunks when they are already available in all parent chunk groups. This reduces asset size.
  removeEmptyChunks: true, // This reduces load in filesystem and results in faster builds.
  mergeDuplicateChunks: true,
  providedExports: true, // Determine exports for each module when possible. This information is used by other optimizations or code generation.
  runtimeChunk: {
    name: 'manifest' // Create a separate chunk for the webpack runtime code and chunk manifest. This chunk should be inlined into the HTML
  },
  splitChunks: codeSplit // This configuration object represents the default behavior of the SplitChunksPlugin.
}

const dev = {
  ...commons,
  minimize: false,
  flagIncludedChunks: false, // Chunks which are subsets of other chunks are determined and flagged in a way. that subsets don’t have to be loaded when the bigger chunk has been loaded.
  occurrenceOrder: false, // Give more often used ids smaller (shorter) values.
  usedExports: false, // Determine used exports for each module. This depends on optimization.providedExports.
  sideEffects: false, // Recognise the sideEffects flag in package.json or rules to eliminate modules. This depends on optimization.providedExports and optimization.usedExports.
  concatenateModules: false, // Tries to find segments of the module graph which can be safely concatenated into a single module. Depends on optimization.providedExports and optimization.usedExports.
  noEmitOnErrors: false, // Don’t write output assets when compilation errors.
  namedModules: true, // Instead of numeric ids, give modules useful names.
  namedChunks: true, // Instead of numeric ids, give chunks useful names.
  splitChunks: codeSplit
}
const prod = {
  ...commons,
  minimize: true,
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: false, // remove warnings
          drop_console: true // remove console
        },
        output: {
          comments: false // remove comments
        }
      }
    })
  ],
  flagIncludedChunks: true,
  occurrenceOrder: true,
  usedExports: true,
  sideEffects: true,
  concatenateModules: true,
  noEmitOnErrors: true,
  namedModules: false,
  namedChunks: false,
  splitChunks: {
    ...codeSplit,
    name: false
  }
}
module.exports = {
  dev,
  prod
}
