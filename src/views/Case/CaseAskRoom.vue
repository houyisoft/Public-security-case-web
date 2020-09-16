<template>
  <div class="page-wrap">
    <case-main-top title="分配询讯问室">
      <el-form
        class="case-main-top-form"
        ref="caseMainTopForm"
        :model="caseMainTopFormData"
      >
        <el-form-item
          class="form-item form-item-isleave"
          label="是否已离开"
          prop="isLeave"
        >
          <el-select
            class="select-isleave"
            placeholder="请选择"
            v-model="caseMainTopFormData.isLeave"
            clearable
          >
            <el-option
              class="option-isleave"
              label="已离开"
              value="1"
            ></el-option>
            <el-option
              class="option-isleave"
              label="未离开"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item form-item-name"
          label="人员姓名"
          prop="name"
        >
          <el-input
            class="input-name"
            placeholder="请输入"
            v-model.trim="caseMainTopFormData.name"
          ></el-input>
        </el-form-item>
        <el-button class="form-btn" type="primary" @click="postFormData"
          >查询</el-button
        >

        <div style="margin-left: 20px;">
          <el-button
            class="form-btn in-btn"
            type="primary"
            @click="getpersonmain(1)"
            >进入</el-button
          >
          <el-button class="form-btn out-btn" @click="getpersonmain(2)"
            >离开</el-button
          >
        </div>
      </el-form>
    </case-main-top>
    <div class="page-main">
      <el-table class="main-table" :data="askRoomTableData.list">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="人员名称" width="100">
        </el-table-column>
        <el-table-column prop="personSite" label="所在位置"> </el-table-column>
        <el-table-column prop="zFCaseId" label="案件编号" width="150">
        </el-table-column>
        <el-table-column prop="caseName" label="案件名称" width="100">
        </el-table-column>
        <el-table-column prop="wristbanNo" label="手环编号" width="200">
        </el-table-column>
        <el-table-column prop="policeName" label="交接民警" width="100">
        </el-table-column>
        <el-table-column label="是否已离开" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.isout == 0">未离开</span>
            <span v-else>已离开</span>
          </template>
        </el-table-column>
        <el-table-column prop="fcName" label="功能室名称" width="100">
        </el-table-column>
        <el-table-column prop="beginDate" label="进入时间" width="150">
        </el-table-column>
        <el-table-column prop="endDate" label="离开时间" width="150">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="askRoomTableData.total"
        :hide-on-single-page="false"
      >
      </el-pagination>
    </div>
    <case-ask-room-dialog-item
      :personInfo="personInfo"
      :typelist="typelist"
      @onSavePersonInfo="savePersonInfo"
    ></case-ask-room-dialog-item>
  </div>
</template>

<script>
import functionRoom from '@/apis/functionRoom.js'
import CaseAskRoomDialogItem from './components/CaseAskRoomDialogItem.vue'
import CaseMainTop from '@/components/CaseMainTop.vue'
export default {
  components: {
    CaseMainTop,
    CaseAskRoomDialogItem,
  },
  data() {
    return {
      caseMainTopFormData: {
        isLeave: '',
        name: '',
      },
      personInfo: {},
      askRoomTableData: {
        total: 0,
        list: [],
      },
      pageNum: 1,
      pageSize: 10,
      typelist: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getpersonmain(num) {
      if (num == 1) {
        functionRoom
          .getPersonmain({
            Authorization: localStorage.getItem('token'),
            wristbandId: '425174738344677376',
          })
          .then((res) => {
            console.log(res)
            if (res.code == 0) {
              if (res.data.funcName == '') {
                functionRoom.limitedRoomList({ roomType: 1 }).teh((res) => {
                  if (res.code == 0) {
                    this.typelist = res.rows
                    this.personInfo = res.data
                    this.$store.commit('Case/updateAskRoomDialog', {
                      visible: true,
                      status: 1,
                    })
                  }
                })
              } else {
                this.personInfo = res.data
                this.$store.commit('Case/updateAskRoomDialog', {
                  visible: true,
                  status: 1,
                })
              }
            }
          })
      } else if (num == 2) {
        functionRoom
          .getPersonmain({
            Authorization: localStorage.getItem('token'),
            wristbandId: '425174738344677376',
          })
          .then((res) => {
            console.log(res)
            if (res.code == 0) {
              if (res.data.funcName == '') {
                functionRoom.limitedRoomList({ roomType: 1 }).teh((res) => {
                  if (res.code == 0) {
                    this.typelist = res.rows
                    this.personInfo = res.data
                    this.$store.commit('Case/updateAskRoomDialog', {
                      visible: true,
                      status: 2,
                    })
                  }
                })
              } else {
                this.personInfo = res.data
                this.$store.commit('Case/updateAskRoomDialog', {
                  visible: true,
                  status: 2,
                })
              }
            }
          })
      }
    },
    getList() {
      let obj = {
        Authorization: localStorage.getItem('token'),
        roomType: 2,
        name: this.caseMainTopFormData.name,
        isOut: this.caseMainTopFormData.isLeave,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }
      functionRoom.getRoomlist(obj).then((res) => {
        if (res.code == 0) {
          this.askRoomTableData.list = res.rows
          this.askRoomTableData.total = res.total
        }
      })
    },
    postFormData() {
      this.$validate('caseMainTopForm')
        .then((res) => {
          this.getList()
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    // 保存刷手环人员信息
    savePersonInfo() {
      this.personInfo.inOrOut =
        this.$store.state.Case.askRoomDialog.status == 1 ? 0 : 1
      this.personInfo.suspectNo = this.personInfo.fId
      this.personInfo.centerID = JSON.parse(
        localStorage.getItem('userInfo')
      ).fcompanyid
      functionRoom.editRoom(this.personInfo).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
          })
        } else {
          this.$message({
            message: '操作失败',
            type: 'error',
          })
        }
      })
    },
    handleSizeChange(val) {
      console.log('设置每页数量', val)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log('设置当前页码', val)
      this.pageNum = val
    },
  },
}
</script>

<style scoped lang="scss">
.case-main-top-cpnt .title-wrap {
  background-color: transparent !important;
}
</style>
