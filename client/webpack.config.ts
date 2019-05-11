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
      {
        test: /\.glsl$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.glsl'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new webpack.IgnorePlugin(/(oimo|earcut|cannon)/),
  ],
}

export default config
