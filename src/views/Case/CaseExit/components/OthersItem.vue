<template>
    <div class="others-item">
        <base-top-form
            title="出区登记列表信息"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="name" label="人员姓名：">
                    <el-input placeholder="请输入" v-model="baseTopFormData.name"></el-input>
                </el-form-item>
                <el-form-item prop="cardNo" label="卡号：">
                    <el-input placeholder="请输入" v-model="baseTopFormData.cardNo"></el-input>
                </el-form-item>
            </template>
        </base-top-form>
        <div style="text-align: right">
            <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handlePersonDialog(true)"
            >刷卡出区</el-button>
        </div>

        <base-table
            :isBaseTablePage="false"
            :stripe="false"
            :baseTableData="baseTableData.list"
            :baseTableDataTotal="baseTableData.total"
            :baseTablePageCurrent="pageNum"
            :baseTablePageSize="pageSize"
            baseTableDataPrimaryKey="id"
            @onBaseTableCurrentChange="baseTableCurrentChange"
            @onBaseTablePageSizeChange="baseTablePageSizeChange"
            @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
        >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="peopleTypeName" label="人员类型"></el-table-column>
            <el-table-column prop="policeName" label="工作人员姓名"></el-table-column>
            <el-table-column prop="cardNo" label="卡号"></el-table-column>
            <el-table-column prop="outDateTime" label="是否出区">
                <template slot-scope="scope">
                    <span v-if="scope.row.outDateTime">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column prop="inDateTime" label="入区时间" width="160"></el-table-column>
            <el-table-column prop="outDateTime" label="出区时间"></el-table-column>
            <el-table-column prop="opt" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button
                        v-if="!scope.row.outDateTime"
                        size="mini"
                        type="text"
                        icon="el-icon-view"
                        @click="handleExitDetail(true, scope.row)"
                    >出区</el-button>
                </template>
            </el-table-column>
        </base-table>

        <!-- 刷卡出区 -->
        <el-dialog
            class="scan-dialog"
            width="650px"
            :close-on-click-modal="false"
            :visible.sync="isFaceDialog"
            title="请选择"
        >
            <div class="scan-dialog-wrap">
                <el-image
                    class="dialog-band-img"
                    :src="
            require('@/assets/images/case/caseEntry/wristbandDialogImg.png')
          "
                ></el-image>
                <div class="dialog-big-text">请将卡片置于机器上方</div>
                <div class="dialog-small-text">读取成功后自动关闭</div>
            </div>
        </el-dialog>

        <!-- 出区信息 -->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="isExitDetail"
            @before-close="$refs.exitDetailDialogForm.resetFields()"
            destroy-on-close
            title="出区信息"
        >
            <el-form
                :model="exitDetailDialogFormData"
                label-width="200px"
                ref="exitDetailDialogForm"
            >
                <el-form-item label="人员姓名：">
                    {{
                    exitDetailDialogFormData.policeName
                    }}
                </el-form-item>
                <el-form-item label="人员类型：">
                    {{
                    exitDetailDialogFormData.peopleTypeName
                    }}
                </el-form-item>
                <el-form-item
                    v-if="exitDetailDialogFormData.cardNo"
                    label="是否已归还定位卡："
                    prop="isBackCard"
                    required
                    :rules="[
            {
              required: true,
              message: '请选择是否已归还定位卡',
              trigger: 'change',
            },
          ]"
                >
                    <el-radio-group v-model="exitDetailDialogFormData.isBackCard">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    v-if="exitDetailDialogFormData.postCardNo"
                    label="是否已归还门禁卡："
                    required
                    prop="isBackPostCard"
                    :rules="[
            {
              required: true,
              message: '请选择是否已归还门禁卡',
              trigger: 'change',
            },
          ]"
                >
                    <el-radio-group v-model="exitDetailDialogFormData.isBackPostCard">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    v-if="exitDetailDialogFormData.postCardNo"
                    label="门禁卡号："
                    prop="postCardNo1"
                    required
                    :rules="[
            {
              required: true,
              message: '请刷门禁卡',
              trigger: 'change',
            },
          ]"
                >
                    <base-fake-element
                        @onBaseFakeElementClick="cardClick('postCard')"
                        baseFakeElementFlag="card"
                        baseFakeElementType="card"
                        style="width: 218px;"
                        v-model="exitDetailDialogFormData.postCardNo1"
                    />
                </el-form-item>
                <el-form-item
                    v-if="exitDetailDialogFormData.cardNo"
                    label="定位卡号："
                    prop="cardNo1"
                    required
                    :rules="[
            {
              required: true,
              message: '请刷门禁卡',
              trigger: 'change',
            },
          ]"
                >
                    <base-fake-element
                        @onBaseFakeElementClick="cardClick('card')"
                        baseFakeElementFlag="card"
                        baseFakeElementType="card"
                        style="width: 218px;"
                        v-model="exitDetailDialogFormData.cardNo1"
                    />
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input
                        type="textarea"
                        v-model="exitDetailDialogFormData.outRemark"
                        rows="5"
                        style="width: 85%;"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button type="primary" @click="createElecList">确认</el-button>
                <!-- <el-button type="primary" @click="isExitDetail = false">关闭</el-button> -->
            </template>
        </el-dialog>

        <!-- 7. 扫描手环 -->
        <el-dialog
            class="scan-dialog"
            width="650px"
            :close-on-click-modal="false"
            :visible.sync="isScanBandDialog"
            title="请选择"
        >
            <div class="scan-dialog-wrap">
                <input
                    type="text"
                    ref="refDialogCardNumber"
                    id="DialogCardNumber"
                    class="dialog-hide-input"
                    @input="changeDialogBandCardNumber('DialogCardNumber')"
                />
                <el-image
                    class="dialog-band-img"
                    :src="
            require('@/assets/images/case/caseEntry/wristbandDialogImg.png')
          "
                ></el-image>
                <div class="dialog-big-text">请将卡片置于机器上方</div>
                <div class="dialog-small-text">读取成功后自动关闭</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Apis from "@/apis/apiCase/exit.js";
import { mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            DialogCardNumber: "",
            isScanBandDialog: false,
            // 顶部表单数据
            baseTopFormData: {
                cardNo: "",
                name: "",
            },
            // 表格数据
            baseTableData: {
                list: [],
            },
            pageNum: 1,
            pageSize: 10,

            // 弹窗显示隐藏
            isFaceDialog: false,
            isScanCardDialog: false,
            isExitDetail: false,

            /* 出区信息弹窗表单数据 */
            exitDetailDialogFormData: {
                isBackPostCard: "",
                isBackCard: "",
                postCardNo: "",
                postCardNo1: "",
                cardNo: "",
                cardNo1: "",
                outRemark: "",
                policeName: "",
                peopleTypeName: "",
            },
            rowList: null,
        };
    },
    computed: {
        ...mapState(["typeObjData"]),
    },
    mounted() {
        this.getList();
    },
    methods: {
        ...mapMutations(["updateTypeObjData"]),
        /* 6. 手环/卡弹窗,刷腕带/卡后回车回调事件 */
        changeDialogBandCardNumber(ID) {
            var wristbandNo = document.getElementById(ID).value;
            if (wristbandNo.length === 8) {
                if (this.flag) {
                    if (this.flag === "postCard") {
                        if (
                            wristbandNo ===
                            this.exitDetailDialogFormData.postCardNo
                        ) {
                            this.exitDetailDialogFormData.postCardNo1 = wristbandNo;
                            this.isScanBandDialog = false;
                        } else {
                            this.$message.error("门禁卡号不匹配！");
                        }
                    } else {
                        if (
                            wristbandNo === this.exitDetailDialogFormData.cardNo
                        ) {
                            this.exitDetailDialogFormData.cardNo1 = wristbandNo;
                            this.isScanBandDialog = false;
                        } else {
                            this.$message.error("门禁卡号不匹配！");
                        }
                    }
                    document.getElementById(ID).value = "";
                    this.$refs.refDialogCardNumber.focus();
                } else {
                    Apis.getOtherList({ wristbandNo }).then((res) => {
                        if (res.code === 0) {
                            this.isScanBandDialog = false;
                            this.handleExitDetail(true, res.rows[0]);
                            document.getElementById(ID).value = "";
                            this.$refs.refDialogCardNumber.focus();
                            this.flag = undefined;
                        }
                    });
                }
            }
        },
        // 打开弹窗
        cardClick(flag) {
            this.flag = flag;
            this.isScanBandDialog = true;
            this.$nextTick(() => {
                //自动获取焦点 element组件autofocus失效
                this.$refs.refDialogCardNumber.focus();
            });
        },
        getTypeList(type) {
            Apis.getTypeList({ type: type === "1" ? 16 : 1 }).then((res) => {
                this.updateTypeObjData({
                    personTypes: res.data || [],
                });
            });
        },
        getList() {
            const { pageNum, pageSize } = this;
            Apis.getOtherList({
                ...this.baseTopFormData,
                pageNum,
                pageSize,
                centerInfoId: this.$store.state.userInfo.fcompanyid,
            }).then((res) => {
                this.baseTableData.list = res.rows || [];
                this.baseTableData.total = res.total || 0;
            });
        },
        postBaseTopFormData() {
            this.getList();
            this.rowList = null;
        },

        /* 刷卡出区 */
        handlePersonDialog(bool) {
            this.isScanBandDialog = bool;
            this.$nextTick(() => {
                //自动获取焦点 element组件autofocus失效
                this.$refs["refDialogCardNumber"].$refs.input.focus();
            });
        },
        handleElecListDialog(bool) {
            this.isScanCardDialog = bool;
        },
        handleExitDetail(bool, row) {
            this.isExitDetail = bool;
            if (row) {
                this.getTypeList(row.type);
                Object.assign(
                    this.exitDetailDialogFormData,
                    JSON.parse(JSON.stringify(row))
                );
            } else {
                this.$message.error("查无数据！");
            }
        },
        /* 表格操作 */
        baseTableCurrentChange(row, index) {
            console.log("选中行", row, index);
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
            this.$refs.exitDetailDialogForm.validate((valid) => {
                console.log(valid);
                if (valid) {
                    Apis.postOtherData(this.exitDetailDialogFormData).then(
                        (res) => {
                            if (res.code === 0) {
                                this.isExitDetail = false;
                                this.$message.success("保存成功");
                                this.$refs.exitDetailDialogForm.resetFields();
                                this.getList();
                            } else {
                                this.$message.error(res.msg);
                            }
                        }
                    );
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
.others-item {
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
}
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
