<template>
    <div class="info-locker">
        <base-top-form
            title="随身物品柜"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="name" label="关键字：">
                    <el-input v-model="baseTopFormData.name" placeholder="请输入"></el-input>
                </el-form-item>
            </template>
        </base-top-form>
        <div class="table-btns-wrap">
            <div class="table-btn-wrap" @click="$router.go(-1);">
                <span>返回</span>
                <i class="el-icon-back btn-icon"></i>
            </div>
        </div>
        <base-table
            :stripe="false"
            :baseTableData="baseTableData.list"
            :isBaseTableCheckbox="false"
            :baseTableDataTotal="baseTableData.total"
            :baseTablePageCurrent="baseTablePageCurrent"
            :baseTablePageSize="baseTablePageSize"
        >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="centerName" label="办案中心"></el-table-column>
            <el-table-column prop="opt" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-view"
                        @click="view(scope.row)"
                    >查看</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-view"
                        @click="viewStore(scope.row)"
                    >储物柜展示</el-button>
                </template>
            </el-table-column>
        </base-table>

        <el-dialog
            title="详情"
            :close-on-click-modal="false"
            :visible.sync="viewForm.dialogVisible"
            width="1100px"
        >
            <base-top-form :baseTopFormData="viewForm.search" @onPostBaseTopFormData="viewSearch">
                <template v-slot:form>
                    <el-form-item prop="name" label="柜台名称：">
                        <el-input v-model="viewForm.search.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item prop="status" label="状态：">
                        <el-select v-model="viewForm.search.status" placeholder="请选择">
                            <el-option label="未使用" value="0" />
                            <el-option label="已使用" value="1" />
                        </el-select>
                    </el-form-item>
                </template>
            </base-top-form>
            <base-table :isBaseTablePage="false" :baseTableData="viewForm.list" :maxHeight="600">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="名称">
                    <template slot-scope="scope">{{scope.row.name || scope.row.siteNO}}</template>
                </el-table-column>
                <el-table-column prop="userName" label="使用人"></el-table-column>
                <el-table-column prop="userId" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userId">已使用</span>
                        <span v-else>未使用</span>
                    </template>
                </el-table-column>
            </base-table>
        </el-dialog>

        <el-dialog
            :close-on-click-modal="false"
            title="储物柜"
            :visible.sync="detailForm.dialogVisible"
            width="1100px"
        >
            <cabinet
                :listProp="detailForm.list"
                :typeProp="detailForm.type"
                @lockerClick="lockerClick"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailForm.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailForm.dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <belongings-list-dialog-item
            :goodsList="showDetailList ? goodsList : []"
            :belongRow="showDetailList ? userInfo : {}"
            :isBelongingsListDialog="showDetailList"
            @onHandleBelongingsListDialog="showDetailList = false"
        ></belongings-list-dialog-item>
    </div>
</template>

<script>
import Apis from "@/apis/Info/infoLock.js";
import Cabinet from "./components/lock/Cabinet";
import belongingsListDialogItem from "@/views/Case/CaseBelongings/components/belongingsListDialogItem.vue";
export default {
    data() {
        return {
            showDetailList: false,
            userInfo: {},
            goodsList: [],
            // 顶部表单数据
            baseTopFormData: {
                name: ""
            },
            /* view弹框组件 */
            viewForm: {
                dialogVisible: false,
                search: {
                    name: "",
                    status: undefined
                },
                list: []
            },
            /* detail弹框组件 */
            detailForm: {
                dialogVisible: false,
                list: [],
                type: 1
            },
            // 表格数据
            baseTableData: {
                total: 0,
                list: []
            },
            baseTablePageCurrent: 1,
            baseTablePageSize: 10,
            baseTableCurrent: {} // 当前选中行数据
        };
    },
    components: { Cabinet, belongingsListDialogItem },
    mounted() {
        this.getInfoLockList();
    },
    methods: {
        lockerClick(locker, used) {
            if (used) {
                this.showDetailList = true;
                const {
                    centerInfoId,
                    lockerId: cabinetId,
                    boxId,
                    positionId,
                    userName: suspectName
                } = locker;
                this.userInfo = { suspectName };
                Apis.getLockerInfoList({
                    centerInfoId,
                    cabinetId,
                    boxId,
                    positionId
                }).then(res => {
                    this.goodsList = res.rows || [];
                    const row = this.goodsList[0];
                    if (row) {
                        this.userInfo.wristbandNo = row.wristbandNo;
                    }
                });
            }
        },
        getInfoLockList() {
            Apis.getList(this.baseTopFormData).then(res => {
                const { rows, total } = res;
                this.baseTableData.list = rows || [];
                this.baseTableData.total = total || 0;
            });
        },
        view(record) {
            const { id: lockerId, lockerType } = record;
            this.viewForm.dialogVisible = true;
            this.viewForm.search.lockerId = lockerId;
            this.viewForm.search.lockerType = lockerType;
            this.getViewList();
        },
        getViewList() {
            Apis.view(this.viewForm.search).then(res => {
                const { rows } = res;
                this.viewForm.list = rows || [];
            });
        },
        viewStore(record) {
            const { centerInfoId } = record;
            const cabinetId = record.id;
            this.detailForm.dialogVisible = true;
            Apis.detail({ centerInfoId,cabinetId }).then(res => {
                const { lockerData, goodsshelvesData, type } = res;
                this.detailForm.type = type;
                this.detailForm.list =
                    (type === 1 ? lockerData : goodsshelvesData) || [];
            });
        },
        viewSearch() {
            this.getViewList();
        },
        postBaseTopFormData() {
            this.getInfoLockList();
        }
    }
};
</script>

<style scoped
 lang="scss">
</style>
