<template>
    <div class="system-administration">
        <base-top-form
            title="角色管理"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="fFullname" label="角色名称">
                    <el-input v-model="baseTopFormData.fFullname" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="fEnabledmark" label="状态">
                    <el-select placeholder="请选择" clearable v-model="baseTopFormData.fEnabledmark">
                        <el-option value="1" label="启用"></el-option>
                        <el-option value="0" label="停用"></el-option>
                    </el-select>
                </el-form-item>
            </template>
        </base-top-form>
        <div class="table-btns-wrap">
            <div class="table-btn-wrap" @click="handleAdd">
                <span>新增</span>
                <i class="el-icon-circle-plus btn-icon"></i>
            </div>
        </div>
        <base-table
            :baseTableData="baseTableData.list"
            :baseTableDataTotal="baseTableData.total"
            :baseTableCurrentRadio="baseTableCurrentRadio"
            :baseTablePagecurrentPage="pageNum"
            :baseTablePageSize="pageSize"
            @onBaseTableCurrentChange="baseTableCurrentChange"
            @onBaseTablePageSizeChange="baseTablePageSizeChange"
            @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
        >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="fEncode" label="角色编号"></el-table-column>
            <el-table-column prop="fFullname" label="角色名称"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.fEnabledmark"
                        active-color="#13ce66"
                        :active-value="1"
                        inactive-color="#ff4949"
                        :inactive-value="0"
                        @change="handleStateChange($event, scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="fCreateusername" label="创建人"></el-table-column>
            <el-table-column prop="fCreatedate" label="创建日期"></el-table-column>

            <el-table-column prop="fDescription" label="描述"></el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete"  @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </base-table>
        <!-- 主页弹窗 -->
        <el-dialog :close-on-click-modal="false" :title="childDialog.title" :visible.sync="mainDialog" width="760px">
            <el-form :model="childDialog.form" ref="ruleForm" label-width="100px">
                <!-- <el-form-item
                    :rules="[{'required': true,'message': '请输入角色编号','trigger': 'blur'}]"
                    label="角色编号"
                    prop="fEncode"
                >
                    <el-input v-model="childDialog.form.fEncode" style="width: 260px;" :readonly="childDialog.title == '修改'"></el-input>
                </el-form-item> -->
                <el-form-item
                    :rules="[{'required': true,'message': '请输入角色名称','trigger': 'blur'}]"
                    label="角色名称"
                    prop="fFullname"
                >
                    <el-input v-model="childDialog.form.fFullname" style="width: 260px;" :readonly="childDialog.title == '修改'"></el-input>
                </el-form-item>
                <el-form-item
                    :rules="[{'required': true,'message': '请选择功能授权','trigger': 'blur'}]"
                    label="功能授权"
                    prop="moduleMenuNames"
                >
                    <base-fake-element
                        baseFakeElementFlag="select"
                        @onBaseFakeElementClick="() => {childDialog.checkedKeys = childDialog.form.checkedKeys;childDialog.visible = true}"
                        style="width: 260px;"
                    >{{childDialog.form.moduleMenuNames}}</base-fake-element>
                </el-form-item>
                <el-form-item prop="moduleMenuIds" hidden></el-form-item>
                <el-form-item label="状态" prop="fEnabledmark">
                    <el-switch
                        v-model="childDialog.form.fEnabledmark"
                        active-color="#13ce66"
                        :active-value="1"
                        inactive-color="#ff4949"
                        :inactive-value="0"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="角色描述" prop="fDescription">
                    <el-input
                        type="textarea"
                        rows="5"
                        v-model="childDialog.form.fDescription"
                        style="width: 560px;"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="mainDialog=false">关闭</el-button>
            </span>
        </el-dialog>

        <!-- 子弹窗 -->
        <el-dialog :close-on-click-modal="false" title="功能权限" :visible.sync="childDialog.visible" width="500">
            <!-- <el-steps :active="1">
                <el-step title="系统功能" icon="el-icon-setting"></el-step>
                <el-step title="系统按钮" icon="el-icon-upload"></el-step>
            </el-steps>-->
            <el-tree
                :data="childDialog.functionTree"
                show-checkbox
                node-key="fModuleid"
                :default-checked-keys="childDialog.checkedKeys"
                :props="{label: 'fFullname'}"
                ref="functionTree"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectTreeData">确认</el-button>
                <el-button @click="() => childDialog.visible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Apis from "@/apis/unit.js";
import SystemApis from "@/apis/system.js";
import InfoSubmenu from "@/views/Info/components/InfoSubmenu.vue";
import { handleTree } from "@/utils/utils.js";
export default {
    components: {
        InfoSubmenu
    },
    data() {
        return {
            baseTopFormData: {
                fEnabledmark: "",
                fFullname: ""
            },
            // baseTable表格组件数据
            baseTableData: {
                total: 0,
                list: []
            },
            childDialog: {
                form: {
                    fRoleid: "",
                    // fEncode: "",
                    fFullname: "",
                    fDescription: "",
                    fEnabledmark: 1,
                    moduleMenuNames: "",
                    moduleMenuIds: []
                },
                functionTree: [],
                checkedKeys: [],
                visible: false
            },
            baseTableCurrentRadio: 0, // 当前选中的radio
            pageNum: 1,
            pageSize: 10,
            mainDialog: false,
            currentTableRow: {}
        };
    },
    mounted() {
        this.getList();
        this.getSystemList();
    },
    methods: {
        selectTreeData() {
            const tree = this.$refs.functionTree;
            const checked = JSON.parse(JSON.stringify(tree.getCheckedNodes()));
            const halfChecked = JSON.parse(
                JSON.stringify(tree.getHalfCheckedKeys())
            );
            const name = [],
                keys = [];
            for (const item of checked) {
                name.push(item.fFullname);
                keys.push(item.fModuleid);
            }
            this.childDialog.checkedKeys = keys;
            this.childDialog.form.moduleMenuNames = name.join(",");
            this.childDialog.form.moduleMenuIds = halfChecked.concat(keys);
            this.childDialog.visible = false;
            this.$refs.ruleForm.validateField('moduleMenuNames');
        },
        getList() {
            const { pageNum, pageSize } = this;
            Apis.getRolelist({
                ...this.baseTopFormData,
                pageNum,
                pageSize
            }).then(res => {
                if (res.code == 0) {
                    this.baseTableData.list = res.rows;
                    this.baseTableData.total = res.total;
                }
            });
        },
        getSystemList() {
            SystemApis.getSystemlist().then(res => {
                const menuList = handleTree(res.data || [], {
                    rootId: "-1",
                    idField: "fModuleid",
                    parentIdField: "fParentid"
                });
                this.childDialog.functionTree = menuList;
            });
        },
        handleAdd() {
            this.childDialog.title = "新增";
            this.$resetFields("ruleForm");
            this.mainDialog = true;
        },
        handleUpdate(record) {
            this.childDialog.title = "修改";
            this.$resetFields("ruleForm");
            this.mainDialog = true;
            const { fRoleid } = record;
            Apis.getRoleDetail(fRoleid).then(res => {
                const {
                    fRoleid,
                    // fEncode,
                    fFullname,
                    fEnabledmark,
                    fDescription,
                    moduleMenuIds
                } = res.data || {};
                this.childDialog.form = {
                    fRoleid,
                    // fEncode,
                    fFullname,
                    fEnabledmark,
                    fDescription,
                    moduleMenuNames: res.moduleNames || "",
                    moduleMenuIds
                };
                this.childDialog.checkedKeys = moduleMenuIds;
            });
            // Apis.getCheckedRoleMenu(fRoleid).then(res => {
            //     const checkedKeys = (res.data || {}).checkedKeys || [];
            //     this.childDialog.checkedKeys = checkedKeys;
            // });
        },
         handleDelete(record) {
            this.$confirm("确认删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                Apis.deleteRole({ fRoleid: record.fRoleid }).then(res => {
                    if (res.code == 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.mainDialog = false;
                        this.getList();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
            });
        },
        handleStateChange(fEnabledmark, record) {
            Apis.addOrUpdateRole({ fEnabledmark, fRoleid: record.fRoleid })
                .then(res => {
                    if (res.code == 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.mainDialog = false;
                        this.getList();
                    } else {
                        this.$message({
                            message: "操作失败",
                            type: "error"
                        });
                    }
                })
                .catch(function() {
                    record.fEnabledmark =
                        record.fEnabledmark === "0" ? "1" : "0";
                });
        },
        // 主页表单校验并保存按钮
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    Apis.addOrUpdateRole(this.childDialog.form).then(res => {
                        console.log(res);
                        if (res.code == 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.mainDialog = false;
                            this.getList();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        selectTableRow(val) {
            console.log("当前选中行", val);
            this.currentTableRow = val;
        },
        // 提交顶部表单数据
        postBaseTopFormData() {
            this.getList();
        },

        // 表格操作
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        baseTableCurrentChange(row, index) {
            // this.baseTableCurrentRadio = index;
        },
        baseTableRadioChange(row, index) {
            // this.baseTableCurrentRadio = index;
        },
        // 页码操作
        baseTablePageSizeChange(val) {
            this.pageSize = val;
            this.pageNum = 1;
            this.getSublist();
        },
        baseTablePageCurrentChange(val) {
            this.pageNum = val;
            this.getSublist();
        }
    }
};
</script>

<style scoped
 lang="scss">
</style>
