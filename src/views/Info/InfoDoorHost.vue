<template>
  <div class="info-host">
    <base-top-form
      title="门禁主机信息"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="机器号:">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入机器号"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

    <!-- <base-table-btns :isDefaultBaseTableBtns="false">
      <div class="table-btn-wrap" @click="baseTableBtnsAdd">
        <span>新增</span>
        <i class="el-icon-edit btn-icon"></i>
      </div>
      <div class="table-btn-wrap" @click="baseTableBtnsDelete">
        <span>删除</span>
        <i class="el-icon-delete btn-icon"></i>
      </div>
    </base-table-btns>-->
    <!-- <base-table-btns
      @onBaseTableBtnsAdd="baseTableBtnsAdd"
      @onBaseTableBtnsEdit="baseTableBtnsEdit"
      @onBaseTableBtnsDelete="baseTableBtnsDelete"
    ></base-table-btns>-->

    <base-table
      :baseTableData="baseTableData.list"
      :isBaseTableCheckbox="false"
      :baseTableDataTotal="baseTableData.total"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="no" label="机器号"></el-table-column>
      <el-table-column prop="ip" label="设备ip"></el-table-column>
      <el-table-column prop="port" label="设备端口"></el-table-column>
      <el-table-column prop="deviceModel" label="设备型号"></el-table-column>
      <el-table-column
        prop="deviceModelCode"
        label="设备型号编码"
      ></el-table-column>
      <el-table-column prop="status" label="是否在线">
        <template scope="scope">
          <el-tag
            effect="dark"
            v-if="
              scope.row.status == '0' ||
                scope.row.status == '' ||
                scope.row.status == null
            "
            >离线</el-tag
          >
          <el-tag type="success" effect="dark" v-if="scope.row.status == '1'"
            >在线</el-tag
          >
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>

<script>
import axios from 'axios'
import InfoDoor from '@/apis/Info/InfoDoor.js'
export default {
  data() {
    return {
      // 顶部表单数据
      baseTopFormData: {
        key: '',
      },
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      InfoDoor.getHostList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        no: this.baseTopFormData.key,
      }).then((res) => {
        this.baseTableData.list = res.rows
        this.baseTableData.total = res.total
      })
    },
    postBaseTopFormData() {
      //查询列表接口
      this.getList()
      console.log('顶部表单数据', this.baseTopFormData)
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
.info-host {
  padding: 30px 20px;
}
</style>
