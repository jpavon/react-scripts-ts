const paths = require('./paths');
const baseConfig = require('./webpack.config.dev');
const extendConfigFn = require(paths.appPath + '/webpack.config.extend.js')
module.exports = extendConfigFn(baseConfig, process.env.NODE_ENV, { paths })
