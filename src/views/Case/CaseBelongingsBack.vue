<template>
  <div class="case-belongings-back">
    <base-top-form
      title="随身财物列表信息"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="type" label="人员类型">
          <el-select
            size="mini"
            v-model="baseTopFormData.type"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in typelist"
              :key="index"
              :label="item.fitemname"
              :value="item.fitemvalue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="人员姓名">
          <el-input
            size="mini"
            v-model="baseTopFormData.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>

    <base-table-btns :isDefaultBaseTableBtns="false">
      <div class="table-btn-wrap" @click="brushBraceletOrCard">
        <span>刷手环/卡</span>
        <i class="el-icon-watch-1 btn-icon"></i>
      </div>
      <!-- <div class="table-btn-wrap" @click="pickUp">
                <span>取出</span>
                <i class="el-icon-suitcase btn-icon"></i>
            </div>
            <div class="table-btn-wrap" @click="forcePickUp">
                <span>强制取出</span>
                <i class="el-icon-suitcase btn-icon"></i>
            </div>-->
    </base-table-btns>

    <el-table
      border
      class="main-table"
      :data="baseTableData.list"
      highlight-current-row
      @current-change="selectTableRow"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="caseId" label="案件编号"></el-table-column>
      <el-table-column prop="caseName" label="案件名称"></el-table-column>
      <el-table-column prop="suspectName" label="嫌疑人姓名"></el-table-column>
      <el-table-column label="是否存放">
        <template slot-scope="scope">
          <span v-if="scope.row.issave == 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="是否已取出">
        <template slot-scope="scope">
          <span v-if="scope.row.isUse == 0">否</span>
          <span v-if="scope.row.isUse == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="seeMain(scope.row)"
            >查看</el-button
          >
          <el-button
            v-if="scope.row.issave == 1 && scope.row.isUse == 0"
            type="text"
            icon="el-icon-view"
            @click="pickUp(scope.row)"
            >取出</el-button
          >
          <el-button
            v-if="scope.row.issave == 1 && scope.row.isUse == 0"
            type="text"
            icon="el-icon-view"
            @click="forcePickUp(scope.row)"
            >强制取出</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="baseTableData.total"
      :hide-on-single-page="false"
    ></el-pagination>
    <el-dialog
      class="scan-dialog"
      title="请扫描"
      width="800px"
      :close-on-click-modal="false"
      :visible="handDio"
      @close="handDio = false"
    >
      <el-input
        ref="refDialogBandNumber"
        class="dialog-hide-input"
        :autofocus="true"
        v-model="DialogBandNumber"
        autocomplete="on"
        @input="changeDialogBandCardNumber"
        @blur="(e) => e.target.focus()"
      ></el-input>
      <div class="scan-dialog-wrap">
        <el-image
          class="dialog-band-img"
          :src="
            require('@/assets/images/case/caseEntry/wristbandDialogImg.png')
          "
        ></el-image>
        <div class="dialog-big-text">请将手环置于机器上方</div>
        <div class="dialog-small-text">读取成功后自动关闭</div>
      </div>
    </el-dialog>
    <el-dialog
      class="pickup-dialog"
      title="物品详情"
      width="80%"
      :close-on-click-modal="false"
      :visible="seemainDio"
      @close="seemainDio = false"
    >
      <!-- <div class="dialog-top">

				<el-form class="dialog-form"
				 :model="dialogFormData"
				 ref="dialogForm"
				 :rules="dialogFormRules"
				 label-width="90px">
					<el-form-item label="人员姓名">
						<div class="">{{dialogFormData.name}}</div>
					</el-form-item>
					<el-form-item label="物品名称">
						<div class="">{{dialogFormData.belongingsName}}</div>
					</el-form-item>
					<div class="flex-box">
						<el-form-item label="数量">
							<div class="">{{dialogFormData.number}}</div>
						</el-form-item>
						<el-form-item label="数量单位">
							<div class="">{{dialogFormData.numberUnit}}</div>
						</el-form-item>
					</div>
					<div class="flex-box">
						<el-form-item label="重量">
							<div class="">{{dialogFormData.weight}}</div>
						</el-form-item>
						<el-form-item label="重量单位">
							<div class="">{{dialogFormData.weightUnit}}</div>
						</el-form-item>
					</div>
					<el-form-item label="物品类型">
						<div class="">{{dialogFormData.belongingsType}}</div>
					</el-form-item>
					<el-form-item label="备注">
						<div class="">{{dialogFormData.remark}}</div>
					</el-form-item>
					<el-form-item label="照片">
						<base-image></base-image>
					</el-form-item>
				</el-form>

				<div class="dialog-img-wrap">
					<el-image class="dialog-img"
					 src="require('@/assets/logo.png')"></el-image>
				</div>
            </div>-->
            
      <div style="text-align:center">
        姓名：<span class="demonstration">{{ this.baseTopFormDataName }}</span>
        性别：<span class="demonstration"> {{ this.baseTopFormDataSex }}</span>
      </div>
      <!-- <base-title :title="baseTopFormDataName" ></base-title> -->
      <base-title title="物品记录" ></base-title>
      <!-- <base-table :baseTableData="dialogTableData"  + {{ this.baseTopFormDataName }}
			 @onBaseTableCurrentChange="dialogTableCurrentChange">
				<el-table-column type="index"
				 label="序号"
				 width="50">
				</el-table-column>
				<el-table-column prop="name"
				 label="物品名称">
				</el-table-column>
            </base-table>-->
      <!-- 姓名：<span class="demonstration">{{ this.baseTopFormDataName }}</span> -->
      <!-- 性别：<span class="demonstration"></span> -->
      <el-table :data="dialogTableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          width="70"
        ></el-table-column>
        <el-table-column prop="amountUnit" label="数量单位"></el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="70"
        ></el-table-column>
        <el-table-column prop="weightUnit" label="重量单位"></el-table-column>
        <el-table-column prop="goodsPrice" label="物品照片"></el-table-column>
        <el-table-column prop="goodsType" label="物品类型"></el-table-column>
        <el-table-column prop="positionCode" label="货位编号"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" v-if="!seemainDioflag">
        <el-button type="primary" @click="sureTake()">确 定</el-button>
        <el-button @click="seemainDio = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import caseinfo from "@/apis/wywcase.js";
export default {
  data() {
    return {
      DialogBandNumber: "",
      baseTopFormData: {
        type: "",
        name: "",
      },
      seemainDio: false,
      seemainDioflag: false, // 代表是查看
      // 表格数据
      currentTableRow: {},
      pageSize: 10,
      pageNum: 1,
      baseTableData: {
        total: 0,
        list: [],
      },
      typelist: [],
      baseTablePageCurrent: 1,
      baseTablePageSize: 20,
      /* 弹窗控制 */
      pickUpType: 1, // 2 取出 1 强制取出
      isPickUp: false,
      isForcePickUp: false,
      dialogFormData: {},
      dialogFormRules: {},
      // 弹窗表格
      dialogTableData: [],
      handDio: false,
      braceletOrCardCode: "", // 手环或卡的号码
      ipcId: "",
      baseTopFormDataName:"",//嫌疑人姓名
      baseTopFormDataSex:""//嫌疑人性别
    };
  },
  computed: {
    isDialog() {
      return this.isPickUp || this.isForcePickUp;
    },
  },
  watch: {
    braceletOrCardCode(val) {
      if (val.length === 8) {
        this.brushBraceletOrCardSuccess(val);
      }
    },
    handDio(val) {
      if (val) {
        this.braceletOrCardCode = "";
      }
    },
    seemainDio(val) {
      // 关闭后重置按钮展示状态
      if (!val) {
        setTimeout(() => {
          this.seemainDioflag = false;
        }, 300);
      }
    },
  },
  created() {
    this.gettypelist();
    //meger不要误删这段代码，这是代办流程跳转查询传参
    if (this.$route.query.options) {
      this.ipcId = this.$route.query.options;
    } else {
      this.ipcId = "";
    }
    this.getList();
  },
  methods: {
    gettypelist() {
      caseinfo.diclist().then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.typelist = res.rows;
        }
      });
    },
    selectTableRow(val) {
      console.log("当前选中行", val);
      this.currentTableRow = val;
    },
    getList() {
      let obj = {
        ipcId: this.ipcId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        personnelType: this.baseTopFormData.type,
        suspectName: this.baseTopFormData.name,
        centerInfoId: this.$store.state.userInfo.fcompanyid,
      };
      caseinfo.getBelongList(obj).then((res) => {
        if (res.code == 0) {
          this.baseTableData.list = res.rows;
          this.baseTableData.total = res.total;
        }
      });
    },
    seeMain(item) {
      // this.baseTopFormDataName ='物品记录    姓名:'//清空
      this.baseTopFormDataName = item.suspectName;//嫌疑人名称赋值
      if(item.sex == "1"){
        this.baseTopFormDataSex = "男"//性别赋值
      } else {
        this.baseTopFormDataSex = "女"//性别赋值
      }
      let obj = {
        centerInfoId: this.$store.state.userInfo.fcompanyid,
        personalGoodsId: item.fId,
      };
      caseinfo.getBelongMain(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.seemainDio = true;
          this.seemainDioflag = true;
          this.dialogTableData = res.rows;
        }
      });
    },
    sureTake() {
      const { fId, suspectId } = this.scanRow;
      let obj = {
        fId,
        centerInfoId: this.$store.state.userInfo.fcompanyid,
        suspectId,
        type: this.pickUpType,
      };
      caseinfo.takeout(obj).then((res) => {
        // console.log(res)
        if (res.code == 0) {
          this.$message({
            message: "取出成功",
            type: "success",
          });
          this.seemainDio = false;
          this.getList();
        }
      });
    },
    // 顶部表单
    postBaseTopFormData() {
      this.ipcId = "";
      this.getList();
    },
    // 表格操作
    // baseTableCurrentChange(row, index) {
    // 	console.log('baseTableCurrentChange', row, index)
    // },
    // baseTablePageSizeChange(val) {
    // 	console.log('baseTablePageSizeChange', val)
    // },
    // baseTablePageCurrentChange(val) {
    // 	console.log('baseTablePageCurrentChange', val)
    // },
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
    braceletOrCardCodeChange(val) {
      console.log(val, "获取数据");
    },
    // 刷手环/卡
    brushBraceletOrCard() {
      this.handDio = true;
      setTimeout(() => {
        // 延时获取焦点
        this.$refs.refDialogBandNumber.focus();
      }, 200);
    },
    // 刷手环成功调用
    changeDialogBandCardNumber(number) {
      /*
       * number 代表获取的 手环或者卡号
       * */
      if (number.length === 8) {
        caseinfo.getBelongList({ number }).then((res) => {
          if (res.code === 0) {
            this.handDio = false;
            const row = res.rows[0];
            if (row) {
              this.scanRow = row;
              this.pickUp(row);
            } else {
              this.$message({
                message: "查无信息",
                type: "error",
              });
            }
            this.DialogBandNumber = "";
          }
        });
      }
    },
    // 表格上方控制按钮
    pickUp(row) {
      this.pickUpType = 1;
      const { fId: personalGoodsId } = row;
      caseinfo
        .getBelongMain({
          centerInfoId: this.$store.state.userInfo.fcompanyid,
          personalGoodsId,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.seemainDio = true;
            this.dialogTableData = res.rows;
          }
        });
        this.scanRow = row;
    },
    forcePickUp(row) {
      this.pickUpType = 1;
      const { issave, isUse, type, fId, suspectId } = row;
      if (issave == 1 && isUse == 0) {
        if (row.type == 1) {
          let obj = {
            fId: fId,
            centerInfoId: this.$store.state.userInfo.fcompanyid,
            suspectId: suspectId,
            type: 1,
          };
          caseinfo.takeout(obj).then((res) => {
            // console.log(res)
            if (res.code == 0) {
              this.$message({
                message: "强制取出成功",
                type: "success",
              });
              this.getList();
            }
          });
        } else {
          this.$message({
            message: "货架物品不能强制取出",
            type: "error",
          });
        }
      } else if (issave == 1 && isUse == 1) {
        this.$message({
          message: "已取出物品不能强制取出",
          type: "error",
        });
      } else if (issave != 1) {
        this.$message({
          message: "您未存放物品，不能取出",
          type: "error",
        });
      }
    },
    dialogTableCurrentChange(row, index) {
      console.log("弹窗内选中行", row, index);
    },
  },
};
</script>

<style scoped lang="scss">
/* 扫描/扫手环弹窗 */
.scan-dialog {
  ::v-deep .el-dialog__body {
    padding: 90px 0 95px 0;
  }

  .dialog-hide-input {
    position: absolute;
    top: -100000px;
  }

  .scan-dialog-wrap {
    text-align: center;

    .dialog-band-img {
      width: 213px;
      position: relative;
      margin: 0;
    }

    .dialog-big-text {
      margin-top: 60px;
      font-size: 24px;
    }

    .dialog-small-text {
      font-size: 16px;
    }
  }
}
</style>
