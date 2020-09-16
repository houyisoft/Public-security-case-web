import $axios from '@/apis/index.js'

export default {
  //  人员类型
  getPersonType(data) {
    return $axios.post('/management/lrBaseDataitem/getPersonType', data)
  },
  //公司列表
  getCompanylist(data) {
    return $axios.post('/management/tbOrganize/list', data)
  },


  //  用户列表
  getUserlist(data) {
    return $axios.post('/management/lrBaseUser/list', data)
  },
  //添加用户
  addUser(data) {
    return $axios.post('/management/lrBaseUser/add', data)
  },
  //修改用户
  editUser(data) {
    return $axios.post('/management/lrBaseUser/edit', data)
  },
  //删除用户
  deleteUser(data) {
    return $axios.post('/management/lrBaseUser/remove', data)
  },
  //删除用户
  resetUserPwd(data) {
    return $axios.post('/management/lrBaseUser/resetPwd', data)
  },

  //获取公司
  getOrgList(data) {
		return $axios.post('/management/tbOrganize/orgTree', data)
	},

  //  新增修改用户
  addOrUpdateUser(data) {
    if (data.fUserid) {
      return $axios.post('/management/lrBaseUser/edit', data)
    } else {
      return $axios.post('/management/lrBaseUser/add', data)
    }
  },
	diclist(data) {
		return $axios.post('/management/lrBaseDataitemdetail/list', data)
    },
  //查询角色
  getUserDetail(id) {
    return $axios.post(`/management/lrBaseUser/${id}`)
  },
  //  角色列表
  getRolelist(data) {
    return $axios.post('/management/lrBaseRole/list', data)
  },
  //  新增角色
  addOrUpdateRole(data) {
    if (data.fRoleid) {
      return $axios.post('/management/lrBaseRole/edit', data)
    } else {
      return $axios.post('/management/lrBaseRole/add', data)
    }
  },
   //  删除角色
  deleteRole(data) {
    return $axios.post('/management/lrBaseRole/remove', data)
  },
  //查询角色
  getRoleDetail(id) {
    return $axios.post(`/management/lrBaseRole/${id}`)
  },
  //查询角色Tree选中节点
  getCheckedRoleMenu(id) {
    return $axios.post(`/management/lrBaseRole/roleMenu/${id}`)
  },

  //  岗位管理
  getPostList(data) {
    return $axios.post('/management/tbPost/list', data)
  },
  //  岗位管理详情
  getPostDetail(id) {
    return $axios.post(`/management/tbPost/${id}`)
  },
  //添加岗位or修改岗位
  addOrUpdatePost(data) {
    if (data.fId) {
      return $axios.post('/management/tbPost/edit', data)
    } else {
      return $axios.post('/management/tbPost/add', data)
    }
  },
  deletePost(data) {
    return $axios.post('/management/tbPost/remove', data)
  },

  //功能室列表
  getHouselist(data) {
    return $axios.post('/management/tbFunctionroomBase/list', data)
  },



  //  部门管理
  getDepartmentlist(data) {
    return $axios.post('/management/tbDepartment/list', data)
  },




  //  设备列表
  getEquipmentlist(data) {
    return $axios.post('/management/tbEquipment/list', data)
  },
  //  新增设备
  addOrUpdateEquipment(data) {
    if (data.fId) {
      return $axios.post('/management/tbEquipment/edit', data)
    } else {
      return $axios.post('/management/tbEquipment/add', data)
    }
  },
  //查询设备
  getEquipmentDetail(id) {
    return $axios.post(`/management/tbEquipment/${id}`)
  },
  deleteEquipment(data) {
    return $axios.post(`/management/tbEquipment/remove`, data)
  }
}