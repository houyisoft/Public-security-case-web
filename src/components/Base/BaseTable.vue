<!-- <base-table :baseTableData="baseTableData.list"
 :baseTableDataTotal="baseTableData.total"
 :baseTableDataPrimaryKey="baseTableDataPrimaryKey"
 :baseTablePageCurrent="baseTablePageCurrent"
 :baseTablePageSize="baseTablePageSize"
 @onBaseTableCurrentChange="baseTableCurrentChange"
 @onBaseTablePageSizeChange="baseTablePageSizeChange"
 @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
 :isBaseTablePage="false">
	<el-table-column prop="index"
	label="序号"
	width="50">
	</el-table-column>
	<el-table-column prop="name"
	label="物品名称">
	</el-table-column>
</base-table> -->
<!-- el-main大表格 -->
<template>
    <div :class="{'base-table-cmpt': true, 'padding-bottom-50': isBaseTablePage}">
        <el-table
            class="base-table"
            :height="baseTableHeight"
            ref="baseTable"
            :data="baseTableData"
            border
            size="mini"
            align="center"
            highlight-current-row
            :max-height="maxHeight"
            @current-change="baseTableCurrentChange"
            @selection-change="baseTableSelectionChange"
        >
            <el-table-column
                type="selection"
                width="40"
                v-if="isBaseTableCheckbox"
                class-name="table-column-selection"
            ></el-table-column>
            <el-table-column
                width="40"
                v-else-if="isBaseTableRadio"
                class-name="table-column-radio"
            >
                <label class="el-radio">
                    <span class="el-radio__input">
                        <span class="el-radio__inner"></span>
                    </span>
                    <span class="el-radio__label"></span>
                </label>
            </el-table-column>
            <slot></slot>
        </el-table>
        <el-pagination
            @size-change="baseTablePageSizeChange"
            @current-change="baseTablePageCurrentChange"
            :current-page="baseTablePageCurrent"
            :page-sizes="baseTablePageSizes"
            :page-size="baseTablePageSize"
            layout="sizes, prev, pager, next, jumper, total"
            :total="baseTableDataTotal"
            v-if="isBaseTablePage"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        stripe: {
            type: Boolean,
            default: true
        },
        baseTableHeight: {
            type: Number
        },
        maxHeight: {
            type: Number
        },
        baseTableData: {
            type: Array,
            default() {
                return [];
            }
        },
        baseTableDataTotal: {
            type: Number,
            default: 0
        },
        // 表格数据主键（唯一值），用于单选Radio切换及行className设置
        baseTableDataPrimaryKey: {
            type: String,
            default: "index"
        },
        // 默认单选
        isBaseTableRadio: {
            type: Boolean,
            default: true
        },
        // 若该参数为true，多选
        isBaseTableCheckbox: {
            type: Boolean,
            default: false
        },
        // 分页组件
        isBaseTablePage: {
            type: Boolean,
            default: true
        },
        baseTablePageCurrent: {
            type: Number,
            default: 1
        },
        baseTablePageSize: {
            type: Number,
            default: 10
        },
        baseTablePageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 40, 50];
            }
        }
    },
    data() {
        return {
            baseTableCurrent: {},
            baseTableCurrentRadio: '' // 当前选中行index
        };
    },
    methods: {
        // 切换选中表格行
        baseTableCurrentChange(row) {
            console.log(...arguments);
            let index = this.baseTableData.findIndex(
                item =>
                    item &&
                    row &&
                    item[this.baseTableDataPrimaryKey] ===
                        row[this.baseTableDataPrimaryKey]
            );
            this.baseTableCurrentRadio = index;
            this.baseTableCurrent = row;
            this.$emit("onBaseTableCurrentChange", ...arguments);
        },
        // baseTableCurrentRowClassName({
        // 	row,
        // 	index
        // }) {
        // 	if (this.baseTableCurrent[this.baseTableDataPrimaryKey] == row[this.baseTableDataPrimaryKey]) {
        // 		return 'bgc-FBE6A6'
        // 	}
        // },
        // Checkbox - 控制多选框
        // 当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
        // baseTableSelect(selection, row) {
        // 	console.log("手动勾选数据行selection, row", selection, row)
        // },
        // // 当用户手动勾选全选 Checkbox 时触发的事件	selection
        // baseTableSelectAll(selection) {
        // 	console.log("全选selection", selection)
        // },
        // 当复选框选择项发生变化时会触发该事件	selection
        baseTableSelectionChange(selection) {
            this.$emit("onBaseTableSelectChange", ...arguments);
        },
        // 切换每页展示数量
        baseTablePageSizeChange(val) {
            this.$emit("onBaseTablePageSizeChange", ...arguments);
        },
        // 切换页码
        baseTablePageCurrentChange(val) {
            this.$emit("onBaseTablePageCurrentChange", ...arguments);
        }
    }
};
</script>

<style scoped
 lang="scss">
.padding-bottom-50 {
    padding-bottom: 50px;
}

.base-table-cmpt {
    position: relative;

    .base-table-cmpt {
        position: relative;

        .base-table-page {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
        }

        ::v-deep.odd-row {
            background: rgba(108, 223, 252, 1);
            opacity: 0.6;
        }

        ::v-deep.even-row {
            background: rgba(108, 223, 252, 1);
        }
    }
}
</style>
