const Case = {
	namespaced: true, // 使模块带命名空间 "info/case"
	state: {
		// 分配侯问室弹框控制
		waitRoomDialog: {
			visible: false, // 弹框显示隐藏
			status: 1, // 1：进入，2：离开
		},
		// 分配询讯问室弹框控制
		askRoomDialog: {
			visible: false, // 弹框显示隐藏
			status: 1, // 1：进入，2：离开
		}
	},
	mutations: {
		// 分配侯问室弹框组件
		updateWaitRoomDialog(state, data) {
			state.waitRoomDialog = { ...state.waitRoomDialog,
				...data
			}
		},
		// 分配询讯问室弹框组件
		updateAskRoomDialog(state, data) {
			state.askRoomDialog = { ...state.askRoomDialog,
				...data
			}
		},
	},
	actions: {
		fn({
			state,
			dispatch,
			commit,
			getters,
			rootState,
			rootGetters
		}) {

		}
	}
}
export default Case
