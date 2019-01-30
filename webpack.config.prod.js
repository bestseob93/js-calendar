'use strict';
var NODE_ENV = process.env.NODE_ENV;

var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html 템플릿 사용
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 파일 추출
var CompressionWebpackPlugin = require('compression-webpack-plugin');

var appDirectory = fs.realpathSync(process.cwd()); // 디렉토리 경로

var resolveApp = function(relativePath) {
  return path.resolve(appDirectory, relativePath);
};

var paths = {
  appPath: resolveApp('src/app.js'),
  buildPath: resolveApp('dist'), // 배포 경로
  appHtml: resolveApp('src/index.html'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
};

module.exports = {
  mode: NODE_ENV,
  entry: {
    app: paths.appPath,
  },
  output: {
    path: paths.buildPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.js'],
    /**
     * before: var file = require('file.js');
     * after: var file = require('file');
     */
    modules: ['node_modules', paths.appSrc, paths.appNodeModules], // 절대 경로 설정
  },
  module: {
    rules: [
      // eslint
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: paths.appHtml
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CompressionWebpackPlugin({ // gzip 압축
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/i,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};