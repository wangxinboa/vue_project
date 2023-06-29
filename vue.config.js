const path = require('path')

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        // 第三方框架
        'jszip': path.resolve(__dirname, 'src/third_party/jszip/jszip.js'),
        '@babel/parser': path.resolve(__dirname, 'src/third_party/@babel/parser.js'),
        'd3': path.resolve(__dirname, 'src/third_party/d3/d3.7.8.5.js'),
      }
    }
  }
	
};
