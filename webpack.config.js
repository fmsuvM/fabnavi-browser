const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: path.join(__dirname, 'src/renderer/index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'dist.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        { test: /\.css$/, use: ['css-loader'] },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3001,
      open: true
    },
    resolve: {
      extensions: ['.js', 'jsx']
    }
  }
];
