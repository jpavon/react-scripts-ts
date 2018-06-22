'use strict';

const paths = require('./paths');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  typeScriptLoader: {
    test: /\.tsx?$/,
    include: paths.srcPaths,
    exclude: /[\\/]node_modules[\\/]/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          transpileOnly: isProduction ? false : true,
          reportFiles: [paths.appSrc + '/**/*.{ts,tsx}'],
          forceIsolatedModules: true,
          useBabel: true,
          babelOptions: {
            babelrc: false,
            compact: isProduction ? true : false,
            presets: [require.resolve('@babel/preset-react')]
          },
          babelCore: require.resolve('@babel/core')
        }
      }
    ]
  },
  svgLoader: {
    test: /\.svg$/,
    issuer: /\.tsx?$/,
    use: [require.resolve('@svgr/webpack')]
  }
};
