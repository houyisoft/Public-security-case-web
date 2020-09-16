<template>
  <div class="case-appointment">
    <div class="person-title">
      <base-title title="人员基本信息"></base-title>
      <div class>
        <el-button
          type="primary"
          :disabled="submitDisabled"
          @click="postAppointmentFormData"
          >提交</el-button
        >
        <el-button @click="resetAppointmentForm">清空</el-button>
      </div>
    </div>
    <el-form
      class="person-form flex-box"
      :model="personFormData"
      ref="personForm"
      :rules="personFormDataRules"
      label-width="110px"
      label-position="left"
    >
      <div class="person-form-left">
        <el-form-item label="人员类型" prop="personnelType">
          <el-select
            v-model="personFormData.personnelType"
            placeholder="请选择"
            @change="selectPersonType"
          >
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in typeObjData.personTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="flex-box">
          <el-form-item label="姓名" prop="name">
            <el-select
              placeholder="请选择"
            v-if="formSituation.hasCase && personNames.length"
              v-model="personFormData.name"
              @change="selectPersonName"
            >
              <el-option
                v-for="item in personNames"
                :key="item.renyuanbianhao"
                :label="item.xingming"
                :value="item.renyuanbianhao"
              ></el-option>
            </el-select>
            <el-input v-else v-model="personFormData.name"></el-input>
          </el-form-item>
          <el-form-item prop="noname" label-width="16px">
            <el-checkbox v-model="personFormData.noname">姓名不实</el-checkbox>
          </el-form-item>
        </div>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="personFormData.phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="personFormData.age"></el-input>
        </el-form-item>
        <el-form-item label="笔录类别" prop="biLuType">
          <el-select placeholder="请选择" v-model="personFormData.biLuType">
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in typeObjData.blTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户籍地址" prop="nativeAddress">
          <el-input v-model="personFormData.nativeAddress"></el-input>
        </el-form-item>
      </div>

      <div class="person-form-right">
        <el-form-item label="证件类型" prop="cardType">
          <el-select v-model="personFormData.cardType" placeholder="请选择">
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in typeObjData.cardTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="证件号" prop="cardNumber">
          <el-input v-model="personFormData.cardNumber"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select placeholder="请选择" v-model="personFormData.gender">
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in typeObjData.genderTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文化程度" prop="educationDegree">
          <el-select
            placeholder="请选择"
            v-model="personFormData.educationDegree"
          >
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in typeObjData.educTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthDate">
          <el-date-picker
            v-model="personFormData.birthDate"
            type="date"
            placeholder="选择出生日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="分配询问室">
          <base-fake-element
            baseFakeElementFlag="distributionRoomId"
            baseFakeElementType="select"
            @onBaseFakeElementClick="baseFakeElementClick"
            >{{ personFormData.distributionRoomName }}</base-fake-element
          >
        </el-form-item>
      </div>
    </el-form>

    <base-title title="案件信息"></base-title>
    <el-form
      class="case-form"
      :model="caseFormData"
      ref="caseForm"
      :rules="caseFormDataRules"
      label-width="110px"
      label-position="left"
    >
      <div class="case-form-left">
        <el-form-item label="进入场所原因" prop="inBecause">
          <el-select v-model="caseFormData.inBecause" placeholder="请选择">
            <el-option
              :label="item.fitemname"
              :value="item.fitemvalue"
              v-for="(item, index) in typeObjData.entryReasonTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件性质" prop="ZFCaseNatureId">
          <el-select v-model="caseFormData.ZFCaseNatureId" placeholder="请选择">
            <el-option
              :label="item.fitemname"
              :value="item.fitemdetailid"
              v-for="(item, index) in typeObjData.caseNatureTypes"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件信息">
          <base-fake-element
            baseFakeElementFlag="caseInfo"
            baseFakeElementType="select"
            @onBaseFakeElementClick="baseFakeElementClick"
            >{{ caseFormData.casesInfo }}</base-fake-element
          >
        </el-form-item>
        <el-form-item label="接警处信息">
          <base-fake-element
            baseFakeElementFlag="jiejing"
            baseFakeElementType="select"
            @onBaseFakeElementClick="baseFakeElementClick"
            >{{ caseFormData.jieChuJingName }}</base-fake-element
          >
        </el-form-item>
        <el-form-item label="案件类别(案由)">
          <base-fake-element
            baseFakeElementFlag="caseType"
            baseFakeElementType="select"
            @onBaseFakeElementClick="baseFakeElementClick"
            >{{ caseFormData.caseTypeName }}</base-fake-element
          >
        </el-form-item>
        <el-form-item class="max-width-auto" label="案件名称" prop="casesName">
          <el-input v-model="caseFormData.casesName"></el-input>
        </el-form-item>
      </div>

      <div class="case-form-right">
        <el-form-item label="民警1警号">
          <base-fake-element
            baseFakeElementFlag="police1No"
            baseFakeElementType="select"
            @onBaseFakeElementClick="baseFakeElementClick"
            >{{ caseFormData.police1No }}</base-fake-element
          >
        </el-form-item>
        <el-form-item label="民警1姓名" prop="police1Name">
          <el-input
            v-model="caseFormData.police1Name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="民警2警号">
          <base-fake-element
            baseFakeElementFlag="police2No"
            baseFakeElementType="select"
            @onBaseFakeElementClick="baseFakeElementClick"
            >{{ caseFormData.police2No }}</base-fake-element
          >
        </el-form-item>
        <el-form-item label="民警2姓名" prop="police2Name">
          <el-input
            v-model="caseFormData.police2Name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <!-- 以下为弹窗区域 -->

    <!-- 1. 分配询讯问室弹窗 -->
    <el-dialog
      title="分配询讯问室"
      :close-on-click-modal="false"
      :visible.sync="isDistributeRoomDialog"
    >
      <base-table
        baseTableDataPrimaryKey="funcID"
        :baseTableData="distributeRoomBaseTableData.rows"
        :baseTableDataTotal="distributeRoomBaseTableData.total"
        :baseTablePageCurrent="distributeRoombaseTablePageCurrent"
        :baseTablePageSize="distributeRoomBaseTablePageSize"
        @onBaseTableCurrentChange="distributeRoomBaseTableCurrentChange"
        @onBaseTablePageSizeChange="distributeRoomBaseTablePageSizeChange"
        @onBaseTablePageCurrentChange="distributeRoomBaseTablePageCurrentChange"
      >
        <el-table-column
          prop="index"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column prop="funcName" label="名称"></el-table-column>
        <el-table-column label="功能室类型">
          <template slot-scope="scope">
            <template v-if="scope.row.dataDicID == 1">候问室</template>
            <template v-if="scope.row.dataDicID == 2">询问室</template>
            <template v-if="scope.row.dataDicID == 3">其他</template>
          </template>
        </el-table-column>
        <el-table-column label="设备类型">
          <template slot-scope="scope">
            <template v-if="scope.row.roomType == 1">nvr</template>
            <template v-if="scope.row.roomType == 2">其他</template>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="备注"></el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="chooseDistributeRoom">确认</el-button>
        <el-button @click="handleDistributeRoomDialog(false)">取消</el-button>
      </template>
    </el-dialog>

    <!-- 2. 案件信息弹窗 -->
    <el-dialog
      class="top-form-dialog"
      :close-on-click-modal="false"
      :visible.sync="isCaseInfoDialog"
      width="80%"
      title="选择案件信息"
    >
      <el-form
              class="top-form"
              ref="caseInfoTopForm"
              label-width="140px"
              :rules="caseInfoTopFormRules"
              :model="caseInfoTopFormData"
      >
        <el-row style="width: 100%;" type="flex" align="bottom">
          <el-col :span="20">
            <el-row>
              <el-col :span="16">
                <el-form-item label="受理时间" prop="shouliriqTime" class="time1">
                  <el-date-picker
                          v-model="caseInfoTopFormData.shouliriqTime"
                          type="daterange"
                          unlink-panels
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公安机构编号" prop="gonganid">
                  <el-input
                          placeholder="请输入"
                          v-model.trim="caseInfoTopFormData.gonganid"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                        label="案件编号"
                        prop="casecode"
                        style="margin-bottom: 0!important;"
                >
                  <el-input
                          placeholder="请输入"
                          v-model.trim="caseInfoTopFormData.casecode"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查案人警号" prop="jinghao">
                  <el-input
                          placeholder="请输入"
                          v-model.trim="caseInfoTopFormData.jinghao"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办案单位编号" prop="orgId">
                  <el-input
                          placeholder="请输入"
                          v-model.trim="caseInfoTopFormData.orgId"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                        label="案件名称"
                        prop="anjianmingcheng"
                        style="margin-bottom: 0!important;"
                >
                  <el-input
                          placeholder="请输入"
                          v-model.trim="caseInfoTopFormData.caseName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                                  <el-form-item
                                      label="嫌疑人名称"
                                      prop="orgId"
                                      style="margin-bottom: 0!important;"
                                  >
                                      <el-input
                                          placeholder="请输入"
                                          v-model.trim="caseInfoTopFormData.orgId"
                                      ></el-input>
                                  </el-form-item>
                              </el-col>-->
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-button
                    class="form-post-btn"
                    plain
                    type="primary"
                    style="float:right;"
                    @click="getTbInoutCaseareaCaseInfoList"
            >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div style="height: 30px;"></div>
      <base-table
        :baseTableData="caseInfoBaseTableData"
        @onBaseTableCurrentChange="caseInfoBaseTableCurrentChange"
        @onBaseTablePageCurrentChange="onCaseInfoPageChange"
        @onBaseTablePageSizeChange="onCaseInfoPageSizeChange"
        baseTableDataPrimaryKey="anjianbianhao"
        :baseTableDataTotal="caseInfo.total"
        :baseTablePageCurrent="caseInfo.pageNum"
        :baseTablePageSize="caseInfo.pageSize"
        :max-height="500"
      >
        <el-table-column
          prop="index"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="anjianbianhao"
          label="案件编号"
        ></el-table-column>
        <el-table-column prop="jiejingid" label="接警编号"></el-table-column>
        <el-table-column
          prop="anjianmingcheng"
          label="案件名称"
        ></el-table-column>
        <el-table-column
          prop="jianyaoanqing"
          label="简要案情"
        ></el-table-column>
        <el-table-column
          prop="bananren1jinghao"
          label="办案民警1"
        ></el-table-column>
        <el-table-column
          prop="bananren2jinghao"
          label="办案民警2"
        ></el-table-column>
        <el-table-column prop="shouliriqi" label="受理日期"></el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="chooseCaseInfo">确认</el-button>
        <el-button @click="handleCaseInfoDialog(false)">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 3. 接警处信息弹窗 -->
    <el-dialog
      title="选择接警处信息"
      :close-on-click-modal="false"
      :visible.sync="isJiejingDialog"
      width="80%"
      class="top-form-dialog"
    >
      <el-form
        class="top-form"
        ref="jiejingTopForm"
        :rules="jiejingTopFormRules"
        label-width="110px"
        :model="jiejingTopFormData"
      >
        <div class="top-form-left">
          <el-form-item label="受理时间" prop="shouliriqTime">
            <el-date-picker
              v-model="jiejingTopFormData.shouliriqTime"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="公安机构编号" prop="gonganid">
            <el-input
              placeholder="请输入"
              v-model="jiejingTopFormData.gonganid"
            ></el-input>
          </el-form-item>
        </div>
        <div class="top-form-right">
          <el-form-item label="查案人警号" prop="jinghao">
            <el-input
              placeholder="请输入"
              v-model="jiejingTopFormData.jinghao"
            ></el-input>
          </el-form-item>
          <el-form-item label="办案单位编号" prop="orgId">
            <el-input
              placeholder="请输入"
              v-model="jiejingTopFormData.orgId"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-btns-wrap">
          <el-button
            class="form-post-btn"
            plain
            type="primary"
            @click="getTbInoutCaseareaGetJcjxxs"
            >查询</el-button
          >
        </div>
      </el-form>
      <base-table
        :baseTableData="jiejingBaseTableData"
        @onBaseTableCurrentChange="jiejingBaseTableCurrentChange"
        baseTableDataPrimaryKey="fitemvalue"
        :isBaseTablePage="false"
      >
        <el-table-column
          prop="index"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column prop="bianhao" label="接警编号"></el-table-column>
        <el-table-column
          prop="gonganbianhao"
          label="公安编号"
        ></el-table-column>
        <el-table-column prop="name" label="案件编号"></el-table-column>
        <el-table-column
          prop="jingqingmingcheng"
          label="警情名称"
        ></el-table-column>
        <el-table-column prop="faxiandidian" label="发现地点"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="baoanshijian" label="报案时间"></el-table-column>
        <el-table-column prop="name" label="简要案情"></el-table-column>
        <el-table-column
          prop="jiejingdanweiId"
          label="接警单位编号"
        ></el-table-column>
        <el-table-column
          prop="jiejingdanweimc"
          label="接警单位名称"
        ></el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="chooseJiejing">确认</el-button>
        <el-button @click="handleJiejingDialog(false)">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 4. 案件类别（案由）弹窗 -->
    <el-dialog
      title="选择案件类别（案由）"
      :close-on-click-modal="false"
      :visible.sync="isCaseTypeDialog"
      width="80%"
    >
      <base-top-form
        :baseTopFormData="caseTypeBaseTopFormData"
        baseTableDataPrimaryKey="fitemvalue"
        @onPostBaseTopFormData="getLrBaseDataitemdetailList"
        :baseTableHeight="500"
      >
        <template v-slot:form>
          <el-form-item prop="keywordText" label="关键字">
            <el-input
              v-model="caseTypeBaseTopFormData.keywordText"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </template>
      </base-top-form>

      <base-table
        :baseTableData="caseTypeBaseTableData"
        :isBaseTablePage="false"
        :baseTableHeight="500"
        baseTableDataPrimaryKey="fitemvalue"
        @onBaseTableCurrentChange="caseTypeBaseTableCurrentChange"
      >
        <el-table-column
          prop="index"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column prop="fitemvalue" label="案由编号"></el-table-column>
        <el-table-column prop="fitemname" label="案由信息"></el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="chooseCaseType">确认</el-button>
        <el-button @click="handleCaseTypeDialog(false)">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 5. 民警警号弹窗 -->
    <el-dialog
      class="top-form-dialog"
      :close-on-click-modal="false"
      :visible.sync="isPoliceInfoDialog"
      width="80%"
      title="选择警号"
    >
      <el-form
        class="top-form"
        ref="policeInfoTopForm"
        label-width="110px"
        :model="policeInfoTopFormData"
      >
        <el-form-item label="民警警号" prop="jinghao">
          <el-input v-model="policeInfoTopFormData.jinghao"></el-input>
        </el-form-item>
        <div class="form-btns-wrap">
          <el-button
            class="form-post-btn"
            plain
            type="primary"
            @click="getTbInoutCaseareaGetPersonalsAndRoles"
            >查询</el-button
          >
        </div>
      </el-form>
      <div style="height: 30px;"></div>
      <base-table
        :baseTableData="policeInfoBaseTableData"
        baseTableDataPrimaryKey="jinghao"
        :isBaseTablePage="false"
        @onBaseTableCurrentChange="policeInfoBaseTableCurrentChange"
      >
        <el-table-column
          prop="index"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column prop="jinghao" label="警号"></el-table-column>
        <el-table-column prop="xingming" label="姓名"></el-table-column>
        <el-table-column
          prop="banandanweiid"
          label="单位编号"
        ></el-table-column>
        <el-table-column
          prop="danweimingcheng"
          label="单位名称"
        ></el-table-column>
        <el-table-column
          prop="danweiquancheng"
          label="单位全称"
        ></el-table-column>
        <el-table-column prop="xingming" label="姓名"></el-table-column>
        <el-table-column
          prop="banandanweiid"
          label="单位编号"
        ></el-table-column>
        <el-table-column
          prop="danweimingcheng"
          label="单位名称"
        ></el-table-column>
        <el-table-column
          prop="danweiquancheng"
          label="单位全称"
        ></el-table-column>
      </base-table>
      <template slot="footer">
        <el-button type="primary" @click="choosePoliceInfo">确认</el-button>
        <el-button @click="handlePoliceInfoDialog(false)">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import apiCommon from "@/apis/apiCommon.js";
import apiCaseEntry from "@/apis/apiCase/apiCaseEntry.js";

let currentPersonType = {}; // 当前选中的人员类型
let currentPerson = {}; // 当前选中的涉案人员
let distributeRoomBaseTableCurrent = {}; // 当前选中的侯问室
let caseInfoBaseTableCurrent = {}; // 当前选中的案件信息
let jiejingBaseTableCurrent = {}; // 当前选中的接警处
let caseTypeBaseTableCurrent = {}; // 当前选中的案件类别（案由）
let policeInfo1BaseTableCurrent = {}; // 当前选中的民警1
let policeInfo2BaseTableCurrent = {}; // 当前选中的民警2

export default {
  data() {
    var checkBiLuType = (rule, value, callback) => {
      return new Promise((resolve, reject) => {
        console.log(
          "进入验证",
          this.personFormData.distributionRoomName,
          value
        );
        if (this.personFormData.distributionRoomName && !value) {
          console.log("请选择笔录类别");
          reject();
          callback(new Error("请选择笔录类别"));
        } else {
          resolve();
          callback();
        }
      });
    };
    var checkCardNumber = (rule, value, callback) => {
      const reg = /^\d{17}[0-9|x|X]$/;
      return new Promise((resolve, reject) => {
        if (!reg.test(value) && this.personFormData.cardType == 11) {
          callback(new Error("请输入18位正确的证件号"));
        } else {
          callback();
        }
      });
    };
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
    let _minTime = null;
    let _maxTime = null;
    return {
      submitDisabled: false,
      baseFakeElementStyle: "margin-bottom: 22px;", // 伪表单项样式
      formSituation: {
        // 登记情况
        hasCase: false, // 是否有案件/已录入
        personType: 1, // 人员类型编号 1：嫌疑人 3：受害人 4：证人
      },
      // 人员基本信息表单
      personFormData: {
        // 没有内容信息 添加缺少字段
        personnelType: "", // 人员类型
        name: "", // 姓名
        noname: "", // 姓名不实
        phone: "", // 电话
        age: "", // 年龄
        nativeAddress: "", // 户籍地址
        biLuType: "", // 笔录类别
        cardType: "", // 证件类别
        cardNumber: "", // 证件号码
        gender: "", // 性别
        educationDegree: "", // 文化程度
        birthDate: "", // 出生日期
        distributionRoomName: "", // 分配问询室
        distributionRoomId: "", // 当前选中功能室id
      },
      personFormDataRules: {
        personnelType: [
          {
            required: true,
            message: "人员类型不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            trigger: "blur",
            message: "姓名不能为空",
            required: true,
          },
        ],
        phone: [
          {
            trigger: "blur",
            message: "联系电话不能为空",
            required: true,
          },
          {
            validator: this.$checkMobile,
            trigger: ["blur", "change"],
          },
        ],
        gender: [
          {
            trigger: "blur",
            message: "性别不能为空",
            required: true,
          },
        ],
        educationDegree: [
          {
            trigger: "blur",
            message: "文化程度不能为空",
            required: true,
          },
        ],
        biLuType: [
          {
            validator: checkBiLuType,
            trigger: "blur",
          },
        ],
        cardNumber: [
          {
            validator: checkCardNumber,
            trigger: "blur",
          },
        ],
      },
      personNames: [], // 涉案人员姓名列表

      // 案件信息表单
      caseFormData: {
        inBecause: "",
        ZFCaseNatureId: "",
        jieChuJingName: "",
        casesName: "",
        caseTypeName: "",
        casesInfo: "",
        police1No: "",
        police1Name: "",
        police2No: "",
        police2Name: "",
      },
      caseFormDataRules: {
        inBecause: [
          {
            trigger: "blur",
            message: "进入场所原因不能为空",
            required: true,
          },
        ],
        ZFCaseNatureId: [
          {
            trigger: "blur",
            message: "案件性质不能为空",
            required: true,
          },
        ],
      },

      /* 1. 分配询讯问室弹窗 */
      isDistributeRoomDialog: false,
      distributeRoomBaseTableData: {
        total: 0,
        rows: [],
      },
      distributeRoomBaseTableCurrent: {},
      distributeRoombaseTablePageCurrent: 1,
      distributeRoomBaseTablePageSize: 10,

      /* 2. 案件信息弹窗 */
      isCaseInfoDialog: false, // 选择案件信息弹窗
      caseInfoTopFormData: {
          shouliriqTime: this.getDefaultTime(),
          gonganid: "",
          orgId: "",
          jinghao: "",
          casecode: "",
          caseName: "",
      },
      caseInfoTopFormRules: {
        gonganid: [
          {
            validator: checkTopFormGonganid,
            trigger: "blur",
          },
        ],
        orgId: [
          {
            validator: checkTopFormOrgId,
            trigger: "blur",
          },
        ],
        shouliriqTime: [
          {
            required: true,
            trigger: "blur",
            message: "受理时间不能为空",
          },
        ],
      },
      caseInfoBaseTableData: [],
      caseInfoBaseTableCurrent: {}, // 当前选中案件信息行

      /* 3. 接警处信息弹窗 */
      isJiejingDialog: false,
      jiejingTopFormData: {},
      jiejingTopFormRules: {
        gonganid: [
          {
            validator: checkTopFormGonganid,
            trigger: "blur",
          },
        ],
        orgId: [
          {
            validator: checkTopFormOrgId,
            trigger: "blur",
          },
        ],
        shouliriqTime: [
          {
            required: true,
            trigger: "blur",
            message: "受理时间不能为空",
          },
        ],
      },
      jiejingBaseTableData: [],
      jiejingBaseTableCurrent: {}, // 当前选中的接警处信息

      /* 4. 案件类别（案由）弹窗 */
      isCaseTypeDialog: false,
      caseTypeBaseTopFormData: {
        keywordText: "",
      }, // 关键字查询表格
      caseTypeBaseTableData: [],
      caseTypeBaseTableCurrent: {}, // 当前选中的案件类别

      /* 5. 民警警号弹窗 */
      isPoliceInfoDialog: false,
      currentPolice: 1, // 当前选择的民警 1 民警一 2 民警二
      policeInfoTopFormData: {},
      policeInfoBaseTableData: [],
      policeInfoBaseTableCurrent: {}, // 当前选中民警信息
        caseInfo: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
        },
      pickerOptions: {
          onPick(time) {
              console.log(time);
              if (!time.maxDate) {
                  let timeRange = 90 * 24 * 3600 * 1000;
                  _minTime = time.minDate.getTime() - timeRange; // 最小时间
                  _maxTime = time.minDate.getTime() + timeRange; // 最大时间
              } else {
                  _minTime = _maxTime = null;
              }
          },
          disabledDate(time) {
              let afterToday = Date.now();
              if (_maxTime) {
                  _maxTime = _maxTime <= afterToday ? _maxTime : afterToday;
              } else {
                  return time.getTime() > Date.now();
              }
              if (_minTime && _maxTime) {
                  return time.getTime() < _minTime || time.getTime() > _maxTime;
              }
          },
      },
    };
  },
  watch: {
    isAppointmentDialog(val) {
      if (!val) {
        this.appointmentBaseTableData = {};
      }
    },
    isDistributeRoomDialog(val) {
      if (!val) {
        this.distributeRoombaseTablePageCurrent = 1;
        this.distributeRoomBaseTablePageSize = 10;
        this.distributeRoomBaseTableData = {};
      }
    },
    isCaseInfoDialog(val) {
      if (!val) {
        this.caseInfoTopFormData = {};
        this.caseInfoBaseTableData = [];
      }
    },
    isJiejingDialog(val) {
      if (!val) {
        this.jiejingTopFormData = {};
        this.jiejingBaseTableData = [];
      }
    },
    isCaseTypeDialog(val) {
      if (!val) {
        this.caseTypeBaseTopFormData = {};
        this.caseTypeBaseTableData = [];
      }
    },
    isPoliceInfoDialog(val) {
      if (!val) {
        this.policeInfoTopFormData = {};
        this.policeInfoBaseTableData = [];
      }
    },
  },
  computed: {
    typeObjData() {
      return this.$store.state.typeObjData;
    },
    typeMapData() {
      return this.$store.state.typeMapData;
    },
  },
  methods: {
    // 提交
    postAppointmentFormData() {
      Promise.all([this.$validate("personForm"), this.$validate("caseForm")])
        .then((res) => {
          this.submitDisabled = true;
          console.log("两个表单都验证通过", res);

          let postData = this.involvedFormData();
          console.log("处理提交表单数据完成，准备提交", postData);

          apiCaseEntry
            .postTbInoutCaseareaAddAppointmentSave(postData)
            .then((res) => {
              console.log("预约登记结果res", res);
              if (res.code == 0) {
                this.submitDisabled = true;
                this.$message.success("预约登记成功");
              } else {
                this.$message.error(res.msg || "预约登记失败");
              }
            })
            .catch((err) => {
              console.log("预约登记结果err", err);
            });
        })
        .catch((err) => {
          console.log("有表单验证失败", err);
        });
    },
    // 处理入区登记表单数据
    involvedFormData() {
      console.log("1. 表单人员信息", this.personFormData);
      console.log("2. 表单案件信息", this.caseFormData);
      console.log("当前选中的涉案人员", currentPerson);
      console.log("当前选中的侯问室", distributeRoomBaseTableCurrent);
      console.log("当前选中的案件信息", caseInfoBaseTableCurrent);
      console.log("当前选中的接警处", jiejingBaseTableCurrent);
      console.log("当前选中的案件类别", caseTypeBaseTableCurrent);
      console.log("当前选中的民警", policeInfo1BaseTableCurrent);
      console.log("当前选中的民警", policeInfo2BaseTableCurrent);

      let type; // 1-有案件、有嫌疑人 2-有案件，无嫌疑人 3-无案件，无嫌疑人
      if (this.formSituation.hasCase) {
        type = 1;
      } else {
        type = 3;
      }
      // 案件信息
      let inoutpersonCasearea = {
        personId: 0, // 人员信息主键id
        // fDescription: "接口新增2", // 备注
        personnelType: this.personFormData.personnelType, // 人员类型
        cardType: this.personFormData.cardType, // 证件类型
        name: this.personFormData.name, // 姓名
        cardNumber: this.personFormData.cardNumber, // 证件号
        cardHeadPortrait: "", // 证件照片
        phone: this.personFormData.phone, // 联系电话
        gender: this.personFormData.gender, // 性别
        age: this.personFormData.age, // 年龄
        birthDate: this.personFormData.birthDate, // 出生日期
        nativeAddress: "", // 籍贯地址
        wristbandId: "", // 腕带外键ID - 刷卡返回
        wristbandNo: "", // 腕带编号 - 刷卡返回
        // trailID: "0", // 轨迹ID
        biLuType: this.personFormData.biLuType, // 笔录类别
        distributionRoomId: distributeRoomBaseTableCurrent.funcID, // 候问室Id
        frontPicture: "", // 影像采集返回
        afterPicture: "", // 影像采集返回
        leftPicture: "", // 影像采集返回
        rightPicture: "", // 影像采集返回
        picture: "", // 人脸识别返回
        inBecause: this.caseFormData.inBecause, // 进入场所原因id
        inBecauseName: this.typeObjData.entryReasonTypes.filter(
          (item) => item.fitemvalue == this.caseFormData.inBecause
        )[0].fitemname, // 进入场所原因名称
        centerInfoId: this.$store.state.userInfo.fcompanyid, // 办案中心Id
        personSite: 1, // 人员位置
        police1Id: policeInfo1BaseTableCurrent.id, // 办案民警
        policeName: this.caseFormData.police1Name, // 办案民警
        policeNo: this.caseFormData.police1No, // 办案民警
        police1Type: 1, // 办案民警2类型(数据字典：民警、辅警）
        police2Id: policeInfo2BaseTableCurrent.id, // 办案民警
        police2Name: this.caseFormData.police2Name, // 办案民警
        police2No: this.caseFormData.police2No, // 办案民警
        police2Type: "", // 办案民警2类型(数据字典：民警、辅警）
        // ypeople: "", // 执法办案人员编号Y（场所）
        // rpeople: "", // 执法办案人员编号R（执法办案系统）
        educationDegree: this.personFormData.educationDegree,
        educationDegreeName: this.typeMapData.educTypes[
          this.personFormData.educationDegree
        ]["fitemname"], // 文化程度名称
        type: this.formSituation.personType == 1 ? 1 : 2, // 类型 1-手环 1-卡
        noname: this.personFormData.noname || 0,
      };
      // 人员信息
      let inoutCasearea = {
        id: 0, // 案件信息主键
        // description: "备注", // 备注
        caseId: caseInfoBaseTableCurrent.zFCaseId, // 案件编号
        jieChuJingid: jiejingBaseTableCurrent.id, // 接警ID
        jieChuJingName: jiejingBaseTableCurrent.jiejingdanweimc, // 接警名称
        casesName: caseInfoBaseTableCurrent.anjianmingcheng, // 案件名称
        casesInfo: caseInfoBaseTableCurrent.jianyaoanqing, // 案情信息（简要案情）
        banAnDanWeiID: caseInfoBaseTableCurrent.banandanweiId, // 办案单位ID
        shouLiDate: caseInfoBaseTableCurrent.shouliriqi, // 受理日期
        caseNature: this.typeObjData.caseNatureTypes.filter(
          (item) => item.fitemdetailid == this.caseFormData.ZFCaseNatureId
        )[0]["fitemvalue"], // 案件性质
        centerInfoId: this.$store.state.userInfo.fcompanyid, // 办案中心Id
        caseTypeCode: caseTypeBaseTableCurrent.fitemvalue, // 案件类别（案由）代码
        caseTypeName: this.caseFormData.caseTypeName, // 案件类别（案由）名称
        police1ID: policeInfo1BaseTableCurrent.id, // 主办民警
        police1Name: this.caseFormData.police1Name, // 主办民警
        police1No: this.caseFormData.police1No, // 主办民警
        police2ID: policeInfo2BaseTableCurrent.id, // 主办民警
        police2Name: this.caseFormData.police2Name, // 主办民警
        police2No: this.caseFormData.police2No, // 主办民警
        appointmentId: 0, // 预约ID 没有预约传0， 有预约传fid
        police1CardId: 1, // 办案民警1卡id - 刷卡返回
        police2CardId: 2, // 办案民警2卡id - 刷卡返回
      };

      return {
        inoutpersonCasearea,
        inoutCasearea,
        type,
      };
    },
    // 清空
    resetAppointmentForm() {
      console.log("清空预约登记表单");
      this.$resetFields("personForm");
      this.$resetFields("caseForm");
    },
    // 选中人员类型
    selectPersonType(val) {
      currentPersonType = this.typeMapData.personTypes[val];
      if (currentPersonType["fitemname"].indexOf("已录入") != -1) {
        // 已录入
        console.log(
          "当前选中的人员类型信息-已录入，有案件",
          currentPersonType.fitemname,
          currentPersonType
        );
        // 案件情况：是否有案件（已录入）
        this.$set(this.formSituation, "hasCase", true);
        this.$message({
          message: "请先选择案件信息",
          type: "warning",
          customClass: "zindex-3000",
        });
        this.handleCaseInfoDialog(true);
      } else {
        // 未录入
        console.log(
          "当前选中的人员类型信息-未录入，无案件",
          currentPersonType.fitemname,
          currentPersonType
        );
        // 案件情况：是否有案件（已录入）
        this.$set(this.formSituation, "hasCase", false);
      }
    },
    // 获取人员姓名列表
    getPersonNames() {
      if (!caseInfoBaseTableCurrent.anjianbianhao) {
        this.$message.warning("请先选择案件信息");
        return;
      }
      if (currentPersonType["fitemname"].indexOf("嫌疑人") != -1) {
        this.$set(this.formSituation, "personType", 1);
      } else if (currentPersonType["fitemname"].indexOf("受害人") != -1) {
        this.$set(this.formSituation, "personType", 3);
      } else if (currentPersonType["fitemname"].indexOf("证人") != -1) {
        this.$set(this.formSituation, "personType", 4);
      }
      apiCaseEntry
        .getTbInoutCaseareaGetZfqySuspects({
          casecode: caseInfoBaseTableCurrent.anjianbianhao,
          type: this.formSituation.personType,
        })
        .then((res) => {
          console.log("获取涉案人员列表成功", res);
          if (res.code == 0) {
            this.personNames = res.data;
          }
        });
    },
    // 选择涉案人员姓名
    selectPersonName(val) {
      console.log("选中的人员编号", val);
      currentPerson = this.personNames.filter(
        (item) => item.renyuanbianhao == val
      )[0];
      console.log("选中的人员", currentPerson);
      this.$set(this.personFormData, "name", currentPerson.xingming);
      this.$set(this.personFormData, "phone", currentPerson.lianxidianhua);
      this.$set(
        this.personFormData,
        "nativeAddress",
        currentPerson.zhuzhidizhi
      );
      this.$set(this.personFormData, "cardType", currentPerson.zhengjiandiama);
      this.$set(
        this.personFormData,
        "cardNumber",
        currentPerson.zhengjianhaoma
      );
      this.$set(this.personFormData, "gender", currentPerson.xingbie);
      this.$set(
        this.personFormData,
        "educationDegree",
        currentPerson.wenhuachengdu
      );
    },

    // 打开弹窗
    baseFakeElementClick(flag) {
      console.log("点击伪标签", flag);
      if (flag == "distributionRoomId") {
        // 1. 分配询讯问室
        this.handleDistributeRoomDialog(true);
        this.getTbFunctionroomBaseList(); // 获取功能室列表
      } else if (flag == "caseInfo") {
        // 2. 选择案件信息
        this.isCaseInfoDialog = true;
      } else if (flag == "jiejing") {
        // 3. 选择接警处信息
        this.isJiejingDialog = true;
        // this.getTbInoutCaseareaGetJcjxxs()
      } else if (flag == "caseType") {
        // 4. 选择案件类别（案由）
        // 如果没有选择案件性质，不能选择案件类别（案由）
        if (this.caseFormData.ZFCaseNatureId) {
          this.handleCaseTypeDialog(true);
        } else {
          this.$message.warning("请选择案件性质");
        }
      } else if (flag == "police1No") {
        // 5. 选择警号1
        this.handlePoliceInfoDialog(true);
        this.currentPolice = 1;
      } else if (flag == "police2No") {
        // 5. 选择警号2
        this.handlePoliceInfoDialog(true);
        this.currentPolice = 2;
      }
    },

    /* 1. 分配询讯问室弹窗 */
    getTbFunctionroomBaseList() {
      apiCommon
        .getTbFunctionroomBaseList({
          pageName: this.distributeRoomBaseTablePageCurrent,
          pageSize: this.distributeRoomBaseTablePageSize,
        })
        .then((res) => {
          if (res.code == 0) {
            console.log("分配询讯问室列表", res);
            this.distributeRoomBaseTableData = res;
          }
        });
    },
    distributeRoomBaseTablePageSizeChange(val) {
      this.distributeRoomBaseTablePageSize = val;
      this.distributeRoomBaseTablePageCurrent = 1;
      this.getTbFunctionroomBaseList();
    },
    distributeRoomBaseTablePageCurrentChange(val) {
      this.distributeRoomBaseTablePageCurrent = val;
      this.getTbFunctionroomBaseList();
    },
    distributeRoomBaseTableCurrentChange(row, index) {
      console.log("当前选中功能室行", row);
      if (!row) {
        return;
      }
      distributeRoomBaseTableCurrent = row;
    },
    chooseDistributeRoom() {
      this.$set(
        this.personFormData,
        "distributionRoomName",
        distributeRoomBaseTableCurrent.funcName
      );
      this.handleDistributeRoomDialog(false);
    },
    handleDistributeRoomDialog(bool) {
      this.isDistributeRoomDialog = bool;
    },
      /* 2. 案件信息弹窗 */
      getTbInoutCaseareaCaseInfoList() {
          this.caseInfo.pageNum = 1;
          this.$validate("caseInfoTopForm")
              .then((res) => {
                  this.queryCaseInfoList();
              })
              .catch((err) => {
                  console.log("验证失败", err);
              });
      },
      queryCaseInfoList() {
          let shouliriq_start =
              this.caseInfoTopFormData.shouliriqTime[0] + " 00:00:00";
          let shouliriq_end =
              this.caseInfoTopFormData.shouliriqTime[1] + " 23:59:59";
          apiCaseEntry
              .getTbInoutCaseareaCaseInfoList({
                  orgId: this.caseInfoTopFormData.orgId,
                  shouliriq_start,
                  shouliriq_end,
                  jinghao: this.caseInfoTopFormData.jinghao,
                  gonganid: this.caseInfoTopFormData.gonganid,
                  pageNum: this.caseInfo.pageNum,
                  pageSize: this.caseInfo.pageSize,
              })
              .then((res) => {
                  console.log("请求案件信息数据成功", res);
                  if (res.code == 0) {
                      this.caseInfoBaseTableData = res.rows;
                      this.caseInfo.total = res.total;
                      // if (res.rows.length === this.caseInfo.pageSize) {
                      //   this.caseInfo.pageNum++;
                      // }
                  } else {
                      this.$message.error(res.msg);
                  }
              })
              .catch((err) => {
                  console.log("请求案件信息数据失败", err);
              });
      },
    caseInfoBaseTableCurrentChange(row, index) {
      console.log("选中的案件信息", row);
      if (!row) {
        return;
      }
      caseInfoBaseTableCurrent = row;
      // 如果人员类型已录入，有案件
      if (this.formSituation.hasCase) {
        this.getPersonNames();
      }
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
        "caseTypeName",
        caseInfoBaseTableCurrent.anjianmingcheng
      ); // 案件名称
      this.$set(
        this.caseFormData,
        "police1No",
        caseInfoBaseTableCurrent.bananren1jinghao
      ); // 案件名称
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
        "casesInfo",
        caseInfoBaseTableCurrent.jianyaoanqing
      );
      this.handleCaseInfoDialog(false);
    },
    handleCaseInfoDialog(bool) {
      this.isCaseInfoDialog = bool;
    },

    /* 3. 接警处信息弹窗 */
    getTbInoutCaseareaGetJcjxxs() {
      this.$validate("jiejingTopForm")
        .then((res) => {
          let shouliriq_start =
            this.jiejingTopFormData.shouliriqTime[0] + " 00:00:00";
          let shouliriq_end =
            this.jiejingTopFormData.shouliriqTime[1] + " 23:59:59";
          apiCaseEntry
            .getTbInoutCaseareaGetJcjxxs({
              orgId: this.jiejingTopFormData.orgId,
              shouliriq_start,
              shouliriq_end,
              jinghao: this.jiejingTopFormData.jinghao,
              gonganid: this.jiejingTopFormData.gonganid,
            })
            .then((res) => {
              console.log("请求数据成功", res);
              if (res.code == 0) {
                this.jiejingBaseTableData = res.data;
              }
            })
            .catch((err) => {
              console.log("请求数据失败", err);
            });
        })
        .catch((err) => {
          console.log("验证失败", err);
        });
    },
    jiejingBaseTableCurrentChange(row, index) {
      console.log("选中的接警处", row);
      if (!row) {
        return;
      }
      jiejingBaseTableCurrent = row;
    },
    chooseJiejing() {
      this.$set(
        this.caseFormData,
        "jieChuJingName",
        jiejingBaseTableCurrent.jiejingdanweimc
      );
      this.handleJiejingDialog(false);
    },
    handleJiejingDialog(bool) {
      this.isJiejingDialog = bool;
    },

    /* 4. 案件类别(案由)弹窗*/
    getLrBaseDataitemdetailList() {
      apiCommon
        .getLrBaseDataitemdetailList({
          type: 8,
          caseNatureId: this.caseFormData.ZFCaseNatureId,
        })
        .then((res) => {
          console.log("请求数据成功", res);
          if (res.code == 0) {
            this.caseTypeBaseTableData =
              res.data &&
              res.data.filter(
                (item) =>
                  item.fitemname.indexOf(
                    this.caseTypeBaseTopFormData.keywordText
                  ) != -1
              );
            if (this.caseTypeBaseTableData.length == 0) {
              this.$message.warning("未找到相关数据");
            }
            console.log("案由筛选完成", this.caseTypeBaseTableData);
          }
        });
    },
    caseTypeBaseTableCurrentChange(row, index) {
      console.log("选中的案件类别（案由）", row);
      if (!row) {
        return;
      }
      caseTypeBaseTableCurrent = row;
    },
    chooseCaseType() {
      console.log("选中的案件类别（案由）", caseTypeBaseTableCurrent);
      this.$set(
        this.caseFormData,
        "caseTypeName",
        caseTypeBaseTableCurrent.fitemname
      );
      this.handleCaseTypeDialog(false);
    },
    handleCaseTypeDialog(bool) {
      this.isCaseTypeDialog = bool;
    },

    /* 5. 民警警号弹窗 */
    getTbInoutCaseareaGetPersonalsAndRoles() {
      if (!this.policeInfoTopFormData.jinghao) {
        this.$message.warning("请填写警号");
        return;
      }
      apiCaseEntry
        .getTbInoutCaseareaGetPersonalsAndRoles({
          jinghao: this.policeInfoTopFormData.jinghao,
        })
        .then((res) => {
          console.log("请求数据成功", res);
          if (res.code == 0) {
            this.policeInfoBaseTableData = res.data;
          }
        })
        .catch((err) => {
          console.log("请求数据失败", err);
        });
    },
    policeInfoBaseTableCurrentChange(row, index) {
      console.log("选中的民警信息", row);
      if (!row) {
        return;
      }
      if (this.currentPolice == 1) {
        policeInfo1BaseTableCurrent = row;
      } else if (this.currentPolice == 2) {
        policeInfo2BaseTableCurrent = row;
      }
    },
    // 选中民警信息
    choosePoliceInfo() {
      if (this.currentPolice == 1) {
        console.log("选中民警1", policeInfo1BaseTableCurrent);
        this.$set(
          this.caseFormData,
          "police1No",
          policeInfo1BaseTableCurrent.jinghao
        );
        this.$set(
          this.caseFormData,
          "police1Name",
          policeInfo1BaseTableCurrent.xingming
        );
      } else if (this.currentPolice == 2) {
        console.log("选中民警2", policeInfo2BaseTableCurrent);
        this.$set(
          this.caseFormData,
          "police2No",
          policeInfo2BaseTableCurrent.jinghao
        );
        this.$set(
          this.caseFormData,
          "police2Name",
          policeInfo2BaseTableCurrent.xingming
        );
      }
      this.handlePoliceInfoDialog(false);
    },
    handlePoliceInfoDialog(bool) {
      this.isPoliceInfoDialog = bool;
    },
    getDefaultTime() {
        let date = [];
        let now = new Date();
        let year = now.getFullYear(); //得到当前年份
        let month = now.getMonth() + 1; //默认得到月份是上一个月，如果当前是3月，这个值为2月
        let day = now.getDate();
        let preMonth = month;
        if (month <= 2) {
            //如果当前是1月，则获取到的数据为12月，年份减一
            year = year - 1;
            preMonth = 9 + month;
        } else {
            preMonth = month - 3;
        }

        month = month.toString().padStart(2, "0"); //当小于10时，显示为01.02.03
        day = day.toString().padStart(2, "0");
        preMonth = preMonth.toString().padStart(2, "0");

        let startdate = `${year}-${preMonth}-${day}`;
        let enddate = `${year}-${month}-${day}`;
        console.log(this.startdate);
        date[0] = startdate;
        date[1] = enddate;

        return date;
    },
    onCaseInfoPageChange(pageNum){
        this.caseInfo.pageNum = pageNum;
        this.queryCaseInfoList();
    },
    onCaseInfoPageSizeChange(pageSize) {
        this.caseInfo.pageSize = pageSize;
        this.onCaseInfoPageChange(1);
    }
  },
};
</script>

<style scoped lang="scss">
.case-appointment {
  /* 表单元素样式自定义 */
  ::v-deep .el-form-item {
    .el-form-item__content {
      max-width: 280px;

      .el-select {
        width: 100%;
      }

      .el-date-editor {
        width: 100%;
      }
      .time1 {
          .el-date-editor {
              width: 445px;
          }
      }
    }
  }

  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 22px;

    .form-item-label {
      width: 110px;
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

  .person-title {
    display: flex;
    justify-content: space-between;
  }

  /* 人员信息表单 */
  .person-form {
    .person-form-left {
      padding-right: 50px;
      flex: 1;
    }

    .person-form-right {
      flex: 1;
    }
  }

  /* 案件信息表单 */
  .case-form {
    display: flex;

    .case-form-left {
      padding-right: 50px;
      flex: 1;
    }

    .case-form-right {
      flex: 1;
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
}
</style>
