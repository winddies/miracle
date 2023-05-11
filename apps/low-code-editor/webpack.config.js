const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].chunk.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    // 自动压缩代码
    compress: true,
    port: 3300,
    // 自动打开浏览器
    open: true,
    host: '0.0.0.0',
    // publicPath: "/assets/",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        // .css.less文件解析
        test: /\.(css|less)$/, // 匹配到css结尾的文件，加载css-loader，
        // 去除.module.css;.module.less，因为有单独处理
        exclude: [/\.module\.(css|less)/, /\.global\.less$/],
        use: [
          'style-loader',
          {
            // css单独分离文件加载
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        // .module.css;.module.less文件解析，添加css modules，防止样式感染
        test: /\.module\.(css|less)/, // 匹配到less结尾的文件
        use: [
          'style-loader',
          {
            // css单独分离文件加载
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      filename: 'index.html',
    }),
  ],
};
