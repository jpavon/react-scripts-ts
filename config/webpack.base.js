'use strict';

const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const isProduction = process.env.NODE_ENV === 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

function getStyleLoader(options) {
  const isSass = options && options.sass;
  const isModules = options && options.modules;

  let styleRegex = /\.css$/;
  let styleModuleRegex = /\.module\.css$/;
  if (isSass) {
    styleRegex = /\.(scss|sass)$/;
    styleModuleRegex = /\.module\.(scss|sass)$/;
  }

  const styleLoader = require.resolve('style-loader');

  const miniCss = MiniCssExtractPlugin.loader;

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: isSass ? 2 : 1
    }
  };
  if (isModules) {
    // css-loader drop-in replacement to generate TypeScript typings
    cssLoader.loader = require.resolve(
      '@jpavon/typings-for-css-modules-loader'
    );
    cssLoader.options.modules = true;
    cssLoader.options.getLocalIdent = getCSSModuleLocalIdent;
  }

  const postCssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009'
          },
          stage: 3
        })
      ],
      sourceMap: shouldUseSourceMap
    }
  };

  const loaders = [
    isProduction ? miniCss : styleLoader,
    cssLoader,
    postCssLoader
  ];

  if (isSass) {
    loaders.push({
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: shouldUseSourceMap
      }
    });
  }

  return {
    test: isModules ? styleModuleRegex : styleRegex,
    exclude: isModules ? '//' : styleModuleRegex,
    use: loaders
  };
}

const threadLoader = {
  loader: require.resolve('thread-loader'),
  options: {
    // keep workers alive on dev for more effective watch mode
    poolTimeout: isProduction ? 500 : Infinity
  }
};

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    babelrc: false,
    presets: [require.resolve('@babel/preset-react')],
    // plugins: ["babel-plugin-styled-components"],
    cacheDirectory: true,
    cacheCompression: false
  }
};

module.exports.loaders = [
  // "url" loader works just like "file" loader but it also embeds
  // assets smaller than specified size as data URLs to avoid requests.
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]'
    }
  },
  // Process JS
  {
    test: /\.(js|jsx|mjs)$/,
    include: paths.srcPaths,
    exclude: /[\\/]node_modules[\\/]/,
    use: [threadLoader, babelLoader]
  },
  // Process any JS outside of the app with Babel.
  // Unlike the application JS, we only compile the standard ES features.
  {
    test: /\.js$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: [threadLoader, babelLoader]
  },
  // Process TypeScript
  {
    test: /\.tsx?$/,
    include: paths.srcPaths,
    exclude: /[\\/]node_modules[\\/]/,
    use: [
      threadLoader,
      babelLoader,
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          happyPackMode: true,
          getCustomTransformers: require.resolve('./webpack.ts-transformers.js')
        }
      }
    ]
  },
  // Process Css
  getStyleLoader(),
  // Process Sass
  getStyleLoader({ sass: true }),
  // Process Css Modules
  getStyleLoader({ modules: true }),
  // Process Sass Modules
  getStyleLoader({ sass: true, modules: true }),
  {
    test: /\.svg$/,
    exclude: /[\\/]node_modules[\\/]/,
    issuer: /\.(tsx?|jsx?)$/,
    use: [
      {
        loader: require.resolve('@svgr/webpack'),
        options: {
          titleProp: true
        }
      }
    ]
  },
  // "file" loader makes sure assets end up in the `build` folder.
  // When you `import` an asset, you get its filename.
  // This loader doesn't use a "test" so it will catch all modules
  // that fall through the other loaders.
  {
    loader: require.resolve('file-loader'),
    // Exclude `js` and `ts` files to keep "css" loader working as it injects
    // it's runtime that would otherwise be processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
    options: {
      name: 'static/media/[name].[hash:8].[ext]'
    }
  }
  // ** STOP ** Are you adding a new loader?
  // Make sure to add the new loader(s) before the "file" loader.
];
