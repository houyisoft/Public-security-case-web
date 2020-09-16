<template>
    <div class="case-belongings">
        <base-top-form
            title="随身物品列表信息"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="type" label="人员类型">
                    <el-select placeholder="请选择" clearable v-model="baseTopFormData.personnelType">
                        <el-option
                            :value="item.fitemvalue"
                            :label="item.fitemname"
                            v-for="(item, index) in types"
                            :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="人员姓名">
                    <el-input v-model="baseTopFormData.suspectName" placeholder="请输入"></el-input>
                </el-form-item>
            </template>
        </base-top-form>

        <div class="table-btns-wrap">
            <div class="table-btn-wrap" @click="brushHand()">
                <span>刷手环</span>
                <i class="el-icon-watch-1 btn-icon"></i>
            </div>
            <div class="table-btn-wrap" @click="goToInfoLocker">
                <span>储物柜使用情况</span>
                <i class="el-icon-s-order btn-icon"></i>
            </div>
            <!-- <div class="table-btn-wrap" @click="addGoodsDialog()">
                <span>添加物品</span>
                <i class="el-icon-s-goods btn-icon"></i>
            </div>-->
        </div>
        <el-table
            :data="baseTableData.list"
            border
            highlight-current-row
            @current-change="baseTableCurrentChange"
            style="width: 100%"
        >
            <el-table-column label width="50">
                <template slot-scope="scope">
                    <!--<el-radio  v-model="scope.row.ischeck">{{scope.row.ischeck}}</el-radio>-->
                    <el-radio v-model="radioCheck" :label="scope.row.suspectId">
                        {{
                        ""
                        }}
                    </el-radio>
                </template>
            </el-table-column>

            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="caseId" label="案件编号"></el-table-column>
            <el-table-column prop="caseName" label="案件名称"></el-table-column>
            <el-table-column prop="suspectName" label="嫌疑人姓名"></el-table-column>
            <el-table-column prop="issave" label="是否存放" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.issave == 0 || scope.row.issave == null">否</span>
                    <span v-else-if="scope.row.issave == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="isUse" label="是否已取出" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.isUse == 0 || scope.row.isUse == null">否</span>
                    <span v-else-if="scope.row.isUse == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        v-show="scope.row.outAreaTime == null"
                        icon="el-icon-s-goods"
                        @click.stop="addGoodsDialog(scope.row)"
                    >添加物品</el-button>
                    <el-button
                        type="text"
                        icon="el-icon-view"
                        @click.stop="seeGoodsList(scope.row)"
                    >查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="baseTopFormData.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="baseTopFormData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="baseTableData.total"
        ></el-pagination>

        <add-belongings-dialog-item
            :goodsList="isAddBelongingsDialog ? goodsList : []"
            :belongRow="belongRow"
            :isAddBelongingsDialog="isAddBelongingsDialog"
            @getGoods="getGoods"
            @onHandleAddBelongingsDialog="handleAddBelongingsDialog"
        ></add-belongings-dialog-item>
        <belongings-list-dialog-item
            :goodsList="isBelongingsListDialog ? goodsList : []"
            :belongRow="belongRow"
            :isBelongingsListDialog="isBelongingsListDialog"
            @onHandleBelongingsListDialog="handleBelongingsListDialog"
        ></belongings-list-dialog-item>
        <el-dialog
            class="scan-dialog"
            :close-on-click-modal="false"
            width="650px"
            :visible.sync="isScanBandDialog"
            @opened="dialogOpen"
            title="刷手环"
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
    </div>
</template>

<script>
import addBelongingsDialogItem from "@/views/Case/CaseBelongings/components/addBelongingsDialogItem.vue";
import belongingsListDialogItem from "@/views/Case/CaseBelongings/components/belongingsListDialogItem.vue";
import belong from "@/apis/apiCase/apiCaseBelongings.js";
export default {
    components: {
        addBelongingsDialogItem,
        belongingsListDialogItem,
    },
    data() {
        return {
            isScanBandDialog: false,
            DialogBandNumber: "",
            belongRow: {},
            baseTopFormData: {
                personnelType: "",
                suspectName: "",
                pageNum: 1,
                pageSize: 10,
                centerInfoId: this.$store.state.userInfo.fcompanyid,
            },
            radioCheck: "",
            types: [],
            // baseTable表格组件数据
            baseTableData: {
                total: 0,
                list: [],
            },
            // 弹窗控制
            isAddBelongingsDialog: false, // 添加物品弹窗
            isBelongingsListDialog: false, // 物品清单弹窗
            goodsList: [], //物品记录
        };
    },
    created() {
        let fid = this.$route.query.options;
        if (fid) {
            this.baseTopFormData.ipcId = fid;
            this.getList();
        } else {
            this.getList();
        }
        this.getPersonList();
    },
    methods: {
        dialogOpen() {
            this.$refs.refDialogBandNumber.$refs.input.focus();
        },
        brushHand() {
            this.isScanBandDialog = true;
            this.$nextTick(() => {
                //自动获取焦点 element组件autofocus失效
                this.DialogCardNumber = "";
                this.$refs.refDialogBandNumber.focus();
            });
        },
        changeDialogBandCardNumber(number) {
            /*
             * number 是获取的 手环或卡 号码
             *
             * */
            var DialogNumber = document.getElementById(number).value;
            if (DialogNumber.length == 8) {
                belong.getBelongList({ DialogNumber }).then((res) => {
                    if (res.code === 0) {
                        this.isScanBandDialog = false;
                        this.DialogBandNumber = "";
                        document.getElementById(number).value = "";
                        setTimeout(() => {
                            const row = res.rows[0];
                            if (row) {
                                this.isAddBelongingsDialog = true;
                            }
                            this.belongRow = row;
                            this.getGoods(row);
                        }, 0);
                    }
                });
            } else {
                this.DialogBandNumber = "";
                document.getElementById(number).value = "";
                this.$refs.refDialogBandNumber.focus();
            }
        },
        // 跳转到随身物品
        goToInfoLocker() {
            this.$router.push("/basic/infoLocker");
        },
        // 获取随身物品列表
        getPersonList() {
            belong
                .getLrBaseDataitemdetail()
                .then((res) => {
                    this.types = res.rows;
                })
                .catch((err) => {});
        },
        // 获取随身物品列表
        getList() {
            console.log(this.baseTopFormData);
            belong.getBelongList(this.baseTopFormData).then((res) => {
                if (res.code == 0) {
                    this.baseTableData.list = res.rows;
                    // 单选框写法切换
                    // this.baseTableData.list.forEach((item,index)=>{
                    // 	item.ischeck = false;
                    // })
                    this.baseTableData.total = res.total;
                }
            });
        },
        // 提交顶部表单数据
        postBaseTopFormData() {
            this.baseTopFormData.ipcId = "";
            this.getList();
        },
        seeGoodsList(row) {
            this.belongRow = row;
            this.getGoods({});
            this.isBelongingsListDialog = true;
        },
        // 查看物品清单弹窗开关
        handleBelongingsListDialog(bool) {
            this.isBelongingsListDialog = bool;
        },
        addGoodsDialog(row) {
            this.isAddBelongingsDialog = true;
            this.belongRow = row;
            this.getGoods(row);
        },
        // 添加物品弹窗开关
        handleAddBelongingsDialog(bool) {
            this.isAddBelongingsDialog = bool;
            this.getList();
        },
        // 获取物品记录
        getGoods(row) {
            if (row) {
                const { fId, suspectId } = row;
                let data = {
                    centerInfoId: this.$store.state.userInfo.fcompanyid,
                    personalGoodsId: fId || this.belongRow.fId,
                    ipcId: suspectId || this.belongRow.suspectId,
                };
                belong.queryDetail(data).then((res) => {
                    if (res.code == 0) {
                        this.goodsList = res.rows;
                    }
                });
            } else {
                this.$message.error("查无数据！");
            }
        },
        // 表格操作
        baseTableCurrentChange(row) {
            this.belongRow = row;
            debugger;
            this.radioCheck = row.suspectId;
        },
        baseTableRadioChange(row, index) {},
        handleSizeChange(val) {
            this.baseTopFormData.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.baseTopFormData.pageNum = val;
            this.getList();
        },
    },
};
</script>

<style scoped lang="scss">
.case-belongings {
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
}
</style>
