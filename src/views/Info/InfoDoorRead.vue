<template>
  <div class="info-read">
    <base-top-form
      title="门禁读头信息"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="读头编号:">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入读头编号"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

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
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="no" label="读头编号"></el-table-column>
      <el-table-column
        prop="doorid"
        label="门禁名称"
        :formatter="formatterCloseInfo"
      ></el-table-column>
      <el-table-column prop="channel" label="读头通道"></el-table-column>
      <el-table-column prop="status" label="在线状态">
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
      //门禁信息
      closeInfo: [],
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
    this.getCloseInfo()
  },
  methods: {
    getCloseInfo() {
      InfoDoor.getCloseInfo().then((res) => {
        if (res.code == 0) {
          this.closeInfo = res.rows
          this.getList()
        }
      })
    },
    getList() {
      InfoDoor.getReadList({
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
    //列表格式化门禁
    formatterCloseInfo(row, column) {
      for (var i = 0; i < this.closeInfo.length; i++) {
        if (this.closeInfo[i].id == row.doorid) {
          return this.closeInfo[i].name
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.info-read {
  padding: 30px 20px;
}
</style>
