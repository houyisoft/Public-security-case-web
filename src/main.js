import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 开发并引入全局工具函数插件
import Utils from './plugins/utils'
Vue.use(Utils)
import './assets/icons' // icon
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./@assets/css/common.scss";
import "./@assets/css/default.scss";
Vue.use(Element, {
	size: 'small'
})

Vue.config.productionTip = false

// 基础组件的自动化全局注册
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase' // 因为在组件名字处理的时候会用到lodash的部分，所以引入
const requireComponent = require.context(
	// 其组件目录的相对路径
	'./components/Base',
	// 是否查询其子目录
	false,
	// 匹配基础组件文件名的正则表达式
	/Base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)
	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 获取和目录深度无关的文件名
			fileName
			.split('/')
			.pop()
			.replace(/\.\w+$/, '')
		)
	)
	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})

export default new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')