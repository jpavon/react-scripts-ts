const fs = require('fs-extra');
const paths = require('./paths');
const baseConfig = require(process.env.NODE_ENV === 'production' ? './webpack.config.prod' : './webpack.config.dev');
const hasExtraConfig = fs.pathExistsSync(paths.appPath + '/webpack.config.extend.js');

module.exports = hasExtraConfig ? require(paths.appPath + '/webpack.config.extend.js')(baseConfig, process.env.NODE_ENV, { paths }) : baseConfig;
