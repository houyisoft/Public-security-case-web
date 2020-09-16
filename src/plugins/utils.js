// 工具函数插件
let Utils = {}
Utils.install = function (Vue, options) {
	// 重置 element-ui 表单
	Vue.prototype.$resetFields = function (refName) {
		if (this.$refs[refName]) {
			this.$refs[refName].resetFields()
		}
	}
	 // 重置 element-ui 校验
	Vue.prototype.$clearValidate = function (refName) {
		if (this.$refs[refName]) {
			this.$refs[refName].clearValidate()
		}
	}

	// 验证 element-ui 表单
	// @module 组件存放位置
	// @desc element-ui扩展表单验证功能，返回Promise实例，参数为boolean及不通过字段
	// @author 高飞翔
	// @date 2020年5月2日
	// @params {String} [refName] - 表单ref
	Vue.prototype.$validate = function (refName) {
		return new Promise((resolve, reject) => {
			if (this.$refs[refName]) {
				this.$refs[refName].validate((valid, fields) => {
					if (valid) {
						resolve()
					} else {
						reject({
							errMsg: "验证不通过",
							fields
						})
					}
				})
			} else {
				reject({
					errMsg: "请传入表单ref",
					fields: ""
				})
			}
		})
	}

	/* 正则验证格式函数 */
	// 验证手机号格式
	Vue.prototype.$isMobile = (val) => {
		if (!/^[1][0-9]{10}$/.test(val)) {
			return false
		} else {
			return true
		}
	}
	// 验证身份证号格式
	Vue.prototype.$isIdNo = (val) => {
		if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)) {
			return false
		} else {
			return true
		}
	}

	// 验证邮箱格式
	Vue.prototype.$isEmail = (val) => {
		if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)) {
			return false
		} else {
			return true
		}
	}
	// 验证密码格式
	Vue.prototype.$isPassword = (val) => {
		if (!/^[a-zA-Z0-9]{6,20}$/.test(val)) {
			return false
		} else {
			return true
		}
	}

	/* el-form 表单自定义校验规则 */
	Vue.prototype.$checkMobile = (rule, value, callback) => {
		if (!Vue.prototype.$isMobile(value)) {
			callback(new Error('请输入正确的手机号码'));
		} else {
			callback()
		}
	};

	Vue.prototype.$checkEmail = (value, callback) => {
		if (!Vue.prototype.$isEmail(value)) {
			callback(new Error('请输入正确的邮箱地址'));
		} else {
			callback()
		}
	};

	Vue.prototype.$checkIdNo = (rule, value, callback) => {
		if (!Vue.prototype.$isIdNo(value)) {
			callback(new Error('请输入正确的身份证号码'));
		} else {
			callback()
		}
	};

	Vue.prototype.$checkPassWord = (value, callback) => {
		if (!Vue.prototype.$isPassWord(value)) {
			callback(new Error('密码格式不正确'));
		} else {
			callback()
		}
	};

	Vue.prototype.$elConfirm = function (obj = {}) {
		return new Promise((resolve, reject) => {
			let title = obj.title ? obj.title : '提示'
			let message = obj.message ? obj.message : '确定继续该操作？'
			let confirmButtonText = obj.confirmButtonText ? obj.confirmButtonText : '确定'
			let cancelButtonText = obj.cancelButtonText ? obj.cancelButtonText : '取消'
			let type = obj.type ? obj.type : 'warning' // success，error，info，warning
			this.$confirm(message, title, {
				confirmButtonText,
				cancelButtonText,
				type
			}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default Utils