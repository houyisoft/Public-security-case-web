<template>
  <div class="info-device">
    <base-top-form
      title="外接设备"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="circName" label="关键字：">
          <el-input v-model="baseTopFormData.circName" placeholder="请输入名称"></el-input>
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
      :isBaseTableRadio="false"
      :baseTableDataTotal="baseTableData.total"
      baseTableDataPrimaryKey="fid"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column label="序号" type="index" align="center" width="50px"></el-table-column>

      <el-table-column prop="circNO" label="编号" width="250"></el-table-column>
      <el-table-column prop="circName" label="设备厂商名称"></el-table-column>
      <el-table-column prop="circType" label="设备类型" :formatter="formatterDeviceType"></el-table-column>
      <el-table-column prop="state" label="是否启用">
        <template scope="scope">
          <el-tag
            effect="dark"
            v-if="scope.row.state=='0'||scope.row.state==''||scope.row.state==null"
          >否</el-tag>
          <el-tag type="success" effect="dark" v-if="scope.row.state=='1'">是</el-tag>
        </template>
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
        <el-form-item prop="circName"   :rules="[{'required': true,'message': '请输入设备厂商名称','trigger': 'blur'}]" label="设备厂商名称"> 
          <el-input placeholder="请输入" v-model="baseDialogFormData.circName"></el-input>
        </el-form-item>
        <div class="flex-box">
        <el-form-item prop="circType" :rules="[{'required': true,'message': '请输入设备类型','trigger': 'change'}]" label="设备类型">
          <el-select placeholder="请选择" v-model="baseDialogFormData.circType">
            <el-option
            
              :value="item.fitemdetailid"
              :label="item.fitemname"
              v-for="item in deviceTypes"
              :key="item.fitemdetailid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state" :rules="[{'required': true,'message': '请选择状态','trigger': 'blur'}]" label="设备状态">
          <el-select placeholder="请选择" v-model="baseDialogFormData.state">
            <el-option
            
              :value="item.value"
              :label="item.name"
              v-for="item in stateData"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import InfoDevice from "@/apis/Info/InfoDevice.js";
export default {
  data() {
    return {
      //设备类型
      deviceTypes: [],
      // 顶部表单数据
      baseTopFormData: {
        circName: ""
      },
      // 表格数据
      baseTableData: {
        total: 0,
        list: []
      },
      stateData:[
        {value:0,name:'禁用'},
        {value:1,name:'启用'},
        ],
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {
        name: ""
      }
    };
  },
  created() {
    this.getDeviceType();
  },
  methods: {
    getDeviceType() {
      InfoDevice.getDeviceType({
        type: 14
      }).then(res => {
        if (res.code == 0) {
          this.deviceTypes = res.data;
          this.getlist();
        }
      });
    },
    getlist() {
      InfoDevice.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        circName: this.baseTopFormData.circName
      }).then(res => {
        this.baseTableData.list = res.rows;
        this.baseTableData.total = res.total;
      });
    },
    postBaseTopFormData() {
      //查询列表接口
      this.getlist();
      console.log("顶部表单数据", this.baseTopFormData);
    },

    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      this.baseDialogFormData = {};
      this.baseDialogType = 1;
      this.handleIsBaseDialog(bool);
      console.log("baseTableBtnsAdd", bool);
      this.baseDialogFormData.state=this.stateData[1].name
    },
    baseTableBtnsEdit(bool) {
      if(this.baseTableCurrent==null || this.baseTableCurrent.fid==null){

          this.$message({
									showClose: true,
									message: '请选择一条数据',
									type: 'warning'
                });
                return ;
      }
      this.baseDialogType = 2;
      this.handleIsBaseDialog(bool);
      this.baseDialogFormData = this.baseTableCurrent;
      this.baseDialogFormData.state=parseInt(this.baseTableCurrent.state)
      console.log("baseTableBtnsEdit", bool);
    },
    baseTableBtnsDelete(bool) {
      if(this.baseTableCurrent==null || this.baseTableCurrent.fid==null){

          this.$message({
									showClose: true,
									message: '请选择一条数据',
									type: 'warning'
                });
                return ;
      }
      this.$elConfirm()
        .then(res => {
          var data = this.baseTableCurrent;
          InfoDevice.delete({
            ids: data.fid
          }).then(res => {
            if (res.code == 0) {
								this.$message({
									showClose: true,
									message: '操作成功',
									type: 'success'
								});
								this.getlist();
							} else {
								this.$message({
									showClose: true,
									message: '删除失败',
									type: 'error'
								});
							}
          });
          console.log("baseTableBtnsDelete", bool);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      if(!bool)
      this.getlist()
      this.isBaseDialog = bool;
    },
    postBaseDialogFormData() {
      var data = this.baseDialogFormData;
      if (this.baseDialogType == 1) {
        InfoDevice.save({
          circName: data.circName,
          state: (data.state=="启用"?1:data.state),
          circType: data.circType
        })
          .then(res => {
            if (res.code == 0) {
							this.$message({
								showClose: true,
								message: '操作成功',
								type: 'success'
							});
							this.getlist();
						} else {
							this.$message({
								showClose: true,
								message: '操作失败',
								type: 'error'
							});
						}
          })
          .catch(err => {
            console.log("获取表单失败" + err);
          });
      } else if (this.baseDialogType == 2) {
        InfoDevice.edit({
          fId: data.fid,
          circName: data.circName,
          state: (data.state=="启用"?1:data.state),
          circType: data.circType
        }).then(res => {
         if (res.code == 0) {
							this.$message({
								showClose: true,
								message: '操作成功',
								type: 'success'
							});
							this.getlist();
						} else {
							this.$message({
								showClose: true,
								message: '操作失败',
								type: 'error'
							});
						}
        });
      }
      console.log(
        "提交表单数据",
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      );
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
      this.getlist();
    },
    baseTablePageCurrentChange(val) {
      console.log("每页数量", val);
      this.baseTablePageCurrent = val;
      this.getlist();
    },
    //列表格式化設備類型
    formatterDeviceType(row, column) {
      for (var i = 0; i < this.deviceTypes.length; i++) {
        if (this.deviceTypes[i].fitemdetailid == row.circType) {
          return this.deviceTypes[i].fitemname;
        }
      }
    },
   
  }
};
</script>

<style scoped
 lang="scss">
.info-device {
  padding: 30px 20px;
}
</style>
