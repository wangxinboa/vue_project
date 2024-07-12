const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
	publicPath: './',
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				// 第三方框架
				'@third_party': path.resolve(__dirname, 'src/third_party'),
			}
		},
		plugins: [
			new MonacoWebpackPlugin(), // 解决 monaco-editor 报错问题
		]
	},
	pages: {
		iframe: {
			entry: 'src/iframe.js',
			template: 'public/su7/index.html',
			filename: 'su7/iframe.html',
		},
		index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
		}
	}
	// devServer: {
	//   proxy: {
	//     ws: false
	//   }
	// }
	
};