const path = require('path');
let webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: "./src/index.js",
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
    vendor: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    // publicPath: "./dist/"
  },
  // watch: true,
  // devtool: "source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader"]
        })
      },
      { test: /\.(jpe?g|png)$/, use: 'file-loader?name=images/[name].[hash:8].[ext]' },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin({
      filename: 'style/build.min.css'
    }),
    new HtmlWebpackPlugin({
      title: 'hello world',
      // filename: 'admin.html',
      template: 'templete/index.html'
    })
    // new webpack.HotModuleReplacementPlugin()
  ]
}
