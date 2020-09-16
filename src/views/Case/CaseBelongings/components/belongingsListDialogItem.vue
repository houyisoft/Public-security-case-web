<template>
    <div class="belongings-list-dialog">
        <el-dialog
            title="物品清单"
            :close-on-click-modal="false"
            width="1200px"
            :max-height="600"
            :visible="isBelongingsListDialog"
            @close="handleBelongingsListDialog(false)"
        >
            <div class="person-info">
                <div class="info-name">人员姓名：{{belongRow.suspectName}}</div>
                <div class="info-bandno">手环编号：<span v-if="belongRow.wristbandNo != 'null'">{{belongRow.wristbandNo}}</span></div>
            </div>
            <el-table :data="goodsList" border>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="物品名称"></el-table-column>
                <el-table-column prop="amount" label="数量"></el-table-column>
                <el-table-column prop="amountUnit" label="数量单位"></el-table-column>
                <el-table-column prop="weight" label="重量"></el-table-column>
                <el-table-column prop="weightUnit" label="重量单位"></el-table-column>
                <el-table-column prop="goodsPrice" label="物品照片"></el-table-column>
                <el-table-column prop="goodsType" label="物品类型"></el-table-column>
                <el-table-column prop="positionCode" label="货位编号"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
            </el-table>
            <template slot="footer">
                <el-button type="primary" @click="handleBelongingsListDialog(false)">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        isBelongingsListDialog: {
            type: Boolean,
            default: false
        },
        belongRow: {
            type: Object,
            default: () => {
                return {}
            }
        },
        goodsList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            baseTableData: {
                total: 20,
                list: []
            },
            distributeLockerDialogFormData: {
                name: "",
                lockerNo: "",
                positionNo: ""
            }
        };
    },
    methods: {
        handleBelongingsListDialog(bool) {
            this.$emit("onHandleBelongingsListDialog", bool);
        }
    }
};
</script>

<style scoped
 lang="scss">
.person-info {
    display: flex;
    font-size: 18px;
    color: #fbb95c;
    margin-bottom: 37px;

    .info-name {
        margin-right: 87px;
    }
}
</style>
