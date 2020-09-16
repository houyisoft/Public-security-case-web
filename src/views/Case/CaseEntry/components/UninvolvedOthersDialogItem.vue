<template>
    <div style="margin-top: -20px;padding: 0 10px;">
        <base-title title="人员基本信息"></base-title>
        <el-form
            class="person-form"
            :model="personFormData"
            ref="personForm"
            :rules="personFormDataRules"
            label-width="110px"
            label-position="left"
        >
            <el-row>
                <el-col :span="24">
                    <el-form-item label="人员类型" prop="peopleType">
                        <el-select v-model="personFormData.peopleType" placeholder="请选择">
                            <el-option
                                :label="item.fitemname"
                                :value="item.fitemvalue"
                                v-for="(item, index) in typeObjData.unInvolvedPoliceTypes"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="policeName">
                        <el-input v-model="personFormData.policeName" style="width: 220px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="fMobile">
                        <el-input v-model="personFormData.fMobile" style="width: 220px;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="证件类型" prop="iDType">
                        <el-select v-model="personFormData.iDType" placeholder="请选择">
                            <el-option
                                :label="item.fitemname"
                                :value="item.fitemvalue"
                                v-for="(item, index) in typeObjData.cardTypes"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号" prop="iDNO">
                        <el-input
                            v-model="personFormData.iDNO"
                            style="width: 220px; margin-right: 10px;"
                        ></el-input>
                        <!-- <el-button class="form-btn"
						 type="primary"
                        @click="readCard">读取身份证</el-button>-->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="入区原因" prop="inBecause">
                        <el-select v-model="personFormData.inBecause" placeholder="请选择">
                            <el-option
                                :label="item.fitemname"
                                :value="item.fitemvalue"
                                v-for="(item, index) in typeObjData.entryReasonTypes"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="门禁卡号" prop="postCardNo">
                        <el-input
                            v-model="personFormData.postCardNo"
                            autocomplete="on"
                            style="width: 220px; margin-right: 10px;"
                        ></el-input>
                        <el-button class="form-btn" type="primary" @click="getAccountData">读取</el-button>
                        <el-checkbox v-model="personFormData.noname">同号</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="定位卡号" prop="cardNo">
                        <el-input
                            v-model="personFormData.cardNo"
                            autocomplete="on"
                            style="width: 220px; margin-right: 10px;"
                        ></el-input>
                        <el-button class="form-btn" type="primary" @click="getAccountData">读取</el-button>
                        <el-checkbox v-model="personFormData.noname">同号</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="有效时间" prop="fAllowEndTime">
                        <el-date-picker
                            v-model="personFormData.fAllowEndTime"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <base-title title="案件信息"></base-title>
            <el-form-item label="案件性质" prop="caseNature">
                <el-select v-model="personFormData.caseNature" placeholder="请选择">
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
                    @onBaseFakeElementClick="baseFakeElementClick"
                >{{personFormData.caseId}}</base-fake-element>
            </el-form-item>
            <el-form-item label="案件名称" prop="casesName">
                <el-input v-model="personFormData.casesName"></el-input>
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
                            <el-select :disabled="true" v-model="item.cardType" placeholder="请选择">
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
            <!-- </template> -->
        </el-form>

        <!-- 以下为弹窗区域 -->

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

        <!-- 6. 刷卡 -->
        <el-dialog
            class="scan-dialog"
            width="920px"
            :close-on-click-modal="false"
            :visible.sync="isScanCardDialog"
            title="请选择"
        >
            <div class="scan-dialog-wrap">
                <el-image
                    class="dialog-card-img"
                    :src="require('@/assets/Case/CaseEntry/cardImg.png')"
                ></el-image>
                <div class="dialog-big-text">请将卡置于机器上方</div>
                <div class="dialog-small-text">读取成功后自动关闭</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import apiCommon from "@/apis/apiCommon.js";
import apiCaseEntry from "@/apis/apiCase/apiCaseEntry.js";
import Apis from "@/apis/apiCase/caseEntry_un.js";
import { mapMutations } from "vuex";

export default {
    data() {
        var checkCardNumber = (rule, value, callback) => {
            const reg = /^\d{17}[0-9|x|X]$/;
            return new Promise((resolve, reject) => {
                if (!value) {
                    callback(new Error("请输入证件号！"));
                } else {
                    if (!reg.test(value) && this.personFormData.iDType == 11) {
                        callback(new Error('请输入18位正确的证件号'));
                    } else {
                        callback();
                    }
                }
            });
        };
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
            personNames: [],
            /* 一、入区登记表单 involvedItemType == 1 */
            baseFakeElementStyle: "margin-bottom: 22px;", // 伪表单项样式
            // 人员基本信息表单
            personFormData: {
                policeName: "",
                cardNo: "",
                fMobile: "",
                iDType: "",
                iDNO: "",
                fAllowEndTime: "",
                postCardNo: "",
                peopleType: "",
                inBecause: "",
                caseId: "",
                caseNature: "",
                casesName: "",
                suspectListStr: [
                    {
                        name: "",
                        phone: "",
                        cardType: "",
                        cardNumber: ""
                    }
                ]
            },
            personFormDataRules: {
                peopleType: [
                    {
                        required: true,
                        message: "请选择人员类型",
                        trigger: "change"
                    }
                ],
                policeName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                fMobile: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur"
                    },
                    {
                        validator: this.$checkMobile,
                        trigger: ['blur', 'change']
                    }
                ],
                iDType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "change"
                    }
                ],
                iDNO: [
                    { required: true, validator: checkCardNumber, trigger: "blur" }

                ],
                inBecause: [
                    {
                        required: true,
                        message: "请选择入区原因",
                        trigger: "change"
                    }
                ],
                caseNature: [
                    {
                        required: true,
                        message: "请选择案件性质",
                        trigger: "change"
                    }
                ]
            },
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
            dataTime: this.getDefaultTime(),
            /* 2. 案件信息弹窗 */
            isCaseInfoDialog: false, // 选择案件信息弹窗
            caseInfoTopFormData: {},
            caseInfoBaseTableData: {
                rows: [],
                total: 0
            },
            caseInfoBaseTableCurrent: {}, // 当前选中案件信息行
            caseInfobaseTablePageCurrent: 1,
            caseInfoBaseTablePageSize: 10,

            /* 6. 刷卡/手环弹窗 */
            isScanCardDialog: false, // 刷卡弹窗
            isScanBandDialog: false, // 扫描手环弹窗，
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
    computed: {
        typeObjData() {
            return this.$store.state.typeObjData;
        }
    },
    mounted() {
        this.getTypeList();
    },
    methods: {
        ...mapMutations(["updateTypeObjData"]),
        getTypeList() {
            Apis.getTypeList({
                type: 12
            }).then(res => {
                this.updateTypeObjData({
                    unInvolvedPoliceTypes: res.data || []
                });
            });
            Apis.getTypeList({
                type: 5
            }).then(res => {
                this.updateTypeObjData({
                    blTypes: res.data || []
                });
            });
            Apis.getTypeList({
                type: 3
            }).then(res => {
                this.updateTypeObjData({
                    cardTypes: res.data || []
                });
            });
            Apis.getTypeList({
                type: 2
            }).then(res => {
                this.updateTypeObjData({
                    genderTypes: res.data || []
                });
            });
            Apis.getTypeList({
                type: 4
            }).then(res => {
                this.updateTypeObjData({
                    educTypes: res.data || []
                });
            });
            Apis.getTypeList({
                type: 6
            }).then(res => {
                this.updateTypeObjData({
                    entryReasonTypes: res.data || []
                });
            });
            Apis.getTypeList({
                type: 7
            }).then(res => {
                this.updateTypeObjData({
                    caseNatureTypes: res.data || []
                });
            });
        },
        // 查看详情(回到入区登记页面，信息回填)
        handleInvolvedItemType(index) {
            this.$emit("onHandleInvolvedItemType", index);
        },
        submitForm() {
            this.personFormData.centerInfoId = JSON.parse(
                localStorage.getItem("userInfo")
            ).fcompanyid;
            this.personFormData.centerID = this.$store.state.userInfo.fcompanyid;
            this.personFormData.type = 3;
            this.personFormData.suspectListStr = this.personNames;
            this.$refs["personForm"].validate(valid => {
                if (valid) {

                    Apis.postData(this.personFormData).then(res => {
                        console.log(res);
                        if (res.code != 0) {
                            this.$message.error(res.msg);
                        } else {
                            this.$message.success("保存成功");
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        resetInvolvedFormData() {
            console.log("清空涉案人员入区登记表单");
            this.$resetFields("personForm");
            this.$resetFields("caseForm");
        },

        // 调取预约信息
        getAccountData() {},
        // 读取身份证
        readCard() {},
        // 打开弹窗
        baseFakeElementClick(flag) {
            if (flag == "caseId") {
                // 2. 选择案件信息
                this.isCaseInfoDialog = true;
            }
        },
        /* 1. 分配询讯问室弹窗 */
        getTbFunctionroomBaseList() {
            apiCommon
                .getTbFunctionroomBaseList({
                    pageName: this.distributeRoomBaseTablePageCurrent,
                    pageSize: this.distributeRoomBaseTablePageSize
                })
                .then(res => {
                    if (res.code == 0) {
                        console.log("分配询讯问室列表", res);
                        this.distributeRoomBaseTableData = res;
                    }
                });
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
        // 	selectPersonName(val) {
        //     console.log("选中的人员编号", val);
        //     let currentPerson = this.personNames.filter(
        //         item => item.renyuanbianhao == val
        //     )[0];
        //     console.log("选中的人员", currentPerson);
        //     this.$set(this.personFormData, "name", currentPerson.xingming);
        //     this.$set(
        //         this.personFormData,
        //         "phone",
        //         currentPerson.lianxidianhua
        //     );
        //     this.$set(
        //         this.personFormData,
        //         "cardType",
        //         currentPerson.zhengjiandiama
        //     );
        //     this.$set(
        //         this.personFormData,
        //         "cardNumber",
        //         currentPerson.zhengjianhaoma
        //     );
        // },
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
            this.personFormData.caseId = caseId;
            this.personFormData.casesName = caseName;
            this.isCaseInfoDialog = false;
        },
        /* 3. 接警处信息弹窗 */
        getTbInoutCaseareaGetJcjxxs() {
            this.$validate("jiejingTopForm")
                .then(res => {
                    let shouliriq_start = this.jiejingTopFormData
                        .shouliriqTime[0];
                    let shouliriq_end = this.jiejingTopFormData
                        .shouliriqTime[1];
                    apiCaseEntry
                        .getTbInoutCaseareaGetJcjxxs({
                            orgId: this.jiejingTopFormData.orgId,
                            shouliriq_start,
                            shouliriq_end,
                            jinghao: this.jiejingTopFormData.jinghao,
                            gonganid: this.jiejingTopFormData.gonganid
                        })
                        .then(res => {
                            console.log("请求数据成功", res);
                            if (res.code == 0) {
                                this.jiejingBaseTableData = res;
                            }
                        })
                        .catch(err => {
                            console.log("请求数据失败", err);
                        });
                })
                .catch(err => {
                    console.log("验证失败", err);
                });
        },

        /* 4. 案件类别(案由)弹窗*/
        getLrBaseDataitemdetailList() {
            apiCommon
                .getLrBaseDataitemdetailList({
                    type: 8,
                    caseNatureId: this.personFormData.ZFCaseNature
                })
                .then(res => {
                    console.log("请求数据成功", res);
                    if (res.code == 0) {
                        this.caseTypeBaseTableData = res;
                    }
                });
        },

        /* 5. 民警警号弹窗 */
        getTbInoutCaseareaGetPersonalsAndRoles() {
            apiCaseEntry
                .getTbInoutCaseareaGetPersonalsAndRoles({
                    jinghao: this.policeInfoTopFormData.jinghao
                })
                .then(res => {
                    console.log("请求数据成功", res);
                    if (res.code == 0) {
                        res.data.length = 10;
                        this.policeInfoBaseTableData = res;
                    }
                })
                .catch(err => {
                    console.log("请求数据失败", err);
                });
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
.involved-item {
    /* 表单元素样式自定义 */
    ::v-deep .el-form-item {
        .el-form-item__label {
        }

        .el-form-item__content {
            max-width: 280px;

            .el-select {
                width: 100%;
            }
        }
    }

    /* 自定义form-item样式 */
    .form-item {
        display: flex;
        align-items: center;

        .form-item-label {
            width: 110px;
        }

        .form-item-content {
            width: 100%;
        }
    }

    /* 人员基本信息 */
    .person-form {
        .person-form-top {
            display: flex;

            .form-btn {
                height: 40px;
                background: rgba(108, 223, 252, 1);
                border-radius: 4px;
                margin-left: 20px;

                font-size: 14px;
                color: rgba(9, 61, 113, 1);
                text-align: center;
            }

            .person-form-left {
                padding-right: 50px;
                flex: 1;
            }

            .person-form-right {
                flex: 1;
            }
        }

        .form-img-wrap {
            text-align: center;

            .form-img-label {
                font-size: 12px;
                color: rgba(255, 255, 255, 1);
                margin-bottom: 5px;
            }
        }
    }

    /* 案件信息 */
    .case-form {
        display: flex;

        .avatar-img {
            width: 90px;
            height: 75px;
        }

        .case-form-left {
            flex: 3;
        }

        .case-form-middle {
            flex: 2;
            padding-left: 30px;
        }

        .case-form-right {
            flex: 2;
            padding-left: 30px;
        }
    }

    /* 案件信息弹窗 */
    .top-form-dialog {
        .top-form {
            display: flex;
            border: 1px solid #6cdffc;
            padding: 10px 20px;

            .top-form-left {
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
            }
        }
    }
}
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
::v-deep.el-button {
    margin-left: 10px;
}
</style>
