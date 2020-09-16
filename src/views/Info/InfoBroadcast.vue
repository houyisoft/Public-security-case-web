<template>
  <div class="info-broadcast">
    <base-top-form
      title="广播终端"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="code" label="终端编码：">
          <el-input v-model="baseTopFormData.code" placeholder="请输入终端编码"></el-input>
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
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="code" label="终端编码"></el-table-column>
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
          prop="code"
          :rules="[{'required': true,'message': '请输入终端编码','trigger': 'blur'}]"
          label="终端编码"
        >
          <el-input placeholder="请输入" v-model="baseDialogFormData.code"></el-input>
        </el-form-item>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import InfoBroadcast from "@/apis/Info/InfoBroadcast.js";
export default {
  data() {
    return {
      // 顶部表单数据
      baseTopFormData: {
        keyword: ""
      },
      // 表格数据
      baseTableData: {
        total: 0,
        list: []
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 10,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // debugger
      InfoBroadcast.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        code: this.baseTopFormData.code,
        centerInfoId: 0
      }).then(res => {
        this.baseTableData.list = res.rows;
        this.baseTableData.total = res.total;
      });
    },
    postBaseTopFormData() {
      this.getList();
      console.log("顶部表单数据", this.baseTopFormData);
    },

    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      this.baseDialogFormData = {};
      this.baseDialogType = 1;
      this.handleIsBaseDialog(bool);
      console.log("baseTableBtnsAdd", bool);
    },
    baseTableBtnsEdit(bool) {
      if (this.baseTableCurrent != null && this.baseTableCurrent.fid != null) {
        this.baseDialogFormData = this.baseTableCurrent;
        this.baseDialogType = 2;
        this.handleIsBaseDialog(bool);
      } else {
        this.$message({
          showClose: true,
          message: "请选择要编辑的信息",
          type: "warning"
        });
      }
      console.log("baseTableBtnsEdit", bool);
    },
    baseTableBtnsDelete(bool) {
      if (this.baseTableCurrent != null && this.baseTableCurrent.fid != null) {
        this.$elConfirm()
          .then(res => {
            InfoBroadcast.delete({
              fId: this.baseTableCurrent.fid
            }).then(res => {
              if (res.msg == 200) {
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success"
                });
                this.getList();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败",
                  type: "error"
                });
              }
            });
            console.log("baseTableBtnsDelete", bool);
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择要删除的信息",
          type: "warning"
        });
      }
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      this.getList();
      this.isBaseDialog = bool;
    },
    postBaseDialogFormData() {
      var data = this.baseTableCurrent;
      InfoBroadcast.save({
        fId: this.baseDialogType == 1 ? 0 : this.baseDialogFormData.fid,
        code: this.baseDialogFormData.code
      }).then(res => {
        debugger;
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error"
          });
        }
      });
      this.getList();
      console.log(
        "提交表单数据",
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      );
    },

    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      console.log("当前选中表格行", row, index);
      this.baseTableCurrent = row;
    },
    baseTablePageSizeChange(val) {
      console.log("当前页码", val);
      this.baseTablePageSize = val;
      this.getList();
    },
    baseTablePageCurrentChange(val) {
      console.log("每页数量", val);
      this.baseTablePageCurrent = val;
      this.getList();
    }
  }
};
</script>

<style scoped
 lang="scss">
.info-broadcast {
  padding: 30px 20px;
}
</style>
