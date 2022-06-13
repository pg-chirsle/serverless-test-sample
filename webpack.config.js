const path = require('path');
const serverlessWepback = require('serverless-webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const configFile = path.resolve(__dirname, "tsconfig.json")
const entries = {};
Object.keys(serverlessWepback.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', serverlessWepback.lib.entries[key]])
);

module.exports = {
  mode: serverlessWepback.lib.webpack.isLocal ? 'development' : 'production',
  entry: entries,
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile })]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}