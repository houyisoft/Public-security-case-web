import axios from 'axios'
import qs from 'qs'
import {
	Notification
} from 'element-ui'
import router from '@/router'
import {
	getToken,
	removeToken
} from '@/utils/auth.js'

// 设置接口基准地址
// axios.defaults.baseURL = "http://39.102.61.131/gongan";
axios.defaults.baseURL = "/api/gongan";

// 请求超时时间
// axios.defaults.timeout = 30000;

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 科达接口
	if (config.url.indexOf('/udms') === 0) {
		config.baseURL = '/'
	} else {
		config.headers['Authorization'] = getToken()
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(response => {
	console.log()
	const {
		data,
		status
	} = response;
	if (status === 200) {
		const {
			code
		} = data;
		if (code == '8803') {
			removeToken();
			Notification.error('登录已失效，请重新登录！');
			// const path = router.currentRoute.path;
			// if (path != '/login') {
			// 	router.push(`/login?redirectTo=${encodeURIComponent(router.currentRoute.fullPath)}`)
			// }
		}
		return data;
	}
	return response;
}, error => {
	// 对响应错误做些什么
	if (error.response) {

	}
	return Promise.reject(error);
});

export default {
	getJson(url, data) {
		return new Promise((resolve, reject) => {
			axios.get(url, qs.stringify(data)).then((res) => {
				resolve(res);
			}, (error) => {
				reject(error)
			})
		})
	},
	get(url, params = {}) {
		return axios.post(url, params)
	},
	post(url, params = {}) {
		return axios.post(url, qs.stringify(params, {
			indices: false
		}))
	},
	postJson(url, params) {
		return axios.post(url, params, {
			indices: false
		}, {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	},
	postData(url, params) {
		return axios({
			url: url,
			method: 'post',
			data: params,
			indices: false
		})
	},
	formDataRequest(url, data) {
		return axios({
			url: url,
			method: 'post',
			data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded '
			},
			transformRequest: [function (data) {
				const formData = new FormData();
				console.log(formData);
				for (let key in data) {
					const value = data[key];
					if (typeof value === 'object') {
						formData.append(key, JSON.stringify(value));
					} else {
						formData.append(key, value);
					}
				}

				return formData;
			}],
		})
	},
	download(url, params = {}, fileName = '') {
		return axios({
			url: url,
			method: 'post',
			params,
			responseType: "arraybuffer"
		}).then(res => {
			const content = res;
			const blob = new Blob([content]);
			if ('msSaveOrOpenBlob' in navigator) {
				window.navigator.msSaveOrOpenBlob(blob, fileName);
				return;
			}
			const elink = document.createElement("a");
			elink.download = fileName;
			elink.style.display = "none";
			elink.href = URL.createObjectURL(blob);
			document.body.appendChild(elink);
			elink.click();
			URL.revokeObjectURL(elink.href);
			document.body.removeChild(elink);
		});
	}
}