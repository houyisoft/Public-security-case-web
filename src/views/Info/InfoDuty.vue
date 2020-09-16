<template>
  <div class="info-card">
    <base-top-form
      title="值班管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="名称：">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入卡号值班人员名称"
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
      baseTableDataPrimaryKey="fid"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="userName" label="值班人员名称"> </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号码"> </el-table-column>
      <el-table-column prop="date" label="值班时间"> </el-table-column>
      <el-table-column prop="position" label="职位"> </el-table-column>
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
          prop="userName"
          :rules="[
            { required: true, message: '请输入值班人员', trigger: 'blur' },
          ]"
          label="值班人员"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.userName"
          ></el-input>
        </el-form-item>
        <el-form-item class="max-width-auto"
          prop="phoneNumber"
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ]"
          label="手机号"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.phoneNumber"
          ></el-input>
        </el-form-item>
       <el-form-item class="max-width-auto" label="值班日期" prop="casesName">
              <el-date-picker style="width:845px;"
                v-model="baseDialogFormData.date"
                format="yyyy-MM-dd"
                type="date"
                placeholder="请选择值班日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="职务" 
             :rules="[{'required': true,'message': '请选择职务','trigger': 'change'}]"
             prop="position">
              <el-select  style="width:845px;"
                v-model="baseDialogFormData.position"
                placeholder="请选择"
                @change="changeType(baseDialogFormData.position)"
              >
                <el-option label="办案人员" value="办案人员"></el-option>
                <el-option label="值班领导" value="值班领导"></el-option>
              </el-select>
                <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
      </template>
    </base-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import InfoDuty from '@/apis/Info/InfoDuty.js'
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
    this.getList()
  },
  methods: {
    getList() {
      InfoDuty.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        userName: this.baseTopFormData.key,
      }).then((res) => {
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
      if (this.baseTableCurrent != null && this.baseTableCurrent.fId != null) {
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
      debugger
      var data=this.baseTableCurrent;
      if (this.baseTableCurrent != null && this.baseTableCurrent.fId != null) {
        this.$elConfirm()
          .then((res) => {
            var data = this.baseTableCurrent
            InfoDuty.delete({
              fId: data.fId,
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
      debugger
      var data = this.baseDialogFormData
      if (this.baseDialogType == 1) {
        InfoDuty.save(data)
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
        InfoDuty.edit(data).then((res) => {
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
  },
}
</script>

<style scoped lang="scss">
.info-card {
  padding: 30px 20px;
}
</style>
