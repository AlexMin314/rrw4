const paths = require('./_paths')
const chalk = require('chalk')

const { isHttps, getPort } = require('./_utils')

module.exports = (env, arg, proxy = {}) => {
  const protocol = isHttps(env, arg)
  const host = arg.host === 'localhost' ? '0.0.0.0' : arg.host
  const port = getPort(env, arg)
  return {
    host: host,
    https: protocol, // true for self-signed, object for cert authority
    port: port,
    proxy: proxy,
    historyApiFallback: true,
    contentBase: paths.build,
    compress: true, // enable gzip compression
    watchOptions: {
      ignored: /node_modules/
    },
    watchContentBase: true, // By default files from `contentBase` will not trigger a page reload.
    inline: true,
    hot: true,
    stats: 'none',
    quiet: true,
    noInfo: true,
    clientLogLevel: 'none', // display HMR log to browser
    public: `localhost:${port}`, // --open
    before (app) {
      console.log(
        '\n',
        chalk.bgCyan.black('\n DEV SERVER '),
        chalk.cyan('Starting the development server...\n'),
        '\n'
      )
    }
  }
}
