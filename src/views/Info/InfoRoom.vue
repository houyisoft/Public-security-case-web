<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <base-top-form
      title="功能室"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="name" label="名称：">
          <el-input
            v-model="baseTopFormData.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="功能室类型" prop="RoomType">
          <el-select
            v-model="baseTopFormData.RoomType"
            clearable
            placeholder="请选择"
          >
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in roomTypeData"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </base-top-form>

    <base-table-btns
      @onBaseTableBtnsAdd="baseTableBtnsAdd"
      @onBaseTableBtnsEdit="baseTableBtnsEdit"
      @onBaseTableBtnsDelete="baseTableBtnsDelete"
    ></base-table-btns>

    <el-table
      :data="baseTableData.list"
      border
      highlight-current-row
      @current-change="baseTableCurrentChange"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="funcName"
        label="功能室名称"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="formatterRoomType"
        prop="roomType"
        label="功能室类型"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="formatterDataDicID"
        prop="dataDicID"
        label="设备类型"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="peopleCount"
        label="目前人数"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="roomCount"
        label="最大人数"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.state == '1'"
            >可用</el-tag
          >
          <el-tag type="danger" effect="dark" v-if="scope.row.state == '2'"
            >禁用</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="sameCase" label="同案" width="100" align="center">
        <template scope="scope">
          <el-tag type="danger" effect="dark" v-if="scope.row.sameCase == '0'"
            >否</el-tag
          >
          <el-tag type="success" effect="dark" v-if="scope.row.sameCase == '1'"
            >是</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="oppositeSex"
        label="异性"
        width="100"
        align="center"
      >
        <template scope="scope">
          <el-tag
            type="danger"
            effect="dark"
            v-if="scope.row.oppositeSex == '0'"
            >否</el-tag
          >
          <el-tag
            type="success"
            effect="dark"
            v-if="scope.row.oppositeSex == '1'"
            >是</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ipAddress"
        label="电脑地址"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ledIP"
        label="门牌LED屏IP"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="android"
        label="安卓ID"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="puid"
        label="PUID"
        align="center"
      ></el-table-column>

       <el-table-column
        prop="zdip"
        label="坐垫Id"
        align="center"
       width="120"
      ></el-table-column>


       <el-table-column
        prop="blhostcode"
        label="笔录主机"
        align="center"
       width="120"
      ></el-table-column>
      <el-table-column
        prop="qihostcode"
        label="签字主机"
        align="center" width="120"
      ></el-table-column>

       <el-table-column
        prop="blcamerapuid"
        label="笔录摄像头"
        align="center"
       width="120"
      ></el-table-column>
      <el-table-column
        prop="qicamerapuid"
        label="签字摄像头"
        align="center" width="120"
      ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="baseTopFormData.pageNum"
      :page-size="baseTopFormData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="baseTableData.total"
    ></el-pagination>

    <!-- :page-sizes="[15, 30, 50]" -->
    <base-dialog
      :isBaseDialog="isBaseDialog"
      :baseDialogFormData="baseDialogFormData"
      :title="baseDialogType == 1 ? '新增' : '编辑'"
      @onHandleIsBaseDialog="handleIsBaseDialog"
      @onPostBaseDialogFormData="postBaseDialogFormData"
    >
      <template v-slot:form>
        <el-form-item
          prop="funcName"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
          label="名称"
        >
          <el-input
            placeholder="请输入"
            v-model="baseDialogFormData.funcName"
          ></el-input>
        </el-form-item>

        <div class="flex-box">
          <el-form-item
            class="flex-box-left"
            label="功能室类型"
            :rules="[
              {
                required: true,
                message: '请选择功能室类型',
                trigger: 'change',
              },
            ]"
            prop="roomType"
          >
            <el-select
              placeholder="请选择"
              filterable
              v-model="baseDialogFormData.roomType"
              style="width:100%;"
            >
              <el-option
                :label="item.fitemname"
                :value="item.fitemvalue"
                v-for="(item, index) in roomTypeData"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="flex-box-right"
            label="设备类型"
            :rules="[
              { required: true, message: '请选择设备类型', trigger: 'change' },
            ]"
            prop="dataDicID"
          >
            <el-select
              placeholder="请选择"
              filterable
              v-model="baseDialogFormData.dataDicID"
              style="width:100%;"
              @change="select(baseDialogFormData.dataDicID)"
            >
              <el-option
                :label="item.fitemname"
                :value="item.fitemvalue"
                v-for="(item, index) in dataDicIDData"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex-box">
          <el-form-item class="flex-box-left" prop="roomCount" label="最大人数">
            <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.roomCount"
            ></el-input>
          </el-form-item>
          <el-form-item class="flex-box-right" label="终端" prop="radioID">
            <el-select
              placeholder="请选择"
              filterable
              v-model="baseDialogFormData.radioID"
              style="width:100%;"
            >
              <el-option
                v-for="item in radioData"
                :key="item.fid"
                :label="item.code"
                :value="item.fid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex-box">
          <el-form-item class="flex-box-left" prop="ipAddress" label="电脑地址">
            <!-- <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.ipAddress"
            ></el-input> -->
            <ip-address v-model="baseDialogFormData.ipAddress" />
          </el-form-item>
          <el-form-item class="flex-box-right" prop="ledIP" label="LED门牌IP">
            <!-- <el-input placeholder="请输入" v-model="baseDialogFormData.ledIP"></el-input> -->
            <ip-address v-model="baseDialogFormData.ledIP" />
          </el-form-item>
        </div>
        <div class="flex-box">
          <el-form-item class="flex-box-left" prop="android" label="安卓IP">
            <!-- <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.android"
            ></el-input> -->
            <ip-address v-model="baseDialogFormData.android" />
          </el-form-item>
          <el-form-item
            v-if="puidvisable != 1"
            class="flex-box-right"
            prop="puid"
            label="PUID"
          >
            <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.puid"
            ></el-input>
          </el-form-item>
        </div>
        <div class="flex-box">
          <el-form-item class="flex-box-left" prop="blhostcode" label="笔录主机PUID">
             <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.blhostcode"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="puidvisable != 1"
            class="flex-box-right"
            prop="blcamerapuid"
            label="审讯摄像头"
          >
            <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.blcamerapuid"
            ></el-input>
          </el-form-item>
        </div>
        <div class="flex-box">
          <el-form-item class="flex-box-left" prop="qihostcode" label="签字特写主机">
           <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.qihostcode"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="puidvisable != 1"
            class="flex-box-right"
            prop="qicamerapuid"
            label="签字特写摄像头"
          >
            <el-input
              placeholder="请输入"
              v-model="baseDialogFormData.qicamerapuid"
            ></el-input>
          </el-form-item>
        </div>
         <div class="flex-box">
          <el-form-item class="flex-box-left" prop="zdip" label="坐垫Id">
            <el-input placeholder="请输入" v-model="baseDialogFormData.zdip" >
             </el-input>
          </el-form-item>

        </div>
        <div class="flex-box">
          <el-form-item class="flex-box-left" label="是否同案" prop="fVisible">
            <el-switch
              v-model="baseDialogFormData.sameCase"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item class="flex-box-right" label="是否异性" prop="fVisible">
            <el-switch
              v-model="baseDialogFormData.oppositeSex"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import axios from "axios";
import InfoRoom from "@/apis/Info/InfoRoom.js";
import IpAddress from "@/components/ipAddress";
export default {
  data() {
    return {
      puidvisable: "",
      // 顶部表单数据
      baseTopFormData: {},
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },
      //设备类型
      dataDicIDData: [],
      //功能室类型
      roomTypeData: [],
      radioData: [],
      //分页
      pageSize: 10,
      pageNum: 1,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {},
    };
  },
  components: { IpAddress },
  created() {
    //获取数据字典
    this.getTypeList();

    this.getList();
    this.getRadioList();
  },
  methods: {
    select(val) {
      this.puidvisable = val;
    },
    //获取数据字典
    getTypeList() {
      //获取功能室类型数据字典
      InfoRoom.getTypeList({
        type: 18,
      }).then((res) => {
        this.roomTypeData = res.data || [];
      });
      //获取设备类型数据字典
      InfoRoom.getTypeList({
        type: 19,
      }).then((res) => {
        this.dataDicIDData = res.data || [];
      });
    },
    //获取表格数据
    getList() {
      InfoRoom.getList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        funcName: this.baseTopFormData.name,
        roomType: this.baseTopFormData.RoomType,
      }).then((res) => {
        if (res.code == 0) {
          this.baseTableData.list = res.rows;
          this.baseTableData.total = res.total;
        }
      });
    },
    /* 表格操作 */
    postBaseTopFormData() {
      this.getList();
    },
    handleSizeChange(val) {
      console.log("设置每页数量", val);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("设置当前页码", val);
      this.pageNum = val;
      this.getList();
    },
    baseTableCurrentChange(row, index) {
      console.log("当前选中表格行", row, index);
      this.baseTableCurrent = row;
    },
    //功能室类型中文转换
    formatterRoomType(row, column) {
      for (var i = 0; i < this.roomTypeData.length; i++) {
        if (this.roomTypeData[i].fitemvalue == row.roomType) {
          return this.roomTypeData[i].fitemname;
        }
      }
    },
    //设备类型中文转换
    formatterDataDicID(row, column) {
      for (var i = 0; i < this.dataDicIDData.length; i++) {
        if (this.dataDicIDData[i].fitemvalue == row.dataDicID) {
          return this.dataDicIDData[i].fitemname;
        }
      }
    },

    //获取终端信息
    getRadioList() {
      InfoRoom.getRadio({}).then((res) => {
        if (res.code == 0) {
          this.radioData = res.rows;
        }
      });
    },
    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      //添加
      this.baseDialogFormData = {};
      this.baseDialogType = 1;
      this.handleIsBaseDialog(bool);
    },
    baseTableBtnsEdit(bool) {
      //修改
      if (
        this.baseTableCurrent != null &&
        this.baseTableCurrent.funcID != null
      ) {
          if(this.baseTableCurrent.peopleCount==0){
            this.baseDialogFormData = this.baseTableCurrent;
            this.select(this.baseDialogFormData.dataDicID);
            if (this.baseDialogFormData.sameCase == "1") {
              this.baseDialogFormData.sameCase = true;
            } else {
              this.baseDialogFormData.sameCase = false;
            }
            if (this.baseDialogFormData.oppositeSex == "1") {
              this.baseDialogFormData.oppositeSex = true;
            } else {
              this.baseDialogFormData.oppositeSex = false;
            }
            this.baseDialogType = 2;
            this.handleIsBaseDialog(bool);
          }else{
            this.$message({
          showClose: true,
          message: "当前功能室被占用不能修改",
          type: "warning",
        });
          }
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
      //删除
      if (
        this.baseTableCurrent != null &&
        this.baseTableCurrent.funcID != null
      ) {
        this.$elConfirm()
          .then((res) => {
            InfoRoom.delete({
              funcID: this.baseTableCurrent.funcID,
            }).then((res) => {
              if (res.msg == 200) {
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
      if (this.baseDialogFormData.sameCase) {
        this.baseDialogFormData.sameCase = "1";
      } else {
        this.baseDialogFormData.sameCase = "0";
      }
      if (this.baseDialogFormData.oppositeSex) {
        this.baseDialogFormData.oppositeSex = "1";
      } else {
        this.baseDialogFormData.oppositeSex = "0";
      }
      console.log(
        "this.baseDialogFormData.oppositeSex",
        this.baseDialogFormData.oppositeSex
      );
       console.log('this.baseDialogFormData',this.baseDialogFormData)
      InfoRoom.save(this.baseDialogFormData).then((res) => {
        if (res.msg == 200) {
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
            type: "warning",
          });
        }
      });
      console.log(
        "提交表单数据",
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      );
    },
  },
};
</script>

<style scoped lang="scss">
.flex-box {
  .flex-box-left {
    flex: 2;
  }
  .flex-box-right {
    flex: 2;
  }
}
</style>
