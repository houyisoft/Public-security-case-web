import Vue from 'vue'
import Vuex from 'vuex'
import apiCommon from '@/apis/apiCommon.js'

Vue.use(Vuex)

import Case from './case.js'
import Info from './info.js'
import apiAccount from "@/apis/apiAccount.js";
import {
	titleCase
} from '@/utils/utils.js'
const userInfo = localStorage.getItem('userInfo');
export default new Vuex.Store({
	state: {
		token: '',
		userInfo: userInfo ? JSON.parse(userInfo) : {},
		typeObjData: {
			personTypes: [], // 1-涉案人员-人员类型 
			genderTypes: [], // 2-性别 
			cardTypes: [], // 3-证件类型 
			educTypes: [], // 4-文化程度 
			blTypes: [], // 5-笔录类别 
			entryReasonTypes: [], // 6-进入场所原因 
			caseNatureTypes: [], // 7-案件性质 
			caseTypes: [], // 8-案件类别（案由）
			goWhereTypes: [], // 9-出区去向
			unInvolvedStaffTypes: [], // 10-非涉案人员工作人员-人员类型 
			unInvolvedPoliceTypes: [], // 11-非涉案人员民警-人员类型 
			unInvolvedOtherTypes: [], // 12-非涉案人员其他-人员类型
		},
		departmentData: { // 部门列表
			total: 0,
			rows: []
		},
		posts: [], // 岗位列表
		currentMenuIndex: "", // 当前激活导航菜单的Index
		menuList: [],
		originMenuList: [],
		title:""

	},
	mutations: {
		logout(state) {
			state.menuList = [];
			state.originMenuList = [];
			token = '';
			userInfo = {};
		},
		updateTitle(state, data) {
			state.title = data
			window.localStorage.setItem('title', data)
		},
		updateMenuList(state, data) {
			state.menuList = data
			// window.localStorage.setItem('menuList', JSON.stringify(data))
		},
		updateOriginMenuList(state, data) {
			state.originMenuList = data
			// window.localStorage.setItem('menuList', JSON.stringify(data))
		},
		// 类型列表
		updateTypeObjData(state, data) {
			state.typeObjData = {
				...state.typeObjData,
				...data
			}
			window.localStorage.removeItem('typeObjData')
			window.localStorage.setItem('typeObjData', JSON.stringify(state.typeObjData))
		},
		updateTypeMapData(state, data) {
			state.typeMapData = {
				...state.typeMapData,
				...data
			}
			window.localStorage.removeItem('typeMapData')
			window.localStorage.setItem('typeMapData', JSON.stringify(state.typeMapData))
		},
		// 部门列表
		updateDepartmentData(state, data) {
			state.departmentData = data
		},
		updatePosts(state, data) {
			state.posts = data
			window.localStorage.removeItem('posts')
			window.localStorage.setItem('posts', JSON.stringify(state.posts))
		},
		updateToken(state, data) {
			state.token = data
			window.localStorage.setItem('token', data)
		},
		updateUserInfo(state, data) {
			state.userInfo = data
			window.localStorage.setItem('userInfo', JSON.stringify(data))
		},
		updateCurrentMenuIndex(state, data) {
			state.currentMenuIndex = data
		},
	},
	actions: {
		initData({
			state,
			dispatch,
			commit,
			getters,
			rootState,
			rootGetters
		}) {
			Promise.all([apiCommon.getLrBaseDepartmentList(), ...[1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12].map(index => apiCommon.getLrBaseDataitemdetailList({
					type: index
				})), apiCommon.getTbPostList()].map(item => {
					return item.catch(err => err)
				}))
				.then(res => {
					let tempObjData = {}
					let tempMapData = {}
					res.forEach((resItem, resIndex) => {
						// 单独处理部门列表
						if (resIndex === 0) {
							// commit('updateDepartmentData', resItem)
						} else if (resIndex > 0 && resIndex <= 11) { // 类型列表
							tempObjData[resIndex] = resItem.data

							// 生成映射
							if (resIndex === 1 || resIndex === 2 || resIndex === 4 || resIndex === 6) { // 1.涉案人员类型 6.进入场所原因
								tempMapData[resIndex] = {}
								tempObjData[resIndex].forEach(item => {
									tempMapData[resIndex][item.fitemvalue] = item
								})
							}
						} else if (resIndex === 12) { // 岗位列表
							commit('updatePosts', resItem.rows)
						}
					})
					let typeObjData = {
						personTypes: tempObjData[1], // 1-涉案人员-人员类型 
						genderTypes: tempObjData[2], // 2-性别 
						cardTypes: tempObjData[3], // 3-证件类型 
						educTypes: tempObjData[4], // 4-文化程度 
						blTypes: tempObjData[5], // 5-笔录类别 
						entryReasonTypes: tempObjData[6], // 6-进入场所原因 
						caseNatureTypes: tempObjData[7], // 7-案件性质 
						goWhereTypes: tempObjData[8], // 9-出区去向
						unInvolvedStaffTypes: tempObjData[9], // 10-  非涉案人员-工作人员类型
						unInvolvedPoliceTypes: tempObjData[10], // 10- 非涉案人员-警察类型
						unInvolvedOtherTypes: tempObjData[11], // 10- 非涉案人员-其他人员类型
					}
					let typeMapData = {
						personTypes: tempMapData[1],
						genderTypes: tempMapData[2],
						educTypes: tempMapData[4],
						entryReasonTypes: tempMapData[6]
					}
					commit('updateTypeObjData', typeObjData)
					commit('updateTypeMapData', typeMapData)
				}).catch(err => {
					console.log('初始化数据失败', err)
				})
		},
		//获取权限菜单
		GenerateRoutes({
			commit
		}) {
			return new Promise(resolve => {
				// 向后端请求路由数据
				apiAccount.getRouters().then(res => {
					const accessedRoutes = res.data || [];
					const routers = [];
					for (const node of res.data) {
						const {
							fUrladdress: component,
							fIcon: icon,
							fFullname: title,
							fModuleid: id,
							fParentid: parentId,
							fPath: path,
							fVisible
						} = node;
						routers.push({
							component: component,
							id,
							parentId,
							path,
							name: titleCase(path),
							meta: {
								icon,
								title,
							},
							hidden: fVisible === 0 ? true : false
						});
					}
					commit('updateOriginMenuList', routers);
					resolve(routers)
				})
			})
		}
	},
	modules: {
		Case,
		Info
	}
})