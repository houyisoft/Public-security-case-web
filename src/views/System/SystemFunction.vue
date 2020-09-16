<template>
    <div class="system-administration">
        <el-container>
            <el-aside width="200px">
                <info-submenu
                    title="系统功能"
                    :menuList="menuList"
                    :maps="{label: 'fFullname'}"
                    :expand-on-click-node="false"
                    @nodeclick="nodeclick"
                ></info-submenu>
            </el-aside>
            <el-main>
                <base-top-form
                    :baseTopFormData="baseTopFormData"
                    @onPostBaseTopFormData="postBaseTopFormData"
                >
                    <template v-slot:form>
                        <el-form-item prop="searchValue" label-width="120px" label>
                            <el-input v-model="baseTopFormData.searchValue" placeholder="请输入编号/名称"></el-input>
                        </el-form-item>
                    </template>
                </base-top-form>
                <div class="table-btns-wrap">
                    <div class="table-btn-wrap" @click="handleAdd()">
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
                    <el-table-column prop="fEncode" label="编号" width="50"></el-table-column>
                    <el-table-column prop="fFullname" label="名称"></el-table-column>
                    <el-table-column prop="fPath" label="路由" width="200"></el-table-column>
                    <el-table-column prop="fUrladdress" label="地址" width="200"></el-table-column>

                    <el-table-column label="菜单类型" width="80">
                        <template
                            slot-scope="scope"
                        >{{{'0': '目录', '1': '菜单', '2': '按钮'}[scope.row.fModifytype]}}</template>
                    </el-table-column>
                    <el-table-column label="状态" width="80">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.fEnabledmark"
                                active-color="#13ce66"
                                :active-value="1"
                                inactive-color="#ff4949"
                                :inactive-value="0"
                                @change="handleStateChange($event, scope.row, 'fEnabledmark')"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否显示" width="80">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.fVisible"
                                active-color="#13ce66"
                                :active-value="1"
                                inactive-color="#ff4949"
                                :inactive-value="0"
                                @change="handleStateChange($event, scope.row, 'fVisible')"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fDescription" label="描述"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpdate(scope.row)"
                            >修改</el-button>
                            <!-- <el-button size="mini" type="text" icon="el-icon-plus">新增</el-button> -->
                            <el-button size="mini"  @click="remove(scope.row)" type="text" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </base-table>
            </el-main>
        </el-container>

        <!-- 主页弹窗 -->
        <el-dialog :close-on-click-modal="false" title="新增菜单" width="800px" :visible="mainDialog" @close="mainDialog = false">
            <el-form
                style="margin-top:30px;"
                :model="menuForm"
                :inline="true"
                ref="menuForm"
                label-width="100px"
                class="demo-form-inline"
            >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="父级菜单" prop="fParentid">
                            <treeselect
                                v-model="menuForm.fParentid"
                                :options="menuOptions"
                                :normalizer="normalizer"
                                :show-count="true"
                                placeholder="选择上级菜单"
                                style="width: 584px"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[{'required': true,'message': '请输入编号','trigger': 'blur'}]"
                            label="编号"
                            prop="fEncode"
                        >
                            <el-input v-model="menuForm.fEncode" style="width: 205px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[{'required': true,'message': '请输入名称','trigger': 'blur'}]"
                            label="名称"
                            prop="fFullname"
                        >
                            <el-input v-model="menuForm.fFullname" style="width: 205px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="图标" prop="fIcon">
                            <el-popover
                                placement="bottom-start"
                                width="460"
                                trigger="click"
                                @show="$refs['iconSelect'].reset()"
                            >
                                <IconSelect ref="iconSelect" @selected="selected" />
                                <el-input
                                    slot="reference"
                                    v-model="menuForm.fIcon"
                                    placeholder="点击选择图标"
                                    readonly
                                    style="width: 205px;"
                                >
                                    <svg-icon
                                        v-if="menuForm.fIcon"
                                        slot="prefix"
                                        :icon-class="menuForm.fIcon"
                                        class="el-input__icon"
                                        style="height: 32px;width: 16px;"
                                    />
                                    <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                                </el-input>
                            </el-popover>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[{'required': true,'message': '请输入排序','trigger': 'blur'}]"
                            label="排序"
                            prop="fSortcode"
                        >
                            <el-input v-model="menuForm.fSortcode" style="width: 205px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="菜单类型" prop="fModifytype">
                            <el-radio-group v-model="menuForm.fModifytype">
                                <el-radio label="0">目录</el-radio>
                                <el-radio label="1">菜单</el-radio>
                                <el-radio label="2">按钮</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限标识" prop="fPerms">
                            <el-input v-model="menuForm.fPerms" style="width: 205px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="路由地址" prop="fPath"
                         :rules="[{'required': true,'message': '请输入路由地址','trigger': 'blur'}]"
                        >
                            <el-input v-model="menuForm.fPath" style="width: 205px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组件路径"
                         :rules="[{'required': true,'message': '请输入组件路径','trigger': 'blur'}]"
                         prop="fUrladdress">
                            <el-input style="width:205px" v-model="menuForm.fUrladdress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="有效" prop="fEnabledmark">
                            <el-switch
                                v-model="menuForm.fEnabledmark"
                                active-color="#13ce66"
                                :active-value="1"
                                inactive-color="#ff4949"
                                :inactive-value="0"
                            ></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否显示" prop="fVisible">
                            <el-switch
                                v-model="menuForm.fVisible"
                                active-color="#13ce66"
                                :active-value="1"
                                inactive-color="#ff4949"
                                :inactive-value="0"
                            ></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="描述" prop="fDescription">
                            <el-input
                                type="textarea"
                                v-model="menuForm.fDescription"
                                rows="5"
                                style="width: 584px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template slot="footer">
                <el-button type="primary" @click="submitForm('menuForm')">确认</el-button>
                <el-button type @click="mainDialog = false">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import InfoSubmenu from "@/views/Info/components/InfoSubmenu.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import { handleTree } from "@/utils/utils.js";
import {handleMenuList} from '@/router'
import Apis from "@/apis/system.js";
export default {
    components: {
        InfoSubmenu,
        Treeselect,
        IconSelect
    },
    data() {
        return {
            menuOptions: [],
            menuList: [],
            menuForm: {
                fModuleid: "",
                fParentid: 0,
                fModifytype: "",
                fEncode: "",
                fFullname: "",
                fIcon: "",
                fUrladdress: "",
                fSortcode: "",
                fEnabledmark: 1,
                fDescription: "",
                fPath: "",
                fPerms: "",
                fVisible: 1
            },
            baseTopFormData: {
                searchValue: ""
            },
            // baseTable表格组件数据
            baseTableData: {
                total: 0,
                list: []
            },
            baseTableCurrentRadio: 0, // 当前选中的radio
            pageNum: 1,
            pageSize: 10,
            mainDialog: false,
            visibleSubMain: false
        };
    },
    methods: {
        // 选择图标
        selected(name) {
            this.menuForm.fIcon = name;
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.fModuleid,
                label: node.fFullname,
                children: node.children
            };
        },
        nodeclick(node) {
            const { fModuleid: fParentid } = node;
            this.baseTopFormData.fParentid = fParentid;
            this.getSublist();
        },
        getSublist() {
            const { pageNum, pageSize } = this;
            Apis.getSublist({
                ...this.baseTopFormData,
                pageNum,
                pageSize
            }).then(res => {
                this.baseTableData.list = res.rows || [];
                this.baseTableData.total = res.total;
            });
        },
        getList() {
            Apis.getSystemlist().then(res => {
                const menuList = handleTree(res.data || [], {
                    rootId: "-1",
                    idField: "fModuleid",
                    parentIdField: "fParentid"
                });
                this.menuList = menuList;
                this.menuOptions = menuList;
            });
        },
        handleAdd() {
            this.$resetFields("menuForm");
            this.mainDialog = true;
        },
        remove(record)
        {
           var fModuleid=record.fModuleid
            this.$elConfirm()
          .then((res) => {
            Apis.remove({ids:fModuleid}).then(res=>{
                if(res.code==0)
                {
                     this.$message({
                        showClose: true,
                        message: "操作成功",
                        type: "success"
                        });
                          this.getList();
                          this.getSublist();
                }else{
                     this.$message({
                        showClose: true,
                        message:res.msg,
                        type: "error"
                            });
                }
            })
          })
          .catch((err) => {
            console.log("err", err);
          });
        },
        handleUpdate(record) {
            this.$resetFields("menuForm");
            const { fModuleid: id } = record;
            Apis.getDetail(id).then(res => {
                const {
                    fModuleid,
                    fParentid,
                    fModifytype,
                    fEncode,
                    fFullname,
                    fIcon,
                    fUrladdress,
                    fSortcode,
                    fEnabledmark,
                    fDescription,
                    fVisible,
                    fPath,
                    fPerms
                } = res.data || {};
                this.menuForm = {
                    fModuleid,
                    fParentid,
                    fModifytype,
                    fEncode,
                    fFullname,
                    fIcon,
                    fVisible,
                    fUrladdress,
                    fPath,
                    fSortcode,
                    fEnabledmark,
                    fDescription
                };
                this.mainDialog = true;
            });
        },
        handleStateChange(value, record, field) {
            Apis.addSystem({ [field]: value, fModuleid: record.fModuleid })
                .then(res => {
                    if (res.code == 0) {
                        this.$message.success("操作成功");
                        this.mainDialog = false;
                        this.getList();


                        this.$store.dispatch('GenerateRoutes').then(res => {
                            handleMenuList(res).catch(e => {
                                console.log(e)
                            })
                        }).catch(e => {
                            console.log(e)
                        });
                    } else {
                        this.$message.error("操作失败");
                    }
                })
                .catch(function() {
                    record[field] = record[field] === 0 ? 1 : 0;
                });
        },
        // 主页表单校验并保存按钮
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    Apis.addSystem(this.menuForm).then(res => {
                        debugger
                        if (res.code == 0) {
                            this.$message.success("操作成功");
                            this.mainDialog = false;
                            this.getList();
                            this.getSublist();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 提交顶部表单数据
        postBaseTopFormData() {
            this.getSublist();
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
    },
    created() {
        this.getList();
    }
};
</script>

<style scoped
 lang="scss">
::v-deep.vue-treeselect {
    .vue-treeselect__control {
        border: 1px solid rgb(108, 223, 252);
        background: rgb(29, 94, 140);
        .vue-treeselect__single-value {
            line-height: 40px;
            color: rgb(108, 223, 252);
        }
        .vue-treeselect__x-container {
            color: rgb(108, 223, 252);
        }
        .vue-treeselect__control-arrow {
            color: rgb(108, 223, 252);
        }
    }
    .vue-treeselect__menu-container {
        .vue-treeselect__menu {
            border: 1px solid rgb(108, 223, 252) !important;
            background: rgb(29, 94, 140) !important;
            .vue-treeselect__option--highlight {
                background: rgba(108, 223, 252, 0.5) !important;
            }
            .vue-treeselect--single .vue-treeselect__option--selected {
                background: rgba(108, 223, 252, 0.5) !important;
                font-weight: 600;
            }
            .vue-treeselect--single .vue-treeselect__option--selected:hover {
                background: rgba(108, 223, 252, 0.5) !important;
            }
        }
    }
}
.el-main {
    padding: 46px 0 0 20px;
}
</style>
