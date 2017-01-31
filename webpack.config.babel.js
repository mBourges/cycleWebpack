const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const removeEmpty = array => array.filter(p => !!p);
  const ifProd = plugin => env.prod ? plugin : undefined;

  return {
    context: resolve('src'),
    entry: {
      app: './index.js',
      auth: ['auth0-lock', 'jwt-decode'],
      vendors: [
        '@cycle/dom',
        '@cycle/xstream-run',
        'xstream',
        '@cycle/history',
        '@cycle/isolate',
        'cyclic-router',
        'history',
        'switch-path'
      ]
    },
    output: {
      filename: env.prod ? 'bundle.[name].[chunkhash].js' : 'bundle.[name].js',
      path: resolve('dist'),
      pathinfo: !env.prod,
      publicPath: '/'
    },
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader'
        })  },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })  },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
        }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new ExtractTextPlugin({
        filename: env.prod ? 'styles.[name].[chunkhash].css': 'styles.[name].css',
        allChunks: true
      }),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: ['auth', 'vendors', 'manifest']
      })),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ])
  };
};
