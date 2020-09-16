<template>
  <div class="info-broadcast-area">
    <base-top-form
      title="值班记录"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="关键字：">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

    <base-table-btns :isDefaultBaseTableBtns="false">
      <div class="table-btn-wrap" @click="baseTableBtnsAdd()">
        <span>新增</span>
        <i class="el-icon-circle-plus btn-icon"></i>
      </div>
    </base-table-btns>

    <base-table
      :isBaseTableRadio="false"
      :baseTableData="baseTableData.list"
      :baseTableDataTotal="baseTableData.total"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column prop="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="物品名称"> </el-table-column>
    </base-table>

    <el-dialog :visible.sync="isAddRecord" :close-on-click-modal="false"></el-dialog>
  </div>
</template>

<script>
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
        list: [
          {
            index: 3, // 序号
            name: '李小宝', // 人员名称
            address: '上海市普陀区金沙江路 1518 弄', // 所在位置
            number: 1010010100101, // 案件编号
            caseName: '案件一', // 案件名称
            bandsNumber: '1232313', // 手环编号
            police: '张三', // 交接民警
            isLeave: true, // 是否已离开
            roomName: '7号侯问室', // 功能室名称
            inDate: '2016-05-02', // 进入时间
            outDate: '2016-05-02', // 离开时间
          },
          {
            index: 4, // 序号
            name: '张小明', // 人员名称
            address: '上海市普陀区金沙江路 1518 弄', // 所在位置
            number: 1010010100101, // 案件编号
            caseName: '案件一', // 案件名称
            bandsNumber: '1232313', // 手环编号
            police: '张三', // 交接民警
            isLeave: true, // 是否已离开
            roomName: '7号侯问室', // 功能室名称
            inDate: '2016-05-02', // 进入时间
            outDate: '2016-05-02', // 离开时间
          },
        ],
      },
      baseTablePageSize: 11,
      baseTablePageCurrent: 1,

      isAddRecord: false, // 弹窗控制
    }
  },
  methods: {
    postBaseTopFormData() {
      console.log('顶部表单数据', this.baseTopFormData)
    },

    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd() {
      this.isAddRecord = true
    },

    /* 表格操作 */
    baseTablePageSizeChange(val) {
      console.log('当前页码', val)
      this.baseTablePageSize = val
    },
    baseTablePageCurrentChange(val) {
      console.log('每页数量', val)
      this.baseTablePageCurrent = val
    },
  },
}
</script>

<style scoped lang="scss">
.info-broadcast-area {
  padding: 30px 20px;
}
</style>
