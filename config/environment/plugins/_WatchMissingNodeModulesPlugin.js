/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This Webpack plugin ensures `npm install <library>` forces a project rebuild.
// We’re not sure why this isn't Webpack's default behavior.
// See https://github.com/facebookincubator/create-react-app/issues/186.
// this plugin was editted followed by
// https://github.com/facebook/create-react-app/pull/4216/commits/b71bd38ee53097e562681fc9f127b40dc4bb2240
'use strict'
class WatchMissingNodeModulesPlugin {
  constructor (nodeModulesPath) {
    this.nodeModulesPath = nodeModulesPath
  }
  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      var missingDeps = Array.from(compilation.missingDependencies)
      var nodeModulesPath = this.nodeModulesPath
      var isWebpack4 = compilation.contextDependencies.add // If any missing files are expected to appear in node_modules...
      if (missingDeps.some(file => file.indexOf(nodeModulesPath) !== -1)) {
        // ...tell webpack to watch node_modules recursively until they appear.
        if (isWebpack4) {
          compilation.contextDependencies.add(nodeModulesPath)
        } else {
          compilation.contextDependencies.push(nodeModulesPath)
        }
      }
      callback()
    })
  }
}
module.exports = WatchMissingNodeModulesPlugin
