<template>
  <div class="info-broadcast-area">
    <base-top-form
      title="广播区域"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:btn>
        <el-button type="primary" @click="setRadioForm">设置终端对应</el-button>
      </template>
      <template v-slot:form>
        <el-form-item prop="key" label="区域名称：">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

    <base-table-btns
      @onBaseTableBtnsAdd="baseTableBtnsAdd"
      @onBaseTableBtnsEdit="baseTableBtnsEdit"
      @onBaseTableBtnsDelete="baseTableBtnsDelete"
    ></base-table-btns>

    <base-table
      :baseTableData="baseTableData.list"
      :isBaseTableCheckbox="false"
      baseTableDataPrimaryKey="fid"
      :baseTableDataTotal="baseTableData.total"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="areaName" label="区域名称"> </el-table-column>
      <el-table-column prop="microphoneCode" label="编号"> </el-table-column>
      <el-table-column prop="createDate" label="创建时间"> </el-table-column>
      <el-table-column prop="createUserName" label="创建用户">
      </el-table-column>
    </base-table>

    <base-dialog
      :isBaseDialog="isBaseDialog"
      :baseDialogFormData="baseDialogFormData"
      :title="baseDialogType == 1 ? '新增' : '编辑'"
      @onHandleIsBaseDialog="handleIsBaseDialog"
      @onPostBaseDialogFormData="postBaseDialogFormData"
    >
      <template v-slot:form>
        <el-form-item
          prop="areaName"
          :rules="[
            { required: true, message: '请输入区域名称', trigger: 'blur' },
          ]"
          label="区域名称"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.areaName"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="microphoneCode"
          :rules="[{ required: true, message: '请输入编号', trigger: 'blur' }]"
          label="编号"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.microphoneCode"
          ></el-input>
        </el-form-item>
      </template>
    </base-dialog>
    <!-- 1. 设置对应关系 -->
    <el-dialog title="设置对应关系" :visible.sync="isSetDialog" :close-on-click-modal="false">
      <base-table
        ref="myBaseTable"
        baseTableDataPrimaryKey="fid"
        :baseTableHeight="550"
        :baseTableData="setBaseTableData.rows"
        :baseTableDataTotal="setBaseTableData.total"
        :isBaseTableRadio="false"
        @onBaseTableSelectChange="baseTableSelectionChange"
        @onBaseTableCurrentChange="setBaseTableCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="终端编码"> </el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="chooseSet">确认</el-button>
        <el-button @click="isSetDialog = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import InfoBroadcastArea from '@/apis/Info/InfoBroadcastArea.js'
export default {
  data() {
    return {
      // 顶部表单数据
      baseTopFormData: {
        key: '',
      },
      // 表格数据
      baseTableData: {
        total: 20,
        list: [],
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      isBaseDialogSet: false,
      baseDialogFormData: {},
      isSetDialog: false,
      setBaseTableData: {
        total: 0,
        rows: [],
      },
      setBaseTableCurrent: {},
      setbaseTablePageCurrent: 1,
      setBaseTablePageSize: 100,
      checkedRadioTableData: [],
      selectCheckTable: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      InfoBroadcastArea.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        areaName: this.baseTopFormData.key,
      }).then((res) => {
        if (res.code == 0) {
          this.baseTableData.list = res.rows
          this.baseTableData.total = res.total
        }
      })
    },
    getRadioList() {
      InfoBroadcastArea.getRadioList({
        pageNum: 1,
        pageSize: 100,
        code: '',
        centerInfoId: 0,
      }).then((res) => {
        if (res.code == 0) {
          this.setBaseTableData.rows = res.rows
          this.setBaseTableData.total = res.total
          this.getCheckedList()
        }
      })
    },
    getCheckedList() {
      if (this.baseTableCurrent.fid != null) {
        InfoBroadcastArea.getCheckedRadioList({
          areaID: this.baseTableCurrent.fid,
        }).then((res) => {
          // debugger
          if (res.code == 0) {
            this.selectCheckTable = res.data
            var arr = []
            // debugger
            if (this.selectCheckTable.length > 0) {
              this.selectCheckTable.forEach((item) => {
                this.setBaseTableData.rows.forEach((unitem) => {
                  if (item.terminalID == unitem.fid) arr.push(unitem)
                })
              })
              this.setBaseTableToggleSelection(arr, true)
            }
          }
        })
      } else {
      }
    },
    postBaseTopFormData() {
      this.getList()
      console.log('顶部表单数据', this.baseTopFormData)
    },

    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      this.baseDialogFormData = {}
      this.baseDialogType = 1
      this.handleIsBaseDialog(bool)
      console.log('baseTableBtnsAdd', bool)
    },
    baseTableBtnsEdit(bool) {
      if (this.baseTableCurrent != null && this.baseTableCurrent.fid != null) {
        this.baseDialogFormData = this.baseTableCurrent
        this.baseDialogType = 2
        this.handleIsBaseDialog(bool)
      } else {
        this.$message({
          showClose: true,
          message: '请选择要编辑的信息',
          type: 'warning',
        })
      }
      console.log('baseTableBtnsEdit', bool)
    },
    baseTableBtnsDelete(bool) {
      if (this.baseTableCurrent != null && this.baseTableCurrent.fid != null) {
        this.$elConfirm()
          .then((res) => {
            InfoBroadcastArea.delete({
              ids: this.baseTableCurrent.fid,
            }).then((res) => {
              debugger
              if (res.code == 0) {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                })
                this.getList()
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
                })
              }
            })
          })
          .catch((err) => {
            console.log('err', err)
          })
      } else {
        this.$message({
          showClose: true,
          message: '请选择要删除的信息',
          type: 'warning',
        })
      }
      console.log('baseTableBtnsDelete', bool)
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      this.getList()
      this.isBaseDialog = bool
    },
    handleIsBaseDialogSet() {
      this.isBaseDialogSet = true
    },
    postBaseDialogFormData() {
      InfoBroadcastArea.save({
        // fId: this.baseDialogType == 1 ? 0 : this.baseTableCurrent.fid,
        fId: this.baseDialogType == 1 ? 0 : this.baseDialogFormData.fid,
        areaName: this.baseDialogFormData.areaName,
        microphoneCode: this.baseDialogFormData.microphoneCode,
        createUserId: this.$store.state.userInfo.fuserid,
        createUserName: this.$store.state.userInfo.frealname,
        certerid:this.$store.state.userInfo.fcompanyid
      }).then((res) => {
        if (res.msg == 200) {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.getList()
        } else {
          this.$message({
            showClose: true,
            message: '操作失败',
            type: 'error',
          })
        }
      })
      console.log(
        '提交表单数据',
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      )
    },
    setBaseTableCurrentChange(val) {
      this.setBaseTableCurrent = val
    },
    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      console.log('当前选中表格行', row, index)
      this.baseTableCurrent = row
    },
    baseTablePageSizeChange(val) {
      console.log('当前页码', val)
      this.baseTablePageSize = val
      this.getList()
    },
    baseTablePageCurrentChange(val) {
      console.log('每页数量', val)
      this.baseTablePageCurrent = val
      this.getList()
    },
    setRadioForm() {
      if (this.baseTableCurrent.fid != null) {
        this.isSetDialog = true
        this.getRadioList()
      } else {
        this.$message({
          showClose: true,
          message: '请选择要对应的信息',
          type: 'warning',
        })
      }
    },
    baseTableSelectionChange(val) {
      this.checkedRadioTableData = val
    },
    // 切换多行选中状态
    setBaseTableToggleSelection(rows, bool) {
      console.log('获取表格dom', this.$refs['myBaseTable'].$refs['baseTable'])
      if (rows) {
        rows.forEach((row) => {
          this.$refs['myBaseTable'].$refs['baseTable'].toggleRowSelection(
            row,
            bool
          )
        })
      } else {
        this.$refs['myBaseTable'].$refs['baseTable'].clearSelection()
      }
    },
    chooseSet() {
      if (this.checkedRadioTableData.length > 0) {
        var ids = ''
        for (var i = 0; i < this.checkedRadioTableData.length; i++) {
          ids += this.checkedRadioTableData[i].fid + ','
        }
        // debugger
        ids = ids.substring(0, ids.length - 1)
        InfoBroadcastArea.SaveRadioList({
          areaID: this.baseTableCurrent.fid,
          terminalID: ids,
        }).then((res) => {
          // debugger
          if (res.msg == 200) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success',
            })
            this.getList()
          } else {
            this.$message({
              showClose: true,
              message: '操作失败',
              type: 'error',
            })
          }
        })
        this.isSetDialog = false
      } else {
        this.$message({
          showClose: true,
          message: '请选择要对应的信息',
          type: 'warning',
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.info-broadcast-area {
  padding: 30px 20px;
}
</style>
