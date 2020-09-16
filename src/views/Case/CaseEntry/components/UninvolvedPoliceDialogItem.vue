<template>
    <div class="police-dialog-item">
        <base-title title="民警基本信息"></base-title>
        <el-form
            class="police-form"
            :model="policeFormData"
            ref="policeForm"
            :rules="policeFormDataRules"
            label-width="80px"
            label-position="right"
        >
            <el-form-item label="人员类型" prop="peopleType" required>
                <el-select
                    v-model="policeFormData.peopleType"
                    placeholder="请选择"
                    @change="peopleTypeChange"
                >
                    <el-option
                        :label="item.fitemname"
                        :value="item.fitemvalue"
                        v-for="(item, index) in typeObjData.unInvolvedPoliceTypes"
                        :key="index"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员姓名" prop="policeName" required>
                <base-fake-element
                    baseFakeElementFlag="policeName"
                    baseFakeElementType="select"
                    @onBaseFakeElementClick="baseFakeElementClick"
                >{{policeFormData.policeName || '请选择'}}</base-fake-element>
            </el-form-item>
            <el-form-item label="警号" prop="policeNO"  :rules="[
            { required: true, message: '警号不能为空', trigger: 'blur' },
          ]">
                <base-fake-element v-if="policeFormData.peopleType == 1" baseFakeElementType="input">{{policeFormData.policeNO}}</base-fake-element>
                <el-input v-else v-model="policeFormData.policeNO" />
            </el-form-item>
            <el-form-item label="单位编号" prop="orgID">
                <base-fake-element v-if="policeFormData.peopleType == 1" baseFakeElementType="input">{{policeFormData.orgID}}</base-fake-element>
                <el-input v-else v-model="policeFormData.orgID" />
            </el-form-item>
            <el-form-item label="单位名称" prop="orgName">
                <base-fake-element v-if="policeFormData.peopleType == 1"  baseFakeElementType="input">{{policeFormData.orgName}}</base-fake-element>
                <el-input v-else v-model="policeFormData.orgName" />

            </el-form-item>
            <el-form-item label="单位全称" prop="orgFullName">
                <base-fake-element v-if="policeFormData.peopleType == 1" baseFakeElementType="input">{{policeFormData.orgFullName}}</base-fake-element>
                <el-input v-else v-model="policeFormData.orgFullName" />

            </el-form-item>

            <el-form-item label="手机号" prop="fMobile">
                <base-fake-element v-if="policeFormData.peopleType == 1" baseFakeElementType="input">{{policeFormData.fMobile}}</base-fake-element>
                <el-input v-else v-model="policeFormData.fMobile" />

            </el-form-item>
            <el-form-item label="账号" prop="fAccount">
                <base-fake-element v-if="policeFormData.peopleType == 1" baseFakeElementType="input">{{policeFormData.fAccount}}</base-fake-element>
                <el-input v-else v-model="policeFormData.fAccount" />

            </el-form-item>
            <el-form-item label="岗位" prop="station">
                <el-select placeholder="请选择" v-model="policeFormData.station">
                    <el-option
                        :label="item.postName"
                        :value="item.fId"
                        v-for="(item, index) in $store.state.posts"
                        :key="index"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="门禁卡号" prop="postCardNo">
                <base-fake-element
                    style="width:85%;float:left"
                    baseFakeElementType="card"
                    baseFakeElementFlag="postCardNo"
                    @onBaseFakeElementClick="baseFakeElementClick"
                >{{policeFormData.postCardNo}}</base-fake-element>
                <el-checkbox style="margin-left:2.5%" v-model="policeFormData.noname">同号</el-checkbox>
            </el-form-item>
            <el-form-item label="定位卡号">
                <base-fake-element
                    style="width:85%;float:left"
                    baseFakeElementType="card"
                    baseFakeElementFlag="cardNo"
                    @onBaseFakeElementClick="baseFakeElementClick"
                >{{policeFormData.cardNo}}</base-fake-element>
                <el-checkbox style="margin-left:2.5%" v-model="policeFormData.noname">同号</el-checkbox>
            </el-form-item>
            <el-form-item label="有效时间" prop="fAllowEndTime">
                <el-date-picker
                    v-model="policeFormData.fAllowEndTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                ></el-date-picker>
            </el-form-item>
            <base-title title="案件信息"></base-title>
            <el-form-item label="案件性质" prop="caseNature">
                <el-select v-model="policeFormData.caseNature" placeholder="请选择">
                    <el-option
                        :label="item.fitemname"
                        :value="item.fitemvalue"
                        v-for="(item, index) in typeObjData.caseNatureTypes"
                        :key="index"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件信息" prop="caseId">
                <base-fake-element
                    baseFakeElementFlag="caseId"
                    baseFakeElementType="select"
                    @onBaseFakeElementClick="baseClick"
                >{{policeFormData.caseId}}</base-fake-element>
            </el-form-item>
            <el-form-item label="案件名称" prop="casesName">
                <el-input v-model="policeFormData.casesName"></el-input>
            </el-form-item>
            <div v-for="(item,index) in personNames" :key="index">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="嫌疑人" prop="name">
                            <!-- <el-select
                               placeholder="请选择"
                               v-model="personFormData.name"
                               @change="selectPersonName"
                           >
                               <el-option
                                   v-for="item in personNames"
                                   :key="item.renyuanbianhao"
                                   :label="item.xingming"
                                   :value="item.renyuanbianhao"
                               ></el-option>
                            </el-select>-->
                            <el-input :disabled="true" v-model="item.name" style="width: 220px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone">
                            <el-input :disabled="true" v-model="item.phone" style="width: 220px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证件类型" prop="cardType">
                            <el-select
                                :disabled="true"
                                v-model="item.cardType"
                                style="width: 220px;"
                                placeholder="请选择"
                            >
                                <el-option
                                    :label="opt.fitemname"
                                    :value="opt.fitemvalue"
                                    v-for="(opt, optIndex) in typeObjData.cardTypes"
                                    :key="optIndex"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件号" prop="cardNumber">
                            <el-input
                                :disabled="true"
                                v-model="item.cardNumber"
                                style="width: 220px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-form-item label="备注" prop="fDescription">
                <el-input type="textarea" v-model="policeFormData.fDescription"></el-input>
            </el-form-item>

            <div class="police-form-footer">
                <el-button type="primary" @click="postPoliceFormData(1)">确认</el-button>
                <el-button @click="$emit('onHandleIsPoliceRegist', false)">取消</el-button>
            </div>
        </el-form>

        <!-- 以下为弹窗区域 -->
        <el-dialog
            title="添加人员"
            :visible.sync="isAddPoliceDialog"
            :close-on-click-modal="false"
            append-to-body
        >
            <!-- 民警 -->
            <template v-if="currentPeopleType == 1">
                <base-top-form
                    ref="baseTopForm"
                    :baseTopFormData="addPoliceBaseTopFormData"
                    @onPostBaseTopFormData="getAddPoliceBaseTableData"
                >
                    <template v-slot:form>
                        <el-form-item prop="jinghao" label="警号">
                            <el-input v-model="addPoliceBaseTopFormData.jinghao" placeholder="请输入"></el-input>
                        </el-form-item>
                    </template>
                </base-top-form>
                <base-table
                    baseTableDataPrimaryKey="id"
                    :baseTableData="addPoliceBaseTableData"
                    :isBaseTablePage="false"
                    @onBaseTableCurrentChange="addPoliceBaseTableCurrentChange"
                >
                    <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
                    <el-table-column prop="jinghao" label="警号"></el-table-column>
                    <el-table-column prop="xingming" label="姓名"></el-table-column>
                    <el-table-column prop="banandanweiid" label="单位编号"></el-table-column>
                    <el-table-column prop="danweimingcheng" label="单位名称"></el-table-column>
                    <el-table-column prop="danweiquancheng" label="单位全称"></el-table-column>
                </base-table>
            </template>

            <!-- 辅警 -->
            <template v-if="currentPeopleType == 2">
                <base-top-form
                    :baseTopFormData="addStaffBaseTopFormData"
                    @onPostBaseTopFormData="getAddPoliceBaseTableData"
                >
                    <template v-slot:form>
                        <el-form-item prop="fRealname" label="人员姓名">
                            <el-input v-model="addStaffBaseTopFormData.fRealname" placeholder="请输入"></el-input>
                        </el-form-item>
                    </template>
                </base-top-form>
                <base-table
                    baseTableDataPrimaryKey="fuserid"
                    :baseTableData="addStaffBaseTableData.rows"
                    :baseTableDataTotal="addStaffBaseTableData.total"
                    :baseTablePageCurrent="addStaffBaseTablePageCurrent"
                    :baseTablePageSize="addStaffBaseTablePageSize"
                    @onBaseTableCurrentChange="addStaffBaseTableCurrentChange"
                    @onBaseTablePageSizeChange="addStaffBaseTablePageSizeChange"
                    @onBaseTablePageCurrentChange="addStaffBaseTablePageCurrentChange"
                >
                    <el-table-column prop="index" label="序号" type="index" width="50"></el-table-column>
                    <el-table-column prop="faccount" label="账号"></el-table-column>
                    <el-table-column prop="frealname" label="姓名"></el-table-column>
                    <el-table-column prop="fgender" label="性别">
                        <template slot-scope="scope">{{scope.row.fgender}}</template>
                    </el-table-column>
                    <el-table-column prop="fmobile" label="手机"></el-table-column>
                    <el-table-column prop="deptName" label="部门"></el-table-column>
                </base-table>
            </template>

            <template slot="footer">
                <el-button type="primary" @click="chooseAddPolice">确认</el-button>
                <el-button @click="isAddPoliceDialog = false">关闭</el-button>
            </template>
        </el-dialog>

        <!-- 2. 案件信息弹窗 -->
        <el-dialog
            class="top-form-dialog"
            :visible.sync="isCaseInfoDialog"
            :close-on-click-modal="false"
            width="1200px"
            title="选择案件信息"
            append-to-body
        >
            <el-form
                class=""
                ref="caseInfoTopForm"
                label-width="120px"
                :rules="caseInfoTopFormRules"
                :model="caseInfoTopFormData"
            >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="受理时间" prop>
                            <!-- <el-date-picker
                               v-model="dataTime"
                               style="width:100%;"
                               value-format="yy-mm-dd hh:mm:ss"
                               type="datetimerange"
                               range-separator="至"
                               start-placeholder="开始日期"
                               end-placeholder="结束日期">
                            </el-date-picker>-->

                            <el-date-picker
                                v-model="dataTime"
                                type="daterange"
                                unlink-panels
                                style="width:100%;"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="公安机构编号" prop="gonganid">
                            <el-input
                                placeholder="请输入"
                                v-model.trim="caseInfoTopFormData.gonganid"
                                style="width: 200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="查案人警号" prop="jinghao">
                            <el-input
                                placeholder="请输入"
                                v-model.trim="caseInfoTopFormData.jinghao"
                                style="width: 200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="办案单位编号" prop="orgId">
                            <el-input
                                placeholder="请输入"
                                v-model.trim="caseInfoTopFormData.orgId"
                                style="width: 200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button
                            class="form-post-btn"
                            plain
                            type="primary"
                            @click="getTbInoutCaseareaCaseInfoList()"
                        >查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <base-table
                :baseTableData="caseInfoBaseTableData.rows"
                :baseTableDataTotal="caseInfoBaseTableData.total"
                :baseTablePageCurrent="caseInfobaseTablePageCurrent"
                :baseTablePageSize="caseInfoBaseTablePageSize"
                @onBaseTableCurrentChange="caseInfoBaseTableCurrentChange"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="anjianbianhao" label="案件编号" width="300"></el-table-column>
                <el-table-column prop="anjianbianhao" label="接警编号" width="300"></el-table-column>
                <el-table-column prop="anjianmingcheng" label="案件名称" width="150"></el-table-column>
                <el-table-column prop="jianyaoanqing" label="案件简情" width="300"></el-table-column>
                <el-table-column prop="bananren1jinghao" label="办案人1警号"></el-table-column>
                <el-table-column prop="bananren2jinghao" label="办案人2警号"></el-table-column>
                <el-table-column prop="lianriqi" label="受理日期"></el-table-column>
            </base-table>
            <template slot="footer">
                <el-button type="primary" @click="caseInfoSureClick">确认</el-button>
                <el-button type="primary" @click="isCaseInfoDialog = false">关闭</el-button>
            </template>
        </el-dialog>

        <!-- 2. 刷卡 -->
        <el-dialog
            class="scan-dialog"
            append-to-body
            :close-on-click-modal="false"
            width="800px"
            :visible.sync="isScanCardDialog"
            title="请选择"
        >
            <el-input
                    ref="refDialogCardNumber"
                    class="dialog-hide-input"
                    :autofocus="true"
                    autocomplete="on"
                    v-model="DialogBandNumber"
                    @input="changeDialogBandCardNumber"
                    @blur="(e) => e.target.focus()"
            ></el-input>
            <div class="scan-dialog-wrap">
                <el-image
                    class="dialog-card-img"
                    :src="require('@/assets/images/case/caseEntry/cardDialogImg.png')"
                ></el-image>
                <div class="dialog-big-text">请将卡置于机器上方</div>
                <div class="dialog-small-text">读取成功后自动关闭</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import apiCaseEntry from "@/apis/apiCase/apiCaseEntry.js";
import Apis from "@/apis/apiCase/caseEntry_un.js";
import { mapMutations } from "vuex";
export default {
    props: {
        isPoliceRegist: {
            type: Boolean
        }
    },
    watch: {
        isPoliceRegist(val) {
            if (!val) {
                this.$resetFields("policeForm");
            }
        },
        isAddPoliceDialog(val) {
            if (!val) {
                console.log("清除添加人员表单数据");
                this.addStaffBaseTopFormData = {};
                this.addStaffBaseTableData = {};
                this.addStaffBaseTablePageCurrent = 1;
                this.addStaffBaseTablePageSize = 10;
                // this.addStaffBaseTableCurrent = {}
                this.addPoliceBaseTopFormData = {};
                this.addPoliceBaseTableData = [];
                this.personNames = [];

                // this.addPoliceBaseTableCurrent = {}
            }
        }
    },
    computed: {
        typeObjData() {
            return this.$store.state.typeObjData;
        }
    },
    data() {
        let checkTopFormGonganid = (rule, value, callback) => {
            if (!value && !this.caseInfoTopFormData.gonganid) {
                callback(new Error("请选择办案单位编号或公安机构编号其中一个"));
            } else {
                callback();
            }
        };
        let checkTopFormJinghao = (rule, value, callback) => {
            if (!value && !this.caseInfoTopFormData.orgId) {
                console.log(456);
                callback(new Error("请选择办案单位编号或公安机构编号其中一个"));
            } else {
                callback();
            }
        };
        let _minTime = null
        let _maxTime = null
        return {
            isCaseInfoDialog: false, // 选择案件信息弹窗
            caseInfoTopFormData: {},
            dataTime: this.getDefaultTime(),
            personNames: [],
            caseId: "",
            caseInfoTopFormRules: {
                gonganid: [
                    {
                        validator: checkTopFormGonganid,
                        trigger: "blur"
                    }
                ],
                orgId: [
                    {
                        validator: checkTopFormJinghao,
                        trigger: "blur"
                    }
                ],
                shouliriqTime: [
                    {
                        required: true,
                        trigger: "blur"
                    }
                ]
            },
            caseInfoBaseTableData: {
                rows: [],
                total: 0
            },
            caseInfoBaseTableCurrent: {}, // 当前选中案件信息行
            caseInfobaseTablePageCurrent: 1,
            caseInfoBaseTablePageSize: 10,
            // 人员基本信息表单
            policeFormData: {}, // 人员类型：1 民警 2 辅警
            currentPeopleType: "", // 当前选中人员类型：1 民警 2 辅警
            policeFormDataRules: {},

            /* 1.添加人员弹窗 */
            isAddPoliceDialog: false,
            /* 选择辅警 */
            addStaffBaseTopFormData: {
                // 选择辅警表单
                fRealname: ""
            },
            addStaffBaseTableData: {
                total: 0,
                rows: []
            },
            addStaffBaseTablePageCurrent: 1,
            addStaffBaseTablePageSize: 10,
            addStaffBaseTableCurrent: {}, // 当前选中人员行
            /* 选择民警 */
            addPoliceBaseTopFormData: {
                // 选择民警表单
                jinghao: ""
            },
            addPoliceBaseTableData: [], // 辅警表格数据
            addPoliceBaseTableCurrent: {},

            /* 2. 刷卡/手环弹窗 */
            isScanCardDialog: false, // 刷卡弹窗
            DialogBandNumber: "", // 扫描手环窗口隐藏input获取值
            cardFlag:"",//0:cardNo,1:postCardNo
            pickerOptions: {
                onPick(time){
                    console.log(time)
                    if (!time.maxDate) {
                        let timeRange = 90*24*3600*1000
                        _minTime = time.minDate.getTime() -  timeRange// 最小时间
                        _maxTime = time.minDate.getTime() + timeRange // 最大时间
                    } else {
                        _minTime = _maxTime = null
                    }
                },
                disabledDate(time) {
                    let afterToday = Date.now()
                    if (_maxTime) {
                        _maxTime = (_maxTime <= afterToday) ? _maxTime : afterToday 
                    } else {
                        return time.getTime() > (Date.now())
                    }
                    if (_minTime && _maxTime) {
                        return time.getTime() < _minTime || time.getTime() > _maxTime
                    }
                }
            }
        };
    },
    created() {
        console.log("typeObjData.unInvolvedPoliceTypes", this.typeObjData.unInvolvedPoliceTypes);
    },
    mounted() {
        this.getTypeList();
    },
    computed: {
        typeObjData() {
            return this.$store.state.typeObjData;
        },
        typeMapData() {
            return this.$store.state.typeMapData;
        }
    },
    methods: {
        ...mapMutations(["updateTypeObjData"]),
        changeDialogBandCardNumber(wristbandNo) {
            if (wristbandNo.length == 8) {
                if(this.cardFlag == 0){
                    this.policeFormData.cardNo = wristbandNo;
                } else if(this.cardFlag == 1) {
                    this.policeFormData.postCardNo = wristbandNo;
                }
                this.isScanCardDialog = false;
            }
        },
        /* 2. 案件信息弹窗 */
        getTbInoutCaseareaCaseInfoList() {
            if (!this.dataTime) {
                this.$message.warning("请选择时间范围");
                return;
            } else {
                // this.$validate("caseInfoTopForm")
                // 	.then(res => {
                let shouliriq_start = this.dataTime[0] + " 00:00:00";
                let shouliriq_end = this.dataTime[1] + " 23:59:59";
                console.log(22323);
                Apis.getCaseInfoList({
                    ...this.caseInfoTopFormData,
                    shouliriq_start,
                    shouliriq_end
                }).then(res => {
                    console.log(res);
                    this.caseInfoBaseTableData.rows = [];
                    this.caseInfoBaseTableData.rows = res.data;
                    this.caseInfoBaseTableData.total = res.total;
                });
                // })
                // .catch(err => {
                // 	console.log("验证失败", err);
                // });
            }
        },
        caseInfoBaseTableCurrentChange(row, index) {
            // console.log(row)
            this.caseInfoBaseTableCurrent = row;
            this.getPersonNames();
        },
        getPersonNames() {
            if (!this.caseInfoBaseTableCurrent.anjianbianhao) {
                this.$message.warning("请先选择案件信息");
                return;
            }
            // if (currentPersonType["fitemname"].indexOf("嫌疑人") != -1) {
            //     this.$set(this.formSituation, "personType", 1);
            // } else if (currentPersonType["fitemname"].indexOf("受害人") != -1) {
            //     this.$set(this.formSituation, "personType", 3);
            // } else if (currentPersonType["fitemname"].indexOf("证人") != -1) {
            //     this.$set(this.formSituation, "personType", 4);
            // }
            apiCaseEntry
                .getTbInoutCaseareaGetZfqySuspects({
                    casecode: this.caseInfoBaseTableCurrent.anjianbianhao,
                    type: 1
                })
                .then(res => {
                    // console.log("获取涉案人员列表成功", res);
                    if (res.code == 0) {
                        res.data.forEach((item, index) => {
                            this.personNames.push({
                                name: item.xingming,
                                phone: item.lianxidianhua,
                                cardType: item.zhengjiandiama,
                                cardNumber: item.zhengjianhaoma
                                    ? item.zhengjianhaoma
                                    : ""
                            });
                        });
                    }
                });
        },
        caseInfoSureClick() {
            const {
                caseInfoBaseTableCurrent: {
                    anjianbianhao: caseId,
                    anjianmingcheng: caseName
                }
            } = this;
            this.policeFormData.caseId = caseId;
            this.policeFormData.casesName = caseName;
            this.isCaseInfoDialog = false;
        },
        caseInfoBaseTableCurrentChange(row, index) {
            // console.log(row)
            this.caseInfoBaseTableCurrent = row;
            this.getPersonNames();
        },
        getTypeList() {
            Apis.getTypeList({
                type: 11
            }).then(res => {
                this.updateTypeObjData({
                    unInvolvedPoliceTypes: res.data || []
                });
            });
        },
        peopleTypeChange(val) {
            if (val == this.currentPeopleType) {
                return;
            }
            this.$resetFields("policeForm");
            this.currentPeopleType = this.typeObjData.unInvolvedPoliceTypes.filter(
                item => item.fitemvalue == val
            )[0].fitemvalue;
            this.addPoliceBaseTableCurrent = {};
            this.addPoliceBaseTablePageCurrent = 1;
            this.addPoliceBaseTablePageSize = 10;
            this.$set(this.policeFormData, "peopleType", val);
            console.log("当前选中的值", this.currentPeopleType);
        },
        baseClick(flag) {
            if (flag == "caseId") {
                // 2. 选择案件信息
                this.isCaseInfoDialog = true;
            }
        },
        // 打开弹窗
        baseFakeElementClick(flag) {
            console.log("点击伪标签", flag);
            if (flag == "policeName") {
                if (!this.currentPeopleType) {
                    this.$message.warning("请先选择人员类型");
                    return;
                }
                this.isAddPoliceDialog = true;
                if (this.currentPeopleType == 2) {
                    this.getAddPoliceBaseTableData();
                }
            } else if (flag == "cardNo") {
                // 定位卡号
                this.isScanCardDialog = true;
                this.DialogBandNumber = "";
                this.cardFlag = 0;
                this.$nextTick(() => {
                    this.$refs['refDialogCardNumber'].focus();
                })
            } else if (flag == "postCardNo") {
                // 门禁卡号
                this.isScanCardDialog = true;
                this.DialogBandNumber = "";
                this.cardFlag = 1;
                this.$nextTick(() => {
                    this.$refs['refDialogCardNumber'].focus();
                })

            }
        },
        handlePostPoliceFormData() {
            let data;
            let peoples = this.typeObjData.unInvolvedPoliceTypes.filter(
                item => item.fitemvalue == this.policeFormData.peopleType
            );
            let peopleValue = peoples ? peoples.length ? peoples[0].fitemvalue : '' : '';
            if (this.currentPeopleType == 1) {
                // 民警
                data = {
                    // fId: 0, // 新增传0 编辑传对应值
                    peopleType: peopleValue, // 人员类型
                    policeNO: this.policeFormData.policeNO,
                    centerInfoId: this.$store.state.userInfo.fcompanyid,
                    policeName: this.policeFormData.policeName,
                    station: this.policeFormData.station, // 岗位
                    centerID: this.$store.state.userInfo.fcompanyid, // 办案中心id
                    postCardNo: this.policeFormData.postCardNo, // 门禁卡编码
                    cardNo: this.policeFormData.cardNo, // 定位卡编号 - 刷卡获取
                    cardType: this.policeFormData.cardType, // 卡类型
                    fDescription: this.policeFormData.fDescription, // 备注
                    fAllowEndTime:
                        this.policeFormData.fAllowEndTime + " 23:59:59", // 有效时间
                    type: this.currentPeopleType == 1 ? 2 : 1 // 1-工作人员 2-民警 3-其他
                };
            } else if (this.currentPeopleType == 2) {
                // 辅警
                data = {
                    // fId: 0, // 新增传0 编辑传对应值
                    policeNO: this.policeFormData.policeNO,
                    centerInfoId: this.$store.state.userInfo.fcompanyid,
                    policeName: this.policeFormData.policeName,
                    departmentID: this.policeFormData.departmentID,
                    station: this.policeFormData.station, // 岗位
                    centerID: this.$store.state.userInfo.fcompanyid, // 办案中心id
                    cardID: this.policeFormData.cardID, // 卡id - 刷卡获取
                    cardNo: this.policeFormData.cardNo, // 定位卡编号 - 刷卡获取
                    cardType: this.policeFormData.cardType, // 卡类型
                    // facePic: this.policeFormData.facePic, // 人脸照片
                    fGender: this.policeFormData.fGender, // 性别
                    fMobile: this.policeFormData.fMobile, // 手机
                    iDType: this.policeFormData.iDType, // 证件类型
                    iDNO: this.policeFormData.iDNO, // 证件号码
                    fAccount: this.policeFormData.fAccount, // 登录账户
                    fDescription: this.policeFormData.fDescription, // 备注
                    fAllowEndTime: this.policeFormData.fAllowEndTime + " 23:59:59", // 有效时间
                    postCardNo: "", // 门禁卡编码
                    peopleType: peopleValue, // 人员类型
                    // type: this.currentPeopleType == 1 ? 2 : 1 // 1-工作人员 2-民警 3-其他
                    type: 1 // 1-工作人员 2-民警 3-其他
                    // "inBecause": "", // 入区原因value值
                    // "caseId": "", // 案件编号
                    // "caseNature": "", // 案件性质
                    // "casesName": "", // 案件名称
                };
            }

            if (!this.policeFormData.fAllowEndTime) {
                let date = new Date();
                let year = date.getFullYear().toString();
                let month =
                    date.getMonth().toString().length === 2
                        ? date.getMonth()
                        : "0" + date.getMonth().toString();
                let day =
                    date.getDate().toString().length === 2
                        ? date.getDate()
                        : "0" + date.getDate().toString();
                data.fAllowEndTime = year + "-" + month + "-" + day;
            } else {
                data.fAllowEndTime =
                    this.policeFormData.fAllowEndTime + " 23:59:59";
            }

            return data;
        },
        // 提交登记工作人员表单
        postPoliceFormData(isBackCard = 1) {
            // 没有选择值return掉避免报错且无消息提醒，2020-05-29
            if (!this.currentPeopleType) {
                this.$message.warning("请先选择人员类型");
                return;
            }
            let data = this.handlePostPoliceFormData();
            // 没姓名不可以提交
            if (data && !data.policeName) {
                this.$message.warning("请输入人员信息");
                return;
            }
            if(this.policeFormData.cardNo) {
                isBackCard = 1
            } else {
                isBackCard = 0
            }
            data.suspectListStr = JSON.stringify(this.personNames);
            data.caseId = this.policeFormData.caseId;
            data.casesName = this.policeFormData.casesName;
            data.caseNature = this.policeFormData.caseNature;
            data.station = this.policeFormData.station;
            data.isBackCard = isBackCard;
            data.type = 2;

            apiCaseEntry
                .geTtbUnsuspectAdd(data)
                .then(res => {
                    if (res.code === 8810) {
                        this.$confirm("发卡失败，是否保存当前数据?", "警告", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                            .then(() => {
                                this.postPoliceFormData(0);
                            })
                            .then(e => {});
                    } else if(res.code == 400){
                        this.$message.error(res.msg);
                    } else if(res.code == 0){
                        this.$message.success("保存入区成功");

                        this.$emit("onHandleIsPoliceRegist", false);
                    }
                })
                .catch(err => {
                    console.log("保存入区失败", err);
                });
        },
        // 弹窗区域
        getAddPoliceBaseTableData() {
            if (this.currentPeopleType == 1) {
                // 民警
                apiCaseEntry
                    .getTbInoutCaseareaGetPersonalsAndRoles(
                        this.addPoliceBaseTopFormData
                    )
                    .then(res => {
                        console.log("获取民警信息成功", res);
                        this.addPoliceBaseTableData = res.data;
                    })
                    .catch(err => {
                        console.log("获取民警信息成功");
                    });
            } else if (this.currentPeopleType == 2) {
                // 辅警
                let data = {
                    fRealname: this.addPoliceBaseTopFormData.fRealname,
                    pageSize: this.addStaffBaseTablePageSize,
                    pageNum: this.addStaffBaseTablePageCurrent
                };
                apiCaseEntry.getLrBaseUserList(data).then(res => {
                    if (res.code == 0) {
                        console.log("获取辅警信息成功", res);
                        this.addStaffBaseTableData = res;
                    }
                });
            }
        },

        /* 操作民警列表 */
        addPoliceBaseTableCurrentChange(row, index) {
            if (!row) {
                console.log("未选中行数据");
                return;
            }
            console.log("当前选中民警行", row);
            this.addPoliceBaseTableCurrent = row;
        },
        /* 操作辅警列表 */
        addStaffBaseTableCurrentChange(row, index) {
            if (!row) {
                console.log("未选中行数据");
                return;
            }
            console.log("当前选中辅警行", row);
            this.addStaffBaseTableCurrent = row;
        },
        addStaffBaseTablePageSizeChange(val) {
            this.addStaffBaseTablePageSize = val;
            this.addStaffBaseTablePageCurrent = 1;
            this.getAddPoliceBaseTableData();
        },
        addStaffBaseTablePageCurrentChange(val) {
            this.addStaffBaseTablePageCurrent = val;
            this.getAddPoliceBaseTableData();
        },
        chooseAddPolice() {
            // 选中民警/辅警姓名
            if (this.currentPeopleType == 1) {
                if (!this.addPoliceBaseTableCurrent.id) {
                    this.$message.warning("未选择民警信息");
                    return;
                }
                console.log(
                    "当前选中民警行数据",
                    this.addPoliceBaseTableCurrent
                );
                let policeInfo = {
                    policeName: this.addPoliceBaseTableCurrent.xingming,
                    policeNO: this.addPoliceBaseTableCurrent.jinghao,
                    orgID: this.addPoliceBaseTableCurrent.banandanweiid,
                    orgName: this.addPoliceBaseTableCurrent.danweimingcheng,
                    orgFullName: this.addPoliceBaseTableCurrent.danweiquancheng
                };
                this.policeFormData = { ...this.policeFormData, ...policeInfo };
            } else if (this.currentPeopleType == 2) {
                if (!this.addStaffBaseTableCurrent.fuserid) {
                    this.$message.warning("未选择辅警信息");
                    return;
                }
                console.log(
                    "当前选中辅警行数据",
                    this.addStaffBaseTableCurrent
                );
                let staffInfo = {
                    policeNo: this.addStaffBaseTableCurrent.fEncode,
                    policeName: this.addStaffBaseTableCurrent.frealname,
                    departmentID: this.addStaffBaseTableCurrent.fdepartmentid,
                    fGender: this.addStaffBaseTableCurrent.fgender,
                    iDType: this.addStaffBaseTableCurrent.idtype, // 证件类型
                    iDNO: this.addStaffBaseTableCurrent.idno, // 证件号
                    fMobile: this.addStaffBaseTableCurrent.fmobile,
                    fAccount: this.addStaffBaseTableCurrent.faccount
                };
                this.policeFormData = { ...this.policeFormData, ...staffInfo };
            }
            this.isAddPoliceDialog = false;
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

            console.log(date);

            return date;
        }
    }
};
</script>

<style scoped
 lang="scss">
.police-dialog-item {
    padding: 0 30px;

    /* 表单元素样式自定义 */
    ::v-deep .el-form-item {
        .el-form-item__label {
            width: 80px;
        }

        .el-form-item__content {
            .el-select {
                width: 100%;
            }
        }
    }

    /* 自定义form-item样式 */
    .form-item {
        display: flex;

        .form-item-label {
            width: 80px;
        }

        .form-item-content {
            flex: 1;
        }
    }

    .police-form {
        .flex-box {
            .flex-box-left {
                flex: 2;
                padding-right: 20px;
            }

            .flex-box-right {
                flex: 3;
            }
        }

        .police-form-footer {
            text-align: right;
        }
    }
}

/* 添加人员弹窗 */

/* 扫描/扫手环弹窗 */
.scan-dialog {
    ::v-deep .el-dialog__body {
        padding: 90px 0 95px 0;
    }

    .scan-dialog-wrap {
        text-align: center;

        .dialog-card-img {
            width: 213px;
            height: 95px;
        }

        .dialog-band-img {
            width: 120px;
            height: 114px;
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
