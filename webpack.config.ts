/* eslint-disable import/no-extraneous-dependencies */
import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpack = require('webpack');

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    app: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
}

export default config
