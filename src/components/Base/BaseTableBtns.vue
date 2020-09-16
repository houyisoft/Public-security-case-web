<!-- <base-table-btns :isDefaultBaseTableBtns="false" @onBaseTableBtnsAdd="baseTableBtnsAdd"
 @onBaseTableBtnsEdit="baseTableBtnsEdit"
 @onBaseTableBtnsDelete="baseTableBtnsDelete"></base-table-btns> -->
<template>
    <div class="table-btns-wrap">
        <template v-if="isDefaultBaseTableBtns">
            <div
                class="table-btn-wrap"
                v-if="buttons.indexOf('add') !== -1"
                @click="$emit('onBaseTableBtnsAdd', true)"
            >
                <span>新增</span>
                <i class="el-icon-circle-plus btn-icon"></i>
            </div>
            <div
                class="table-btn-wrap"
                v-if="buttons.indexOf('edit') !== -1"
                @click="$emit('onBaseTableBtnsEdit', true)"
            >
                <span>编辑</span>
                <i class="el-icon-edit btn-icon"></i>
            </div>
            <div
                class="table-btn-wrap"
                v-if="buttons.indexOf('delete') !== -1"
                @click="$emit('onBaseTableBtnsDelete', true)"
            >
                <span>删除</span>
                <i class="el-icon-delete btn-icon"></i>
            </div>
        </template>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        // 是否使用默认增删改按钮
        isDefaultBaseTableBtns: {
            type: Boolean,
            default: true
        },
        buttons: {
            type: Array,
            default: function() {
                return ["add", "edit", "delete"];
            }
        }
    }
};
</script>

<style lang="scss">
// 表格上方操作按钮栏统一样式
.table-btns-wrap {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #fff;
    margin: 20px 0 10px 0;

    .table-btn-wrap {
        margin-left: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;

        .btn-icon {
            font-size: 16px;
            color: #ace7fd;
            margin-left: 2px;
        }

        .btn-img {
            width: 20px;
            margin-left: 2px;
        }
    }
}
</style>