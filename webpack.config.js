const path = require('path');

module.exports = {
  entry: './dist/src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/src/public')
  },
  mode: 'development'
};
