const transfromImport = require('babel-plugin-transform-imports')

module.exports = () => [
  transfromImport,
  {
    modules: {
      transform: member => `modules/${member}/${member}`
    },
    utils: {
      transform: member => `utils/${member}`
    },
    lodash: {
      transform: (importName, match) => `lodash/${importName}`,
      preventFullImport: true
    }
  }
]
