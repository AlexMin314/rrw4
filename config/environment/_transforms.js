const transfromImport = require('babel-plugin-transform-imports')

module.exports = () => [
  transfromImport,
  {
    modules: {
      transform: member => `modules/${member}/${member}`
    },
    components: {
      transform: member => `components/${member}/${member}`
    },
    lodash: {
      transform: (importName, match) => `lodash/${importName}`,
      preventFullImport: true
    }
  }
]
