<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="info-nvr">
    <base-top-form
      title="NVR管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="name" label="Nvr名称:">
          <el-input
            v-model="baseTopFormData.name"
            placeholder="请输入Nvr名称"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

    <!-- <base-table-btns :isDefaultBaseTableBtns="false">
      <div class="table-btn-wrap" @click="baseTableBtnsAdd(true)">
        <span>新增</span>
        <i class="el-icon-edit btn-icon"></i>
      </div>
      <div class="table-btn-wrap" @click="baseTableBtnsDelete">
        <span>删除</span>
        <i class="el-icon-delete btn-icon"></i>
      </div>
    </base-table-btns> -->
    <base-table-btns
      @onBaseTableBtnsAdd="baseTableBtnsAdd"
      @onBaseTableBtnsEdit="baseTableBtnsEdit"
      @onBaseTableBtnsDelete="baseTableBtnsDelete"
    ></base-table-btns>

    <base-table
      :baseTableData="baseTableData.list"
      :isBaseTableCheckbox="false"
      :isBaseTableRadio="false"
      :baseTableDataTotal="baseTableData.total"
      baseTableDataPrimaryKey="nvrID"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column label="序号" type="index" width="50px">
      </el-table-column>

      <el-table-column prop="nvrName" label="Nvr名称"></el-table-column>
      <el-table-column prop="nvrIP" label="NvrIP地址"></el-table-column>
      <el-table-column prop="nvrPort" label="Nvr端口"></el-table-column>
      <el-table-column prop="userName" label="用户名称"></el-table-column>
      <el-table-column prop="passWord" label="Nvr密码"></el-table-column>
      <el-table-column
        prop="nvrFac"
        label="Nvr类型"
        :formatter="formatterNvrType"
      ></el-table-column>
      <el-table-column prop="nvrType" label="型号"></el-table-column>
      <el-table-column prop="webPagePort" label="页面端口"></el-table-column>
    </base-table>

    <base-dialog
      :isBaseDialog="isBaseDialog"
      :baseDialogFormData="baseDialogFormData"
      :title="baseDialogType == 1 ? '新增' : '编辑'"
      @onHandleIsBaseDialog="handleIsBaseDialog"
      @onPostBaseDialogFormData="postBaseDialogFormData"
    >
      <template v-slot:form>
        <el-row>
          <el-col :span="12">
            <el-form-item
              prop="nvrName"
              :rules="[
                { required: true, message: '请输入名称', trigger: 'blur' },
              ]"
              label="Nvr名称"
            >
              <el-input
                placeholder="请输入"
                v-model="baseDialogFormData.nvrName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="nvrIP"
              :rules="[
                { required: true, message: '请输入IP', trigger: 'change' },
                {
                  pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                  message: '请输入正确格式',
                },
              ]"
              label="NvrIP地址"
            >
              <!-- <el-input placeholder="请输入" v-model="baseDialogFormData.nvrIP"></el-input> -->
              <ip-address v-model="baseDialogFormData.nvrIP" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              prop="nvrPort"
              :rules="[
                { required: true, message: '请输入端口', trigger: 'blur' },
              ]"
              label="Nvr端口"
            >
              <el-input
                placeholder="请输入"
                v-model="baseDialogFormData.nvrPort"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="userName"
              :rules="[
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ]"
              label="用户名称"
            >
              <el-input
                placeholder="请输入"
                v-model="baseDialogFormData.userName"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              prop="passWord"
              :rules="[
                { required: true, message: '请输入密码', trigger: 'blur' },
              ]"
              label="Nvr密码"
            >
              <el-input
                placeholder="请输入"
                v-model="baseDialogFormData.passWord"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="nvrFac"
              :rules="[
                { required: true, message: '请选择类型', trigger: 'change' },
              ]"
              label="Nvr类型"
            >
              <el-select
                placeholder="请选择"
                v-model="baseDialogFormData.nvrFac"
              >
                <el-option
                  :value="item.fitemdetailid"
                  :label="item.fitemname"
                  v-for="item in nvrTypes"
                  :key="item.fitemdetailid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              prop="nvrType"
              :rules="[
                { required: true, message: '请输入型号', trigger: 'blur' },
              ]"
              label="型号"
            >
              <el-input
                placeholder="请输入"
                v-model="baseDialogFormData.nvrType"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="webPagePort"
              :rules="[
                {
                  required: true,
                  message: '请输入页面查看端口',
                  trigger: 'blur',
                },
              ]"
              label="页面端口"
            >
              <el-input
                placeholder="请输入"
                v-model="baseDialogFormData.webPagePort"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import InfoNvrBase from "@/apis/Info/InfoNVR.js";
import IpAddress from "@/components/ipAddress";
export default {
  data() {
    return {
      //nvr类型
      nvrTypes: [],
      // 顶部表单数据
      baseTopFormData: {},
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,

      baseDialogFormData: {
        //name: ""
      },
    };
  },
  components: { IpAddress },
  created() {
    this.getNvrType();
    //this.getList();
  },
  methods: {
    getNvrType() {
      InfoNvrBase.getNvrType({ type: 13 }).then((res) => {
        if (res.code == 0) {
          this.nvrTypes = res.data;
          this.getList();
        }
      });
    },
    getList() {
      InfoNvrBase.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        nvrName: this.baseTopFormData.name,
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

    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      this.baseDialogFormData = {};
      this.baseDialogType = 1;
      this.handleIsBaseDialog(bool);
      console.log("baseTableBtnsAdd", bool);
      this.baseDialogFormData.nvrIP = '...'
    },
    baseTableBtnsEdit(bool) {
      debugger;
      if (
        this.baseTableCurrent != null &&
        this.baseTableCurrent.nvrID != null
      ) {
        // debugger
	 this.baseDialogFormData = this.baseTableCurrent;
      this.baseDialogType = 2;
      this.handleIsBaseDialog(bool);
      console.log("baseTableBtnsAdd", bool);
      } else {
        this.$message({
          showClose: true,
          message: "请选择要编辑的信息",
          type: "warning",
        });
      }
      console.log("baseTableBtnsEdit", bool);
    },

    baseTableBtnsDelete(bool) {
      if (
        this.baseTableCurrent == null ||
        this.baseTableCurrent.nvrID == null
      ) {
        this.$message({
          showClose: true,
          message: "请选择一条数据",
          type: "error",
        });
        return;
      }
      this.$elConfirm()
        .then((res) => {
          var data = this.baseTableCurrent;

          InfoNvrBase.delete({
            nvrId: data.nvrID,
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
                message: res.msg,
                type: "error",
              });
            }
          });
          console.log("baseTableBtnsDelete", bool);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      this.getList();
      this.isBaseDialog = bool;
    },
    postBaseDialogFormData() {
      var data = this.baseDialogFormData;
      if (this.baseDialogType == 1) {
        InfoNvrBase.save({
          nvrName: data.nvrName,
          nvrIP: data.nvrIP,
          nvrPort: data.nvrPort,
          userName: data.userName,
          passWord: data.passWord,
          nvrFac: data.nvrFac,
          nvrType: data.nvrType,
          webPagePort: data.webPagePort,
        })
          .then((res) => {
            debugger
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
                message:res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("获取表单失败" + err);
          });
      }else{
          InfoNvrBase.edit({
          // add by Seiya: 修改无法获取参数
          // nvrID:this.baseTableCurrent.nvrID,
          nvrID:data.nvrID,
          nvrName: data.nvrName,
          nvrIP: data.nvrIP,
          nvrPort: data.nvrPort,
          userName: data.userName,
          passWord: data.passWord,
          nvrFac: data.nvrFac,
          nvrType: data.nvrType,
          webPagePort: data.webPagePort,
        })
          .then((res) => {
            debugger
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
                message:res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("获取表单失败" + err);
          });
      }
      console.log(
        "提交表单数据",
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      );
    },

    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      //this.baseDialogFormData = row;
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
    //列表格式化設備類型
    formatterNvrType(row, column) {
      for (var i = 0; i < this.nvrTypes.length; i++) {
        if (this.nvrTypes[i].fitemdetailid == row.nvrFac) {
          return this.nvrTypes[i].fitemname;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.info-nvr {
  padding: 30px 20px;
}
</style>
<style scoped lang="scss">
.inputCss {
  width: 250px;
}
</style>
