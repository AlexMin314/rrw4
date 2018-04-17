module.exports = {
  isHttps: (env, arg) => arg.https || !!process.env.HTTPS || !!(env && env.HTTPS),
  getPort: (env, arg) => arg.port || process.env.PORT || (env && env.PORT) || 3000,
  ip: require('os').networkInterfaces().en0[1].address
}
