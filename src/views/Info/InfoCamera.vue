<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="info-camera">
    <base-top-form
      title="摄像头管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="name" label="通道：">
          <el-input
            v-model="baseTopFormData.name"
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
      :baseTableDataTotal="baseTableData.total"
      baseTableDataPrimaryKey="nvrDetailId"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="passage" label="通道"> </el-table-column>
      <el-table-column prop="ympassage" label="页面通道"> </el-table-column>
      <el-table-column prop="roomName" label="功能室名称"> </el-table-column>
      <el-table-column prop="deviceIp" label="设备Ip"> </el-table-column>
      <el-table-column
        prop="deviceType"
        :formatter="formatterEquipmentType"
        label="设备类型"
      >
      </el-table-column>
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column
        prop="deviceFac"
        :formatter="formatterManufacturers"
        label="设备厂家"
      >
      </el-table-column>
      <el-table-column prop="puid" label="puid"> </el-table-column>
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
          prop="passage"
          :rules="[{ required: true, message: '请输入通道', trigger: 'blur' }]"
          label="通道"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.passage"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="ympassage"
          :rules="[
            { required: true, message: '请输入页面通道', trigger: 'blur' },
          ]"
          label="页面通道"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.ympassage"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="deviceIp"
          :rules="[
            { required: true, message: '请输入设备IP', trigger: 'change' },
            { pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, message: '请输入正确的IP', trigger: 'change' },
          ]"
          label="设备IP"
        >
          <!-- <el-input placeholder="请输入"
					 v-model="baseDialogFormData.deviceIp"></el-input> -->
          <ip-address v-model="baseDialogFormData.deviceIp" />
        </el-form-item>
        <el-form-item
          prop="userName"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ]"
          label="用户名"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.userName"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          label="密码"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.password"
          ></el-input>
        </el-form-item>
        <div class="flex-box">
          <el-form-item
            label="设备类型"
            :rules="[
              { required: true, message: '请选择设备类型', trigger: 'change' },
            ]"
            prop="deviceType"
          >
            <el-select
              placeholder="请选择"
              filterable
              v-model="baseDialogFormData.deviceType"
            >
              <el-option
                v-for="item in EquipmentType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Nvr"
            :rules="[{ required: true, message: '请选择Nvr', trigger: 'change' }]"
            prop="nvrId"
          >
            <el-select
              placeholder="请选择"
              filterable
              v-model="baseDialogFormData.nvrId"
            >
              <el-option
                v-for="item in Nvr"
                :key="item.nvrID"
                :label="item.nvrName"
                :value="item.nvrID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="功能室"
            :rules="[
              { required: true, message: '请选择功能室', trigger: 'change' },
            ]"
            prop="roomID"
          >
            <el-select
              placeholder="请选择"
              filterable
              v-model="baseDialogFormData.roomID"
            >
              <el-option
                v-for="item in functionRoom"
                :key="item.funcID"
                :label="item.funcName"
                :value="item.funcID"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item
          label="设备厂家"
          :rules="[
            { required: true, message: '请选择设备厂家', trigger: 'change' },
          ]"
          prop="deviceFac"
        >
          <el-select
            placeholder="请选择"
            filterable
            v-model="baseDialogFormData.deviceFac"
          >
            <el-option
              v-for="item in Manufacturers"
              :key="item.fitemdetailid"
              :label="item.fitemname"
              :value="item.fitemdetailid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="puid" label="PuId">
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.puid"
          ></el-input>
        </el-form-item>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import InfoCamera from "@/apis/Info/InfoCamera.js";
import IpAddress from "@/components/ipAddress";
export default {
  data() {
    return {
      // 顶部表单数据
      baseTopFormData: {},
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },
      //设备类型
      EquipmentType: [
        { value: "1", label: "签字特写" },
        { value: "2", label: "审讯主机" },
        { value: "3", label: "全景摄像头" },
        { value: "4", label: "普通摄像头" },
      ],
      //Nvr信息
      Nvr: [],
      //功能室信息
      functionRoom: [],
      //设备厂家信息
      Manufacturers: [],
      baseTablePageCurrent: 1,
      baseTablePageSize: 10,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {
		name: "",
		deviceIp: ""
      },
    };
  },
  components: { IpAddress },
  created() {
    this.getNvrList();
    this.getFunctionRoom();
    this.getManufacturers();
    this.getList();
  },
  methods: {
    getList() {
      InfoCamera.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        passage: this.baseTopFormData.name,
      }).then((res) => {
        // debugger
        if (res.code == 0) {
          this.baseTableData.list = res.rows;
          this.baseTableData.total = res.total;
        }
      });
    },
    getNvrList() {
      InfoCamera.getNvr({
        pageNum: 1,
        pageSize: 100,
        nvrName: "",
      }).then((res) => {
        if (res.code == 0) {
          this.Nvr = res.rows;
        }
      });
    },
    getFunctionRoom() {
      InfoCamera.getFunctionRoom({
        pageNum: 1,
        pageSize: 100,
      }).then((res) => {
        if (res.code == 0) {
          this.functionRoom = res.rows;
        }
      });
    },
    getManufacturers() {
      InfoCamera.getManufacturers({
        type: 15,
      }).then((res) => {
        // debugger
        if (res.code == 0) {
          this.Manufacturers = res.data;
        }
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
      // debugger
      if (
        this.baseTableCurrent != null &&
        this.baseTableCurrent.nvrDetailId != null
      ) {
        // debugger
		Object.assign(this.baseDialogFormData, {...this.baseTableCurrent})
        this.baseDialogType = 2;
        this.handleIsBaseDialog(bool);
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
        this.baseTableCurrent != null &&
        this.baseTableCurrent.nvrDetailId != null
      ) {
        this.$elConfirm()
          .then((res) => {
            InfoCamera.delete({
              nvrDetailIds: this.baseTableCurrent.nvrDetailId,
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
      } else {
        this.$message({
          showClose: true,
          message: "请选择要删除的信息",
          type: "warning",
        });
      }
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      this.getList();
      this.isBaseDialog = bool;
    },
    postBaseDialogFormData() {
      // debugger
      var formdata = this.baseDialogFormData;
      InfoCamera.save({
        nvrDetailId:
                formdata == null ||
                formdata.nvrDetailId == undefined || formdata.nvrDetailId == ''
                        ? 0
                        : formdata.nvrDetailId,
        passage: formdata.passage,
        nvrId: formdata.nvrId,
        yMPassage: formdata.ympassage,
        roomID: formdata.roomID,
        roomName: 12,
        deviceIp: formdata.deviceIp,
        deviceType: formdata.deviceType,
        userName: formdata.userName,
        password: formdata.password,
        deviceFac: formdata.deviceFac,
        puid: formdata.puid,
      }).then((res) => {
        debugger;
        // debugger
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
    },
    formatterEquipmentType(row, column) {
      for (var i = 0; i < this.EquipmentType.length; i++) {
        if (this.EquipmentType[i].value == row.deviceType) {
          return this.EquipmentType[i].label;
        }
      }
    },
    formatterManufacturers(row, column) {
      var name = "";
      var data = row;
      this.Manufacturers.forEach((item) => {
        // debugger
        if (data.deviceFac == item.fitemdetailid) {
          name = item.fitemname;
        }
      });
      return name;
    },
  },
};
</script>

<style scoped lang="scss">
.info-camera {
  padding: 30px 20px;
}
</style>
