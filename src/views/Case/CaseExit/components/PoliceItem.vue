<template>
    <div class="police-item">
        <base-top-form
            title="出区登记列表信息"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="policeName" label="民警姓名：">
                    <el-input placeholder="请输入" v-model="baseTopFormData.policeName"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="民警卡号：">
                    <el-input placeholder="请输入" v-model="baseTopFormData.cardNo"></el-input>
                </el-form-item>
            </template>
        </base-top-form>
        <div style="text-align: right">
            <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="handleShouHuanDialog(true)"
            >刷卡/手环出区</el-button>
        </div>
        <base-table
            :stripe="false"
            :baseTableData="baseTableData.list"
            :baseTableDataTotal="baseTableData.total"
            :baseTablePageCurrent="pageNum"
            :baseTablePageSize="pageSize"
            baseTableDataPrimaryKey="fid"
            @onBaseTableCurrentChange="baseTableCurrentChange"
            @onBaseTablePageSizeChange="baseTablePageSizeChange"
            @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
        >
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="policeName" label="民警姓名" align="center"></el-table-column>
            <el-table-column prop="policeNO" label="警号" align="center"></el-table-column>
            <el-table-column prop="cardNo" label="定位卡号" align="center" width="110">
                <template slot-scope="scope">
                    <span v-if="scope.row.cardNo != 'null'">{{scope.row.cardNo}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="isBack" label="是否归还" width="80">
                <template slot-scope="scope">
                    <el-tag
                        type="success"
                        effect="dark"
                        v-if="scope.row.cardNo && scope.row.cardNo != 'null' && scope.row.isBack=='1'"
                    >是</el-tag>
                    <el-tag
                        type="danger"
                        effect="dark"
                        v-else-if="scope.row.cardNo && scope.row.cardNo != 'null'"
                    >否</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="postCardNo" label="门禁卡号" align="center" width="110">
                <template slot-scope="scope">
                    <span v-if="scope.row.postCardNo != 'null'">{{scope.row.postCardNo}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="isBackPost" label="是否归还" width="80">
                <template slot-scope="scope">
                    <el-tag
                        type="success"
                        effect="dark"
                        v-if="scope.row.postCardNo && scope.row.postCardNo != 'null' && scope.row.isBackPost=='1'"
                    >是</el-tag>
                    <el-tag
                        type="danger"
                        effect="dark"
                        v-else-if="scope.row.postCardNo && scope.row.postCardNo != 'null'"
                    >否</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="outDateTime" label="是否出区" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" effect="dark" v-if="scope.row.outDateTime">是</el-tag>
                    <el-tag type="danger" effect="dark" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="inDateTime" label="入区时间" width="180" align="center"></el-table-column>
            <el-table-column prop="outDateTime" label="出区时间" width="180" align="center"></el-table-column>
            <el-table-column prop="opt" label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button
                        v-if="!scope.row.outDateTime"
                        size="mini"
                        type="text"
                        icon="el-icon-view"
                        @click="handleExitDetail(true, scope.row)"
                    >出区</el-button>
                    <el-button
                        v-if="scope.row.cardNo && scope.row.cardNo != 'null' && scope.row.isBack != '1'"
                        size="mini"
                        type="text"
                        icon="el-icon-view"
                        @click="restitutionCard(scope.row,'cardNo')"
                    >归还定位卡</el-button>
                    <el-button
                        v-if="scope.row.postCardNo && scope.row.postCardNo != 'null' && scope.row.isBackPost != '1'"
                        size="mini"
                        type="text"
                        icon="el-icon-view"
                        @click="restitutionCard(scope.row,'postCardNo')"
                    >归还门禁卡</el-button>
                </template>
            </el-table-column>
        </base-table>

        <!-- 刷卡出区 -->
        <el-dialog
            :close-on-click-modal="false"
            class="scan-dialog"
            :visible.sync="isScanCardDialog"
            title="刷卡/手环出区"
            width="650px"
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
                label-width="150px"
                ref="exitDetailDialogForm"
            >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="民警姓名：">
                            {{
                            exitDetailDialogFormData.policeName
                            }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="警号：">
                            {{
                            exitDetailDialogFormData.policeNO
                            }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="定位卡号：" v-if="exitDetailDialogFormData.cardNo">
                            {{
                            exitDetailDialogFormData.cardNo
                            }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item
                            v-if="exitDetailDialogFormData.cardNo"
                            label="是否归还："
                            prop="isBackCard"
                            :rules="[{
                        required: true,
                        message: '请选择是否已归还定位卡',
                        trigger: 'change',
                    }]"
                        >
                            <el-radio-group v-model="exitDetailDialogFormData.isBackCard">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="门禁卡号：" v-if="exitDetailDialogFormData.postCardNo">
                            {{
                            exitDetailDialogFormData.postCardNo
                            }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item
                            v-if="exitDetailDialogFormData.postCardNo"
                            label="是否归还："
                            prop="isBackPostCard"
                            :rules="[{
                        required: true,
                        message: '请选择是否已归还门禁卡',
                        trigger: 'change',
                    }]"
                        >
                            <el-radio-group v-model="exitDetailDialogFormData.isBackPostCard">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item
                    v-if="String(exitDetailDialogFormData.postCardNo)"
                    label="门禁卡号："
                    ref="card1"
                    prop="postCardNo1"
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
                    ref="card2"
                    prop="cardNo1"
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
                        v-model="exitDetailDialogFormData.description"
                        rows="5"
                        style="width: 85%;"
                    ></el-input>
                </el-form-item>-->
            </el-form>
            <template slot="footer">
                <el-button type="primary" @click="createElecList">确认</el-button>
                <!-- <el-button type="primary" @click="handleExitDetail(false)">关闭</el-button> -->
            </template>
        </el-dialog>

        <!-- 7. 扫描手环 -->
        <!-- <el-dialog
      class="scan-dialog"
      width="650px"
      :close-on-click-modal="false"
      :visible.sync="isScanBandDialog"
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
        </el-dialog>-->
    </div>
</template>

<script>
import Apis from "@/apis/apiCase/exit.js";
export default {
    data() {
        return {
            isScanBandDialog: false,
            DialogBandNumber: "",
            // 顶部表单数据
            baseTopFormData: {
                policeName: "",
                policeNo: ""
            },
            rowList: null,
            // 表格数据
            baseTableData: {
                total: 0,
                list: []
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
                peopleTypeName: ""
            }
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            const { pageNum, pageSize } = this;
            Apis.getPoliceList({
                ...this.baseTopFormData,
                pageNum,
                pageSize,
                centerInfoId: this.$store.state.userInfo.fcompanyid
            }).then(res => {
                this.baseTableData.list = res.rows || [];
                this.baseTableData.total = res.total || 0;
            });
        },
        postBaseTopFormData() {
            this.getList();
            this.rowList = null;
        },
        /* 6. 手环/卡弹窗,刷腕带/卡后回车回调事件 */
        changeDialogBandCardNumber(ID) {
            var cardNo = document.getElementById(ID).value;
            if (cardNo.length > 0) {
                if (this.flag) {
                    if (this.flag === "postCard") {
                        if (
                            cardNo === this.exitDetailDialogFormData.postCardNo
                        ) {
                            this.exitDetailDialogFormData.postCardNo1 = cardNo;
                            this.isScanBandDialog = false;
                        } else {
                            this.$message.error("门禁卡号不匹配！");
                        }
                    } else {
                        if (cardNo === this.exitDetailDialogFormData.cardNo) {
                            this.exitDetailDialogFormData.cardNo1 = cardNo;
                            this.isScanBandDialog = false;
                        } else {
                            this.$message.error("定位卡号不匹配！");
                        }
                    }
                    document.getElementById(ID).value = "";
                    this.$refs.refDialogCardNumber.focus();
                } else {
                    Apis.getPoliceList({
                        cardNo: cardNo,
                        centerInfoId: this.$store.state.userInfo.fcompanyid,
                        isInArea: "1"
                    }).then(res => {
                        this.isScanCardDialog = false;
                        this.handleExitDetail(true, res.rows[0]);
                        document.getElementById(ID).value = "";
                        this.$refs.refDialogCardNumber.focus();
                    });
                }
            }
        },
        // 打开弹窗
        cardClick(flag) {
            this.flag = flag;
            this.isScanBandDialog = true;
        },
        // 刷脸
        handlePersonDialog() {
            this.isFaceDialog = true;
            //   this.DialogBandNumber =09159134 "";
            //   this.$nextTick(() => {
            //     //自动获取焦点 element组件autofocus失效
            //     this.$refs["refDialogBandNumber"].$refs.input.focus();
            //   });
        },
        // 刷手环
        handleShouHuanDialog(ID) {
            this.isScanCardDialog = true;
            this.$nextTick(() => {
                //自动获取焦点 element组件autofocus失效
                this.$refs.refDialogCardNumber.focus();
            });
        },
        /* 表格上方按钮 */
        handleFaceDialog(bool) {
            this.isFaceDialog = bool;
        },
        handleExitDetail(bool, row) {
            if (row) {
                this.isExitDetail = bool;
                Object.assign(
                    this.exitDetailDialogFormData,
                    JSON.parse(JSON.stringify(row))
                );
            } else {
                this.$message.error("查无数据！请确认后重试");
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
            this.$refs.exitDetailDialogForm.validate(valid => {
                if (valid) {
                    this.exitDetailDialogFormData.fId = this.exitDetailDialogFormData.fid;
                    this.exitDetailDialogFormData.type = 2; //保存类型 1-工作人员  2-民警 3-其他
                    this.$delete(this.exitDetailDialogFormData, "fid");
                    console.log(
                        this.exitDetailDialogFormData,
                        "exitDetailDialogFormData"
                    );
                    Apis.postPoliceData({
                        fId: this.exitDetailDialogFormData.fId,
                        type: 2,
                        cardNo: this.exitDetailDialogFormData.cardNo,
                        isBackCard: this.exitDetailDialogFormData.isBackCard,
                        postCardNo: this.exitDetailDialogFormData.postCardNo,
                        isBackPostCard: this.exitDetailDialogFormData
                            .isBackPostCard
                    }).then(res => {
                        if (res.code === 0) {
                            this.isExitDetail = false;
                            this.$message.success("保存成功");
                            this.$refs.exitDetailDialogForm.resetFields();
                            this.getList();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        },
        // 归还卡
        restitutionCard(row, type) {
            var varBackCard = '';
            var varBackPostCard = '';
            if (type == "cardNo") {
                varBackCard = "1";
            }
            if (type == "postCardNo") {
                varBackPostCard = "1";
            }
            Apis.restitutionCard({
                fId: row.fid,
                isBackCard: varBackCard,
                isBackPostCard: varBackPostCard
            }).then(res => {
                if (res.code === 0) {
                    this.$message.success("操作成功");
                    this.getList();
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.police-item {
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

        .face-dialog-img {
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
