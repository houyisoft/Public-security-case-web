<template>
  <div class="case-entry-page">
    <!-- 入区登记 - 涉案人员/非涉案人员 -->
    <div class="case-entry-main">
      <div class="tab-bar">
        <div class="tab-bar-left">
          <div
            :class="{ 'tab-bar-card': true, 'current-card': currentTab == 1 }"
            @click="changeTab(1)"
          >
            涉案人员
          </div>
          <div
            :class="{ 'tab-bar-card': true, 'current-card': currentTab == 2 }"
            @click="changeTab(2)"
          >
            非涉案人员
          </div>
        </div>

        <div class="tab-bar-right">
          <!-- 涉案人员按钮 -->
          <template v-if="currentTab == 1">
            <template v-if="involvedItemType == 1">
              <el-button
                class="tab-bar-btn"
                type="primary"
                @click="handleInvolvedItemType(2)"
                >查看列表</el-button
              >
              <el-button
                class="tab-bar-btn"
                type="primary"
                @click="saveContinue"
                >保存继续</el-button
              >
              <el-button class="tab-bar-btn" type="primary" @click="saveEmpty"
                >保存并清空</el-button
              >
            </template>
            <template v-else>
              <el-button
                class="tab-bar-btn"
                type="primary"
                @click="handleInvolvedItemType(1)"
                >新增入区</el-button
              >
            </template>
          </template>

          <!-- 非涉案人员按钮 -->
          <template v-if="currentTab == 2">
            <el-button
              class="tab-bar-btn"
              type="primary"
              @click="handleIsUninvolvedRegist(true)"
              >登记</el-button
            >
          </template>
        </div>
      </div>

      <!-- 涉案人员tab内容 -->
      <involved-item
        ref="involvedItem"
        v-if="currentTab == 1"
        :involvedItemType="involvedItemType"
        @onHandleInvolvedItemType="handleInvolvedItemType"
      ></involved-item>

      <!-- 非涉案人员tab内容 -->
      <uninvolved-item
        ref="uninvolvedItem"
        v-if="currentTab == 2"
        @onHandleIsUninvolvedRegist="handleIsUninvolvedRegist"
        :isUninvolvedRegist="isUninvolvedRegist"
      ></uninvolved-item>
    </div>

    <!-- 数据展示 -->
    <div class="case-entry-statistic">
      <div class="statistic-number-wrap">
        <el-row>
          <el-col :span="12">
            <div
              class="statistic-block entry-block"
              @click="clickPersonnelWndow(true, 1)"
            >
              <span class="more">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="block-number">{{ JinRiRuQu }}</div>
              <div class="block-title">今日入区人数</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div
              class="statistic-block exit-block"
              @click="clickPersonnelWndow(true, 2)"
            >
              <span class="more">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="block-number">{{ JinRiChuQu }}</div>
              <div class="block-title">今日出区人数</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div
              class="statistic-block current-block"
              @click="clickPersonnelWndow(true, 3)"
            >
              <span class="more">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="block-number">{{ DangQianZaiQu }}</div>
              <div class="block-title">当前在区人数</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div
              class="statistic-block trial-block"
              @click="clickPersonnelWndow(true, 4)"
            >
              <span class="more">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="block-number">{{ DangQianShenXun }}</div>
              <div class="block-title">当前审讯人数</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div
              class="statistic-block wait-block"
              @click="clickPersonnelWndow(true, 5)"
            >
              <span class="more">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="block-number">{{ DangQianHouWen }}</div>
              <div class="block-title">当前侯问人数</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div
              class="statistic-block extend-block"
              @click="clickPersonnelWndow(true, 6)"
            >
              <span class="more">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="block-number">{{ ChaoQiShenXun }}</div>
              <div class="block-title">超期审讯人数</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="statistic-room-wrap">
        <div class="statistic-room-title">
          <i class="el-icon-school"></i>
          <span>功能室信息</span>
        </div>
        <el-table stripe :data="statisticRoom.rows" class="special">
          <el-table-column align="center" type="index" label="序号">
            <template slot-scope="scope">
              <span>{{ (statisticRoom.pageNum - 1) * statisticRoom.pageSize + scope.$index + 1 }}</span>
            </template></el-table-column
          >
          <el-table-column
            align="center"
            prop="funcName"
            label="功能室名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="roomCount"
            label="可存放人数"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="peopleCount"
            label="现有人数"
          ></el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          @current-change="pageNumChange"
          :total="statisticRoom.total"
          :pager-count="5"
          :current-page="statisticRoom.pageNum"
          :page-size="statisticRoom.pageSize"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 人员详细信息弹窗 -->
    <el-dialog
      class="regist-dialog"
      :close-on-click-modal="false"
      :visible.sync="isPersonnelWndow"
      @close="clickPersonnelWndow(false)"
      width="1200px"
      :title="PersonnelWndowTitle + ' - 人员信息'"
    >
      <base-table
        :baseTableData="baseTableData.list"
        :isBaseTableCheckbox="false"
        :isBaseTableRadio="false"
        :baseTableDataTotal="baseTableData.total"
        :baseTablePageCurrent="baseTablePageCurrent"
        :baseTablePageSize="baseTablePageSize"
        @onBaseTableCurrentChange="baseTableCurrentChange"
        @onBaseTablePageSizeChange="baseTablePageSizeChange"
        @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
      >
        <el-table-column
          align="center"
          width="50px"
          type="index"
          label="序号"
        ></el-table-column>
        <el-table-column
          prop="F_CreateDate"
          width="160px"
          label="入区时间"
        ></el-table-column>
        <el-table-column
          prop="Name"
          width="100px"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="PersonnelTypeName"
          width="170px"
          label="人员类型"
        ></el-table-column>
        <el-table-column
          prop="GenderName"
          width="50px"
          label="性别"
        ></el-table-column>
        <el-table-column
          prop="CardTypeName"
          width="120px"
          label="证件类别"
        ></el-table-column>
        <el-table-column
          prop="CardNumber"
          width="200px"
          label="证件号"
        ></el-table-column>
        <el-table-column
          prop="Phone"
          width="150px"
          label="电话"
        ></el-table-column>
        <el-table-column
          prop="BirthDate"
          width="100px"
          label="生日"
        ></el-table-column>
        <el-table-column
          prop="OutAreaTime"
          width="160px"
          label="出区时间"
        ></el-table-column>
        <el-table-column
          prop="NativeAddress"
          width="250px"
          label="地址"
        ></el-table-column>
      </base-table>
    </el-dialog>
  </div>
</template>

<script>
import apiCaseEntry from "@/apis/apiCase/apiCaseEntry.js";
import InvolvedItem from "@/views/Case/CaseEntry/components/InvolvedItem.vue";
import UninvolvedItem from "@/views/Case/CaseEntry/components/UninvolvedItem.vue";
export default {
  components: {
    InvolvedItem, // 涉案人员
    UninvolvedItem, // 非涉案人员
  },
  data() {
    return {
      currentTab: "1", // 1 涉案人员 2 非涉案人员
      involvedItemType: 1, // 涉案人员 - 1 入区登记 2 查看列表
      isUninvolvedRegist: false, // 非涉案人员 - 员工登记弹窗
      statisticRoom: {
        rows: [],
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },

      JinRiRuQu: 0, // 今日入区人数
      JinRiChuQu: 0, // 今日出区人数
      DangQianZaiQu: 0, // 当前在区人数
      DangQianShenXun: 0, // 当前审讯人数
      DangQianHouWen: 0, // 当前侯问人数
      ChaoQiShenXun: 0, // 超期审讯人数
      isPersonnelWndow: false, // 人员详细信息弹窗
      PersonnelWndowTitle: "", // 人员详细信息标题
      TitleTypeData: "",
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 10,
      baseTableCurrent: {}, // 当前选中行数据
      getInAreaFormRightDataTimer: null,
    };
  },
  created() {
    //this.getStatisticData()

    //右侧数据初始化，定时获取
    this.getInAreaFormRightData();
    this.queryStatisticRoomList();
    //setInterval(this.getInAreaFormRightData, 5000);
    //setInterval(this.queryStatisticRoomList, 5000);
  },
  beforeDestroy() {
    clearInterval(this.getInAreaFormRightDataTimer);
    this.getInAreaFormRightDataTimer = null;
  },
  methods: {
    /* 切换涉案人员 / 非涉案人员 */
    changeTab(val) {
      this.currentTab = val;
    },
    /* 涉案人员按钮 - 查看列表 / 新增入区 */
    handleInvolvedItemType(index) {
      console.log(index)
      this.involvedItemType = index;
    },
    //获取页面右侧数据
    getInAreaFormRightData() {
      apiCaseEntry.getInAreaFormRightData().then((res) => {
        this.JinRiRuQu =
          parseInt(res.data.JinRIRuQuSheAn) +
          parseInt(res.data.JinRIRuQuFeiSheAn);
        this.JinRiChuQu =
          parseInt(res.data.JinRiChuQuSheAn) +
          parseInt(res.data.JinRiChuQuFeiSheAn);
        this.DangQianZaiQu =
          parseInt(res.data.DangQianZaiQuSheAn) +
          parseInt(res.data.DangQianZaiQuFeiSheAn);
        this.DangQianShenXun = res.data.DangQianShenXun;
        this.DangQianHouWen = res.data.DangQianHouWen;
        this.ChaoQiShenXun = res.data.ChaoQiShenXun;
      });
    },
    //获取页面右侧功能室数据
    queryStatisticRoomList() {
      const { pageNum, pageSize } = this.statisticRoom;
      apiCaseEntry
        .selectTbFunctionroomBaseList({ pageNum, pageSize })
        .then((res) => {
          this.statisticRoom.rows = res.rows;
          this.statisticRoom.total = res.total;
        });
    },
    pageNumChange(val) {
      this.statisticRoom.pageNum = val;
      this.queryStatisticRoomList();
    },
    //右侧数据点击人员详细页面
    clickPersonnelWndow(bool, TitleType) {
      if (bool) {
        if (TitleType != undefined) {
          this.PersonnelListByType(TitleType);
          if (TitleType == "1") {
            this.PersonnelWndowTitle = "今日入区";
          }
          if (TitleType == "2") {
            this.PersonnelWndowTitle = "今日出区";
          }
          if (TitleType == "3") {
            this.PersonnelWndowTitle = "当前在区";
          }
          if (TitleType == "4") {
            this.PersonnelWndowTitle = "当前审讯";
          }
          if (TitleType == "5") {
            this.PersonnelWndowTitle = "当前侯问";
          }
          if (TitleType == "6") {
            this.PersonnelWndowTitle = "超期审讯";
          }
        }
        this.isPersonnelWndow = bool;
      } else {
        this.baseTableData.list = [];
      }
      this.isPersonnelWndow = bool;
    },
    //人员详细页面数据列表
    PersonnelListByType(type) {
      console.log("人员详细页面数据列表", type);
      // debugger
      apiCaseEntry
        .personnelListByType({
          pageNum: this.baseTablePageCurrent,
          pageSize: this.baseTablePageSize,
          type: type,
        })
        .then((res) => {
          if (res.code == 0) {
            this.TitleTypeData = type;
            this.baseTableData.list = res.rows;
            this.baseTableData.total = res.total;
          }
        })
        .catch((err) => {
          console.log("获取表单失败" + err);
        });
    },
    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      console.log("当前选中表格行", row, index);
      this.baseTableCurrent = row;
    },
    baseTablePageSizeChange(val) {
      console.log("当前页码", val);
      this.baseTablePageSize = val;
      this.PersonnelListByType(this.TitleTypeData);
    },
    baseTablePageCurrentChange(val) {
      console.log("每页数量", val);
      this.baseTablePageCurrent = val;
      this.PersonnelListByType(this.TitleTypeData);
    },

    // 查看列表
    handleNonStaffFormTableType(index) {
      this.nonStaffFormTableType = index;
      if (index == 1) {
        console.log("切换为涉案人员入区登记");
      } else {
        console.log("切换为涉案人员查看列表");
      }
    },
    /* 涉案人员按钮 - 保存继续 */
    saveContinue() {
      this.$refs["involvedItem"]
        .postInvolvedFormData()
        .then((res) => {
          if (res.code === 0) {
            this.$message.success(res.data);
          } else {
            this.$message.error(res.message);
          }
          console.log("保存继续成功", res);
        })
        .catch((err) => {
          debugger;
          console.log("保存继续失败", err);
          // this.$message.error(err.errMsg);
        });
    },
    /* 涉案人员按钮 - 保存清空 */
    saveEmpty() {
      this.$refs["involvedItem"]
        .postInvolvedFormData()
        .then((res) => {
          if (res.code === 0) {
            this.$refs["involvedItem"].resetInvolvedFormData();
            this.$message.success(res.data);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log("保存清空失败", err);
          // this.$message.error(err);
        });
    },
    // 非涉案人员按钮 - 登记弹窗
    handleIsUninvolvedRegist(bool) {
      this.isUninvolvedRegist = bool;
    },
  },
};
</script>

<style scoped lang="scss">
.case-entry-page {
  display: flex;

  .case-entry-main {
    flex: 1;
    padding: 0 20px 0 0;
  }

  .case-entry-statistic {
    flex-shrink: 0;
    margin-right: -2px;

    .statistic-number-wrap {
      margin: -7px;
      .el-col {
        background-image: url(../../../assets/images/case/caseEntry/block.png);
        background-size: 92% 92%;
        background-repeat: no-repeat;
        background-position: center;
        .statistic-block {
          height: 128px;
          background-position: 6px 6px;
          background-repeat: no-repeat;
          position: relative;
          cursor: pointer;
          margin: 6px;

          .more {
            position: absolute;
            right: 12px;
            top: 10px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(108, 223, 252, 1);
            line-height: 22px;

            .el-icon-arrow-right {
              background: rgba(108, 223, 252, 1);
              border-radius: 50%;
              color: #000;
              font-size: 10px;
              font-weight: bold;
              padding: 1px;
            }
          }

          .block-number {
            position: absolute;
            right: 12px;
            top: 38px;
            font-size: 50px;
            line-height: 48px;
            color: #fbb95c;
          }

          .block-title {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 12px;
            margin: auto;
            text-align: center;
            font-size: 16px;
            color: #6cdffc;
          }
        }
      }
    }

    .regist-dialog {
      .regist-dialog-img-wrap {
        display: flex;
        justify-content: space-around;

        .regist-dialog-img {
          width: 150px;
          height: 150px;
        }
      }
    }

    .statistic-room-wrap {
      margin-top: 15px;

      .statistic-room-title {
        line-height: 42px;
        font-size: 18px;
        color: rgba(172, 231, 253, 1);
        .i {
          margin-right: 2px;
          font-size: 18px;
        }
      }
    }
  }
}

/* 入区人数 */
.entry-block {
  background-size: 48px 42px;
  background-image: url(../../../assets/images/case/caseEntry/block1.png);
}

/* 出区人数 */
.exit-block {
  background-size: 48px 42px;
  background-image: url(../../../assets/images/case/caseEntry/block2.png);
}

/* 当前在区人数 */
.current-block {
  background-size: 48px 36px;
  background-image: url(../../../assets/images/case/caseEntry/block3.png);
}

/* 当前审讯人数 */
.trial-block {
  background-size: 48px 48px;
  background-image: url(../../../assets/images/case/caseEntry/block4.png);
}

/* 当前侯问人数 */
.wait-block {
  background-size: 40px 46px;
  background-image: url(../../../assets/images/case/caseEntry/block5.png);
}

/* 超期审讯人数 */
.extend-block {
  background-size: 48px 48px;
  background-image: url(../../../assets/images/case/caseEntry/block6.png);
}

::v-deep.el-table {
  th,
  td {
    border: none !important;

    div {
      padding: 0 !important;
      font-size: 12px;
    }
  }
}

::v-deep
/* 表格 */
.el-table.special {
  .el-table__header-wrapper {
    .el-table__header {
      thead {
        tr {
          th {
            background: #ace7fd;
            color: rgba(3, 10, 67, 1);
          }
        }
      }
    }
  }

  .el-table__body-wrapper {
    .el-table__body {
      tr.el-table__row {
        td {
          color: #ffffff;
          border-bottom: solid 1px rgb(2, 9, 39) !important;
          background: #0656ce;
        }
      }
    }

    .el-table__empty-block {
      .el-table__empty-text {
        color: #ffffff;
      }
    }
  }
  &::before,
  &::after {
    background: none !important;
  }
}
</style>
