<template>
    <div class="system-administration">
        <!-- <el-aside width="180px" style="height:500px">
        <info-submenu title="用户管理"></info-submenu>
		<h3>公司</h3>
		<ul class="list">
			<li v-for="(item,index) in companylist" :key="index">{{item.organizeName}}</li>
		</ul>
        </el-aside>-->
        <base-top-form
            title="用户管理"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="type" label-width="120px" label>
                    <el-form-item prop="searchValue" label="关键字">
                        <el-input
                            v-model="baseTopFormData.searchValue"
                            placeholder="账号/姓名/手机号"
                            style="width: 200px;"
                        ></el-input>
                    </el-form-item>
                </el-form-item>
            </template>
        </base-top-form>
        <div class="table-btns-wrap">
            <div class="table-btn-wrap" @click="handleAdd">
                <span>新增</span>
                <i class="el-icon-circle-plus btn-icon"></i>
            </div>

            <!-- <div class>
                <el-popover v-model="popover" placement="bottom" title width="150" trigger="click">
                    <div class="popover-tips">
                        <p>导出excel</p>
                        <p>启用账户</p>
                        <p>禁用账户</p>
                        <p>重置密码</p>
                        <p>功能授权</p>
                    </div>
                    <div slot="reference" class="table-btn-wrap">
                        <span>更多</span>
                        <i style="padding-bottom:1px" class="el-icon-caret-bottom btn-icon"></i>
                    </div>
                </el-popover>
            </div>-->
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
            <el-table-column prop="faccount" label="账号" width="100"></el-table-column>
            <el-table-column prop="frealname" width label="姓名"></el-table-column>
            <el-table-column prop="fgender" label="性别" width>
                <template slot-scope="scope">
                    <span v-if="scope.row.fgender == 1">男</span>
                    <span v-if="scope.row.fgender == 2">女</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="fmobile" label="手机" width="120"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.fenabledmark"
                        active-color="#13ce66"
                        :active-value="1"
                        inactive-color="#ff4949"
                        :inactive-value="0"
                        @change="handleStateChange($event, scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="fdescription" label="备注" width="190"></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                    >修改</el-button>
                     <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-refresh-right"
                        @click="handleResetPwd(scope.row)"
                    >重置密码</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </base-table>

        <!-- 主页弹窗 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="childDialog.title"
            :visible.sync="mainDialog"
            width="760px"
        >
            <el-form :model="childDialog.form" ref="userForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[  { required: true, message: '请输入账号', trigger: 'blur' }, ]"
                            label="账号"
                            prop="fAccount"
                        >
                            <el-input v-model="childDialog.form.fAccount" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="childDialog.title=='新增'"
                            :rules="[ { required: true, message: '请输入密码', trigger: 'blur' }, ]"
                            label="密码"
                            prop="fPassword"
                        >
                            <el-input
                                type="password"
                                v-model="childDialog.form.fPassword"
                                style="width: 200px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[ { required: true, message: '请输入姓名', trigger: 'blur' },  ]"
                            label="姓名"
                            prop="fRealname"
                        >
                            <el-input v-model="childDialog.form.fRealname" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-select
                                placeholder="请选择"
                                v-model="childDialog.form.fGender"
                                style="width: 200px;"
                            >
                                 <el-option
                                    :value="item.fitemvalue"
                                    :label="item.fitemname"
                                    v-for="(item, index) in sexlist"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证件类型">
                            <el-select
                                placeholder="请选择"
                                v-model="childDialog.form.iDType"
                                style="width: 200px;"
                            >
                                <el-option
                                    :value="item.fitemvalue"
                                    :label="item.fitemname"
                                    v-for="(item, index) in codetypelist"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[ { required: true, message: '请输入证件号码', trigger: 'blur' }, ]"
                            label="证件号码"
                            prop="iDNO"
                        >
                            <el-input v-model="childDialog.form.iDNO" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[  { required: true, message: '请选择角色', trigger: 'change' }, ]"
                            label="角色"
                            prop="fRoleid"
                        >
                            <el-select
                                placeholder="请选择"
                                multiple
                                v-model="childDialog.form.fRoleid"
                                style="width: 200px;"
                            >
                                <el-option
                                    :value="item.fRoleid"
                                    :label="item.fFullname"
                                    v-for="(item, index) in rolelist"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生日">
                            <el-date-picker
                                v-model="childDialog.form.fBirthday"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                style="width: 200px;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机">
                            <el-input v-model="childDialog.form.fMobile" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工号">
                            <el-input v-model="childDialog.form.fEncode" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="卡号" prop="name">
                            <el-input v-model="childDialog.form.fCard" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="登陆有效期"
                            prop="fAllowendtime"
                            :rules="[ { required: true, message: '请选择登陆有效期',  trigger: 'blur', }, ]"
                        >
                            <el-date-picker
                                v-model="childDialog.form.fAllowendtime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                style="width: 200px;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="fEnabledmark">
                            <el-switch
                                v-model="childDialog.form.fEnabledmark"
                                active-color="#13ce66"
                                :active-value="1"
                                inactive-color="#ff4949"
                                :inactive-value="0"
                            ></el-switch>
                        </el-form-item>  
                        </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item
                            :rules="[{'required': true,'message': '请选择公司','trigger': 'blur'}]"
                            label="公司"
                            prop="organizeName"
                        >
                            <base-fake-element
                                baseFakeElementFlag="select"
                                @onBaseFakeElementClick="() => {childDialog.checkedKeys = childDialog.form.checkedKeys;childDialog.visible = true}"
                                style="width: 200px;"
                            >{{childDialog.form.organizeName}}</base-fake-element>
                        </el-form-item>
                         <el-form-item prop="fCompanyid" hidden></el-form-item>
                    </el-col> -->
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="fDescription">
                            <el-input
                                type="textarea"
                                v-model="childDialog.form.fDescription"
                                style="width: 559px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div class="base-dialog-footer" style="display:flex;justify-content: space-between">
                <el-checkbox v-model="isFinished">确认并关闭窗口</el-checkbox>
                <div class="footer-btns">
                    <el-button type="primary" @click="submitForm('userForm')">确认</el-button>
                    <el-button @click="mainDialog = false">关闭</el-button>
                </div>
            </div>-->
            <span slot="footer" class="dialog-footer">
                <!-- <el-checkbox v-model="isFinished">确认并关闭窗口</el-checkbox> -->
                <el-button type="primary" @click="submitForm('userForm')">确认</el-button>
                <el-button @click="mainDialog=false">关闭</el-button>
            </span>
        </el-dialog>

        <!-- 子弹窗 -->
        <el-dialog :close-on-click-modal="false" title="公司" :visible.sync="childDialog.visible" width="500">
            <el-tree
                :data="childDialog.functionTree"
                show-checkbox
                node-key="organizeId"
                :check-strictly="true"
                :default-checked-keys="childDialog.checkedKeys"
                  @check-change="templateCheckChange"
                :props="{label: 'organizeName'}"
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
import InfoSubmenu from "@/views/Info/components/InfoSubmenu.vue";
import Apis from "@/apis/unit.js";
import { handleTree } from "@/utils/utils.js";
export default {
    components: {
        InfoSubmenu
    },
    data() {
        return {
            popover: false,
            isFinished: true,
            codetypelist: [],
            rolelist: [],
            sexlist: [],
            baseTopFormData: {
                searchValue: ""
            },
            // baseTable表格组件数据
            baseTableData: {
                total: 0,
                list: []
            },
            childDialog: {
                form: {
                    fUserid: "",
                    fEncode: "",
                    fAccount: "",
                    fPassword: "",
                    fRealname: "",
                    fHeadicon: "",
                    fGender: "",
                    fBirthday: "",
                    fMobile: "",
                    fTelephone: "",
                    fCompanyid: "",
                    organizeName: '',
                    fDepartmentid: "",
                    fAllowendtime: "",
                    fEnabledmark: 1,
                    fDescription: "",
                    fCard: "",
                    loginName: "",
                    iDType: "",
                    iDNO: "",
                    fRoleid: [],
                    deptName: ""
                },
                functionTree: [],
                checkedKeys: [],
                checkedId : "",
                checkedName: "",
                checkedFata : [],
                visible: false
            },

            pageNum: 1,
            pageSize: 10,
            baseTableCurrentRadio: 0, // 当前选中的radio
            mainDialog: false,
            currentTableRow: {} // 当前选中行
        };
    },
    mounted() {
        this.getList();
        this.getroleList();
        this.getdicList();
        this.getsexList();
        this.getOrgList();
    },
    methods: {
        selectTreeData() {
            this.childDialog.form.organizeName = this.childDialog.checkedName;
            this.childDialog.form.fCompanyid = this.childDialog.checkedId;
            this.childDialog.visible = false;
        },
        getList() {
            const { pageNum, pageSize } = this;
            Apis.getUserlist({
                ...this.baseTopFormData,
                pageNum,
                pageSize
            }).then(res => {
                console.log(res);
                if (res.code == 0) {
                    this.baseTableData.list = res.rows;
                    this.baseTableData.total = res.total;
                }
            });
        },
        getroleList() {
            Apis.getRolelist().then(res => {
                console.log(res);
                if (res.code == 0) {
                    this.rolelist = res.rows;
                }
            });
        },
        getdicList() {
            Apis.diclist({ type: 3 }).then(res => {
                console.log(res);
                if (res.code == 0) {
                    this.codetypelist = res.data;
                }
            });
        },
        getsexList() {
            Apis.diclist({ type: 2 }).then(res => {
                console.log(res);
                if (res.code == 0) {
                    this.sexlist = res.data;
                }
            });
        },
        getOrgList() {
            Apis.getOrgList().then(res => {
                const menuList = handleTree(res.data || [], {
                    rootId: "00----",
                    idField: "organizeId",
                    parentIdField: "porganizeId"
                });
                this.childDialog.functionTree = menuList;
            });
        },
        templateCheckChange(data ,checked ,child) {
           if(checked == true){
                var oldCheckId = this.childDialog.checkedId;
                this.childDialog.checkedId = data.organizeId;
                this.childDialog.checkedName = data.organizeName;
                this.$refs.functionTree.setChecked(oldCheckId,false,false);
           }else if(this.childDialog.checkedId === data.organizeId){
                 this.childDialog.checkedId = "";
                 this.childDialog.checkedName = "";
           }
        },
        handleAdd() {
            this.childDialog.title = "新增";
            this.$resetFields("userForm");
            this.mainDialog = true;
        },
        handleUpdate(record) {
            this.$resetFields("userForm");
            this.childDialog.title = "修改";
            this.mainDialog = true;
            const { fuserid } = record;
            Apis.getUserDetail(fuserid).then(res => {
                const {
                    fuserid: fUserid,
                    fencode: fEncode,
                    faccount: fAccount,
                    fpassword: fPassword,
                    frealname: fRealname,
                    fheadicon: fHeadicon,
                    fgender: fGender,
                    fbirthday: fBirthday,
                    fmobile: fMobile,
                    ftelephone: fTelephone,
                    fcompanyid: fCompanyid,
                    fdepartmentid: fDepartmentid,
                    fallowendtime: fAllowendtime,
                    fenabledmark: fEnabledmark,
                    fdescription: fDescription,
                    organizeName,
                    fcard: fCard,
                    loginName,
                    idtype: iDType,
                    idno: iDNO,
                    fRoleid,
                    deptName
                } = res.data || {};
                this.childDialog.form = {
                    fUserid,
                    fEncode,
                    fAccount,
                    fPassword,
                    fRealname,
                    fHeadicon,
                    fGender,
                    fBirthday,
                    fMobile,
                    fTelephone,
                    fCompanyid,
                    fDepartmentid,
                    fAllowendtime,
                    fEnabledmark,
                    fDescription,
                    organizeName,
                    fCard,
                    loginName,
                    iDType,
                    iDNO,
                    fRoleid: fRoleid.split(","),
                    deptName
                };
            });
        },
        handleStateChange(fEnabledmark, record) {
            Apis.addOrUpdateUser({ fEnabledmark, fUserid: record.fuserid })
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
                    record.state = record.state === "0" ? "1" : "0";
                });
        },
        handleDelete(record) {
            this.$confirm("确认删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                Apis.deleteUser({ fUserid: record.fuserid }).then(res => {
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
        handleResetPwd(record) {
            this.$confirm("确认重置密码？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                Apis.resetUserPwd({ fUserid: record.fuserid }).then(res => {
                    if (res.code == 0) {
                        this.$message({
                            message: "重置密码成功",
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
        // 主页表单校验并保存按钮
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    Apis.addOrUpdateUser(this.childDialog.form).then(res => {
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
        // 提交顶部表单数据
        postBaseTopFormData() {
            this.getList();
        },

        // 表格操作
        baseTableCurrentChange(row, index) {
            this.baseTableCurrentRadio = index;
        },
        baseTableRadioChange(row, index) {
            this.baseTableCurrentRadio = index;
        },
        // 页码操作
        baseTablePageSizeChange(val) {
            this.pageSize = val;
            this.pageNum = 1;
            this.getList();
        },
        baseTablePageCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        }
    }
};
</script>

<style scoped lang="scss">
</style>
