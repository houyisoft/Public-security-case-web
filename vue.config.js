const webpack = require('webpack')
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	chainWebpack: config => {
		config.entry.app = ["babel-polyfill", resolve('src/main.js')],
			config.resolve.alias
			.set('@', resolve('src'))
			.set('./@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@store', resolve('src/store')),
			config.plugin('html')
			.tap(args => {
				args[0].title = '执法办案管理中心智能管控平台'
				return args
			})

	},
	devServer: {
		disableHostCheck: false,
		proxy: {
			'/api': {
				target: 'http://39.102.61.131', //测试环境
				// target: 'http://192.168.1.142:8888', //蕊
				// target: 'http://192.168.1.144:8888', //强
				// target: 'http://192.168.1.154:8888', //宇
				changeOrigin: true, //允许跨域 
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			// '/api/gongan': {
			// 	target: 'http://127.0.0.1:8888', //测试环境
			// 	changeOrigin: true, //允许跨域 
			// 	ws: true,
			// 	pathRewrite: {
			// 		'^/api/gongan': ''
			// 	}
			// },
			'/udms': {
				target: 'http://180.169.73.198:19210', //测试环境
				changeOrigin: true, //允许跨域 

				ws: true,

				pathRewrite: {
					'^/udms': '/'
				}
			}
		}
	}
}