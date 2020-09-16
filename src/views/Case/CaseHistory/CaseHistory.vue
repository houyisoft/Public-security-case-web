<template>
  <div class="suspect-item">
    <base-top-form
      title="历史记录"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="personnelType" label="是否出区：">
          <el-select
            v-model="baseTopFormData.personnelType"
            clearableonBaseTablePageSizeChange
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </base-top-form>
    <base-table
      :stripe="false"
      :baseTableData="baseTableData.list"
      :baseTableDataTotal="baseTableData.total"
      :baseTablePageCurrent="pageNum"
      :baseTablePageSize="pageSize"
      baseTableDataPrimaryKey="fId"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="fCreateDate" label="入区时间" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="涉案人员" width="150" align="center"></el-table-column>
      <el-table-column prop="wristbandNo" label="手环/卡编号" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.wristbandNo != 'null'">{{scope.row.wristbandNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zFCaseName" label="关联案件" align="center"></el-table-column>
      <el-table-column prop label="是否出区" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.outAreaTime">是</el-tag>
          <el-tag type="danger" effect="dark" v-else>否</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="opt" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleExitDetail(true, scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="gj" label="轨迹" width="210" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="lookdetail(true,scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="downdetail(true,scope.row)"
          >下载</el-button>

          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="trajectorydetail(true,scope.row)"
          >轨迹回放</el-button> -->

 <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="getzdinfo(true,scope.row)"
          >坐垫测试</el-button>  -->

        </template>
      </el-table-column>
    </base-table>
    <!-- 下载视频列表 -->
    <download-history
      height="300px"
      :isShow="isDownLoadHistoryVideo"
      :peopleObj="currentTableRow"
      @onCloseDialog="() => {isDownLoadHistoryVideo = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
    ></download-history>
    <!-- 查看视频列表 -->
    <view-history
      height="300px"
      :isShow="isViewHistoryVideo"
      :peopleObj="currentTableRow"
      @onCloseDialog="() => {isViewHistoryVideo = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
    ></view-history>

    <!-- 轨迹回放窗口 -->
    <!-- <trajectory-play-back
      height="300px"
      :isShow="isTrajectoryVideo"
      :peopleObj="currentTableRow"
      @onCloseDialog="() => {isTrajectoryVideo = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
    ></trajectory-play-back> -->
    
    <!-- 坐垫信息 -->
<zuo-dian-data-info
      height="300px"
      :isShow="isZdinfo"
      :peopleObj="currentTableRow"
      @onCloseDialog="() => {isZdinfo = false;baseTopFormData.wristbandNo = '';currentTableRow = {};}"
    ></zuo-dian-data-info>
<!-- 查看出区电子清单 -->
    <el-dialog
      class
      :close-on-click-modal="false"
      :visible.sync="isElecListDialog"
      title="出区人员电子清单"
      width="1200px"
    >
      <table-detail :keyProp="confirmId"></table-detail>
      <template slot="footer"></template>
    </el-dialog>
  </div>
</template>

<script>
import burnTask from "@/apis/Burn/BurnTask.js";
import OrderDetail from "./components/Detail";
import DownloadHistory from "./components/DownloadHistoryVideo";
import TableDetail from "./components/TableDetail";
import viewHistory from "./components/viewHistoryVideo.vue";
import trajectoryPlayBack from "./components/TrajectoryPlayBack.vue";
import ZuoDianDataInfo from "./components/ZuoDianDataInfo.vue";

import Apis from "@/apis/apiCase/exit.js";
import { mapMutations, mapState } from "vuex";
export default {
  components: { OrderDetail, DownloadHistory, TableDetail, viewHistory,trajectoryPlayBack,ZuoDianDataInfo },
  data() {
    return {
      typeList: [
        { name: "请选择", value: "" },
        { name: "是", value: 1 },
        { name: "否", value: 0 }
      ],
      entryreGistrationId: "",
      isScanCardDialog: false,
      // 顶部表单数据
      baseTopFormData: {
        personnelType: ""
      },
      // 表格数据
      baseTableData: {
        total: 0,
        list: []
      },
      pageNum: 1,
      pageSize: 10,

      // 弹窗显示隐藏
      isFaceDialog: false,
      isElecListDialog: false,
      isViewHistoryVideo: false,
      isExitDetail: false,
      isDownLoadHistoryVideo: false,
      isTrajectoryVideo:false,

      isZdinfo:false,

      /* 出区信息弹窗表单数据 */
      confirmId: "",
      rowList: null,
      personId: "",
      peopleId: "",
      currentTableRow: {} // 当前选中行
    };
  },

  computed: {
    ...mapState(["typeObjData"])
  },
  mounted() {
    //勿删，代办流程跳转需要用到
    if (this.$route.query.options) {
      this.personId = this.$route.query.options;
    } else {
      this.personId = "";
    }
    this.getList();
    this.getTypeList();
  },
  methods: {
    ...mapMutations(["updateTypeObjData"]),
    baseFakeElementClick(flag) {
      console.log("点击伪标签", flag);
      if (flag == "card") {
        // 扫描手环/卡
        this.isScanCardDialog = true;
      }
    },
    getTypeList() {
      Apis.getTypeList({ type: 9 }).then(res => {
        this.updateTypeObjData({
          goWhereTypes: res.data || []
        });
      });
      Apis.getTypeList({ type: 17 }).then(res => {
        this.updateTypeObjData({
          personTypes: res.data || []
        });
      });
    },

    getHistoricalVideoList() {
      burnTask
        .getHistoricalVideoList({
          personId: this.peopleId
        })
        .then(res => {});
    },
    getList() {
      const { pageNum, pageSize } = this;
      let isInArea = 0;
      let isOutArea = 0;
      if (this.baseTopFormData.personnelType === 0) {
        isOutArea = 1;
        isInArea = 0;
      } else if (this.baseTopFormData.personnelType === 1) {
        isOutArea = 0;
        isInArea = 1;
      }

      Apis.getSuspectList({
        isInArea: isOutArea,
        isOutArea: isInArea,
        pageNum,
        pageSize,
        centerInfoId: this.$store.state.userInfo.fcompanyid
      }).then(res => {
        this.baseTableData.list = res.rows || [];
        this.baseTableData.total = res.total || 0;
      });
    },
    saveOrderDetailSuccess() {
      this.isElecListDialog = false;
    },
    postBaseTopFormData() {
      this.getList();
    },
    handleExitDetail(bool, row) {
      this.confirmId = row.fId;
      this.isElecListDialog = bool;
    },
    //查看
    lookdetail(isshow, row) {
      this.currentTableRow = row;
      this.isViewHistoryVideo = true;
      console.log("lookdetail: ", isshow);
      // burnTask.getHistoricalVideoList({
      //   personId: this.peopleId
      // });
    },
    //下载
    downdetail(isshow, row) {
      console.log("download");
      this.currentTableRow = row;
      this.isDownLoadHistoryVideo = true;
      console.log("isDownLoadHistoryVideo", this.isDownLoadHistoryVideo);
    },
    //轨迹回放
    trajectorydetail(bool, row) {
      console.log("isTrajectoryVideo")
       this.currentTableRow = row;
      this.isTrajectoryVideo=true;
    },
     //坐垫测试
    getzdinfo(bool, row) {
      console.log("isZdinfo")
       this.currentTableRow = row;
      this.isZdinfo=true;
    },
    /* 表格操作 */
    baseTableCurrentChange(row) {
      console.log("选中行", row);
      this.rowList = row;
      this.peopleId = row.fId;
      console.log(" this.peopleId", this.peopleId);
    },
    baseTablePageSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getList();
    },
    baseTablePageCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    }
  }
};
</script>

<style scoped lang="scss">
.scan-dialog {
  .scan-dialog-wrap {
    text-align: center;

    .dialog-card-img {
      width: 213px;
      height: 95px;
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

.face-dialog {
  .face-dialog-wrap {
    text-align: center;
  }
}
</style>
