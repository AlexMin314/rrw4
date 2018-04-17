const path = require('path')

const _root = '../..'
const _pathFn = (...predefined) => (...paths) => path.join(__dirname, ...predefined, ...paths)

const pathApp = _pathFn(_root)
const pathLocal = _pathFn('')
const pathBuild = _pathFn(_root, 'dist')
const pathSrc = _pathFn(_root, 'src')

module.exports = {
  pathBuild,
  pathSrc,
  root: pathApp(),
  build: pathBuild(),
  src: pathSrc(),
  nodeModules: pathApp('node_modules'),
  eslint: pathLocal('./.eslintrc'),
  jsEntry: pathSrc('index.js')
}
