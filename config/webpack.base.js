'use strict';

const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const isProduction = process.env.NODE_ENV === 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

function getStyleLoader(options) {
  const enableSass = options && options.sass;
  const enableModules = options && options.modules;

  let stylesRegex;
  let styleModuleRegex;
  if (!enableSass) {
    stylesRegex = /\.css$/;
    styleModuleRegex = /\.module\.css$/;
  } else {
    stylesRegex = /\.(scss|sass)$/;
    styleModuleRegex = /\.module\.(scss|sass)$/;
  }

  let cssOptions;
  if (enableModules) {
    cssOptions = {
      importLoaders: enableSass ? 2 : 1,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent
    };
  } else {
    cssOptions = {
      importLoaders: enableSass ? 2 : 1
    };
  }

  const styleLoader = require.resolve('style-loader');
  const miniCss = MiniCssExtractPlugin.loader;
  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: cssOptions
  };
  const postCssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          flexbox: 'no-2009'
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

  if (enableSass) {
    loaders.push({
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: shouldUseSourceMap
      }
    });
  }

  return {
    test: enableModules ? styleModuleRegex : stylesRegex,
    exclude: enableModules ? '//' : styleModuleRegex,
    use: loaders
  };
}

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
  {
    test: /\.(js|jsx|mjs)$/,
    include: paths.srcPaths,
    exclude: [/[/\\\\]node_modules[/\\\\]/],
    use: [
      // This loader parallelizes code compilation, it is optional but
      // improves compile time on larger projects
      require.resolve('thread-loader'),
      {
        loader: require.resolve('babel-loader'),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          // @remove-on-eject-end
          presets: [require.resolve('@babel/preset-react')],
          // plugins: [
          //   [
          //     require.resolve('babel-plugin-named-asset-import'),
          //   ],
          // ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          highlightCode: true
        }
      }
    ]
  },
  // Process any JS outside of the app with Babel.
  // Unlike the application JS, we only compile the standard ES features.
  {
    test: /\.js$/,
    use: [
      // This loader parallelizes code compilation, it is optional but
      // improves compile time on larger projects
      require.resolve('thread-loader'),
      {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          compact: false,
          presets: [require.resolve('@babel/preset-react')],
          cacheDirectory: true,
          highlightCode: true
        }
      }
    ]
  },
  // Compile .tsx
  {
    test: /\.tsx?$/,
    include: paths.srcPaths,
    exclude: [/[/\\\\]node_modules[/\\\\]/],
    use: [{
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true
      }
    }]
  },
  // {
  //   test: /\.(jsx?)$/,
  //   include: paths.srcPaths,
  //   exclude: /[\\/]node_modules[\\/]/,
  //   use: [
  //     // This loader parallelizes code compilation, it is optional but
  //     // improves compile time on larger projects
  //     require.resolve('thread-loader'),
  //     {
  //       loader: require.resolve('babel-loader'),
  //       options: {
  //         // @remove-on-eject-begin
  //         babelrc: false,
  //         // @remove-on-eject-end
  //         presets: [require.resolve('@babel/preset-react')],
  //         // plugins: [
  //         //   [require.resolve('babel-plugin-named-asset-import')]
  //         // ],
  //         compact: isProduction ? true : false,
  //         cacheDirectory: isProduction ? false : true,
  //         highlightCode: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   test: /(\.jsx?$|\.tsx?$)/,
  //   include: paths.srcPaths,
  //   exclude: /[\\/]node_modules[\\/]/,
  //   use: [
  //     require.resolve('cache-loader'),
  //     {
  //       loader: require.resolve('thread-loader'),
  //       options: {
  //         poolTimeout: Infinity // keep workers alive for more effective watch mode
  //       },
  //     },
  //     {
  //       loader: require.resolve('babel-loader'),
  //       options: {
  //         // @remove-on-eject-begin
  //         babelrc: false,
  //         // @remove-on-eject-end
  //         presets: [
  //           require.resolve('@babel/preset-react'),
  //           require.resolve('@babel/preset-typescript')
  //         ],
  //         // plugins: [
  //         //   [require.resolve('babel-plugin-named-asset-import')]
  //         // ],
  //         compact: isProduction ? true : false,
  //         cacheDirectory: isProduction ? false : true,
  //         highlightCode: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   test: /(\.jsx?$|\.tsx?$)/,
  //   include: paths.srcPaths,
  //   exclude: /[\\/]node_modules[\\/]/,
  //   use: [
  //     {
  //       loader: require.resolve('awesome-typescript-loader'),
  //       options: {
  //         transpileOnly: isProduction ? false : true,
  //         reportFiles: [paths.appSrc + '/**/*.{ts,tsx}'],
  //         forceIsolatedModules: true,
  //         useBabel: true,
  //         babelOptions: {
  //           babelrc: false,
  //           compact: isProduction ? true : false,
  //           presets: [
  //             require.resolve('@babel/preset-react')
  //           ]
  //         },
  //         babelCore: '@babel/core'
  //       }
  //     }
  //   ]
  // },
  // Css Loader
  getStyleLoader(),
  // Sass Loader
  getStyleLoader({ sass: true }),
  // Css Modules Loader
  getStyleLoader({ modules: true }),
  // Sass Modules Loader
  getStyleLoader({ sass: true, modules: true }),
  {
    test: /\.svg$/,
    issuer: /\.tsx$/,
    use: [require.resolve('@svgr/webpack')]
  },
  {
    // "file" loader makes sure assets end up in the `build` folder.
    // When you `import` an asset, you get its filename.
    // This loader doesn't use a "test" so it will catch all modules
    // that fall through the other loaders.
    loader: require.resolve('file-loader'),
    // Exclude `js` files to keep "css" loader working as it injects
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
