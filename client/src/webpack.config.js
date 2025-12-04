const path = require('path');

module.exports = {
  // other configurations...
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      },
      // other rules...
    ]
  },
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker': path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.entry')
    }
  }
};
