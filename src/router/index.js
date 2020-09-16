import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import store from '../store'
import "nprogress/nprogress.css";
import {
	getToken
} from '@/utils/auth.js'
import {
	handleTree
} from '@/utils/utils.js'
Vue.use(VueRouter);


const routes = [{
	name: '',
	path: '/',
	redirect: '/home'
}, {
	name: 'Home',
	path: '/home',
	component: () => import('@/views/Home.vue'),
	meta: {
		title: '首页',
		icon: ''
	},
}, {
	name: 'AccountLogin',
	path: '/login',
	component: () => import('@/views/Account/AccountLogin.vue'),
	meta: {
		title: '登录',
		icon: ''
	},
}, ];


const router = new VueRouter({
	mode: "history",
	scrollBehavior: () => ({
		y: 0
	}),
	routes,
});

//处理权限菜单
export function handleMenuList(routerList) {
	return new Promise((resolve, reject) => {
		const newRouters = handleTree(routerList, {
			callback(node, hasChildren) {
				if (!hasChildren) {
					delete node.alwaysShow;
				} else {
					node.redirect = "noRedirect";
					node.path = '/' + node.path;
				}
				if (node.component) {
					const view = node.component;
					node.component = (resolve) => require([`@/views/${view}`], resolve)
				} else {
					node.component = () => import('@/views/Layout/Layout.vue')
				}
			}
		});
		router.addRoutes(newRouters)
		store.commit('updateMenuList', newRouters)
		resolve(newRouters);
	})
}

NProgress.configure({
	showSpinner: false,
});

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
	NProgress.start();
	if (getToken()) {
		/* has token*/
		if (to.path === '/login') {
			next()
			NProgress.done()
		} else {
			const menuList = store.state.menuList
			if (menuList.length) {
				next();
			} else {
				store.dispatch('GenerateRoutes').then(res => {
					handleMenuList(res).then(res => {
						next({
							...to
						})
					}).catch(e => {
						console.log(e)
						NProgress.done();
					})
				}).catch(e => {
					next();
					console.log(e)
					NProgress.done();
				});

			}
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			next(`/login?redirectTo=${encodeURIComponent(router.currentRoute.fullPath)}`)
		}
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;