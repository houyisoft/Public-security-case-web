<template>
    <div class="suspect-item">
        <base-top-form
            title="出区登记列表信息"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="personnelType" label="人员类型：">
                    <el-select
                        v-model="baseTopFormData.personnelType"
                        clearableonBaseTablePageSizeChange
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in typeObjData.personTypes"
                            :key="item.fitemvalue"
                            :label="item.fitemname"
                            :value="item.fitemvalue"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="人员姓名：">
                    <el-input placeholder="请输入" v-model="baseTopFormData.name"></el-input>
                </el-form-item>
            </template>
        </base-top-form>

        <!-- <div class="table-btns-wrap">
            <div class="table-btn-wrap" @click="handleElecListDialog(true)">
                <el-button type="primary">查看出区电子清单</el-button>
            </div>
            <div class="table-btn-wrap" @click="handleExitDetail(true)">
                <el-button type="primary">出区</el-button>
            </div>
        </div>-->
        <div style="text-align: right">
            <!-- <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handleExitDetail(true)"
            >出区</el-button>-->
            <el-button
                size="mini"
                type="text"
                icon="el-icon-watch-1"
                @click="handleShouHuanDialog('DialogCardNumber')"
            >刷卡/手环出区</el-button>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handleElecListDialog(true)"
            >查看出区电子清单</el-button>
        </div>
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
            <el-table-column align="center" type="index" label="序号"></el-table-column>
            <el-table-column align="center" prop="personnelTypeName" label="人员类型" width="170"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column align="center" prop="genderName" label="性别" width="50"></el-table-column>
            <el-table-column align="center" prop="wristbandNo" label="卡/手环编号" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.wristbandNo != 'null'">{{scope.row.wristbandNo}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="isBackCard" label="卡/手环是否归还" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" effect="dark" v-if="scope.row.wristbandNo && scope.row.wristbandNo != 'null' && scope.row.isBackCard == '1'">是</el-tag>
                    <el-tag type="danger" effect="dark" v-else-if="scope.row.wristbandNo != 'null' && scope.row.wristbandNo">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="isUserState" label="是否有物品" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" effect="dark" v-if="scope.row.isUserState == '1'">是</el-tag>
                    <el-tag type="danger" effect="dark" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="isReturnGoods" label="物品是否取出" width="110">
                <template slot-scope="scope">
                    <el-tag type="success" effect="dark" v-if="scope.row.isReturnGoods">是</el-tag>
                    <el-tag type="danger" effect="dark" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="outAreaTime" label="是否出区" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" effect="dark" v-if="scope.row.outAreaTime">是</el-tag>
                    <el-tag type="danger" effect="dark" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="fCreateDate" label="入区时间" width="160"></el-table-column>
            <el-table-column align="center" prop label="出区时间" width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.outAreaTime != 'null'">{{scope.row.outAreaTime}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="outRouteName" label="出区去向" width="100"></el-table-column>
            <el-table-column prop label="出区备注">
                <template slot-scope="scope">
                    <span v-if="scope.row.outRemark != 'null'">{{scope.row.outRemark}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="opt" label="操作" width="60">
                <template slot-scope="scope">
                    <el-button
                        v-if="!scope.row.outAreaTime"
                        size="mini"
                        type="text"
                        icon="el-icon-document-delete"
                        @click="handleExitDetail(true, scope.row)"
                    >出区</el-button>
                </template>
            </el-table-column>
        </base-table>

        <!-- 人脸验证出区 -->
        <el-dialog
            class="scan-dialog"
            width="650px"
            :close-on-click-modal="false"
            :visible.sync="isFaceDialog"
            title="请选择"
        >
            <div class="scan-dialog-wrap">
                <div class="dialog-big-text">请对准摄像头进行人脸识别</div>
                <div class="dialog-small-text">识别成功后自动关闭</div>
            </div>
        </el-dialog>

        <!-- 刷卡出区 -->
        <el-dialog
            class="scan-dialog"
            width="650px"
            :close-on-click-modal="false"
            :visible.sync="isScanCardDialog"
            title="请选择"
        >
            <div class="scan-dialog-wrap">
                <input
                    type="text"
                    ref="refDialogCardNumber"
                    id="DialogCardNumber"
                    @keyup.enter="changeDialogBandCardNumber('DialogCardNumber')"
                    class="dialog-hide-input"
                />
                <el-image
                    class="dialog-band-img"
                    :src="require('@/assets/images/case/caseEntry/wristbandDialogImg.png')"
                ></el-image>
                <div class="dialog-big-text">请将卡片置于机器上方</div>
                <div class="dialog-small-text">读取成功后自动关闭</div>
            </div>
        </el-dialog>

        <!-- 查看出区电子清单 -->
        <el-dialog
            class=""
            :close-on-click-modal="false"
            :visible.sync="isElecListDialog"
            title="出区人员电子清单"
            width="1200px"
        >
            <!-- <order-detail
        ref="orderDetailEl"
        :keyProp="confirmId"
        @savesuccess="saveOrderDetailSuccess"
            />-->
            <table-detail :keyProp="confirmId"></table-detail>
            <template slot="footer">
                <!-- <el-button
          type="primary"
          @click="
            () => {
              this.$refs.orderDetailEl.confrimSuspect()
            }
          "
                >保存</el-button>-->
            </template>
        </el-dialog>

        <!-- 出区信息 -->
        <el-dialog :close-on-click-modal="false" :visible.sync="isExitDetail" title="出区信息">
            <el-form
                :model="exitDetailDialogFormData"
                label-width="110px"
                ref="exitDetailDialogForm"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="人员姓名：">
                            {{
                            exitDetailDialogFormData.name
                            }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="人员编号：">
                            {{
                            exitDetailDialogFormData.ypeople
                            }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="人员类型：">
                            {{
                            exitDetailDialogFormData.personnelTypeName
                            }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="出区去向：">
                    <el-select
                        v-model="exitDetailDialogFormData.outRoute"
                        placeholder="请选择"
                        style="width: 95%;"
                    >
                        <el-option
                            v-for="item in typeObjData.goWhereTypes"
                            :key="item.fitemvalue"
                            :label="item.fitemname"
                            :value="item.fitemvalue"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="是否已归还：">
                    <el-radio v-model="exitDetailDialogFormData.isBackCard" label="1">是</el-radio>
                    <el-radio v-model="exitDetailDialogFormData.isBackCard" label="0">否</el-radio>
                </el-form-item>-->
                <!-- <el-form-item label="手环/卡编号：">
                    <el-input
                        v-model="exitDetailDialogFormData.wristbandNo"
                        placeholder="请输入编号"
                        style="width: 218px;"
                        :disabled="true"
                    ></el-input>
                </el-form-item>-->
                <el-form-item label="备注：">
                    <el-input
                        type="textarea"
                        v-model="exitDetailDialogFormData.outRemark"
                        rows="5"
                        style="width: 95%;"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button type="primary" @click="createElecList">确定出区并生成办案区使用情况记录表</el-button>
                <el-button type="primary" @click="isExitDetail = false">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import OrderDetail from "./Detail";
import TableDetail from "./TableDetail";
import Apis from "@/apis/apiCase/exit.js";
import { mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            DialogCardNumber: "",
            entryreGistrationId: "",
            isScanCardDialog: false,
            // 顶部表单数据
            baseTopFormData: {
                personnelType: "",
                name: ""
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
            isExitDetail: false,

            /* 出区信息弹窗表单数据 */
            exitDetailDialogFormData: {},
            confirmId: "",
            rowList: null,
            personId: "",

            /* 人员类型数据字典 */
            personTypesData: []
        };
    },
    components: { OrderDetail, TableDetail },
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
        /* 6. 手环/卡弹窗,刷腕带/卡后回车回调事件 */
        changeDialogBandCardNumber(ID) {
            var wristbandNo = document.getElementById(ID).value;
            if(wristbandNo.length > 0){
                Apis.queryDetailByBand({ code: wristbandNo }).then(res => {
                    if (res.code === 0) {
                        if (res.data == null) {
                            this.$message.warning(
                                "卡/腕带没有找到相关人员，请确认后重试！"
                            );
                            document.getElementById(ID).value = "";
                            this.$refs.refDialogCardNumber.focus();
                        } else {
                            this.isScanCardDialog = false;
                            document.getElementById(ID).value = "";
                            res.data.personnelTypeName = this.personTypesData.filter(
                                item =>
                                    item.fitemvalue == res.data.personnelType
                            )[0].fitemname;
                            this.handleExitDetail(true, res.data);
                        }
                    } else {
                        this.$message.warning(
                            "卡/腕带没有找到相关人员，请确认后重试！"
                        );
                        document.getElementById(ID).value = "";
                        this.$refs.refDialogCardNumber.focus();
                    }
                });
            }
        },

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
                this.personTypesData = res.data;
            });
        },

        getList() {
            const { pageNum, pageSize } = this;
            Apis.getSuspectList({
                ...this.baseTopFormData,
                pageNum,
                pageSize,
                personId: this.personId,
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
            this.rowList = null;
            this.personId = "";
            this.getList();
            console.log(this.rowList);
        },

        /* 表格上方按钮 */
        handleFaceDialog(bool) {
            this.isFaceDialog = bool;
        },
        handleElecListDialog(bool) {
            if (this.rowList == null) {
                this.$message.error("请先选择列表");
                return;
            }
            this.confirmId = this.rowList.fId;
            this.isElecListDialog = bool;
        },
        handleShouHuanDialog(ID) {
            this.isScanCardDialog = true;
            this.$nextTick(() => {
                //自动获取焦点 element组件autofocus失效
                this.$refs.refDialogCardNumber.focus();
            });
        },
        handleExitDetail(bool, row) {
            if (row) {
                this.isExitDetail = bool;
                this.entryreGistrationId = row.entryreGistrationId;
                this.exitDetailDialogFormData = { ...row };
                if (this.exitDetailDialogFormData.outRemark == "null") {
                    this.exitDetailDialogFormData.outRemark = "";
                }
            } else {
                this.$message.error("查无数据！");
            }
        },

        /* 表格操作 */
        baseTableCurrentChange(row) {
            console.log("选中行", row);
            this.rowList = row;
        },
        baseTablePageSizeChange(val) {
            this.pageSize = val;
            this.pageNum = 1;
            this.getList();
        },
        baseTablePageCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        /* 出区信息弹窗 */
        // 确定出区并生成办案区使用情况记录表
        createElecList() {
            console.log(this.exitDetailDialogFormData);
            if (this.exitDetailDialogFormData.outRoute != null) {
                this.exitDetailDialogFormData.entryreGistrationId = this.entryreGistrationId;
                this.exitDetailDialogFormData.isBackCard = 1;
                Apis.postSuspectData({
                    fId:
                        this.exitDetailDialogFormData.fid == null
                            ? this.exitDetailDialogFormData.fId
                            : this.exitDetailDialogFormData.fid,
                    outRoute: this.exitDetailDialogFormData.outRoute,
                    entryreGistrationId: this.exitDetailDialogFormData
                        .entryreGistrationId,
                    wristbandId: this.exitDetailDialogFormData.wristbandId,
                    wristbandNo: this.exitDetailDialogFormData.wristbandNo,
                    outRemark: this.exitDetailDialogFormData.outRemark,
                    isBackCard: this.exitDetailDialogFormData.isBackCard
                }).then(res => {
                    debugger;
                    if (res.code === 0) {
                        this.isExitDetail = false;
                        this.confirmId = this.exitDetailDialogFormData.fid == null
                            ? this.exitDetailDialogFormData.fId
                            : this.exitDetailDialogFormData.fid;
                        this.isElecListDialog = true;
                        this.$message.success(res.data);
                        this.getList();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            } else {
                this.$message.error("请选择出区去向！");
            }
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
} /* 扫描/扫手环弹窗 */
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

</style>
