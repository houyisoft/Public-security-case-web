<template>
  <div class="info-doorclose">
    <base-top-form
      title="门禁点信息"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="名称:">
          <el-input v-model="baseTopFormData.key" placeholder="请输入名称"></el-input>
        </el-form-item>
      </template>
    </base-top-form>
    <!-- <base-table-btns @onBaseTableBtnsEdit="baseTableBtnsEdit" :buttons="['edit']"></base-table-btns> -->
    <base-table-btns :isDefaultBaseTableBtns="false">
      <div class="table-btn-wrap" @click="baseTableBtnsEdit">
        <span>编辑</span>
        <i class="el-icon-edit btn-icon"></i>
      </div>
      <div class="table-btn-wrap" @click="getSameInfo">
        <span>同步</span>
        <i class="el-icon-add btn-icon"></i>
      </div>
    </base-table-btns>
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
      <el-table-column prop="channel" label="门禁编码"></el-table-column>
      <el-table-column prop="roomid" label="所属功能室" :formatter="formatterRoomInfo"></el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
      <el-table-column prop="onLineStatus" label="是否在线">
        <template scope="scope">
          <el-tag
            effect="dark"
            v-if="
              scope.row.onLineStatus == '0' ||
                scope.row.onLineStatus == '' ||
                scope.row.onLineStatus == null
            "
          >离线</el-tag>
          <el-tag type="success" effect="dark" v-if="scope.row.onLineStatus == '1'">在线</el-tag>
        </template>
      </el-table-column>
    </base-table>
    <base-dialog
      :isBaseDialog="isBaseDialog"
      :baseDialogFormData="baseDialogFormData"
      :title="baseDialogType == 1 ? '对应' : '对应'"
      dialogWidth="330px"
      @onHandleIsBaseDialog="handleIsBaseDialog"
      @onPostBaseDialogFormData="postBaseDialogFormData"
    >
      <template v-slot:form>
        <el-form-item
          label="功能室"
          :rules="[{'required': true,'message': '请选择功能室','trigger': 'blur'}]"
          prop="roomid"
        >
          <el-select placeholder="请选择" filterable v-model="baseDialogFormData.roomid">
            <el-option
              v-for="item in functionRoom"
              :key="item.funcID"
              :label="item.funcName"
              :value="item.funcID"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import InfoDoor from "@/apis/Info/InfoDoor.js";
export default {
  data() {
    return {
      //门禁信息
      roomList: [],
      // 顶部表单数据
      baseTopFormData: {
        key: "",
      },
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },
      //功能室信息
      functionRoom: [],
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据
      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {
        name: "",
      },
    };
  },
  created() {
    this.getFunctionRoom();
    this.getList();
  },
  methods: {
    getSameInfo(){
        InfoDoor.getSameInfo().then(res =>{
            console.log("getSameInfo",res)
             this.getList();
        })
    },
    getRoomInfo() {
      InfoDoor.getRoomInfo().then((res) => {
        if (res.code == 0) {
          this.roomList = res.rows;
          this.getList();
        }
      });
    },
    getList() {
      InfoDoor.getCloseList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        name: this.baseTopFormData.key,
      }).then((res) => {
        this.baseTableData.list = res.rows;
        this.baseTableData.total = res.total;
      });
    },
    postBaseTopFormData() {
      //查询列表接口
      this.getList();
      console.log("顶部表单数据", this.baseTopFormData);
    },

    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      this.baseDialogFormData = row;
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
    },
    baseTableBtnsEdit(bool) {
      if (
        this.baseTableCurrent.id != undefined &&
        this.baseTableCurrent.id != ""
      ) {
        this.isBaseDialog = true;
        this.baseDialogFormData = this.baseTableCurrent;
      } else {
        this.$message({
          showClose: true,
          message: "请选择要对应的信息",
          type: "warning",
        });
      }
    },
    handleIsBaseDialog(bool) {
      this.isBaseDialog = bool;
    },
    postBaseDialogFormData() {
      InfoDoor.edit({
        id: this.baseTableCurrent.id,
        roomid: this.baseDialogFormData.roomid,
      }).then((res) => {
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success",
          });
          this.getList();
        } else {
          this.$message({
            showClose: true,
            message: "操作失败",
            type: "error",
          });
        }
      });
    },
    getFunctionRoom() {
      InfoDoor.getFunctionRoom({
        pageNum: 1,
        pageSize: 100,
      }).then((res) => {
        if (res.code == 0) {
          this.functionRoom = res.rows;
        }
      });
    },
    //列表格式化门禁
    formatterRoomInfo(row, column) {
      for (var i = 0; i < this.functionRoom.length; i++) {
        if (this.functionRoom[i].funcID == row.roomid) {
          return this.functionRoom[i].funcName;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
