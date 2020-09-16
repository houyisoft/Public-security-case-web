<template>
    <div class="page-wrap">
        <case-main-top title="功能室管理">
            <el-form class="case-main-top-form" ref="caseMainTopForm" :model="caseMainTopFormData">
                <el-form-item class="form-item form-item-isleave" label="功能室类型" prop="type">
                    <el-select
                        @change="postFormData"
                        class="select-isleave"
                        placeholder="全部"
                        v-model="caseMainTopFormData.type"
                    >
                        <el-option class="option-isleave" label="全部" value=""></el-option>
                        <el-option class="option-isleave" label="候问室" value="1"></el-option>
                        <el-option class="option-isleave" label="讯询问室" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-button class="form-btn" type="primary" @click="postFormData">查询</el-button> -->

                <div style="margin-left: 20px;">
                    <el-button
                        class="form-btn in-btn"
                        type="primary"
                        @click="getpersonmain(1)"
                    >候问室进入</el-button>
                    <el-button class="form-btn out-btn" @click="getpersonmain(2)">讯询问室进入</el-button>
                    <el-button class="form-btn out-btn" @click="getpersonmain(3)">离开</el-button>
                </div>
            </el-form>
        </case-main-top>
        <div class="page-main" style="height:330px;overflow-y: auto;">
            <div
                class="room-block"
                v-bind:class="{'checked':index== showindex, have: item.states == 1 }"
                @click="checkItem(index,item)"
                v-for="(item,index) in roomList"
                :key="index"
            >
                <div class="room-block-header">
                    <p>{{item.FuncName}}</p>
                </div>
                <div class="room-block-body">
                    <!--<div class="room-body-left">-->
                        <!--<img v-if="item.states==0" class="room-body-leftImg" src="../../assets/images/room/Free.png" />-->
                        <!--<img v-if="item.states==1" class="room-body-leftImg" src="../../assets/images/room/Occupation.png" />-->
                    <!--</div>-->
                    <!--<div class="room-body-right" style="text-align:center">-->
                        <!--<p style="font-size:20px;">占用人数</p>-->
                        <!--<p-->
                            <!--style="font-size:30px;margin-top:10px"-->
                        <!--&gt;{{item.PeopleCount!=null?item.PeopleCount:0}}</p>-->
                    <!--</div>-->
                    <p class="num">{{item.PeopleCount!=null?item.PeopleCount:0}}</p>
                    <p class="txt">占用人数</p>
                </div>
            </div>
            <br />
        </div>
        <div class="personbox">
            <div class="personDetail">
                <div class="personPic">
                    <el-image :src="srcPic" style="height:100%; width: 100%;"></el-image>
                </div>
                <div class="personInformation">
                    <div class="room-block-header">基本信息</div>
                    <div class="Content">
                        <p>姓名: {{name}}</p>
                        <p>性别: {{sex}}</p>
                        <p>年龄: {{age}}</p>
                        <p>案由: {{cases}}</p>
                        <p>案件名称: {{caseName}}</p>
                    </div>
                    <div class="Content">
                        <p>联系方式: {{escortPerson}}</p>
                        <p>功能室名称: {{roomName}}</p>
                        <p>证件号: {{cardNumber}}</p>
                    </div>
                </div>
            </div>
            <div class="personList">
                <base-table
                    :baseTableData="baseTableData.list"
                    :baseTableDataTotal="baseTableData.total"
                    baseTableDataPrimaryKey="F_Id"
                    :baseTablePageCurrent="baseTablePageCurrent"
                    :baseTablePageSize="baseTablePageSize"
                    @onBaseTableCurrentChange="baseTableCurrentChange"
                    @onBaseTablePageSizeChange="baseTablePageSizeChange"
                    @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
                >
                    <el-table-column prop="Name" label="人员名称"></el-table-column>
                    <el-table-column prop="Age" label="年龄"></el-table-column>
                    <el-table-column prop="Gender" :formatter="formatterSex" label="性别"></el-table-column>
                    <el-table-column prop="ZFCaseTypeName" v-if="false" label="案由"></el-table-column>
                    <el-table-column prop="Phone" v-if="false" label="联系方式"></el-table-column>
                    <el-table-column prop="ZFCaseName" label="案件名称"></el-table-column>
                    <el-table-column prop="CardNumber" v-if="false" label="证件编号"></el-table-column>
                    <el-table-column prop="FuncName" v-if="false" label="功能室"></el-table-column>
                </base-table>
            </div>
        </div>
        <base-dialog
            :isBaseDialog="isBaseDialog"
            :baseDialogFormData="baseDialogFormData"
            :title="formType !=3 ? '登记' : '离开'"
            @onHandleIsBaseDialog="handleIsBaseDialog"
            @onPostBaseDialogFormData="chooseSet"
        >
            <template v-slot:form>
                <div style="overflow: hidden;">
                    <div style="width:50%;border:1px solid #ccc;float:left">
                        <div class="setRoom">
                            <div>
                                <el-input
                                    v-model="baseDialogFormData.fId"
                                    v-if="false"
                                    :disabled="true"
                                    style="width:80%"
                                ></el-input>
                                <el-form-item
                                    prop="wristbanNo"
                                    :rules="[{'required': true,'message': '请将光标放入手环编号框并刷手环','trigger': 'blur'}]"
                                    style="font-size:20px"
                                    label="手环编号"
                                >
                                    <input
                                        type="text"
                                        ref="wristbanNo"
                                        id="wristbanNo"
                                        placeholder="请输入内容"
                                        @keyup.enter="getPeopleByWristband('wristbanNo')"
                                        class="el-input__inner"
                                        style="width:80%;height:32px;line-height:32px;margin-left:10px" 
                                        />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item prop="name" style="font-size:20px" label="人员名称">
                                    <el-input
                                        v-model="baseDialogFormData.name"
                                        :disabled="true"
                                        style="width:80%"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item prop="caseName" style="font-size:20px" label="案件名称">
                                    <el-input
                                        v-model="baseDialogFormData.caseName"
                                        :disabled="true"
                                        style="width:80%"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="formType==3">
                                <el-form-item prop="personSite" style="font-size:20px" label="所在位置">
                                    <el-input
                                        v-model="baseDialogFormData.personSite"
                                        :disabled="true"
                                        style="width:80%"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="formType!=3">
                                <el-form-item prop="funcId" style="font-size:20px" label="功  能  室">
                                    <el-select
                                        placeholder="请选择"
                                        filterable
                                        style="width:80%"
                                        v-model="baseDialogFormData.funcId"
                                    >
                                        <el-option
                                            v-for="item in functionData"
                                            :key="item.funcID"
                                            :label="item.funcName"
                                            :value="item.funcID"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <!-- <div>
                                <el-form-item prop="cardCode" style="font-size:20px" label="民警编号">
                                    <el-input
                                        v-model="baseDialogFormData.cardCode"
                                        @keyup.enter.native="getPolice()"
                                        placeholder="请输入内容"
                                        style="width:80%"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item prop="policeName" style="font-size:20px" label="民警名称">
                                    <el-input
                                        v-model="baseDialogFormData.policeName"
                                        :disabled="true"
                                        style="width:80%"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="false">
                                <label>民警Id：</label>
                                <el-input
                                    v-model="baseDialogFormData.policeId"
                                    :disabled="true"
                                    style="width:80%"
                                ></el-input>
                            </div> -->
                        </div>
                    </div>
                    <div style="width:49%;border:1px solid #ccc;float:left;margin-bottom:10px">
                        <div style="width:100%;height:400px;text-align:center;">
                            <el-image
                                style="width:98%;height:98%;margin-top:1%;"
                                :src="baseDialogFormData.picture"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </base-dialog>
    </div>
</template>

<script>
import functionRoom from "@/apis/functionRoom.js";
import CaseWaitRoomDialogItem from "./components/CaseWaitRoomDialogItem.vue";
import CaseMainTop from "@/components/CaseMainTop.vue";
export default {
    components: {
        CaseMainTop,
        CaseWaitRoomDialogItem
    },
    data() {
        return {
            Bracelet: "",
            caseMainTopFormData: {},
            personInfo: {},
            baseTableData: {
                total: 0,
                list: []
            },
            baseTablePageCurrent: 1,
            baseTablePageSize: 10,
            baseTableCurrent: {},
            typelist: [],
            roomList: [],
            isBaseDialog: false,
            showindex: null,
            name: "",
            sex: "",
            age: "",
            cases: "",
            caseName: "",
            escortPerson: "",
            roomName: "",
            cardNumber: "",
            srcPic: require('@/assets/images/room/badsmail.png'),
            //业务类型（1候问，2讯询问，3离开）
            //刷手环信息
            baseDialogFormData: {
                picture:require('@/assets/images/room/bad.png'),
            },
            //可用功能室
            functionData: [],
            formType: 0,
            roomId:''//查询的功能室id
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            let obj = {
                type: this.caseMainTopFormData.type
            };
            functionRoom.getRoomlist(obj).then(res => {
                if (res.code == 0) {
                    this.roomList = res.rows;
                }
            });
        },
        getPeople(id) {
             this.name = '';
            this.sex = '';
            this.age = '';
            this.cases = '';
            this.caseName = '';
            this.escortPerson ='';
            this.roomName = '';
            this.cardNumber = '';
            this.srcPic = require('@/assets/images/room/badsmail.png')
            if(id!="")
            {
                this.roomId=id
            }
            functionRoom
                .getPeopleByRoomId({
                    roomId: this.roomId,
                    pageNum:this.baseTablePageCurrent,
                    pageSize:this.baseTablePageSize
                })
                .then(res => {
                    if (res.code == 0) {
                        this.baseTableData.list = res.rows;
                        this.baseTableData.total = res.total;
                    }
                });
        },

        getPeopleByWristband(ID) {
            var no = document.getElementById(ID).value;
            if (no != "") {
                var formType=this.formType
                functionRoom
                    .getPersonmain({
                        wristbanNo: no
                    })
                    .then(res => {
                        if (res.code == 0) {
                            var data = res.data;
                            if (data != null) {
                                this.baseDialogFormData=res.data
                                this.baseDialogFormData.funcId=""
                                functionRoom
                                    .limitedRoomList({
                                        roomType: formType,
                                        Sex: data.gender,
                                        Personid: res.data.fId
                                    })
                                    .then(res => {
                                        if (res.code == 0) {
                                            this.functionData = res.rows;
                                            this.baseDialogFormData = data;
                                        }
                                    });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: "当前手环不存在嫌疑人",
                                    type: "warning"
                                });
                                document.getElementById(ID).value = "";
                                this.$refs.wristbanNo.focus();
                            }
                        }
                    });
            } else {
                this.$message({
                    showClose: true,
                    message: "请刷卡",
                    type: "warning"
                });
                document.getElementById(ID).value = "";
                this.$refs.wristbanNo.focus();
            }
        },
        getPolice() {
            functionRoom
                .getPolice({
                    cardCode: this.baseDialogFormData.cardCode
                })
                .then(res => {
                    if (res.code == 0) {
                        if (res.data != null) {
                            this.baseDialogFormData.policeId =
                                res.data.F_UserId;
                            this.baseDialogFormData.policeName =
                                res.data.F_RealName;
                        } else {
                            this.$message({
                                showClose: true,
                                message: "当前卡未绑定民警",
                                type: "warning"
                            });
                        }
                    }
                });
        },
        getpersonmain(num) {
            this.baseDialogFormData.picture=require('@/assets/images/room/bad.png')
            this.formType = num;
            this.$nextTick(() => {
                this.$refs.wristbanNo.focus();
                document.getElementById('wristbanNo').value = "";
            });
            this.isBaseDialog = true;
        },
        postFormData() {
            this.$validate("caseMainTopForm")
                .then(res => {
                    this.getList();
                })
                .catch(err => {
                    console.log("err", err);
                });
        },
        /* 表格操作 */
        baseTableCurrentChange(row, index) {
            console.log("当前选中表格行", row, index);
            this.baseTableCurrent = row;
            this.name = row.Name;
            this.sex =(row.Gender=="1"?"男":"女");
            this.age = row.Age;
            this.cases = row.ZFCaseTypeName;
            this.caseName = row.ZFCaseName;
            this.escortPerson = row.Phone;
            this.roomName = row.FuncName;
            this.cardNumber = row.CardNumber;
            if (row.FrontPicture != null&&row.FrontPicture!="") this.srcPic = row.FrontPicture;
            else this.srcPic = require('@/assets/images/room/badsmail.png')
        },
        baseTablePageSizeChange(val) {
            console.log("当前页码", val);
            this.baseTablePageSize = val;
            this.getPeople("");
        },
        baseTablePageCurrentChange(val) {
            console.log("每页数量", val);
            this.baseTablePageCurrent = val;
            this.getPeople("");
        },
        checkItem(index, item) {
            this.showindex = index;
            this.getPeople(item.FuncID);
        },
        handleIsBaseDialog(bool) {
            this.baseDialogFormData = {};
            this.isBaseDialog = bool;
        },
        chooseSet() {
            if (this.baseDialogFormData.fId != "") {
                if (this.formType != 3) {
                    if (
                        this.baseDialogFormData.funcId != "" &&
                        this.baseDialogFormData.funcId != null
                    ) {
                        functionRoom
                            .accessRoom({
                                personId: this.baseDialogFormData.fId,
                                functionRoomId: this.baseDialogFormData.funcId,
                                PoliceId: this.baseDialogFormData.policeId
                            })
                            .then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        showClose: true,
                                        message: "操作成功",
                                        type: "success"
                                    });
                                    this.getList();
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: "操作失败",
                                        type: "error"
                                    });
                                }
                            });
                    } else {
                        this.$message({
                            showClose: true,
                            message: "请选择功能室",
                            type: "warning"
                        });
                    }
                } else {
                    functionRoom
                        .outRoom({
                            personId: this.baseDialogFormData.fId,
                            PoliceId: this.baseDialogFormData.policeId
                        })
                        .then(res => {
                            ``;
                            if (res.code == 0) {
                                this.$message({
                                    showClose: true,
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getList();
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: "操作失败",
                                    type: "error"
                                });
                            }
                        });
                }
            } else {
                this.$message({
                    showClose: true,
                    message: "请刷卡选择嫌疑人",
                    type: "warning"
                });
            }
        },
        formatterSex(row, column) {
            if (row.Gender == "1") return "男";
            else if (row.Gender == "2") return "女";
            else return "未知";
        }
    }
};
</script>

<style scoped lang="scss">
.page-main {
    width: 100%;
    height: 100%;
    .room-block {
        /*width: 19.3%;*/
        width: 9%;
        max-width: 150px;
        margin-right: 4%;
        height: 150px;
        cursor: pointer;
        float: left;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        border:1px solid rgba(108,223,252,1);
        background:linear-gradient(-45deg,rgba(6,86,206,1) 0%,rgba(34,145,227,1) 100%);
        &:nth-of-type(8n) {
            margin-right: 0;
        }
        &.checked {
            border: 3px solid rgb(56, 126, 229);
        }
        &.have {
            background:rgba(252,162,155,0.2);
            border:1px solid rgba(252,162,155,1);
            .room-block-header {
                background:rgba(252,162,155,1);
                color: #030A43;
            }
            .room-block-body {
                height: 73%;
                width: 100%;
            }
        }
        .room-block-header {
            width:100%;
            height:40px;
            line-height: 40px;
            background:rgba(172,231,253,1);
            color: #030A43;
            text-align: center;
        }
        .room-block-body {
            width: 100%;
            flex: 1;
            .num {
                text-align: center;
                font-size:60px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(251,185,92,1);
            }
            .txt {
                font-size:18px;
                text-align: center;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:22px;
            }
        }
    }
}


.personbox {
    width: 100%;
    height: 293px;
}
.personDetail {
    width: 50%;
    height: 100%;
    float: left;
}
.personList {
    width: 50%;
    height: 95%;
    float: left;
    border: 1px solid #6cdffc;
    margin-top: 0.5%;
    padding: 30px 20px;
    overflow-x: scroll;
}
.personPic {
    width: 35%;
    height: 95%;
    margin: 1% 0;
    float: left;
}
.personInformation {
    margin-top: 1%;
    width: 55%;
    height: 95%;
    border: 1px solid rgb(56, 126, 229);
    float: left;
    margin-left: 2%;
    .room-block-header {
        width:100%;
        height:40px;
        line-height: 40px;
        background:rgba(172,231,253,1);
        color: #030A43;
        text-align: center;
    }
}
.Content {
    height: 85%;
    width: 48%;
    margin: 1%;
    float: left;
}
.Content p {
    color: white;
    line-height: 40px;
    margin-left: 3%;
}
.setRoom {
    width: 90%;
    height: 390px;
    font-size: 20px;
    margin-left: 30px;
    text-indent: 10px;
    margin-top: 10px;
}
.setRoom p {
    line-height: 50px;
}
.setRoom div {
    margin-top: 5px;
}
</style>
