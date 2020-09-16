<template>
  <div class="info-card">
    <base-top-form
      title="配置信息管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="参数名：">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入参数名"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

    <base-table-btns
      @onBaseTableBtnsAdd="baseTableBtnsAdd"
      @onBaseTableBtnsEdit="baseTableBtnsEdit"
      @onBaseTableBtnsDelete="baseTableBtnsDelete"
    >
      <!-- <div class="table-btn-wrap" @click="baseTableBtnsUse">
        <span>启用</span>
        <i class="el-icon-setting btn-icon"></i>
      </div>
      <div class="table-btn-wrap" @click="baseTableBtnsunUse">
        <span>停用</span>
        <i class="el-icon-remove-outline btn-icon"></i>
      </div> -->
    </base-table-btns>

    <base-table
      :baseTableData="baseTableData.list"
      :isBaseTableCheckbox="false"
      :baseTableDataTotal="baseTableData.total"
      baseTableDataPrimaryKey="id"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="configName" label="参数名"> </el-table-column>
      <el-table-column prop="configNr" label="值"> </el-table-column>
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
          prop="configName"
          :rules="[
            { required: true, message: '请输入参数名', trigger: 'blur' },
          ]"
          label="参数名"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.configName"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="configNr"
          :rules="[
            { required: true, message: '请输入值', trigger: 'blur' },
          ]"
          label="值"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.configNr"
          ></el-input>
        </el-form-item>
      </template>
    </base-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import InfoConfig from '@/apis/Info/InfoConfig.js'
export default {
  data() {
    return {
      // 顶部表单数据
      baseTopFormData: {
        key: '',
      },
      personTypes: [],
      // 表格数据
      baseTableData: {
        total: 0,
        list: null,
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {},
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      InfoConfig.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        configName: this.baseTopFormData.key,
      }).then((res) => {
        debugger
        this.baseTableData.list = res.rows
        this.baseTableData.total = res.total
      })
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
      if (this.baseTableCurrent != null && this.baseTableCurrent.id != null) {
        this.baseDialogType = 2
        this.baseDialogFormData=this.baseTableCurrent;
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
      if (this.baseTableCurrent != null && this.baseTableCurrent.id != null) {
        this.$elConfirm()
          .then((res) => {
            var data = this.baseTableCurrent
            InfoConfig.delete({
              ids: data.id,
            }).then((res) => {
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
                  message: '删除失败',
                  type: 'error',
                })
              }
            })
            console.log('baseTableBtnsDelete', bool)
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
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      if(!bool)
      this. getList()
      this.isBaseDialog = bool
    },
    postBaseDialogFormData() {
      var data = this.baseDialogFormData
      if (this.baseDialogType == 1) {
        InfoConfig.save({
          configName: data.configName,
          configNr: data.configNr,
          centerID: this.$store.state.userInfo.fcompanyid,
        })
          .then((res) => {
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
          .catch((err) => {
            console.log('获取表单失败' + err)
          })
      } else if (this.baseDialogType == 2) {
        InfoConfig.edit({
          id: data.id,
          configName: data.configName,
          configNr: data.configNr,
        }).then((res) => {
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
      }
      console.log(
        '提交表单数据',
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      )
    },

    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      this.baseDialogFormData = row
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
    baseTableBtnsUse() {
      var data = this.baseTableCurrent
      if (data.id != null) {
        // debugger
        InfoConfig.use({
          fIdList: data.id,
        }).then((res) => {
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
              message: '操作失败',
              type: 'error',
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择要操作的信息',
          type: 'warning',
        })
      }
    },
    baseTableBtnsunUse() {
      // debugger
      var data = this.baseTableCurrent
      if (data.id != null) {
        InfoConfig.use({
          fIdList: data.id,
        }).then((res) => {
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
              message: '操作失败',
              type: 'error',
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择要操作的信息',
          type: 'warning',
        })
      }
    },
    formatterState(row, column) {
      if (row.state == '0') return '未使用'
      else if (row.state == '1') return '使用中'
      else return '未使用'
    },
    formatterproportion(row, column) {
      if (row.proportion != null) return row.proportion + '%'
      else return ''
    },
    formatterPersonType(row, column) {
      for (var i = 0; i < this.personTypes.length; i++) {
        if (this.personTypes[i].fitemid == row.peopleType) {
          return this.personTypes[i].fitemname
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.info-card {
  padding: 30px 20px;
}
</style>
