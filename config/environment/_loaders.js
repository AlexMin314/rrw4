const paths = require('./_paths')
const transforms = require('./_transforms')

module.exports = [
  // linter
  {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    include: paths.src,
    exclude: /node_modules/,
    options: {
      cache: true,
      emitError: true,
      configFile: paths.eslint
    }
  },
  // Process etc files - e.g. media files
  {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.json$/,
      /\.(otf|eot|svg|ttf|woff|woff2)$/,
      /\.(bmp|png|gif|jpe?g|svg)$/,
      /\.scss$/
    ],
    use: {
      loader: 'file-loader',
      options: { name: 'assets/media/[name].[hash:8].[ext]' }
    }
  },
  // Process fonts
  {
    test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
    use: {
      loader: 'file-loader',
      options: { name: 'assets/fonts/[name].[hash:8].[ext]' }
    }
  },
  // Process images
  {
    test: /\.(bmp|png|gif|jpe?g|svg)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000, // Convert images < 10kb to base64 strings
        name: 'assets/images/[name].[hash:8].[ext]'
      }
    }
  },
  // Process JS with Babel.
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        // cacheDirectory: true,
        presets: [['env', { modules: false }], 'react'],
        env: {
          development: {},
          production: {
            plugins: ['transform-react-remove-prop-types']
          },
          test: {}
        },
        plugins: [
          'react-hot-loader/babel',
          'transform-runtime',
          'syntax-dynamic-import',
          'babel-plugin-styled-components',
          'transform-class-properties',
          'transform-object-rest-spread',
          transforms()
        ]
      }
    }
  },
  // Process css and style tag
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }
  // ** STOP ** Are you adding a new loader?
  // Remember to add the new extension(s) to the "file" loader exclusion list.
]
