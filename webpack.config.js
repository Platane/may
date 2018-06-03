const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const production = 'production' === process.env.NODE_ENV

module.exports = {
  entry: {
    app: ['./src/index.js', './src/index.html'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: /\.html?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: true,
              localIdentName: production
                ? '[hash:8]'
                : '[path][name]---[local]',
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|otf|woff2|svg|gif|jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:6].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],

  devtool: 'source-map',

  devServer: {
    port: 8082,
    contentBase: [path.join(__dirname, 'node_modules/firebase')],
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
