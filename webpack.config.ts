/* eslint-disable import/no-extraneous-dependencies */
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
}
