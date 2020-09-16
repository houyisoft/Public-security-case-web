<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="page-wrap">
    <div class="case-main-top-form">
      <el-form ref="caseMainTopForm" :model="baseTopFormData">
        <div>
          <!--<el-button class="form-btn in-btn" type="primary" @click="getJZFiles">获取卷宗</el-button>-->
          <el-button class="form-btn in-btn" type="primary" @click="getVideoByTypes">加载案件文件</el-button>
          <!--<el-button class="form-btn out-btn" @click="AddCriminalForm">选择嫌疑人</el-button>-->
         <!-- <el-button class="form-btn out-btn" @click="openFile">添加文件</el-button>-->
          <el-button class="form-btn out-btn" @click="saveBurnInfo">保存并刻录</el-button>
        </div>
      </el-form>
    </div>
    <div class="page-main">
      <div class="content" style="width:60%">
        <base-title title="案件信息"></base-title>
        <el-form
          class="case-form"
          :model="caseFormData"
          ref="caseForm"
          label-width="110px"
          label-position="left"
        >
          <div class="case-form-left">
            <div class="form-item">
              <div class="form-item-label">案件信息</div>
              <div class="form-item-content">
                <base-fake-element
                  baseFakeElementFlag="caseInfo"
                  baseFakeElementType="select"
                  @onBaseFakeElementClick="baseFakeElementClick"
                >{{caseFormData.casesInfo==""?caseFormData.casesName:caseFormData.casesInfo}}</base-fake-element>
              </div>
            </div>
            <el-form-item class="max-width-auto" label="民警警号" prop="casesName">
              <el-input v-model="caseFormData.police1No"></el-input>
            </el-form-item>
            <el-form-item class="max-width-auto" label="民警警号" prop="casesName">
              <el-input v-model="caseFormData.police2No"></el-input>
            </el-form-item>
            <el-input v-if="false" v-model="caseFormData.caseId"></el-input>
            <el-input v-if="false" v-model="caseFormData.fId"></el-input>
          </div>

          <div class="case-form-right">
            <el-form-item class="max-width-auto" label="案件名称" prop="casesName">
              <el-input v-model="caseFormData.casesName"></el-input>
            </el-form-item>
            <el-form-item label="民警姓名" prop="police1Name">
              <el-input v-model="caseFormData.police1Name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="民警姓名" prop="police2Name">
              <el-input v-model="caseFormData.police2Name" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <base-title title="刻录信息"></base-title>
        <el-form
          class="case-form"
          :model="burnData"
          ref="caseForm"
          label-width="110px"
          label-position="left"
        >
          <div class="case-form-left">
            <el-form-item class="max-width-auto" label="刻录人" prop="casesName">
              <el-input v-model="burnData.BurnUserName"></el-input>
            </el-form-item>
            <el-form-item class="max-width-auto" label="刻录用途" prop="casesName">
              <el-select placeholder="刻录备份" filterable clearable v-model="burnData.burnPurpose">
                <el-option
                  v-for="item in burnPurpose"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刻录类型" prop="police1Name" v-model="burnData.type">
              <el-radio v-model="burnType" label="1">预约刻录</el-radio>
              <el-radio v-model="burnType" label="2">一键刻录</el-radio>
            </el-form-item>
            <el-form-item class="max-width-auto" label="备注" prop="casesName">
              <el-input v-model="burnData.Description"></el-input>
            </el-form-item>
          </div>
          <div class="case-form-right">
            <el-form-item class="max-width-auto" label="刻录日期" prop="casesName">
              <el-date-picker
                v-model="burnData.Date"
                format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="刻录份数" prop="police1Name">
              <el-input-number v-model="burnData.num" :min="1" :max="30" label="描述文字"></el-input-number>
            </el-form-item>
          </div>
        </el-form>
        <base-title title="嫌疑人基本信息"></base-title>
        <div style="text-align: right">
          <el-button class="form-btn out-btn" @click="AddCriminalForm">选择嫌疑人</el-button>
          <el-button class="form-btn in-btn" type="primary" @click="getVideoByTypes">加载嫌疑人文件</el-button>
        </div>
        <base-table
          :baseTableData="baseTableData.list"
          :baseTableDataTotal="baseTableData.total"
          baseTableDataPrimaryKey="renyuanbianhao"
          ref="suspecttable"
          :isBaseTablePage="false"
          :baseTableHeight="170"
          :isBaseTableRadio="false"
          :baseTablePageCurrent="baseTablePageCurrent"
          :baseTablePageSize="baseTablePageSize"
          @onBaseTableCurrentChange="baseTableCurrentChange"
          @onBaseTablePageSizeChange="baseTablePageSizeChange"
          @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
          @onBaseTableSelectChange="personTableSelectionChange"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="renyuanbianhao" label="嫌疑人编号" width="210"></el-table-column>
          <el-table-column prop="xingming" label="嫌疑人名称" width="100"></el-table-column>
          <el-table-column prop="anjianbianhao" label="案件编号" width="210"></el-table-column>
          <el-table-column prop="jinrushijian" label=" 进入时间" width="180"></el-table-column>
          <el-table-column prop="banandanweimc" label="办案单位" width="170"></el-table-column>
        </base-table>
      </div>
      <div
        class="content"
        style="width:39%;margin-left:1%; padding-left: 20px; background:rgba(2,12,52,0.5);"
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="涉案卷宗" name="a1">
            <div style="text-align: right">
              <el-button class="form-btn in-btn" type="primary" @click="getJZFiles">获取卷宗</el-button>
            </div>
            <base-table
              ref="involvedTable"
              baseTableDataPrimaryKey="id"
              :baseTableHeight="520"
              :baseTableData="involvedTable.list"
              :baseTableDataTotal="involvedTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="IbaseTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="案卷名称"></el-table-column>
              <el-table-column prop="type" label="案卷类型"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="本地视频文件" name="a2">
            <div style="text-align: right">
              <el-button class="form-btn out-btn" @click="openFile">添加文件</el-button>
            </div>
            <base-table
              ref="LocalTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="localTable.list"
              :baseTableDataTotal="localTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="LbaseTableSelectionChange"
            >
              <input
                ref="fileValue"
                type="file"
                id="filename"
                style="display:none"
                multiple="multiple"
                @change="showRealPath($event)"
              />

              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="filename" label="文件名称"></el-table-column>
              <el-table-column prop="filesize" label="文件大小"></el-table-column>
              <el-table-column prop="filetye" label="文件类型"></el-table-column>
              <el-table-column prop="sourcepath" label="文件路径"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="接处警视频" name="a3">
            <base-table
              ref="acceptanceTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="acceptanceTable.list"
              :baseTableDataTotal="acceptanceTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="ContactVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="linkRoomName" label="环节"></el-table-column>
              <el-table-column prop="fileStarttime" label="记录时间"></el-table-column>
              <el-table-column prop="fileduration" label="时长"></el-table-column>
              <el-table-column prop="fileSize" label="大小"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="轨迹视频" name="a4">
            <base-table
              ref="trajectoryVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="trajectoryVideoTable.list"
              :baseTableDataTotal="trajectoryVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="trajectoryVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="linkRoomName" label="环节"></el-table-column>
              <el-table-column prop="fileStarttime" label="记录时间"></el-table-column>
              <el-table-column prop="fileduration" label="时长"></el-table-column>
              <el-table-column prop="fileSize" label="大小"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="高清审讯视频" name="a5">
            <base-table
              ref="inquestVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="inquestVideoTable.list"
              :baseTableDataTotal="inquestVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="inquestVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="storePerson" label="笔录人"></el-table-column>
              <el-table-column prop="recorder" label="记录员"></el-table-column>
              <el-table-column prop="fileStarttime" label="笔录日期"></el-table-column>
              <el-table-column prop="fileduration" label="时长"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="签字特写视频" name="a6">
            <base-table
              ref="SignatureVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="SignatureVideoTable.list"
              :baseTableDataTotal="SignatureVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="SignatureVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="storePerson" label="签字人"></el-table-column>
              <el-table-column prop="recorder" label="记录员"></el-table-column>
              <el-table-column prop="fileStarttime" label="笔录日期"></el-table-column>
              <el-table-column prop="fileduration" label="时长"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="案件视频" name="a7">
            <base-table
              ref="CaseVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="CaseVideoTable.list"
              :baseTableDataTotal="CaseVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="CaseVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="fileName" label="文件名称"></el-table-column>
              <el-table-column prop="fileduration" label="文件时长"></el-table-column>
              <el-table-column prop="fileStarttime" label="生成时间"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="押解视频" name="a8">
            <base-table
              ref="escortVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="escortVideoTable.list"
              :baseTableDataTotal="escortVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="escortVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="recorder" label="押解员"></el-table-column>
              <el-table-column prop="storePerson" label="被押解人"></el-table-column>
              <el-table-column prop="fileStarttime" label="押解日期"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="监管视频" name="a9">
            <base-table
              ref="superviseVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="superviseVideoTable.list"
              :baseTableDataTotal="superviseVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="superviseVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="recorder" label="监管员"></el-table-column>
              <el-table-column prop="storePerson" label="被监管人"></el-table-column>
              <el-table-column prop="fileStarttime" label="监管日期"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="随身物品视频" name="a10">
            <base-table
              ref="ArticlesVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="ArticlesVideoTable.list"
              :baseTableDataTotal="ArticlesVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="ArticlesVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="recorder" label="物品存放人"></el-table-column>
              <el-table-column prop="takePerson" label="物品取出人"></el-table-column>
              <el-table-column prop="fileStarttime" label="存放时间"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
          <el-tab-pane label="涉案财物视频" name="a11">
            <base-table
              ref="PropertyVideoTable"
              baseTableDataPrimaryKey="fid"
              :baseTableHeight="520"
              :baseTableData="PropertyVideoTable.list"
              :baseTableDataTotal="PropertyVideoTable.total"
              :isBaseTableRadio="false"
              @onBaseTableSelectChange="PropertyVideoTableSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="recorder" label="物品存放人"></el-table-column>
              <el-table-column prop="takePerson" label="物品取出人"></el-table-column>
              <el-table-column prop="fileStarttime" label="存放日期"></el-table-column>
              <el-table-column prop="code" label="播放"></el-table-column>
            </base-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      class="top-form-dialog"
      :visible.sync="isCaseInfoDialog"
      width="80%"
      height="60%"
      title="选择案件信息"
    >
      <el-form
        class="top-form"
        ref="caseInfoTopForm"
        label-width="110px"
        :rules="caseInfoTopFormRules"
        :model="caseInfoTopFormData"
      >
        <div class="top-form-left">
          <el-form-item label="受理时间" prop="shouliriqTime">
            <el-date-picker
              v-model="caseInfoTopFormData.shouliriqTime"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="公安机构编号" prop="gonganid">
            <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.gonganid"></el-input>
          </el-form-item>
        </div>
        <div class="top-form-right">
          <el-form-item label="查案人警号" prop="jinghao">
            <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.jinghao"></el-input>
          </el-form-item>
          <el-form-item label="办案单位编号" prop="orgId">
            <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.orgId"></el-input>
          </el-form-item>
        </div>
        <div class="form-btns-wrap">
          <el-button
            class="form-post-btn"
            plain
            type="primary"
            @click="getTbInoutCaseareaCaseInfoList"
          >查询</el-button>
        </div>
      </el-form>
      <div style="height: 30px;"></div>
      <base-table
        :baseTableData="caseInfoBaseTableData"
        @onBaseTableCurrentChange="caseInfoBaseTableCurrentChange"
        baseTableDataPrimaryKey="anjianbianhao"
        :baseTableHeight="300"
        :isBaseTablePage="false"
      >
        <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="anjianbianhao" label="案件编号" width="210"></el-table-column>
        <el-table-column prop="fId" label="办案中心案件编号" width="210"></el-table-column>
        <el-table-column prop="jiejingbianhao" label="接警编号" width="210"></el-table-column>
        <el-table-column prop="anjianmingcheng" label="案件名称" width="300"></el-table-column>
        <el-table-column prop="jianyaoanqing" label="简要案情" width="437"></el-table-column>
        <el-table-column prop="bananren1jinghao" label="办案民警1" width="100"></el-table-column>
        <el-table-column prop="bananren2jinghao" label="办案民警2" width="100"></el-table-column>
        <el-table-column prop="shouliriqi" label="受理日期" width="150"></el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="chooseCaseInfo">确认</el-button>
        <el-button @click="handleCaseInfoDialog(false)">关闭</el-button>
      </template>
    </el-dialog>
    <!-- 嫌疑人信息 -->
    <el-dialog
      class="top-form-dialog"
      :visible.sync="isPersonInfoDialog"
      width="70%"
      height="60%"
      title="查询嫌疑人条件"
    >
      <el-form
        class="top-form"
        ref="caseInfoTopForm"
        label-width="110px"
        :rules="personInfoTopFormRules"
        :model="personInfoTopFormData"
      >
        <div class="top-form-left">
          <el-form-item label="受理时间" prop="singleTime">
            <el-date-picker
              v-model="personInfoTopFormData.singleTime"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="查案人警号" prop="policeNo">
            <el-input placeholder="请输入" v-model.trim="personInfoTopFormData.policeNo"></el-input>
          </el-form-item>
        </div>
        <div class="top-form-right">
          <el-form-item label="案件编号" prop="caseNo">
            <el-input placeholder="请输入" v-model.trim="personInfoTopFormData.caseNo"></el-input>
          </el-form-item>
        </div>
        <div class="form-btns-wrap">
          <!-- <el-button class="form-post-btn" plain type="primary" @click="getTbPersonInfoList">查询</el-button> -->
          <el-button type="primary" @click="getTbPersonInfoList">确认</el-button>
          <el-button @click="handlePsersonInfoDialog(false)">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>



<script>
import axios from "axios";
import burnTask from "@/apis/Burn/BurnTask.js";
import CaseMainTop from "@/components/CaseMainTop.vue";
import fs from "fs";
import process from "process";

let caseInfoBaseTableCurrent = {}; // 当前选中的案件信息
let burnfiles = {}; //卷宗文件集合
let burnFilesList = [];
let KLFileInfoList = [];
//本地视频集合
let LocalFileList = [];
//轨迹视频集合
let trajectoryVideoFileList = [];
//接处警视频集合
let ContactVideoFileList = [];
//案件视频集合
let CaseVideoFileList = [];
//高清审讯视频集合
let inquestVideoFileList = [];
//签字特写视频集合
let SignatureVideoFileList = [];
//押解视频集合
let escortVideoFileList = [];
//监管视频集合
let superviseVideoFileList = [];
//随身物品视频集合
let ArticlesVideoFileList = [];
//涉案财物视频集合
let PropertyVideoFileList = [];
//刻录信息
let burnData = {};
export default {
  components: {
    CaseMainTop,
    fs,
    process
  },
  data() {
    let checkTopFormOrgId = (rule, value, callback) => {
      if (
        !value &&
        !this.caseInfoTopFormData.gonganid &&
        !value &&
        !this.jiejingTopFormData.gonganid
      ) {
        callback(new Error("请选择办案单位编号或公安机构编号其中一个"));
      } else {
        callback();
      }
    };
    let checkTopFormGonganid = (rule, value, callback) => {
      if (
        !value &&
        !this.caseInfoTopFormData.orgId &&
        !value &&
        !this.jiejingTopFormData.orgId
      ) {
        console.log(456);
        callback(new Error("请选择办案单位编号或公安机构编号其中一个"));
      } else {
        callback();
      }
    };
    let checkTopFormCaseOrPoliceNo = (rule, value, callback) => {
      console.log("rules");
      if (
        !value &&
        !this.personInfoTopFormData.caseNo &&
        !value &&
        !this.personInfoTopFormData.policeNo
      ) {
        callback(new Error("请选择警号或案件编号其中一个！"));
      } else {
        callback();
      }
    };
    return {
      //需要上传的文件
      uploadFiles: [],
      //视频文件信息
      KLFileInfoList: [],
      //ftp信息
      ftpInfo: "",
      //刻录机厂家
      KLJCompany: "",
      burnlocalpath: "",
      //刻录文件分盘 需要文件大小
      FPFileSize: "",
      //刻录机指定地址路径
      copyFilePath: "",
      BurnFilePath: "",
      // 顶部表单数据
      baseTopFormData: {},
      // 嫌疑人表格数据
      baseTableData: {
        total: 0,
        list: []
      },
      isCaseInfoDialog: false,
      isPersonInfoDialog: false,
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据
      burnPurpose: [
        { value: "外出借阅", name: "外出借阅" },
        { value: "刻录备份", name: "刻录备份" }
      ],
      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,

      baseDialogFormData: {
        //name: ""
      },
      //选择嫌疑人列表
      personList: [],
      //案件基础信息
      // 案件信息表单
      caseFormData: {
        inBecause: "",
        ZFCaseId: "",
        CaseId: "",
        jiejingbianhao: "",
        ZFCaseNatureId: "",
        jieChuJingName: "",
        casesName: "",
        caseTypeName: "",
        casesInfo: "",
        police1No: "",
        police1Name: "",
        police2No: "",
        police2Name: ""
      },
      //刻录信息
      burnData: {},
      //初始化显示的tab页名
      activeName: "a3",
      //刻录类型
      burnType: "2",
      //涉案卷宗数据
      involvedTable: {
        total: 0,
        list: []
        //total: 3,
        //list: [
        //  { id: "1", name: "案件-措施(诉讼)卷.pdf", type: "措施(诉讼)卷" },
        //  { id: "2", name: "案件-证据材料卷.pdf", type: "证据材料卷" },
        //  { id: "3", name: "案件-审批(侦查)卷.pdf", type: "审批(侦查)卷" }
        //]
      },
      //本地视频
      localTable: {
        total: 0,
        list: []
      },
      //接处警数据
      acceptanceTable: {
        total: 0,
        list: []
      },
      trajectoryVideoTable: {
        total: 0,
        list: []
      },
      //笔录视频
      notesTable: {
        total: 0,
        list: []
      },
      inquestVideoTable: {
        total: 0,
        list: []
      },
      SignatureVideoTable: {
        total: 0,
        list: []
      },
      //案件视频
      CaseVideoTable: {
        total: 0,
        list: []
      },
      //押解视频
      escortVideoTable: {
        total: 0,
        list: []
      },
      //监管视频
      superviseVideoTable: {
        total: 0,
        list: []
      },
      //随身物品视频
      ArticlesVideoTable: {
        total: 0,
        list: []
      },
      //涉案财物视频
      PropertyVideoTable: {
        total: 0,
        list: []
      },
      //嫌疑人信息弹窗
      personInfoTopFormData: {},
      personInfoTopFormRules: {
        policeNo: [
          {
            validator: checkTopFormCaseOrPoliceNo,
            trigger: "blur"
          }
        ],
        caseNo: [
          {
            validator: checkTopFormCaseOrPoliceNo,
            trigger: "blur"
          }
        ],
        singleTime: [
          {
            required: true,
            trigger: "blur",
            message: "受理时间不能为空"
          }
        ]
      },
      /* 2. 案件信息弹窗 */
      // 选择案件信息弹窗
      caseInfoTopFormData: {},
      caseInfoTopFormRules: {
        gonganid: [
          {
            validator: checkTopFormGonganid,
            trigger: "blur"
          }
        ],
        orgId: [
          {
            validator: checkTopFormOrgId,
            trigger: "blur"
          }
        ],
        shouliriqTime: [
          {
            required: true,
            trigger: "blur",
            message: "受理时间不能为空"
          }
        ]
      },
      personInfoBaseTableData: [],
      caseInfoBaseTableData: [],
      personInfoBaseTableCurrent: [], // 当前选中嫌疑人信息行
      caseInfoBaseTableCurrent: {} // 当前选中案件信息行
    };
  },
  mounted() {
    console.log("mounted");
    //获取刻录复制文件路径
    burnTask
      .getKLPath({
        configName: "BurnPath"
      })
      .then(res => {
        if (res.code == 0) {
          console.log(res.rows);
          this.BurnFilePath = res.rows[0].configNr;
          console.log("BurnFilePath", this.BurnFilePath);
        }
      });
    //获取刻录指定地址路径
    burnTask
      .getKLPath({
        configName: "KLFilePath"
      })
      .then(res => {
        if (res.code == 0) {
          console.log(res.rows);
          this.copyFilePath = res.rows[0].configNr;
          console.log("CopyFilePath", this.copyFilePath);
        }
      });
    //this.CopeFilePath='';
    //获取刻录分盘指定文件大小
    burnTask
      .getKLSize({
        configName: "FPFileSize"
      })
      .then(res => {
        if (res.code == 0) {
          console.log(res.rows);
          this.FPFileSize = res.rows[0].configNr;
          console.log("FPFileSize", this.FPFileSize);
        }
      });
    //获取刻录机厂家
    burnTask
      .getKLSize({
        configName: "KLJCompany"
      })
      .then(res => {
        if (res.code == 0) {
          console.log(res.rows);
          this.KLJCompany = res.rows[0].configNr;
          console.log("KLJCompany", this.KLJCompany);
          if (this.KLJCompany == "HM") {
            //如果是互盟系统获取ftp服务器信息
            burnTask
              .getKLSize({
                configName: "ftpServer"
              })
              .then(res => {
                if (res.code == 0) {
                  console.log(res.rows);
                  this.ftpInfo = JSON.parse(res.rows[0].configNr);
                }
              });
          }
        }
      });
    burnTask
      .getParaConfig({
        configName: "KLJCompany"
      })
      .then(res => {
        if (re.code == 0) {
          console.log(res.data);
          this.burnlocalpath = res.rows[0].configNr;
        }
      });
  },
  created() {
    (this.burnData.BurnUserName = this.$store.state.userInfo.frealname),
      (this.burnData.Date = new Date()),
      (this.burnData.num = 1),
      (this.burnData.casesId = caseFormData.ZFCaseId),
      (this.burnData.casesName = caseFormData.casesName),
      (this.burnData.casesName = this.caseFormData.casesName),
      (this.burnData.policeNO2 = this.caseFormData.police2No),
      (this.burnData.policeNO1 = this.caseFormData.police1No),
      (this.burnData.policeName2 = this.caseFormData.police2Name),
      (this.burnData.policeName1 = this.caseFormData.police1Name),
      (this.burnData.burnType = this.burnType);
  },
  methods: {
    //打开选择框
    openFile() {
      document.getElementById("filename").click();
    },
    //监听选中文件后直接将文件复制到指定文件夹，仅支持IE
    showRealPath($event) {
      if (this.KLJCompany == "HM") {
        if (this.uploadFiles.length <= 0) {
          this.uploadFiles = $event.target.files;
        } else {
          let upFiles = [];
          for (let i = 0; i < $event.target.files.length; i++) {
            upFiles.push($event.target.files[i]);
          }
          //$event.target.files;
          for (let i = 0; i < this.uploadFiles.length; i++) {
            upFiles.push(this.uploadFiles[i]);
          }
          this.uploadFiles = upFiles;
        }
      }
      debugger;
      let files = document.getElementById("filename").files;
      console.log("files1", files);
      let vp = this.$refs.fileValue.value;
      //vp= vp.substring(0, vp.IndexOf(","));
      vp = vp.split(",");
      console.log("vp", vp);
      //let sourcePath = vp.substring(0, vp.lastIndexOf("\\"));
      //console.log("sourcePath", sourcePath);
      let tables = [];

      for (let i = 0; i < files.length; i++) {
        let json = {
          filename: files[i].name,
          filesize: files[i].size,
          filetye: "本地文件",
          sourcepath: vp[i] //sourcePath + "\\" + files[i].name
        };
        tables.push(json);
      }
      if (this.localTable.list != null) {
        for (var i = 0; i < this.localTable.list.length; i++) {
          tables.push(this.localTable.list[i]);
        }
        //tables = this.localTable.list;
      }
      this.localTable.list = tables;
      this.activeName = "a2";
    },
    getCriminal() {
      console.log("getCriminal");

      burnTask
        .getTbInoutCaseareaGetZfqySuspects({
          casecode: this.caseFormData.caseId,
          type: 1
        })
        .then(res => {
          if (res.code == 0) {
            this.baseTableData.list = res.data;
          }
        });
    },
    getCasePerson() {
      burnTask
        .getPeopleInvolved({
          casecode: this.caseFormData.caseId,
          type: "1"
        })
        .then(res => {
          this.suspecttable.list = res.data;
        });
    },
    getJZFiles() {
      console.log("获取组卷");
      burnTask
        .getBurnFileList({
          casecode: this.caseFormData.ZFCaseId,
          type: "111"
        })
        .then(res => {
          (this.involvedTable.list = res.rows),
            (this.involvedTable.total = res.rows);
        })
        .catch(err => {
          this.$message.error(err);
          console.log("获取组卷失败", err);
          // this.$message.error(err);
        });
    },
    getVideoByTypes() {
      let Ypersonids = "";
      if (this.personList.length > 0) {
        for (let i = 0; i < this.personList.length; i++) {
          Ypersonids =
            Ypersonids +
            (Ypersonids == ""
              ? this.personList[i].renyuanbianhao
              : "," + this.personList[i].renyuanbianhao);
        }
      }
      //接处警视频
      console.log("getVideoByType");
      //this.personList=
      debugger;
      burnTask
        .getVideoByType({
          FileType: "0",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("接处警视频:", res);
          (this.acceptanceTable.list = res.rows),
            (this.acceptanceTable.total = res.total);
        });
      //案件视频
      burnTask
        .getVideoByType({
          FileType: "1",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("案件视频:", res);
          (this.CaseVideoTable.list = res.rows),
            (this.CaseVideoTable.total = res.total);
        });
      //轨迹视频
      burnTask
        .getVideoByType({
          FileType: "2",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("轨迹视频:", res);
          (this.trajectoryVideoTable.list = res.rows),
            (this.trajectoryVideoTable.total = res.total);
        });
      //高清审讯视频
      burnTask
        .getVideoByType({
          FileType: "3",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("高清审讯视频:", res);
          (this.inquestVideoTable.list = res.rows),
            (this.inquestVideoTable.total = res.total);
        });
      //签字特写视频
      burnTask
        .getVideoByType({
          FileType: "4",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("签字特写视频:", res);
          (this.SignatureVideoTable.list = res.rows),
            (this.SignatureVideoTable.total = res.total);
        });
      //押解视频
      burnTask
        .getVideoByType({
          FileType: "5",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("押解视频:", res);
          (this.escortVideoTable.list = res.rows),
            (this.escortVideoTable.total = res.total);
        });
      //监管视频
      burnTask
        .getVideoByType({
          FileType: "6",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("监管视频:", res);
          (this.superviseVideoTable.list = res.rows),
            (this.superviseVideoTable.total = res.total);
        });
      //随身物品视频
      burnTask
        .getVideoByType({
          FileType: "8",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("随身物品视频:", res);
          (this.ArticlesVideoTable.list = res.rows),
            (this.ArticlesVideoTable.total = res.total);
        });
      //涉案财物视频
      burnTask
        .getVideoByType({
          FileType: "7",
          YPersonId: Ypersonids,
          CaseId: this.caseFormData.CaseId,
          JCaseId: this.caseFormData.jiejingbianhao,
          ZFCaseId: this.caseFormData.ZFCaseId
        })
        .then(res => {
          console.log("涉案财物视频:", res);
          (this.PropertyVideoTable.list = res.rows),
            (this.PropertyVideoTable.total = res.total);
        });
    },
    involvedFormData() {
      debugger;
      // 时间转换
      var datejson = new Date().toJSON();
      var date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      let cd = date;
      debugger;
      let klFileinfos = [];
      this.KLFileInfoList = [];
      let localFileList = [];
      LocalFileList.forEach(element => {
        localFileList.push(element);
        this.KLFileInfoList.push(element);
      });
      ContactVideoFileList.forEach(element => {
        klFileinfos.push(element);
        KLFileInfoList.push(element);
      });
      trajectoryVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      CaseVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      inquestVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      SignatureVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      escortVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      superviseVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      ArticlesVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      PropertyVideoFileList.forEach(element => {
        klFileinfos.push(element);
        this.KLFileInfoList.push(element);
      });
      let Ypersonids = "";
      let PoliceNames = "";
      let PoliceNos = "";
      let personNames = "";
      if (this.personList.length > 0) {
        debugger;
        for (let i = 0; i < this.personList.length; i++) {
          Ypersonids =
            Ypersonids +
            (Ypersonids == ""
              ? this.personList[i].renyuanbianhao
              : "," + this.personList[i].renyuanbianhao);
          personNames =
            personNames +
            (personNames == ""
              ? this.personList[i].xingming
              : "," + this.personList[i].xingming);
          if (
            this.caseFormData.CaseId == null ||
            this.caseFormData.CaseId == ""
          ) {
            debugger;
            let PoliceCode = this.personList[i].bananren1id.substring(6);
            if (PoliceNos.indexOf(PoliceCode) < 0) {
              PoliceNos =
                PoliceNos + (PoliceNos == "" ? PoliceCode : "," + PoliceCode);
              PoliceNames =
                PoliceNames +
                (PoliceNames == ""
                  ? this.personList[i].bananren1xm
                  : "," + this.personList[i].bananren1xm);
            }
          }
        }
      }
      let CAID = this.caseFormData.ZFCaseId;
      if (
        this.caseFormData.ZFCaseId == null ||
        this.caseFormData.ZFCaseId == ""
      ) {
        CAID = this.caseFormData.CaseId;
      }
      let Purpose = burnData.burnPurpose;
      if (this.burnData.burnPurpose == null || this.burnData.burnPurpose == "")
        Purpose = "刻录备份";
      let klBurnlog = {};
      klBurnlog = {
        caseid: CAID,
        casename: this.caseFormData.casesName,
        personsid: Ypersonids,
        personsname: personNames,
        police1no: this.caseFormData.police1No,
        police2no: this.caseFormData.police2No,
        police1name: this.caseFormData.police1Name,
        police2name: this.caseFormData.police2Name,
        purpose: Purpose,
        burntype: this.burnType,
        conver: "",
        folders: "0",
        createdate: cd
      };

      if (this.caseFormData.CaseId == null || this.caseFormData.CaseId == "") {
        klBurnlog = {
          caseid: CAID,
          casename: this.caseFormData.casesName,
          personsid: Ypersonids,
          personsname: personNames,
          police1no: PoliceNos,
          police2no: "",
          police1name: PoliceNames,
          police2name: "",
          purpose: Purpose,
          burntype: this.burnType,
          conver: "",
          folders: "0",
          createdate: cd
        };
      }
      return {
        klBurnlog,
        klFileinfos,
        burnFilesList,
        againNum: this.burnData.num,
        localFileList: localFileList
      };
    },
    saveBurnInfo() {
      let postData = this.involvedFormData();
      debugger;
      let caseNameOrPersonName = "";
      if (
        this.caseFormData.casesName != null &&
        this.caseFormData.casesName != "" &&
        this.caseFormData.casesName != undefined
      ) {
        caseNameOrPersonName = this.caseFormData.casesName;
      } else if (
        this.caseFormData.casesName == null ||
        this.caseFormData.casesName == "" ||
        this.caseFormData.casesName == undefined
      ) {
        if (this.personList.length > 0) {
          for (let i = 0; i < this.personList.length; i++) {
            caseNameOrPersonName =
              caseNameOrPersonName +
              (caseNameOrPersonName == ""
                ? this.personList[i].xingming
                : "," + this.personList[i].xingming);
          }
        }

        //if(this){}
      } else {
        this.$message({
          showClose: true,
          message: "请选择案件或嫌疑人",
          type: "error"
        });
        return;
      }
      caseNameOrPersonName =
        caseNameOrPersonName + "-" + postData.klBurnlog.createdate;
      caseNameOrPersonName = caseNameOrPersonName.replace(/\s*/g, "");
      caseNameOrPersonName = caseNameOrPersonName.replace(":", "");
      caseNameOrPersonName = caseNameOrPersonName.replace(":", "");
      caseNameOrPersonName = caseNameOrPersonName.replace("-", "");
      debugger;
      console.log("路径：", caseNameOrPersonName);
      console.log("KLFileInfoList", this.KLFileInfoList);
      let cdNum = 0;
      if (this.KLJCompany != "HM") {
        debugger;
        let sizeFile = 0; //记录累计文件大小
        let fileN = [];
        //分盘
        for (var i = 0; i < this.KLFileInfoList.length; i++) {
          if (
            (sizeFile + this.KLFileInfoList[i].filesize) /
              (1024 * 1024 * 1024) >
            this.FPFileSize
          ) {
            cdNum += 1;
            let files = {
              num: i - 1,
              name: "光盘" + String(cdNum),
              type: this.KLFileInfoList[i].filetype
            };
            fileN.push(files);

            sizeFile = 0;

            console.log(
              "==================================================割割========================================="
            );
            sizeFile = sizeFile + this.KLFileInfoList[i].filesize;
            if (i == this.KLFileInfoList.length - 1) {
              cdNum += 1;
              let files = {
                num: i,
                name: "光盘" + String(cdNum),
                type: this.KLFileInfoList[i].filetype
              };
              fileN.push(files);
              sizeFile = 0;
              console.log(
                "==================================================割割========================================="
              );
            }
            continue;
          } else {
            sizeFile = sizeFile + this.KLFileInfoList[i].filesize;
            if (i == this.KLFileInfoList.length - 1) {
              cdNum += 1;
              let files = {
                num: i,
                name: "光盘" + String(cdNum),
                type: this.KLFileInfoList[i].filetype
              };
              fileN.push(files);
              sizeFile = 0;
              console.log(
                "==================================================割割========================================="
              );
            }
          }
        }
        let fileSizemax = 0;
        for (var i = 0; i < fileN.length; i++) {
          for (
            var n = i == 0 ? 0 : fileN[i - 1].num + 1;
            n <= fileN[i].num;
            n++
          ) {
            fileSizemax = fileSizemax + this.KLFileInfoList[n].filesize;
            this.KLFileInfoList[n].filepath =
              this.BurnFilePath +
              "\\" +
              caseNameOrPersonName +
              //"_" +
              //this.GetTimeString() +
              "\\" +
              fileN[i].name;
            debugger;
            this.KLFileInfoList[n].Folders = fileN[i].num;
            this.KLFileInfoList[n].FolderType = fileN[i].type;
          }
        }
      } else {
        for (var i = 0; i < this.KLFileInfoList.length; i++) {
          this.KLFileInfoList[i].filepath =
            this.BurnFilePath + "\\" + caseNameOrPersonName;
        }
      }

      /*klBurnlog: burnData,
          klFileinfos: KLFileInfoList,
          filesList: burnFilesList,
          againNum: this.burnData.num*/
      debugger;
      let CN = cdNum + 1;
      postData.klBurnlog.folders = String(CN);
      postData.klFileinfos = this.KLFileInfoList;
      console.log("postData", postData);
      burnTask
        .saveBurnInfo(postData)
        .then(res => {
          debugger;
          if (res.code == 0) {
            if (this.KLJCompany == "HM") {
              let command = "";

              //创建文件夹
              let fso = new ActiveXObject("Scripting.FileSystemObject");
              if (
                !fso.FolderExists(
                  this.copyFilePath + "\\" + caseNameOrPersonName
                )
              ) {
                console.log(
                  "this.KLFileInfoList.filepath",
                  this.copyFilePath + "\\" + caseNameOrPersonName
                );
                let cf = new ActiveXObject("WScript.Shell");
                cf.run(
                  "cmd.exe /c md " +
                    this.copyFilePath +
                    "\\" +
                    caseNameOrPersonName,
                  0
                );
                cf = null;
              }

              //复制文件
              console.log("this.KLFileInfoList", this.KLFileInfoList.length);
              for (let i = 0; i < this.KLFileInfoList.length; i++) {
                console.log("文件类型：", this.KLFileInfoList[i].filetye);
                if (this.KLFileInfoList[i].filetye == "本地文件") {
                  let copyFile = "";
                  copyFile =
                    "xcopy " +
                    this.KLFileInfoList[i].sourcepath +
                    " " +
                    this.KLFileInfoList[i].filepath +
                    "\\";
                  (" /s /f /h /z");
                  let cmd = new ActiveXObject("WScript.Shell");

                  console.log("copyFile", copyFile);
                  //cmd.run(copyFile);
                  let res = cmd.run(copyFile);
                  console.log("复制结果：", res);
                  cmd = null;
                }
              }
            } else if (this.KLJCompany == "KD") {
              console.log("KD");
              var command = "";
              //创建文件夹
              for (var i = 0; i < this.KLFileInfoList.length; i++) {
                if (this.KLFileInfoList[i].filetye == "本地文件") {
                  let fso = new ActiveXObject("Scripting.FileSystemObject");
                  if (!fso.FolderExists(this.KLFileInfoList[i].filepath)) {
                    console.log(
                      "this.KLFileInfoList[i].filepath",
                      this.KLFileInfoList[i].filepath
                    );
                    let cf = new ActiveXObject("WScript.Shell");
                    cf.run(
                      "cmd.exe /c md " + this.KLFileInfoList[i].filepath,
                      0
                    );
                    cf = null;
                  }
                }
              }
              //复制文件

              for (var i = 0; i < this.KLFileInfoList.length; i++) {
                console.log("复制文件", KLFileInfoList);
                if (this.KLFileInfoList[i].filetye == "本地文件") {
                  let copyFile = "";
                  copyFile =
                    "xcopy " +
                    this.KLFileInfoList[i].sourcepath +
                    " " +
                    this.KLFileInfoList[i].filepath +
                    "\\";
                  (" /s /f /h /z");
                  var cmd = new ActiveXObject("WScript.Shell");
                  console.log("copyFile", copyFile);
                  //cmd.run(copyFile);
                  let res = cmd.run(copyFile);
                  console.log(res);
                  cmd = null;
                }
              }
            }
            this.$message.success("保存成功！");
            this.res;
            this.into();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error("保存失败");
          console.log("保存失败", err);
          // this.$message.error(err);
        });
    },

    into() {
      debugger;
      (this.burnData.BurnUserName = this.$store.state.userInfo.frealname),
        (this.burnData.Date = new Date()),
        (this.burnData.num = 1),
        (this.burnData.casesId = ""),
        (this.burnData.casesName = ""),
        (this.burnData.casesName = ""),
        (this.burnData.policeNO2 = ""),
        (this.burnData.policeNO1 = ""),
        (this.burnData.policeName2 = ""),
        (this.burnData.policeName1 = ""),
        (this.burnData.burnType = this.burnType);
      //嫌疑人
      this.baseTableData = {};
      //本地视频
      this.localTable = {};
      //接处警数据
      this.acceptanceTable = {};
      this.trajectoryVideoTable = {};
      //笔录视频
      this.notesTable = {};
      this.inquestVideoTable = {};
      this.SignatureVideoTable = {};
      //案件视频
      this.CaseVideoTable = {};
      //押解视频
      this.escortVideoTable = {};
      //监管视频
      this.superviseVideoTable = {};
      //随身物品视频
      this.ArticlesVideoTable = {};
      //涉案财物视频
      this.PropertyVideoTable = {};
      this.caseFormData = {};
      //初始化显示的tab页名
      activeName: "a3";
      //刻录类型
      burnType: "2";
    },
    GetTimeString() {
      let year = new Date().getFullYear();
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mm =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      return year + month + date + hh + mm + ss;
    },
    personTableSelectionChange(val) {
      console.log("personTable", val);
      this.personList = val;
      console.log("personList", this.personList);
    },
    //涉案卷宗table多选
    IbaseTableSelectionChange(val) {
      burnFilesList = val;
    },
    //本地table多选
    LbaseTableSelectionChange(val) {
      LocalFileList = val;
    },
    //接处警table多选
    ContactVideoTableSelectionChange(val) {
      ContactVideoFileList = val;
    },
    //轨迹table多选
    trajectoryVideoTableSelectionChange(val) {
      trajectoryVideoFileList = val;
    },
    //案件视频table多选
    CaseVideoTableSelectionChange(val) {
      CaseVideoFileList = val;
    },
    //高清审讯table多选
    inquestVideoTableSelectionChange(val) {
      inquestVideoFileList = val;
    },
    //签字特写table多选
    SignatureVideoTableSelectionChange(val) {
      SignatureVideoFileList = val;
    },
    //押解table多选
    escortVideoTableSelectionChange(val) {
      escortVideoFileList = val;
    },
    //监管table多选
    superviseVideoTableSelectionChange(val) {
      superviseVideoFileList = val;
    },
    //随身物品table多选
    ArticlesVideoTableSelectionChange(val) {
      ArticlesVideoFileList = val;
    },
    //涉案财物table多选
    PropertyVideoTableSelectionChange(val) {
      PropertyVideoFileList = val;
    },
    handleClick(tab, event) {},
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
    },

    baseTableBtnsDelete(bool) {
      if (
        this.baseTableCurrent == null ||
        this.baseTableCurrent.nvrID == null
      ) {
        this.$message({
          showClose: true,
          message: "请选择一条数据",
          type: "error"
        });
        return;
      }
      this.$elConfirm()
        .then(res => {
          var data = this.baseTableCurrent;

          console.log("baseTableBtnsDelete", bool);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      this.isBaseDialog = bool;
    },
    postBaseDialogFormData() {
      // debugger;
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
    baseFakeElementClick() {
      this.caseInfoTopFormData = {};
      this.caseInfoBaseTableData = [];
      this.isCaseInfoDialog = true;
    },
    handleCaseInfoDialog(bool) {
      this.isCaseInfoDialog = bool;
    },
    handlePsersonInfoDialog(bool) {
      this.isPersonInfoDialog = bool;
    },
    /* 2. 案件信息弹窗 */
    getTbInoutCaseareaCaseInfoList() {
      console.log("验证成功");
      let shouliriq_start =
        this.caseInfoTopFormData.shouliriqTime[0] + " 00:00:00";
      let shouliriq_end =
        this.caseInfoTopFormData.shouliriqTime[1] + " 23:59:59";
      burnTask
        .getTbInoutCaseareaCaseInfoList({
          orgId: this.caseInfoTopFormData.orgId,
          shouliriq_start,
          shouliriq_end,
          jinghao: this.caseInfoTopFormData.jinghao,
          gonganid: this.caseInfoTopFormData.gonganid
        })
        .then(res => {
          debugger;
          if (res.code > 0) {
            this.$message.error(res.msg);
            return;
          }
          console.log("请求案件信息数据成功", res);
          if (res.code == 0) {
            this.caseInfoBaseTableData = res.data;
            console.log("caseInfoBaseTableData", this.caseInfoBaseTableData);
          }
        })
        .catch(err => {
          console.log("请求案件信息数据失败", err);
        });
    },
    /* 3、选择嫌疑人弹窗 */
    getTbPersonInfoList() {
      console.log("验证成功:", this.personInfoTopFormData);

      let startdate = this.personInfoTopFormData.singleTime[0] + " 00:00:00";
      let enddate = this.personInfoTopFormData.singleTime[1] + " 23:59:59";
      burnTask
        .getPersonList({
          casecode: this.personInfoTopFormData.caseNo,
          startDate: startdate,
          EndDate: enddate,
          policeCode: this.personInfoTopFormData.policeNo
        })
        .then(res => {
          debugger;
          if (res.code > 0) {
            this.$message.error(res.msg);
            return;
          }
          console.log("请求嫌疑人信息数据成功", res);
          if (res.code == 0) {
            this.baseTableData.list = res.data;
            //this.personInfoBaseTableData = res.data;
            console.log("caseInfoBaseTableData", this.baseTableData.list);
            this.handlePsersonInfoDialog(false);
          }
        })
        .catch(err => {
          console.log("请求嫌疑人信息数据失败", err);
        });
    },
    //选中嫌疑人信息
    personInfoBaseTableCurrentChange(val) {
      console.log("选中的嫌疑人信息", val);
      if (!val) {
        return;
      }
      this.personInfoBaseTableCurrent = val;
    },
    caseInfoBaseTableCurrentChange(row, index) {
      console.log("选中的案件信息", row);
      if (!row) {
        return;
      }
      caseInfoBaseTableCurrent = row;
    },
    choosePersonInfo() {
      this.baseTableData.list = this.personInfoBaseTableCurrent;
      this.handlePsersonInfoDialog(false);
    },
    chooseCaseInfo() {
      console.log("选中的案件信息", caseInfoBaseTableCurrent);
      this.$set(
        this.caseFormData,
        "casesName",
        caseInfoBaseTableCurrent.anjianmingcheng
      ); // 案件名称
      this.$set(
        this.caseFormData,
        "casesInfo",
        caseInfoBaseTableCurrent.jianyaoanqing
      ); // 简要案情
      this.$set(
        this.caseFormData,
        "police1No",
        caseInfoBaseTableCurrent.bananren1jinghao
      ); // 案件名称
      this.$set(
        this.caseFormData,
        "ZFCaseId",
        caseInfoBaseTableCurrent.anjianbianhao
      ); // 案件名称
      this.$set(this.caseFormData, "CaseId", caseInfoBaseTableCurrent.fId); // 案件名称
      this.$set(
        this.caseFormData,
        "police1Name",
        caseInfoBaseTableCurrent.bananren1xingming
      ); // 案件名称
      this.$set(
        this.caseFormData,
        "police2No",
        caseInfoBaseTableCurrent.bananren2jinghao
      ); // 案件名称
      this.$set(
        this.caseFormData,
        "police2Name",
        caseInfoBaseTableCurrent.bananren2xingming
      ); // 案件名称
      this.$set(
        this.caseFormData,
        "jiejingbianhao",
        caseInfoBaseTableCurrent.jiejingbianhao
      ); // 案件名称
      //this.baseTableData.list=[]
      this.handleCaseInfoDialog(false);
      this.getCriminal();
      //this.getVideoByTypes();
    },
    AddCriminalForm() {
      console.log("AddCriminalForm");
      console.log("this.caseFormData.caseId", this.caseFormData.caseId);
      if (
        (this.caseFormData.caseId == null ||
          this.caseFormData.caseId == "" ||
          this.caseFormData.caseId == undefined) &&
        (this.caseFormData.fId == null ||
          this.caseFormData.fId == "" ||
          this.caseFormData.fId == undefined)
      ) {
        this.personInfoTopFormData = {};
        this.personInfoBaseTableData = [];
        this.isPersonInfoDialog = true;
      } else {
        //this.getCriminal();
      }
    },
    changeTimestyle() {}
  }
};
</script>

<style scoped
 lang="scss">
/*新增样式调整*/
.page-wrap {
  width: 100%;
  height: 100%;
  .case-main-top-form {
    height: 52px;
    border-bottom: 1px solid #77a8f4;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-bottom: 8px;
    ::v-deep .el-form {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    /*::v-deep .el-button {*/
    /*width: 40px;*/
    /*height: 15px;*/
    /*padding: 0 !important;*/
    /*font-size: 7px;*/
    /*}*/
  }
  .page-main {
    overflow: hidden;
    ::v-deep .el-input__inner {
      height: 40px;
    }
    .form-item,
    .el-form-item {
      margin-bottom: 10px;
    }
    ::v-deep .el-radio {
      color: #fff !important;
      el-radio_label {
        color: #fff !important;
      }
      .el-radio__input .el-radio__inner:after {
        background: #ace7fd !important;
      }
    }
    ::v-deep .el-select,
    .el-date-editor,
    .el-input-number {
      width: 100% !important;
    }
    ::v-deep .el-date-editor {
      line-height: 40px;
      .el-input__inner {
        padding: 0 30px;
      }
      .el-icon-date {
        font-size: 16px;
        height: 38px;
        line-height: 40px;
      }
    }
    ::v-deep .el-input-number__decrease {
      height: 38px;
      line-height: 38px;
    }
    ::v-deep .el-input-number__increase {
      height: 38px;
      line-height: 38px;
    }
  }
}
/*新增样式调整*/
.info-Burn {
  padding: 30px 20px;
}
.inputCss {
  width: 250px;
}
.content {
  height: 660px;
  /*height: 100%;*/
  float: left;
  padding-right: 20px;
  border-radius: 5px;
}
.case-form {
  display: flex;

  .case-form-left {
    padding-right: 50px;
    width: 50%;
  }

  .case-form-right {
    width: 50%;
  }
}
.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px;

  .form-item-label {
    width: 110px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }

  .form-item-content {
    flex: 1;
  }
}
.max-width-auto {
  ::v-deep .el-form-item__content,
  .form-item-content {
    max-width: none;
  }
}
</style>
<style lang="scss">
.el-tabs__nav {
  .el-tabs__item {
    padding: 17px 26px 15px 26px !important;
    height: auto;
    line-height: initial;
    text-align: center;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(108, 223, 252, 1);
    &.is-active {
      color: white;
    }
  }
  .el-tabs__active-bar {
    width: 0 !important;
  }
}
/* 案件信息弹窗 */
.top-form-dialog {
  .top-form {
    display: flex;
    border: 1px solid #6cdffc;
    padding: 10px 20px;

    .top-form-left {
      padding-right: 30px;
      flex: 3;
    }

    .top-form-right {
      flex: 2;
    }

    .form-btns-wrap {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding-bottom: 22px;
    }
  }
}
</style>

