var fs = require('fs')
var path = require('path')
module.exports = {
  entry: [`${__dirname}/server/server.js`],
  output: {
    path: `${__dirname}/dist`,
    filename: 'server.bundle.js',
    publicPath: '/dist/',
  },
  // set the output bundle.js to Node.js format
  target: 'node',
  // enable the variables which be used in the source code
  node: {
    __filename: true,
    __dirname: true,
  },
  // 讀取node_modules資料夾，以目錄名建一個node_modules的array
  // 手動加入'react-dom/server', 'react/addons',兩個有child package的package
  // 以reduce，初值為 {}
  // 每次就將 node_modules array中的 module 加上commonjs的prefix，然後放進object中
  // (array的第一項剛好是./，所以可以不管他，reduce會從第二項開始)
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: `${__dirname}/app`,
        exclude: /bundle\.js$/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
    ],
  },
}
