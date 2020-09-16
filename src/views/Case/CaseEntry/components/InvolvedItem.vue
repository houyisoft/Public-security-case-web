<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="involved-item">
    <!-- 一、涉案人员 - 入区登记表单 -->
    <template v-if="involvedItemType == 1">
      <base-title title="人员基本信息"></base-title>
      <el-form
        :model="personFormData"
        ref="personForm"
        :rules="personFormDataRules"
        label-width="110px"
        label-position="right"
      >
        <!-- 第一行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="人员类型" prop="personnelType">
              <el-select
                :popper-append-to-body="false"
                v-model="personFormData.personnelType"
                placeholder="请选择"
                @change="selectPersonType"
                style="max-width:240px;min-width:140px;"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.personTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="7">
            <el-form-item label="证件类型" prop="cardType">
              <el-select
                :popper-append-to-body="false"
                v-model="personFormData.cardType"
                placeholder="请选择"
                style="max-width:240px;min-width:140px;"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.cardTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"  v-if="personGet">
            <el-button class="form-btn" type="primary" @click="checkPersonCard">人证开启</el-button>
          </el-col>
          <el-col :span="2"  v-if="personGetTS">
            <el-button class="form-btn" type="primary" @click="startFace" >人证开启</el-button>
          </el-col>
          <el-col :span="2" style=" position: absolute;" class="face" >
            <people-card-compare ref="hardware" type="card" @compareSuccess="compareSuccess"/>
          </el-col>
          <el-col :span="4" class="face">
            <base-image :src="personFormData.faceImg" :index="5" imgType="face" :only-view="true"></base-image>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="姓名" prop="name">
              <el-select
                style="max-width:240px;min-width:140px;"
                :popper-append-to-body="false"
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
              <el-input
                style="max-width:240px;min-width:140px;"
                v-else
                v-model="personFormData.name"
              ></el-input>
              <el-checkbox
                style="margin-left: 15px;"
                v-model="personFormData.noname"
                :true-label="1"
                :false-label="0"
                @change="checknoname"
              >姓名不实</el-checkbox>
              <el-button
                class="form-btn"
                type="primary"
                @click="handleAppointmentDialog(true)"
              >调取预约信息</el-button>
            </el-form-item>
            <!-- <el-form-item prop="noname">
                            
            </el-form-item>-->
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="7">
            <el-form-item label="证件号" prop="cardNumber">
              <el-input
                v-model="personFormData.cardNumber"
                style="max-width:240px;min-width:140px;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" v-if="personGet">
            <el-button class="form-btn" type="primary" @click="checkPersonCardHandle">人证获取</el-button>
          </el-col>
          <!-- <el-col :span="3">
                        <el-button class="form-btn" type="primary" @click="readCard">读取身份证</el-button>
          </el-col>-->
        </el-row>
        <!-- 第三行 -->
        <!-- <el-row>
                    <el-col :span="24">
                        <el-form-item prop="noname">
                            <el-checkbox v-model="personFormData.noname">姓名不实</el-checkbox>
                            <el-button
                                class="form-btn"
                                type="primary"
                                @click="handleAppointmentDialog(true)"
                            >调取预约信息</el-button>
                        </el-form-item>
                    </el-col>
        </el-row>-->
        <!-- 第四行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item class="phoneor" label="联系电话" prop="phone">
              <el-input style="max-width:240px;min-width:140px;" v-model="personFormData.phone"></el-input>
              <el-checkbox
                style="width:30%;margin-left:3%"
                v-model="isPhone"
                @change="checkisPhone"
              >无联系电话</el-checkbox>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="9">
            <el-form-item label="性别" prop="gender">
              <el-select
                :popper-append-to-body="false"
                placeholder="请选择"
                v-model="personFormData.gender"
                style="max-width:240px;min-width:140px;"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.genderTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="personFormData.age" style="max-width:240px;min-width:140px;"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="9">
            <el-form-item label="文化程度" prop="educationDegree">
              <el-select
                :popper-append-to-body="false"
                placeholder="请选择"
                v-model="personFormData.educationDegree"
                style="max-width:240px;min-width:140px;"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.educTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 第六航 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="笔录类别" prop="biLuType">
              <el-select
                :popper-append-to-body="false"
                placeholder="请选择"
                v-model="personFormData.biLuType"
                style="max-width:240px;min-width:140px;"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.blTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="9">
            <el-form-item label="手环" prop="wristbandNo">
              <base-fake-element
                baseFakeElementFlag="card"
                baseFakeElementType="card"
                @onBaseFakeElementClick="baseFakeElementClick"
                style="max-width:240px;min-width:140px;"
                v-model="personFormData.wristbandNo"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <!-- 第七行 -->
        <el-row>
          <el-col :span="11">
            <el-form-item label="户籍地址" prop="nativeAddress">
              <el-input
                v-model="personFormData.nativeAddress"
                style="max-width: 440px;min-width: 140px;"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="9">
            <el-form-item label="分配询问室" prop="distributionRoomName">
              <base-fake-element
                baseFakeElementFlag="distributionRoomId"
                baseFakeElementType="select"
                @onBaseFakeElementClick="baseFakeElementClick"
                style="max-width: 240px;min-width: 140px;"
                v-model="personFormData.distributionRoomName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="影像采集" prop="distributionRoomName">
              <el-switch v-model="showKedaVideo"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第八航 -->
        <el-row v-show="showKedaVideo">
          <el-col :span="16">
            <el-form-item label>
              <el-row type="flex" justify="start">
                <el-col :span="6" v-for="(item, index) in photoList" :key="index">
                  <div
                    style="width: 90px;text-align: center;color: rgb(172, 231, 253);"
                  >{{ item.position }}</div>
                  <base-image
                    :src="item.src"
                    :index="index"
                    @onBaseImageDeleteImg="deletePhoto"
                    @onBaseImageAddImg="handleTakePhone"
                    style="width: 90px;"
                  ></base-image>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <koda-video :scale="0.6" ref="kodaVideo" :width="256" :height="144" configName="入区登记" />
          </el-col>
        </el-row>
      </el-form>

      <base-title title="案件信息"></base-title>
      <el-form
        :model="caseFormData"
        ref="caseForm"
        :rules="caseFormDataRules"
        label-width="110px"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="进入场所原因" prop="inBecause">
              <el-select
                :popper-append-to-body="false"
                v-model="caseFormData.inBecause"
                placeholder="请选择"
                style="max-width:240px;min-width:140px;"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.entryReasonTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
          <el-col :span="4" class="el-form--label-top">
            <el-form-item label="民警1警号" prop="police1No" style="position: absolute;z-index: 1;">
              <base-fake-element
                style="width:140px;"
                baseFakeElementFlag="police1No"
                baseFakeElementType="select"
                @onBaseFakeElementClick="baseFakeElementClick"
                v-model="caseFormData.police1No"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <base-image
              class="avatar-img"
              imgType="face"
              :commads="['add', 'delete']"
              @onBaseImageAddImg="checkPliceCardHandle('faceImg1')"
              @onBaseImageDeleteImg="delete1pic()"
              :src="caseFormData.faceImg1"
              style="position: absolute;"
            ></base-image>
          </el-col>
          <el-col :span="4" class="el-form--label-top">
            <el-form-item label="民警2警号" prop="police2No" style="position: absolute;z-index: 1;">
              <base-fake-element
                style="width:140px;"
                baseFakeElementFlag="police2No"
                baseFakeElementType="select"
                @onBaseFakeElementClick="baseFakeElementClick"
                v-model="caseFormData.police2No"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <base-image
              class="avatar-img"
              imgType="face"
              :commads="['add', 'delete']"
              @onBaseImageAddImg="checkPliceCardHandle1('faceImg2')"
              @onBaseImageDeleteImg="delete2pic()"
              :src="caseFormData.faceImg2"
              style="position: absolute;"
            ></base-image>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件性质" prop="ZFCaseNatureId">
              <el-select
                style="max-width:240px;min-width:140px;"
                :popper-append-to-body="false"
                v-model="caseFormData.ZFCaseNatureId"
                placeholder="请选择"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.caseNatureTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件信息" prop="casesName">
              <base-fake-element
                style="max-width:240px;min-width:140px;"
                baseFakeElementFlag="caseInfo"
                baseFakeElementType="select"
                @onBaseFakeElementClick="baseFakeElementClick"
                :title="caseFormData.casesInfo"
                v-model="caseFormData.casesInfo"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="el-form--label-top">
            <el-form-item label="民警1姓名" prop="police1Name" style="position: absolute;">
              <el-input
                v-model="caseFormData.police1Name"
                placeholder="请输入"
                style="width:140px;position: relative;z-index: 1;"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
                        <el-button class="form-btn" type="primary" @click="checkPersonCard">人脸抓拍</el-button>
          </el-col>-->
          <el-col :span="8" class="el-form--label-top">
            <el-form-item label="民警2姓名" prop="police2Name" style="position: absolute;">
              <el-input
                v-model="caseFormData.police2Name"
                placeholder="请输入"
                style="width:140px;position: relative;z-index: 1;"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="4">
                        <el-button class="form-btn" type="primary" @click="checkPersonCard">人脸抓拍</el-button>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接警处信息" prop="jieChuJingName">
              <base-fake-element
                style="max-width:240px;min-width:140px;"
                baseFakeElementFlag="jiejing"
                baseFakeElementType="select"
                @onBaseFakeElementClick="baseFakeElementClick"
                v-model="caseFormData.jieChuJingName"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1"></el-col> -->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件类别(案由)" prop="caseTypeName">
              <base-fake-element
                style="max-width:240px;min-width:140px;"
                baseFakeElementFlag="caseType"
                baseFakeElementType="select"
                @onBaseFakeElementClick="baseFakeElementClick"
                :title="caseFormData.caseTypeName"
                v-model="caseFormData.caseTypeName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="el-form--label-top el-form-card">
            <el-form-item label="轨迹发卡" prop="police1CardId" style="position: absolute;">
              <base-fake-element
                style="width:140px;position: relative;z-index: 1;"
                baseFakeElementFlag="police1CardId"
                baseFakeElementType="card"
                @onBaseFakeElementClick="baseFakeElementClick"
                v-model="caseFormData.police1CardNo"
              />
            </el-form-item>
            <el-checkbox v-model="caseFormData.no1name" @change="selno1">同号</el-checkbox>
          </el-col>
          <el-col :span="8" class="el-form--label-top el-form-card">
            <el-form-item label="轨迹发卡" prop="police2CardId" style="position: absolute;">
              <base-fake-element
                style="width:140px;position: relative;z-index: 1;"
                baseFakeElementFlag="police2CardId"
                baseFakeElementType="card"
                v-model="caseFormData.police2CardNo"
                @onBaseFakeElementClick="baseFakeElementClick"
              />
            </el-form-item>
            <el-checkbox v-model="caseFormData.no2name" @change="selno2">同号</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="案件名称" prop="ZFCaseName">
              <el-input v-model="caseFormData.casesName" style="max-width:240px;min-width:140px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="el-form--label-top el-form-card">
            <el-form-item label="门禁发卡" prop="postCard1Id" style="position: absolute;">
              <base-fake-element
                style="width:140px;position: relative;z-index: 1;"
                baseFakeElementFlag="postCard1Id"
                baseFakeElementType="card"
                @onBaseFakeElementClick="baseFakeElementClick"
                v-model="caseFormData.postCard1No"
              />
            </el-form-item>
            <!--<el-checkbox v-model="caseFormData.noname">同号</el-checkbox>-->
          </el-col>
          <el-col :span="8" class="el-form--label-top el-form-card">
            <el-form-item label="门禁发卡" prop="postCard2Id" style="position: absolute;">
              <base-fake-element
                style="width:140px;position: relative;z-index: 1;"
                baseFakeElementFlag="postCard2Id"
                baseFakeElementType="card"
                @onBaseFakeElementClick="baseFakeElementClick"
                v-model="caseFormData.postCard2No"
              />
            </el-form-item>
            <!--<el-checkbox v-model="caseFormData.noname">同号</el-checkbox>-->
          </el-col>
        </el-row>
      </el-form>

      <!-- 以下为弹窗区域 -->
      <el-dialog
        title="选择预约信息"
        :close-on-click-modal="false"
        width="1000px"
        :visible.sync="isAppointmentDialog"
      >
        <div class="involved-appointment">
          <base-top-form
            :baseTopFormData="screenNameForm"
            @onPostBaseTopFormData="getTbInoutCaseareaGetAppointmentList"
            :baseTableHeight="500"
          >
            <template v-slot:form>
              <!-- <el-form :model="caseTypeBaseTopFormData"> -->
              <el-form-item prop="name" label="姓名">
                <el-input v-model="screenNameForm.name" placeholder="请输入"></el-input>
              </el-form-item>
              <!-- </el-form> -->
            </template>
          </base-top-form>
          <base-table
            :baseTableData="appointmentBaseTableData.rows"
            :baseTableDataTotal="appointmentBaseTableData.total"
            :baseTablePageCurrent="appointmentBaseTablePageCurrent"
            :baseTablePageSize="appointmentBaseTablePageSize"
            @onBaseTableCurrentChange="appointmentBaseTableCurrentChange"
            @onBaseTablePageSizeChange="appointmentBaseTablePageSizeChange"
            @onBaseTablePageCurrentChange="
              appointmentBaseTablePageCurrentChange
            "
          >
            <el-table-column prop="index" label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="Name" label="姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="genderName" label="性别" width="80" align="center"></el-table-column>
            <el-table-column prop="educationDegreeName" label="文化程度" width="100" align="center"></el-table-column>
            <el-table-column prop="inBecauseName" label="进入场所原因" width="120" align="center"></el-table-column>
            <el-table-column prop="ZFCaseName" label="案件名称"></el-table-column>
            <el-table-column prop="ZFCasesInfo" label="简要案情"></el-table-column>
          </base-table>
        </div>

        <template slot="footer">
          <el-button type="primary" @click="chooseAppointment">确认</el-button>
          <el-button type="primary" @click="handleAppointmentDialog(false)">关闭</el-button>
        </template>
      </el-dialog>

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
          @onBaseTablePageCurrentChange="
            distributeRoomBaseTablePageCurrentChange
          "
        >
          <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
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
        @close="closeCaseinfodio"
        width="1200px"
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
                  <el-form-item label="受理时间" prop="shouliriqTime">
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
                    <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.gonganid"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="案件编号" prop="casecode" style="margin-bottom: 0!important;">
                    <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.casecode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="查案人警号" prop="jinghao">
                    <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.jinghao"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="办案单位编号" prop="orgId">
                    <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.orgId"></el-input>
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
                    <el-input placeholder="请输入" v-model.trim="caseInfoTopFormData.caseName"></el-input>
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
              >查询</el-button>
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
            type="index"
            label="序号"
            width="50"
            :index="
              (index) =>
                (this.caseInfo.pageNum - 1) * this.caseInfo.pageSize + index + 1
            "
          ></el-table-column>
          <el-table-column prop="anjianbianhao" label="案件编号"></el-table-column>
          <el-table-column prop="jiejingbianhao" label="接警编号"></el-table-column>
          <el-table-column prop="anjianmingcheng" label="案件名称"></el-table-column>
          <el-table-column prop="jianyaoanqing" label="简要案情"></el-table-column>
          <el-table-column prop="bananren1jinghao" label="办案民警1" width="90"></el-table-column>
          <el-table-column prop="bananren2jinghao" label="办案民警2" width="90"></el-table-column>
          <el-table-column prop="shouliriqi" label="受理日期" width="130"></el-table-column>
        </base-table>
        <template slot="footer">
          <el-button type="primary" @click="chooseCaseInfo">确认</el-button>
          <el-button type="primary" @click="handleCaseInfoDialog(false)">关闭</el-button>
        </template>
      </el-dialog>

      <!-- 3. 接警处信息弹窗 -->
      <el-dialog
        title="选择接警处信息"
        :visible.sync="isJiejingDialog"
        :close-on-click-modal="false"
        width="1200px"
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
              <el-input placeholder="请输入" v-model="jiejingTopFormData.gonganid"></el-input>
            </el-form-item>
          </div>
          <div class="top-form-right">
            <el-form-item label="查案人警号" prop="jinghao">
              <el-input placeholder="请输入" v-model="jiejingTopFormData.jinghao"></el-input>
            </el-form-item>
            <el-form-item label="办案单位编号" prop="orgId">
              <el-input placeholder="请输入" v-model="jiejingTopFormData.orgId"></el-input>
            </el-form-item>
          </div>
          <div class="form-btns-wrap">
            <el-button
              class="form-post-btn"
              plain
              type="primary"
              @click="getTbInoutCaseareaGetJcjxxs"
            >查询</el-button>
          </div>
        </el-form>
        <base-table
          :baseTableData="jiejingBaseTableData"
          @onBaseTableCurrentChange="jiejingBaseTableCurrentChange"
          baseTableDataPrimaryKey="fitemvalue"
          :isBaseTablePage="false"
          :max-height="500"
        >
          <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="bianhao" label="接警编号"></el-table-column>
          <el-table-column prop="gonganbianhao" label="公安编号"></el-table-column>
          <el-table-column prop="name" label="案件编号"></el-table-column>
          <el-table-column prop="jingqingmingcheng" label="警情名称"></el-table-column>
          <el-table-column prop="faxiandidian" label="发现地点"></el-table-column>
          <el-table-column prop="name" label="物品名称"></el-table-column>
          <el-table-column prop="baoanshijian" label="报案时间"></el-table-column>
          <el-table-column prop="name" label="简要案情"></el-table-column>
          <el-table-column prop="jiejingdanweiId" label="接警单位编号"></el-table-column>
          <el-table-column prop="jiejingdanweimc" label="接警单位名称"></el-table-column>
        </base-table>
        <template slot="footer">
          <el-button type="primary" @click="chooseJiejing">确认</el-button>
          <el-button type="primary" @click="handleJiejingDialog(false)">关闭</el-button>
        </template>
      </el-dialog>

      <!-- 4. 案件类别（案由）弹窗 -->
      <el-dialog
        title="选择案件类别（案由）"
        :close-on-click-modal="false"
        :visible.sync="isCaseTypeDialog"
        width="1200px"
      >
        <base-top-form
          :baseTopFormData="caseTypeBaseTopFormData"
          @onPostBaseTopFormData="getLrBaseDataitemdetailList"
          :baseTableHeight="500"
        >
          <template v-slot:form>
            <!-- <el-form :model="caseTypeBaseTopFormData"> -->
            <el-form-item prop="keywordText" label="关键字">
              <el-input v-model="caseTypeBaseTopFormData.keywordText" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- </el-form> -->
          </template>
        </base-top-form>

        <base-table
          :baseTableData="caseTypeBaseTableData"
          :isBaseTablePage="false"
          :max-height="500"
          baseTableDataPrimaryKey="fitemvalue"
          @onBaseTableCurrentChange="caseTypeBaseTableCurrentChange"
        >
          <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
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
        :visible.sync="isPoliceInfoDialog"
        :close-on-click-modal="false"
        width="1200px"
        title="选择警号"
      >
        <el-form
          class="top-form"
          ref="policeInfoTopForm"
          label-width="110px"
          @submit.native.prevent
          :model="policeInfoTopFormData"
        >
          <el-form-item label="民警类型" prop="peopleType">
            <el-select
              clearable
              v-model="policeInfoTopFormData.peopleType"
              placeholder="请选择"
              @change="peopleTypeChange"
            >
              <el-option label="辅警" :value="2"></el-option>
              <el-option label="民警" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="isTrue" label="民警警号" prop="jinghao">
            <el-input v-model="policeInfoTopFormData.jinghao" type="text"></el-input>
          </el-form-item>
          <div class="form-btns-wrap">
            <el-button
              class="form-post-btn"
              plain
              type="primary"
              @click="getTbInoutCaseareaGetPersonalsAndRoles"
            >查询</el-button>
          </div>
        </el-form>
        <div style="height: 30px;"></div>
        <div v-show="indexTab == 2">
          姓名：
          <el-input
            style="width:200px;margin-right:20px"
            v-model="policeInfoTopFormData.demoName"
            type="text"
          ></el-input>警号录入框：
          <el-input style="width:200px;" v-model="policeInfoTopFormData.demoInput" type="text"></el-input>
        </div>
        <base-table
          v-show="indexTab == 1"
          :baseTableData="policeInfoBaseTableData"
          baseTableDataPrimaryKey="jinghao"
          :isBaseTablePage="false"
          :max-height="500"
          @onBaseTableCurrentChange="policeInfoBaseTableCurrentChange"
        >
          <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="jinghao" label="警号"></el-table-column>
          <el-table-column prop="xingming" label="姓名"></el-table-column>
          <el-table-column prop="banandanweiid" label="单位编号"></el-table-column>
          <el-table-column prop="danweimingcheng" label="单位名称"></el-table-column>
          <el-table-column prop="danweiquancheng" label="单位全称"></el-table-column>
        </base-table>
        <template slot="footer">
          <el-button type="primary" @click="choosePoliceInfo">确认</el-button>
          <el-button @click="handlePoliceInfoDialog(false)">关闭</el-button>
        </template>
      </el-dialog>

      <!-- 6. 刷卡 -->
      <el-dialog
        class="scan-dialog"
        width="650px"
        :close-on-click-modal="false"
        :visible.sync="isScanCardDialog"
        title="请选择"
      >
        <input
          type="text"
          ref="refDialogCardNumber"
          id="DialogCardNumber"
          @keyup.enter="changeDialogBandCardNumber('DialogCardNumber')"
          class="dialog-hide-input"
        />
        <div class="scan-dialog-wrap">
          <el-image
            class="dialog-band-img"
            :src="require('@/assets/images/case/caseEntry/cardDialogImg.png')"
          ></el-image>
          <div class="dialog-big-text">请将卡置于机器上方</div>
          <div class="dialog-small-text">读取成功后自动关闭</div>
        </div>
      </el-dialog>

      <!-- 7. 扫描手环 -->
      <el-dialog
        class="scan-dialog"
        width="650px"
        :close-on-click-modal="false"
        :visible.sync="isScanBandDialog"
        title="请选择"
      >
        <input
          type="text"
          ref="refDialogBandNumber"
          id="DialogBandNumber"
          @keyup.enter="changeDialogBandCardNumber('DialogBandNumber')"
          class="dialog-hide-input"
        />
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
    </template>

    <!-- 二、涉案人员 - 入区登记列表信息 -->
    <template v-if="involvedItemType == 2">
      <div class="involved-table">
        <base-top-form
          title="涉案人员入区登记列表信息"
          :baseTopFormData="entryListBaseTopFormData"
          @onPostBaseTopFormData="getTbInoutCaseareaList"
        >
          <template v-slot:form>
            <el-form-item prop="type" label="人员类型">
              <el-select
                :popper-append-to-body="false"
                v-model="entryListBaseTopFormData.personnelType"
                placeholder="请选择"
              >
                <el-option
                  :label="item.fitemname"
                  :value="item.fitemvalue"
                  v-for="(item, index) in typeObjData.personTypes"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name" label="人员姓名">
              <el-input placeholder="请输入" v-model="entryListBaseTopFormData.name"></el-input>
            </el-form-item>
          </template>
        </base-top-form>

        <!-- <div class="table-btns-wrap">
					<div class="table-btn-wrap"
					 @click="handleInvolvedItemType(1)">
						<span>查看详情</span>
						<i class="el-icon-s-order btn-icon"></i>
					</div>
        </div>-->

        <base-table
          baseTableDataPrimaryKey="F_Id"
          :baseTableData="entryListBaseTableData.rows"
          :baseTableDataTotal="entryListBaseTableData.total"
          :baseTablePageCurrent="entryListBaseTablePageCurrent"
          :baseTablePageSize="entryListBaseTablePageSize"
          :isBaseTableRadio="false"
          @onBaseTableCurrentChange="entryListBaseTableCurrentChange"
          @onBaseTablePageSizeChange="entryListBaseTablePageSizeChange"
          @onBaseTablePageCurrentChange="entryListBaseTablePageCurrentChange"
        >
          <el-table-column prop="index" label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="Name" label="人员姓名" align="center" width="120"></el-table-column>
          <el-table-column prop="personnelTypeName" label="人员类型" align="center" width="170"></el-table-column>
          <el-table-column prop="WristbandNo" label="手环编号" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.WristbandNo != 'null'">
                {{
                scope.row.WristbandNo
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="inBecauseName" label="进入场所原因" align="center" width="120"></el-table-column>
          <!-- <el-table-column
            prop="caseNatureName"
            label="案件性质"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column prop="genderName" label="性别"
            align="center"
            width="60"></el-table-column>
          <el-table-column
            prop="educationDegreeName"
            label="文化程度"
            align="center"
            width="100"
          ></el-table-column>-->
          <el-table-column prop="biLuTypeName" label="笔录类别" align="center" width="100"></el-table-column>
          <el-table-column prop="Police1Name" label="民警1警号" align="center" width="100"></el-table-column>
          <el-table-column prop="Police1No" label="民警1姓名" align="center" width="100"></el-table-column>
          <el-table-column prop="Police2Name" label="民警2警号" align="center" width="100"></el-table-column>
          <el-table-column prop="Police2No" label="民警2姓名" align="center" width="100"></el-table-column>
          <el-table-column prop="FuncName" label="分配询讯问室"></el-table-column>
          <!-- <el-table-column
            prop="ZFCaseTypeName"
            label="案件类别(案由)"
          ></el-table-column>-->
        </base-table>
      </div>
    </template>
  </div>
</template>

<script>
import apiCommon from "@/apis/apiCommon.js";
import Apis from "@/apis/apiCase/caseEntry_un.js";
import apiCaseEntry from "@/apis/apiCase/apiCaseEntry.js";
import KodaVideo from "@/components/camera/KodaVideo";
import PeopleCardCompare from "@/views/Case/CaseEntry/components/people_card_compare/index.vue";

let currentPersonType = {}; // 当前选中的人员类型
let currentPerson = {}; // 当前选中的涉案人员
let appointmentBaseTableCurrent = {}; // 预约登记弹窗
let distributeRoomBaseTableCurrent = {}; // 当前选中的侯问室
let caseInfoBaseTableCurrent = {}; // 当前选中的案件信息
let jiejingBaseTableCurrent = {}; // 当前选中的接警处
let caseTypeBaseTableCurrent = {}; // 当前选中的案件类别（案由）
let policeInfo1BaseTableCurrent = {}; // 当前选中的民警1
let policeInfo2BaseTableCurrent = {}; // 当前选中的民警2

export default {
  props: {
    // 1 入区登记 2 查看列表
    involvedItemType: {
      type: Number,
      default: 2,
    },
  },
  components: { KodaVideo,PeopleCardCompare },
  data() {
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
    var checkPlace1No = (rule, value, callback) => {
      if (!value) {
        callback(new Error("民警1警号不能为空"));
      } else {
        callback();
      }
    };
    var checkPlace2No = (rule, value, callback) => {
      if (!value) {
        callback(new Error("民警2警号不能为空"));
      } else {
        callback();
      }
    };
    var checkCasetype = (rule, value, callback) => {
      if (!value) {
        callback(new Error("案件类别不能为空"));
      } else {
        callback();
      }
    };
    var checkBiLuType = (rule, value, callback) => {
      return new Promise((resolve, reject) => {
        if (this.personFormData.distributionRoomName && !value) {
          reject();
          callback(new Error("请选择笔录类别"));
        } else {
          resolve();
          callback();
        }
      });
    };
    var checkBiLuName = (rule, value, callback) => {
      if (!this.personFormData.noname && value == "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    var checkBiLuPhone = (rule, value, callback) => {
      if (!this.isPhone) {
        if (value == "") {
          callback(new Error("联系电话不能为空"));
        } else {
          callback();
        }
      }
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
        callback(new Error("请选择办案单位编号或公安机构编号其中一个"));
      } else {
        callback();
      }
    };
    let _minTime = null;
    let _maxTime = null;
    return {
      isTrue: true,
      arrList: [],
      showKedaVideo: false,
      screenNameForm: {},
      photoList: [
        { position: "前", field: "frontPicture", value: "", src: "" },
        { position: "后", field: "afterPicture", value: "", src: "" },
        { position: "左", field: "leftPicture", value: "", src: "" },
        { position: "右", field: "rightPicture", value: "", src: "" },
      ],
      isPhone: false,
      /* 一、入区登记表单 involvedItemType == 1 */
      baseFakeElementStyle: "margin-bottom: 22px;", // 伪表单项样式
      formSituation: {
        // 登记情况
        hasCase: false, // 是否有案件/已录入
        personType: 1, // 人员类型编号 1：嫌疑人 3：受害人 4：证人
      },
      // 人员基本信息表单
      personFormData: {
        personId: "",
        personnelType: "",
        cardType: "",
        name: "",
        cardNumber: "",
        cardHeadPortrait: "",
        phone: "",
        gender: "",
        age: "",
        nativeAddress: "",
        wristbandNo: "",
        biLuType: "",
        frontPicture: "",
        afterPicture: "",
        leftPicture: "",
        rightPicture: "",
        picture: "",
        inBecause: "",
        inBecauseName: "",
        centerInfoId: "",
        educationDegree: "",
        educationDegreeName: "",
        noname: 0,
      },
      personFormDataRules: {
        personnelType: [
          {
            required: true,
            message: "人员类型不能为空",
            trigger: "change",
          },
        ],
        gender: [
          { required: true, message: "性别不能为空", trigger: "change" },
        ],
        educationDegree: [
          {
            required: true,
            message: "文化程度不能为空",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
          {
            required: true,
            message: "姓名不能为空",
            trigger: "change",
          },
        ],
        age: [
          {
            required: true,
            message: "年龄不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          //  { pattern: /^1\d{10}$/, message: "请输入11位手机号码" },
        ],
        cardNumber: [{ validator: checkCardNumber, trigger: "blur" }],
        biLuType: [
          {
            validator: checkBiLuType,
            trigger: "blur",
          },
        ],
      },
      personNames: [], // 涉案人员姓名列表

      // 案件信息表单
      caseFormData: {
        caseId: "",
        faceImg1: "",
        police1No: "",
        postCard1No: "",
        police1Name: "",
        faceImg2: "",
        police2No: "",
        postCard2No: "",
        police2Name: "",
        caseTypeName: "",
        casesInfo: "",
        inBecause: "",
        ZFCaseNatureId: "",
        casesName: "",
        police1Id: "",
        police1departmentid: "",
        police2departmentid: "",
        people1Type: "",
        people2Type: "",
        police1card: "",
        police2Id: "",
        police2card: "",
        jieChuJingName: "",
        police1CardId: "",
        police2CardId: "",
        police1CardNo:"",
        police2CardNo:"",
        Police2cardno:"",
        Police1cardno:""
      },
      caseFormDataRules: {
        inBecause: [
          {
            required: true,
            message: "进入场原因不能为空",
            trigger: "change",
          },
        ],
        police1No: [
          {
            required: true,
            validator: checkPlace1No,
            trigger: "change",
          },
        ],
        police2No: [
          {
            required: true,
            validator: checkPlace2No,
            trigger: "change",
          },
        ],
        ZFCaseNatureId: [
          {
            required: true,
            message: "案件性质不能为空",
            trigger: "change",
          },
        ],
        police1Name: [
          {
            required: true,
            message: "民警1姓名不能为空",
            trigger: "change",
          },
        ],
        police2Name: [
          {
            required: true,
            message: "民警2姓名不能为空",
            trigger: "change",
          },
        ],
        caseTypeName: [
          {
            required: true,
            message: "案件类别（案由）不能为空",
            validator: checkCasetype,
            trigger: "change",
          },
        ],
      },

      // 预约登记弹窗
      isAppointmentDialog: false,
      appointmentBaseTableData: {}, // 预约登记信息表格
      // appointmentBaseTableCurrent: {},
      appointmentBaseTablePageCurrent: 1,
      appointmentBaseTablePageSize: 10,

      /* 1. 分配询讯问室弹窗 */
      isDistributeRoomDialog: false,
      distributeRoomBaseTableData: {
        total: 0,
        rows: [],
      },
      // distributeRoomBaseTableCurrent: {},
      distributeRoombaseTablePageCurrent: 1,
      distributeRoomBaseTablePageSize: 10,

      /* 2. 案件信息弹窗 */
      isCaseInfoDialog: false, // 选择案件信息弹窗
      indexTab: 1, //显示列表或者input的判断值
      demoName: "",
      demoInput: "",
      caseInfoTopFormData: {
        shouliriqTime: this.getDefaultTime(),
        gonganid: "",
        orgId: "",
        jinghao: "",
        casecode: "",
        caseName: "",
      },
      caseInfoTopFormRules: {
        shouliriqTime: [
          {
            required: true,
            message: "受理时间不能为空",
            trigger: "blur",
          },
        ],
      },
      caseInfoBaseTableData: [],
      caseInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      // caseInfoBaseTableCurrent: {}, // 当前选中案件信息行

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
            message: "受理时间不能为空",
            trigger: "blur",
          },
        ],
      },
      jiejingBaseTableData: [],
      jiejingBaseTableCurrent: {}, // 当前选中的接警处信息

      /* 4. 案件类别（案由）弹窗 */
      isCaseTypeDialog: false,
      caseTypeBaseTopFormData: {
        keywordText: "",
      },
      caseTypeBaseTableData: [],
      // caseTypeBaseTableCurrent: {}, // 当前选中的案件类别

      /* 5. 民警警号弹窗 */
      isPoliceInfoDialog: false,
      currentPolice: 1, // 当前选择的民警 1 民警一 2 民警二
      policeInfoTopFormData: {
        demoInput: "",
        demoName: "",
        peopleType: "",
        jinghao: "",
      },
      policeInfoBaseTableData: [],
      // policeInfoBaseTableCurrent: {}, // 当前选中民警信息

      /* 6. 刷卡/手环弹窗 */
      isScanCardDialog: false, // 刷卡弹窗
      DialogCardNumber: "", // 刷卡窗口隐藏input获取值
      isScanBandDialog: false, // 扫描手环弹窗
      DialogBandNumber: "", // 扫描手环窗口隐藏input获取值
      isScanDialogFlag: "", //记录点击项：1、手环/卡号；2、民警卡1；3、民警卡2

      /* 二、入区登记列表信息 involvedItemType == 2 */
      entryListBaseTopFormData: {},

      // 涉案人员入区登记表格数据
      entryListBaseTableData: {
        total: 0,
        rows: [],
      },
      entryListBaseTableCurrent: {},
      entryListBaseTablePageSize: 10,
      entryListBaseTablePageCurrent: 1,
      pickerOptions: {
        onPick(time) {
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
      personGet:true,
      personGetTS:false
    };
  },
  computed: {
    typeObjData() {
      return this.$store.state.typeObjData;
    },
    typeMapData() {
      return this.$store.state.typeMapData;
    },
  },
  created() {
    this.getTbInoutCaseareaList();
    if (this.involvedItemType == 2) {
      this.getTbInoutCaseareaList();
    }
    this.getTypeList();
    //获取人证核验类型
    apiCommon.getWitnessType({configName:'人证核验类型'}).then(res=>{
       if(res.rows[0].configNr=="2"){
         this.personGet=false;
         this.personGetTS=true;
       }
    })
  },
  methods: {
    //人证对比捷宇
    startFace() {
      this.$refs.hardware.startFace();
    },
    //捷宇返回数据
    compareSuccess(data){
      console.log(data);
      this.personFormData.name=data.name;
      this.personFormData.nativeAddress=data.address;
      this.personFormData.cardNumber =data.id;
      this.personFormData.faceImg="data:image/jpg;base64,"+data.base64_Face;
      var sex= data.sex;
       this.$set(this.personFormData, "gender", sex=="男"?"1":"2");
       //转换日期
       var data=data.birthday;
       var year=data.split('年')[0];
       var month=data.split("年")[1].split('月')[0];
       var day=data.split("年")[1].split('月')[1].replace('日','');
      var dates=year+"-"+month+"-"+day;
      var timestamp2 = Date.parse(new Date(dates)); 
      var nowdate=new Date();
      console.log(nowdate);
      var chass=nowdate-timestamp2;
      console.log(timestamp2);
      console.log(chass);
      var getDate=chass/(1000*60*60*24*365);
      debugger
      console.log(getDate);
      this.personFormData.age=Math.round(getDate);
    },
    peopleTypeChange(val) {
      this.policeInfoTopFormData.demoInput = "";
      this.policeInfoTopFormData.demoName = "";
      if (this.policeInfoTopFormData.peopleType == 2) {
        this.isTrue = false;
        this.indexTab = 2;
      } else {
        this.isTrue = true;
        this.indexTab = 1;
      }
    },
    // 获取民警类型
    getTypeList() {
      Apis.getTypeList({
        type: 11,
      }).then((res) => {
        this.arrList = res.data;
      });
    },
    //选择同号时，轨迹发卡与门禁发卡值相等
    selno1(val) {
      if (val) {
        this.caseFormData.postCard1No = this.caseFormData.police1CardNo;
        this.caseFormData.postCard1Id = this.caseFormData.police1CardId;
      } else {
        this.caseFormData.postCard1No = "";
        this.caseFormData.postCard1Id = "";
      }
    },
    selno2(val) {
      if (val) {
        this.caseFormData.postCard2No = this.caseFormData.police2CardNo;
        this.caseFormData.postCard2Id = this.caseFormData.police2CardId;
      } else {
        this.caseFormData.postCard2No = "";
        this.caseFormData.postCard2Id = "";
      }
    },
    //切换是否显示柯达视频，防止遮挡弹窗
    toggleVideo(flag) {
      const display = flag ? "none" : "flex";
      this.$refs["kodaVideo"].$el.style.display = display;
    },
    // 查看详情(回到入区登记页面，信息回填)
    handleInvolvedItemType(index) {
      this.$emit("onHandleInvolvedItemType", index);
    },
    /* 一、入区登记表单 involvedItemType == 1 */
    /* 0. 入区登记表单操作 */
    // 提交入区登记表单
    postInvolvedFormData() {
      //   if(this.personFormData.phone.length != 11){
      //     this.$message.error('请输入正确的手机格式')
      //     return
      //   }
      return new Promise((resolve, reject) => {
        Promise.all([
          this.$validate("personForm"),
          this.$validate("caseForm"),
        ]).then((res) => {
          let postData = this.involvedFormData();
          debugger
          console.log("involvedFormData", postData);
          debugger
          apiCaseEntry.getTbInoutCaseareaAdd(postData).then((res) => {
            if (res.code == 0) {
              this.$resetFields("personForm");
              resolve(res);
            } else {
              this.$message.error(res.msg || "入区登记失败");
              reject(res);
            }
          });
        });
      });
    },
    // 处理入区登记表单数据
    involvedFormData() {
      let type; // 1-有案件、有嫌疑人 2-有案件，无嫌疑人 3-无案件，无嫌疑人
      if (this.formSituation.hasCase) {
        type = 1;
      } else {
        type = 3;
      }

      // 人员信息
      let inoutpersonCasearea = {
        personId: 0, // 人员信息主键id
        // fDescription: "接口新增2", // 备注
        personnelType: this.personFormData.personnelType, // 人员类型
        cardType: this.personFormData.cardType, // 证件类型
        name: this.personFormData.name, // 姓名
        cardNumber: this.personFormData.cardNumber, // 证件号
        cardHeadPortrait: "", // 证件照片- 人证比对返回
        phone: this.personFormData.phone, // 联系电话
        gender: this.personFormData.gender, // 性别
        age: this.personFormData.age, // 年龄
        birthDate: this.personFormData.birthDate, // 出生日期- 人证比对返回
        nativeAddress: this.personFormData.nativeAddress, // 籍贯地址- 人证比对返回
        wristbandId: this.personFormData.wristbandId, // 腕带外键ID - 刷卡返回
        wristbandNo: this.personFormData.wristbandNo, // 腕带编号 - 刷卡返回
        // trailID: "0", // 轨迹ID
        biLuType: this.personFormData.biLuType, // 笔录类别
        distributionRoomId: distributeRoomBaseTableCurrent.funcID, // 候问室Id
        frontPicture: "", // 影像采集返回
        afterPicture: "", // 影像采集返回
        leftPicture: "", // 影像采集返回
        rightPicture: "", // 影像采集返回
        picture: "", // 人脸识别返回
        inBecause: this.caseFormData.inBecause, // 进入场所原因id
        inBecauseName: (
          this.typeObjData.entryReasonTypes.filter(
            (item) => item.fitemvalue == this.caseFormData.inBecause
          )[0] || {}
        ).fitemname, // 进入场所原因名称
        centerInfoId: this.$store.state.userInfo.fcompanyid, // 办案中心Id
        personSite: 1, // 人员位置
        police1CardId: this.caseFormData.police1CardId,
        police1CardNo: this.caseFormData.police1CardNo,
        police1cardno:this.caseFormData.Police1cardno,
        police2CardId: this.caseFormData.police2CardId,
        police2CardNo: this.caseFormData.police2CardNo,
        police2cardno:this.caseFormData.Police2cardno,
        postCard1Id: this.caseFormData.postCard1Id,
        postCard1No: this.caseFormData.postCard1No,
        postCard2Id: this.caseFormData.postCard2Id,
        postCard2No: this.caseFormData.postCard2No,
        police1Id: this.caseFormData.police1Id, // 办案民警
        policeName: this.caseFormData.police1Name, // 办案民警
        policeNo: this.caseFormData.police1No, // 办案民警
        facePic1: this.caseFormData.faceImg1,
        police1Type: 1, // 办案民警2类型(数据字典：民警、辅警）
        police2Id: this.caseFormData.police2Id, // 办案民警
        police2Name: this.caseFormData.police2Name, // 办案民警
        police2No: this.caseFormData.police2No, // 办案民警
        facePic2: this.caseFormData.faceImg2,
        police2Type: 1, // 办案民警2类型(数据字典：民警、辅警）
        // ypeople: "", // 执法办案人员编号Y（场所）
        rpeople: this.personFormData.rpeople, // 执法办案人员编号R（执法办案系统）
        educationDegree: this.personFormData.educationDegree,
        educationDegreeName: this.personFormData.educationDegree
          ? this.typeMapData.educTypes[this.personFormData.educationDegree][
              "fitemname"
            ]
          : "", // 文化程度名称
        type: this.personFormData.wristbandNo
          ? this.formSituation.personType == 1
            ? 1
            : 2
          : 0, // 类型 1是手环，2是卡，0是无手环也无卡。
        noname: this.personFormData.noname || 0,
      };
      // 案件信息
      let inoutCasearea = {
        id: 0, // 案件信息主键
        // description: "备注", // 备注
        caseId: this.caseFormData.caseId
          ? this.caseFormData.caseId
          : caseInfoBaseTableCurrent.zFCaseId, // 案件编号
        jieChuJingid: jiejingBaseTableCurrent.id, // 接警ID
        jieChuJingName: jiejingBaseTableCurrent.jiejingdanweimc, // 接警名称
        casesName: this.caseFormData.casesName, // 案件名称
        casesInfo: caseInfoBaseTableCurrent.jianyaoanqing, // 案情信息（简要案情）
        banAnDanWeiID: caseInfoBaseTableCurrent.banandanweiId, // 办案单位ID
        shouLiDate: caseInfoBaseTableCurrent.shouliriqi, // 受理日期
        caseNature: this.caseFormData.ZFCaseNatureId, // 案件性质
        centerInfoId: this.$store.state.userInfo.fcompanyid, // 办案中心Id
        caseTypeCode: this.caseFormData.caseTypeCode, // 案件类别（案由）代码
        caseTypeName: this.caseFormData.caseTypeName, // 案件类别（案由）名称
        police1ID: this.caseFormData.police1Id, // 主办民警
        police1Name: this.caseFormData.police1Name, // 主办民警
        police1No: this.caseFormData.police1No, // 主办民警
        people1Type: this.caseFormData.people1Type,
        people2Type: this.caseFormData.people2Type,
        police2ID: this.caseFormData.police2Id, // 主办民警
        police2Name: this.caseFormData.police2Name, // 主办民警
        police2No: this.caseFormData.police2No, // 主办民警
        police1departmentid: this.caseFormData.police1departmentid, // 办案民警
        police2departmentid: this.caseFormData.police2departmentid, // 办案民警
        appointmentId: 0, // 预约ID 没有预约传0， 有预约传fid
        police1CardId: this.caseFormData.police1CardId, // 办案民警1卡id - 刷卡返回
        police1CardNo: this.caseFormData.police1CardNo,
        police2CardId: this.caseFormData.police2CardId, // 办案民警2卡id - 刷卡返回
        police2CardNo: this.caseFormData.police2CardNo,
        postCard1Id: this.caseFormData.postCard1Id,
        postCard1No: this.caseFormData.postCard1No,
        postCard2Id: this.caseFormData.postCard2Id,
        postCard2No: this.caseFormData.postCard2No,
      };

      Object.assign(inoutCasearea, this.getAllImageData());
      return {
        inoutpersonCasearea,
        inoutCasearea,
        type,
      };
    },
    getAllImageData() {
      const result = [];
      for (const item of this.photoList) {
        result[item.field] = item.value;
      }
      return result;
    },
    resetAllImage() {
      for (const item of this.photoList) {
        item.value = "";
        item.src = "";
      }
    },
    resetInvolvedFormData() {
      this.$resetFields("personForm");
      this.$resetFields("caseForm");
      this.caseFormData.caseId = "";
      caseInfoBaseTableCurrent.zFCaseId = "";
      this.resetAllImage();
    },
    // 选中人员类型
    selectPersonType(val) {
      currentPersonType = this.typeMapData.personTypes[val];
      if (currentPersonType["fitemname"].indexOf("已录入") != -1) {
        // 已录入
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
          if (res.code == 0) {
            this.personNames = res.data;
          }
        });
    },
    // 选择涉案人员姓名
    selectPersonName(val) {
      currentPerson =
        this.personNames.filter((item) => item.renyuanbianhao == val)[0] || {};
      this.$set(this.personFormData, "name", currentPerson.xingming);
      this.$set(this.personFormData, "phone", currentPerson.lianxidianhua);
      this.$set(this.personFormData, "rpeople", currentPerson.renyuanbianhao);
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
    // 点击姓名不实
    checknoname() {
      if (this.personFormData.noname) {
        this.personFormData.name = "姓名不实";
        this.personFormDataRules.educationDegree = { required: false };
        this.personFormDataRules.gender = { required: false };
        this.personFormDataRules.age = { required: false };
        this.personFormDataRules.phone = { required: false };
      } else if (this.personFormData.name == "姓名不实") {
        this.personFormData.name = "";
        this.personFormDataRules.educationDegree = {
          required: true,
          message: "文化程度不能为空",
          trigger: "change",
        };
        this.personFormDataRules.gender = {
          required: true,
          message: "性别不能为空",
          trigger: "change",
        };
        this.personFormDataRules.age = {
          required: true,
          message: "年龄不能为空",
          trigger: "change",
        };
        this.personFormDataRules.phone = {
          required: true,
          message: "请输入手机号码",
          trigger: "change",
        };
      }
    },
    // 点击无联系电话
    checkisPhone() {
      if (this.isPhone) {
        this.personFormData.phone = "无";
      } else {
        this.personFormData.phone = "";
      }
    },
    // 预约登记信息
    getTbInoutCaseareaGetAppointmentList() {
      let data = {
        pageNum: this.appointmentBaseTablePageCurrent,
        pageSize: this.appointmentBaseTablePageSize,
        personnelType: this.personFormData.personnelType,
        name: this.screenNameForm.name,
      };
      apiCaseEntry
        .getTbInoutCaseareaGetAppointmentList(data)
        .then((res) => {
          if (res.code == 0) {
            this.appointmentBaseTableData = res;
          }
        })
        .catch((err) => {});
    },
    // 调取预约信息（打开弹窗）
    handleAppointmentDialog(bool) {
      if (!this.personFormData.personnelType) {
        this.$message.warning("请选择人员类型");
        return;
      }
      // if (!this.personFormData.name) {
      //   this.$message.warning("请输入人员姓名");
      //   return;
      // }
      this.getTbInoutCaseareaGetAppointmentList();
      this.isAppointmentDialog = bool;
    },
    appointmentBaseTablePageCurrentChange(val) {
      this.appointmentBaseTablePageCurrent = val;
      this.getTbInoutCaseareaGetAppointmentList();
    },
    appointmentBaseTablePageSizeChange(val) {
      this.appointmentBaseTablePageCurrent = 1;
      this.appointmentBaseTablePageSize = val;
      this.getTbInoutCaseareaGetAppointmentList();
    },
    appointmentBaseTableCurrentChange(row, index) {
      if (!row) {
        return;
      }
      appointmentBaseTableCurrent = row;
    },
    // 选中预约信息
    chooseAppointment() {
      // 1. 人员基本信息
      this.$set(
        this.personFormData,
        "personnelType",
        appointmentBaseTableCurrent.PersonnelType
      ); // 人员类型
      this.$set(this.personFormData, "name", appointmentBaseTableCurrent.Name); // 姓名
      this.$set(
        this.personFormData,
        "phone",
        appointmentBaseTableCurrent.Phone
      ); // 联系电话
      this.$set(this.personFormData, "age", appointmentBaseTableCurrent.Age); // 年龄
      // 无地址
      this.$set(
        this.personFormData,
        "biLuType",
        appointmentBaseTableCurrent.BiLuType
      ); // 笔录类别
      this.$set(
        this.personFormData,
        "cardType",
        appointmentBaseTableCurrent.CardType
      ); // 证件类型
      this.$set(
        this.personFormData,
        "cardNumber",
        appointmentBaseTableCurrent.CardNumber
      ); // 证件号
      this.$set(
        this.personFormData,
        "gender",
        appointmentBaseTableCurrent.Gender
      ); // 性别
      this.$set(
        this.personFormData,
        "educationDegree",
        appointmentBaseTableCurrent.EducationDegree
      ); // 文化程度
      // 手环/卡号
      // 分配询讯问室
      // 2. 案件信息
      const {
        CasesName,
        ZFCaseNature: ZFCaseNatureId,
        ZFCaseTypeCode: caseTypeCode,
        ZFCaseTypeName: caseTypeName,
        InBecause: inBecause,
        Police1ID: police1Id,
        Police1Name: police1Name,
        Police1No: police1No,
        Police2ID: police2Id,
        Police2Name: police2Name,
        Police2No: police2No,
        ZFCaseName: casesName,
        ZFCaseId: zFCaseId,
        ZFJieChuJingName: jieChuJingName,
      } = appointmentBaseTableCurrent;
      Object.assign(this.caseFormData, {
        CasesName,
        ZFCaseNatureId,
        caseTypeCode,
        caseTypeName,
        inBecause,
        police1Id,
        police1Name,
        police1No,
        police2Id,
        police2Name,
        police2No,
        casesName,
        zFCaseId,
        jieChuJingName,
      });
      // 未使用到的返回字段
      let data = {
        // 接警处信息
        ZFJieChuJingid: "1",
        ZFJieChuJingName: "处警1", // caseFormData.jieChuJingName
        // 案件类别
        ZFCaseTypeCode: "1",
        ZFCaseTypeName: "1",
        ZFCasesInfo: "案件详情1.。。",
        // 案件信息
        ZFCaseName: "案件1", // caseFormData.casesName
        ZFCaseId: "1", // this.caseFormData.zFCaseId
        F_Id: "1",
        ZFBanAnDanWeiID: "1",
        personId: "1",
        ZFShouLiDate: "2020-05-15",
      };
      this.handleAppointmentDialog(false);
    },

    // 人证比对
    checkPersonCard() {
      this.$message.success("人证开启成功！");
      apiCaseEntry
        .faceCheck({
          uuid: "00-14-10-22-CB-75",
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("调取成功");
          } else {
            this.$message.error("调取失败");
          }
        });
    },
    // 人证比对回调
    checkPersonCardHandle() {
      // 认证对比回掉
      apiCaseEntry
        .getFaceCheckResult({
          uuid: "00-14-10-22-CB-75",
        })
        .then((res) => {
          if (res.code == 0) {
            if (res.data != null) {
              this.$set(this.personFormData, "cardNumber", res.data.idcard); // 证件号
              this.$set(this.personFormData, "name", res.data.name); // 姓名
              this.$set(
                this.personFormData,
                "birthDate",
                res.data.idcard.substring(6, 10) +
                  "-" +
                  res.data.idcard.substring(10, 12) +
                  "-" +
                  res.data.idcard.substring(12, 14)
              ); // 出生日期
              this.getage(
                res.data.idcard.substring(6, 10) +
                  "-" +
                  res.data.idcard.substring(10, 12) +
                  "-" +
                  res.data.idcard.substring(12, 14)
              ); //获取年龄
              if (res.data.sex == "0") {
                this.$set(this.personFormData, "gender", "1"); // 性别男
              }
              if (res.data.sex == "1") {
                this.$set(this.personFormData, "gender", "2"); // 性别女
              }
              this.$set(this.personFormData, "cardType", "111"); // 证件类型 默认使用身份证
              this.$set(this.personFormData, "nativeAddress", res.data.address); // 户籍地址
              this.$set(
                this.personFormData,
                "faceImg",
                "data:image/png;base64," + res.data.idCardFacePic
              ); // 人脸
            }
            this.$message.success("调取成功");
          } else {
            this.$message.error("调取失败");
          }
        });
    },
    // 人证比对回调
    dataURLtoFile(text, fileName) {
      //将base64转换为文件
      var arr = text.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var theBlob = new Blob([u8arr], {
        type: mime,
      });
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    // 获取警察头像
    checkPliceCardHandle() {
      apiCaseEntry
        .getFaceCheckResult({
          uuid: "00-14-10-22-CB-75",
        })
        .then((res) => {
          if (res.code == 0) {
            if (res.data != null) {
              const fileName = Date.now() + ".png";
              const base64 = "data:image/png;base64," + res.data.idCardFacePic;
              const file = this.dataURLtoFile(base64, fileName);
              const formData = new FormData();
              formData.append("files", file, fileName);
              console.log("res.data", res.data);
              console.log("file", file);
              apiCommon.uploadImg(formData).then((res) => {
                if (res.code == 0) {
                  console.log("faceImg", res);
                  //this.caseFormData.faceImg1=base64;
                 
                  this.caseFormData.faceImg1 = res.data[0];
                } else {
                  this.$message.error("图片上传失败！");
                }
              });
              // this.personFormData[field] =
            }
            this.$message.success("调取成功");
          } else {
            this.$message.error("调取失败");
          }
        });
    },
    delete1pic(){
       this.caseFormData.faceImg1="";
    },
    delete2pic(){
       this.caseFormData.faceImg2="";
    },
     checkPliceCardHandle1() {
      apiCaseEntry
        .getFaceCheckResult({
          uuid: "00-14-10-22-CB-75",
        })
        .then((res) => {
          if (res.code == 0) {
            if (res.data != null) {
              const fileName = Date.now() + ".png";
              const base64 = "data:image/png;base64," + res.data.idCardFacePic;
              const file = this.dataURLtoFile(base64, fileName);
              const formData = new FormData();
              formData.append("files", file, fileName);
              console.log("res.data", res.data);
              console.log("file", file);
              apiCommon.uploadImg(formData).then((res) => {
                if (res.code == 0) {
                  console.log("faceImg", res);
                  //this.caseFormData.faceImg2=base64;
                 
                  this.caseFormData.faceImg2 = res.data[0];
                } else {
                  this.$message.error("图片上传失败！");
                }
              });
              // this.personFormData[field] =
            }
            this.$message.success("调取成功");
          } else {
            this.$message.error("调取失败");
          }
        });
    },
    //根据出生日期获取年龄
    getage(birthDate) {
      var birthdays = new Date(birthDate.replace(/-/g, "/"));
      var d = new Date();
      var age =
        d.getFullYear() -
        birthdays.getFullYear() -
        (d.getMonth() < birthdays.getMonth() ||
        (d.getMonth() == birthdays.getMonth() &&
          d.getDate() < birthdays.getDate())
          ? 1
          : 0);
      this.$set(this.personFormData, "age", age);
    },
    // 读取身份证
    readCard() {},
    handleTakePhone(index) {
      const item = this.photoList[index];
      this.$refs["kodaVideo"].takeAndUploadPhoto(item).then((res) => {
        // this.photoList[index].value = res;
      });
    },
    deletePhoto(index) {
      this.photoList[index].value = "";
      this.photoList[index].src = "";
    },

    // 打开弹窗
    baseFakeElementClick(flag) {
      if (flag == "card") {
        // 扫描手环/卡
        this.isScanBandDialog = true;
        this.$nextTick(() => {
          //自动获取焦点 element组件autofocus失效
          this.isScanDialogFlag = flag;
          this.DialogBandNumber = "";
          this.$refs.refDialogBandNumber.focus();
        });
      } else if (flag == "distributionRoomId") {
        // 1. 分配询讯问室
        this.isDistributeRoomDialog = true;
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
          this.isCaseTypeDialog = true;
        } else {
          this.$message.warning("请选择案件性质");
        }
      } else if (flag == "police1No") {
        // 5. 选择警号1
        this.isPoliceInfoDialog = true;
        // this.policeInfoTopFormData.demoName = ''
        // this.policeInfoTopFormData.demoInput = ''
        this.currentPolice = 1;
      } else if (flag == "police2No") {
        // 5. 选择警号2
        this.isPoliceInfoDialog = true;
        // this.policeInfoTopFormData.demoName = ''
        // this.policeInfoTopFormData.demoInput = ''
        this.currentPolice = 2;
      } else if (flag == "police1CardId") {
        // 6. 民警发卡
        this.isScanCardDialog = true;
        this.$nextTick(() => {
          //自动获取焦点 element组件autofocus失效
          this.isScanDialogFlag = flag;
          this.DialogCardNumber = "";
          this.$refs.refDialogCardNumber.focus();
        });
      } else if (flag == "police2CardId") {
        // 6. 民警发卡
        this.isScanCardDialog = true;
        this.$nextTick(() => {
          //自动获取焦点 element组件autofocus失效
          this.isScanDialogFlag = flag;
          this.DialogCardNumber = "";
          this.$refs.refDialogCardNumber.focus();
        });
      } else if (flag == "postCard1Id") {
        // 7. 门禁发卡
        this.isScanCardDialog = true;
        this.$nextTick(() => {
          //自动获取焦点 element组件autofocus失效
          this.isScanDialogFlag = flag;
          this.DialogCardNumber = "";
          this.$refs.refDialogCardNumber.focus();
        });
      } else if (flag == "postCard2Id") {
        // 7. 门禁发卡
        this.isScanCardDialog = true;
        this.$nextTick(() => {
          //自动获取焦点 element组件autofocus失效
          this.isScanDialogFlag = flag;
          this.DialogCardNumber = "";
          this.$refs.refDialogCardNumber.focus();
        });
      }
    },

    /* 1. 分配询讯问室弹窗 */
    getTbFunctionroomBaseList() {
      apiCommon
        .getTbFunctionroomrqBaseList({
          centerID: this.$store.state.userInfo.fcompanyid,
          pageName: this.distributeRoomBaseTablePageCurrent,
          pageSize: this.distributeRoomBaseTablePageSize,
        })
        .then((res) => {
          console.log("functionroom", res);
          if (res.code == 0) {
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
      if (!row) {
        return;
      }
      distributeRoomBaseTableCurrent = row;
    },
    chooseDistributeRoom() {
      let obj = {
        inoutCasearea: {
          caseId: this.caseFormData.caseId
            ? this.caseFormData.caseId
            : caseInfoBaseTableCurrent.zFCaseId,
        },
        inoutpersonCasearea: {
          distributionRoomId: distributeRoomBaseTableCurrent.funcID,
          gender: this.personFormData.gender,
        },
      };
      apiCaseEntry.isCheckSex(obj).then((res) => {
        if (res.code == 0) {
          this.$set(
            this.personFormData,
            "distributionRoomName",
            distributeRoomBaseTableCurrent.funcName
          );
          this.handleDistributeRoomDialog(false);
        } else {
          this.$message.error(res.msg);
        }
      });
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
        .catch((err) => {});
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
      this.caseFormData.casesName = caseInfoBaseTableCurrent.anjianmingcheng;
      this.caseFormData.casesInfo = caseInfoBaseTableCurrent.jianyaoanqing; // 案件名称
      this.caseFormData.caseId = caseInfoBaseTableCurrent.anjianbianhao; // 案件名称
      this.caseFormData.ZFCaseNatureId = (this.typeObjData.caseNatureTypes.filter(
        (item) => item.fitemvalue == caseInfoBaseTableCurrent.anjianbiaozhi
      )[0] || {})["fitemvalue"]; // 案件性质
      this.caseFormData.police1Id = caseInfoBaseTableCurrent.bananrenyuan1id;
      this.caseFormData.caseTypeName =
        caseInfoBaseTableCurrent.anjianleibieName;
      this.caseFormData.caseTypeCode = caseInfoBaseTableCurrent.anjianleibie;
      this.caseFormData.police1No = caseInfoBaseTableCurrent.bananren1jinghao; // 民警1警号
      this.caseFormData.police1Name =
        caseInfoBaseTableCurrent.bananren1xingming; // 民警1姓名
      this.caseFormData.police1card = caseInfoBaseTableCurrent.bananren1zjhm;
      this.caseFormData.police2Id = caseInfoBaseTableCurrent.bananrenyuan2id;
      this.caseFormData.police2No = caseInfoBaseTableCurrent.bananren2jinghao; // 民警2警号
      this.caseFormData.police2Name =
        caseInfoBaseTableCurrent.bananren2xingming; // 民警2姓名
      this.caseFormData.police2card = caseInfoBaseTableCurrent.bananren2zjhm;

      jiejingBaseTableCurrent.id = caseInfoBaseTableCurrent.jiejingid; // 接处警ID
      jiejingBaseTableCurrent.jiejingdanweimc =
        caseInfoBaseTableCurrent.jiejingbianhao; // 接处警编号 代表名称
      this.caseFormData.jieChuJingName =
        jiejingBaseTableCurrent.jiejingdanweimc; // 接处警名称
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
          }
        });
    },
    caseTypeBaseTableCurrentChange(row, index) {
      if (!row) {
        return;
      }
      caseTypeBaseTableCurrent = row;
    },
    chooseCaseType() {
      this.caseFormData.caseTypeName = caseTypeBaseTableCurrent.fitemname;
      this.caseFormData.caseTypeCode = caseTypeBaseTableCurrent.fitemvalue;
      this.handleCaseTypeDialog(false);
    },
    handleCaseTypeDialog(bool) {
      this.isCaseTypeDialog = bool;
    },

    /* 5. 民警警号弹窗 */
    getTbInoutCaseareaGetPersonalsAndRoles() {
      apiCaseEntry
        .getTbInoutCaseareaGetPersonalsAndRoles({
          jinghao: this.policeInfoTopFormData.jinghao,
        })
        .then((res) => {
          if (res.code == 0) {
            console.log("policeInfoBaseTableData",res.data)
            debugger
            this.policeInfoBaseTableData = res.data;
          }
        })
        .catch((err) => {
          console.log("请求数据失败", err);
        });
    },
    policeInfoBaseTableCurrentChange(row, index) {
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
        if (
          this.policeInfoTopFormData.peopleType == 1 &&
          policeInfo1BaseTableCurrent.id === this.caseFormData.police2Id
        ) {
          this.$message.error("警号不能重复！");
          return;
        }
        if (this.policeInfoTopFormData.peopleType != 2) {
          this.$set(this.caseFormData, "people1Type", "1");
        } else {
          this.$set(this.caseFormData, "people1Type", "2");
        }
        //添加辅警后还原录入民警页面
        this.indexTab = 1;
        this.$set(
          this.caseFormData,
          "police1Id",
          policeInfo1BaseTableCurrent.id
        );
        this.$set(
          this.caseFormData,
          "police1departmentid",
          policeInfo1BaseTableCurrent.banandanweiid
        );
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
        this.caseFormData.Police1cardno=policeInfo1BaseTableCurrent.zhengjianhaoma
        if (this.isTrue == false) {
          if (this.policeInfoTopFormData.demoInput == "") {
            this.$message.error("请输入辅警编号");
            return;
          }
          this.$set(this.caseFormData, "police1Id", "");
          this.$set(
            this.caseFormData,
            "police1Name",
            this.policeInfoTopFormData.demoName
          );
          this.$set(
            this.caseFormData,
            "police1No",
            this.policeInfoTopFormData.demoInput
          );
        }
      } else if (this.currentPolice == 2) {
        if (
          (this.policeInfoTopFormData.peopleType == 1 ||
            this.policeInfoTopFormData.peopleType == undefined) &&
          policeInfo2BaseTableCurrent.id === this.caseFormData.police1Id
        ) {
          this.$message.error("警号不能重复！");
          return;
        }
        if (this.policeInfoTopFormData.peopleType != 2) {
          this.$set(this.caseFormData, "people2Type", "1");
        } else {
          this.$set(this.caseFormData, "people2Type", "2");
        }
        this.$set(
          this.caseFormData,
          "police2Id",
          policeInfo2BaseTableCurrent.id
        );
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
        debugger;
        this.$set(
          this.caseFormData,
          "police2departmentid",
          policeInfo2BaseTableCurrent.banandanweiid
        );
        debugger
        this.caseFormData.Police2cardno=policeInfo2BaseTableCurrent.zhengjianhaoma
        if (this.isTrue == false) {
          if (this.policeInfoTopFormData.demoInput == "") {
            this.$message.error("请输入辅警编号");
            return;
          }
          if (
            this.caseFormData.police1Id == "" &&
            this.policeInfoTopFormData.demoInput === this.caseFormData.police1No
          ) {
            this.$message.error("警号不能重复！");
            return;
          }
          console.log(2323);
          this.$set(
            this.caseFormData,
            "police2No",
            this.policeInfoTopFormData.demoInput
          );
          this.$set(
            this.caseFormData,
            "police2Name",
            this.policeInfoTopFormData.demoName
          );
          this.$set(this.caseFormData, "police2Id", "");
        }
      }
      this.handlePoliceInfoDialog(false);
    },
    handlePoliceInfoDialog(bool) {
      this.isPoliceInfoDialog = bool;
      this.$resetFields("policeInfoTopForm");
      this.policeInfoBaseTableData = [];
    },

    /* 6. 手环/卡弹窗,刷腕带/卡后回车回调事件 */
    changeDialogBandCardNumber(ID) {
      var DialogNumber = document.getElementById(ID).value;
      if (DialogNumber.length == 8) {
        var type = "";
        if (this.isScanBandDialog) {
          type = "1";
        }
        if (this.isScanCardDialog) {
          type = "2";
        }
        apiCaseEntry
          .isUseBracelet({
            code: DialogNumber,
            type: type,
            centerInfoId: "",
            site: "1",
          })
          .then((res) => {
            debugger;
            if (res.code == 0) {
              if (res.data.isUse == "true") {
                if (type == "1") {
                  this.personFormData.wristbandNo = DialogNumber;
                  this.personFormData.wristbandId = res.data.id;
                  this.isScanBandDialog = false;
                }
                if (type == "2") {
                  if (this.isScanDialogFlag == "police1CardId") {
                    debugger
                    this.caseFormData.police1CardNo = DialogNumber;
                    this.caseFormData.police1CardId = res.data.id;
                    this.isScanCardDialog = false;
                  } else if (this.isScanDialogFlag == "police2CardId") {
                    this.caseFormData.police2CardNo = DialogNumber;
                    this.caseFormData.police2CardId = res.data.id;
                    this.isScanCardDialog = false;
                  } else if (this.isScanDialogFlag == "postCard1Id") {
                    this.caseFormData.postCard1No = DialogNumber;
                    this.caseFormData.postCard2Id = res.data.id;
                    this.isScanCardDialog = false;
                  } else if (this.isScanDialogFlag == "postCard2Id") {
                    this.caseFormData.postCard2No = DialogNumber;
                    this.caseFormData.postCard2Id = res.data.id;
                    this.isScanCardDialog = false;
                  }
                }
                this.isScanDialogFlag = "";
              } else {
                if (type == "1") {
                  this.$message.warning("腕带正在使用，请确认后重新刷腕带");
                }

                if (type == "2") {
                  this.$message.warning("卡正在使用，请确认后重新刷卡");
                }
              }
            } else {
              if (type == "1") {
                this.$message.warning("手环不存在，请先到基础信息手环管理添加");
              }

              if (type == "2") {
                this.$message.warning("卡不存在，请先到基础信息卡管理添加");
              }
            }
            if (type == "1") {
              this.DialogBandNumber = "";
              document.getElementById(ID).value = "";
              this.$refs.refDialogBandNumber.focus();
            }
            if (type == "2") {
              this.DialogCardNumber = "";
              document.getElementById(ID).value = "";
              this.$refs.refDialogCardNumber.focus();
            }
          });
      }
    },

    /* 二、入区登记列表信息 involvedItemType == 2 */
    getTbInoutCaseareaList() {
      let data = {
        pageNum: this.entryListBaseTablePageCurrent,
        pageSize: this.entryListBaseTablePageSize,
        name: this.entryListBaseTopFormData.name,
        personnelType: this.entryListBaseTopFormData.personnelType,
        centerInfoId: this.$store.state.userInfo.fcompanyid,
      };
      apiCaseEntry
        .getTbInoutCaseareaList(data)
        .then((res) => {
          if (res.code == 0) {
            this.entryListBaseTableData = res;
          }
        })
        .catch((err) => {
          console.log("入区登记列表信息", err);
        });
    },
    // 入区登记列表信息 - 选中表格行变化
    entryListBaseTableCurrentChange(row, index) {
      if (!row) {
        return;
      }
      this.entryListBaseTableCurrent = row;
    },
    // 入区登记列表信息 - 每页数量变化
    entryListBaseTablePageSizeChange(val) {
      this.entryListBaseTablePageSize = val;
      this.entryListBaseTablePageCurrent = 1;
      this.getTbInoutCaseareaList();
    },
    // 入区登记列表信息 - 页码变化
    entryListBaseTablePageCurrentChange(val) {
      this.entryListBaseTablePageCurrent = val;
      this.getTbInoutCaseareaList();
    },
    //清空案件信息数据信息
    closeCaseinfodio() {
      // this.caseInfoTopFormData.shouliriqTime = [];
      // this.caseInfoTopFormData.gonganid = "";
      // this.caseInfoTopFormData.jinghao = "";
      // this.caseInfoTopFormData.orgId = "";
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
      date[0] = startdate;
      date[1] = enddate;

      return date;
    },
    onCaseInfoPageChange(pageNum) {
      this.caseInfo.pageNum = pageNum;
      this.queryCaseInfoList();
    },
    onCaseInfoPageSizeChange(pageSize) {
      this.caseInfo.pageSize = pageSize;
      this.onCaseInfoPageChange(1);
    },
  },
};
</script>

<style scoped lang="scss">
.involved-item {
  /* 表单元素样式自定义 */

  ::v-deep .el-form-item {
    .el-form-item__content {
      /* max-width: 280px; */

      .el-select {
        width: 100%;
      }

      .el-date-editor {
        width: 100%;
        background: rgba(108, 223, 252, 0.2);
        border: 1px solid rgba(108, 223, 252, 1);
        color: #ace7fd;

        .el-range-input {
          background: rgba(108, 223, 252, 0.2);
          color: #ace7fd;
        }
      }
    }
  }

  .form-img-wrap {
    text-align: center;

    .form-img-label {
      font-size: 12px;
      color: #ace7fd;
      margin-bottom: 5px;
    }
  }

  /* 有表单的弹窗 */
  .top-form-dialog {
    .top-form {
      display: flex;
      border: 1px solid #6cdffc;
      padding: 10px 20px;

      .top-form-left {
        flex: 3;
        padding-right: 30px;
      }

      .top-form-right {
        flex: 2;
      }

      .form-btns-wrap {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }
  }

  /* 扫描/扫手环弹窗*/
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
}

.el-form {
  .el-form-item {
    margin-bottom: 13px !important;
  }
}
[class*="el-col-"] {
  // 40 => 60 必填验证文案完整展示
  min-height: 40px;
}
.el-button:not(.el-button--text) {
  margin-left: 6px;
}

.el-image {
  position: absolute;
  margin-left: 6px;
}
.phoneor {
  .el-form-item__content {
    margin-left: 0 !important;
  }
}

.face {
  .base-image-cmpt {
    position: absolute;
  }
}
.el-form--label-top {
  ::v-deep.el-form-item__label {
    padding: 0 !important;
  }
  ::v-deep.el-form-item__content {
    margin-left: 0 !important;
  }
}
.el-form-card {
  position: relative;
  ::v-deep.el-form-item__label {
    width: 70px !important;
  }
  ::v-deep.el-form-item__content {
    display: inline-block;
  }
  ::v-deep.el-checkbox {
    position: absolute;
    left: 222px;
    top: 10px;
  }
}
</style>
