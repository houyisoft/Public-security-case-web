<template>
    <div class="info-Dictionary">
        <base-top-form
            title="岗位管理"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <el-form-item prop="postName" label="岗位名称">
                    <el-input v-model="baseTopFormData.postName" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="state" label="状态">
                    <el-select placeholder="请选择" clearable v-model="baseTopFormData.state">
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
            <el-table-column prop="funcNames" label="功能室"></el-table-column>
            <el-table-column prop="postName" label="岗位名称"></el-table-column>
            <el-table-column prop="postNO" label="岗位编号"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.state"
                        active-color="#13ce66"
                        active-value="1"
                        inactive-color="#ff4949"
                        inactive-value="0"
                        @change="handleStateChange($event, scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="fCreateusername" label="创建人"></el-table-column>
            <el-table-column prop="fCreatedate" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="120">
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
            <el-form :model="childDialog.form" ref="childDialog" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="人员类型"
                            :rules="[{ required: true, message: '请选择人员类型', trigger: 'change' }]"
                            prop="personnelType"
                        >
                            <el-select
                                placeholder="请选择"
                                multiple
                                v-model="childDialog.form.personnelType"
                                style="width: 200px;"
                            >
                                <el-option
                                    v-for="(item, index) in personTypeOptions"
                                    :key="index"
                                    :label="item.fitemname"
                                    :value="item.fitemid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            :rules="[{ required: true, message: '请输入岗位名称', trigger: 'blur' }]"
                            label="岗位名称"
                            prop="postName"
                        >
                            <el-input v-model="childDialog.form.postName" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!-- <el-col :span="12">
                        <el-form-item
                            :rules="[{ required: true, message: '请输入岗位编号', trigger: 'blur' }]"
                            label="岗位编号"
                            prop="postNO"
                        >
                            <el-input v-model="childDialog.form.postNO" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item
                            :rules="[{ required: true, message: '请输入岗位简称', trigger: 'blur' }]"
                            label="岗位简称"
                            prop="shortName"
                        >
                            <el-input v-model="childDialog.form.shortName" style="width: 200px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="功能室"
                            :rules="[{ required: true, message: '请选择功能室', trigger: 'change' }]"
                            prop="funcID"
                        >
                            <el-select
                                placeholder="请选择"
                                multiple
                                v-model="childDialog.form.funcID"
                                style="width: 200px;"
                            >
                                <el-option
                                    v-for="(item, index) in houseOptions"
                                    :key="index"
                                    :label="item.funcName"
                                    :value="item.funcID"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="state">
                            <el-switch
                                v-model="childDialog.form.state"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-color="#ff4949"
                                inactive-value="0"
                            ></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input
                                type="textarea"
                                rows="5"
                                style="width: 560px;"
                                v-model="childDialog.form.remark"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <el-checkbox v-model="isFinished">确认并关闭窗口</el-checkbox> -->
                <el-button type="primary" @click="submitForm('childDialog')">确认</el-button>
                <el-button @click="mainDialog=false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import InfoSubmenu from "@/views/Info/components/InfoSubmenu.vue";
import Apis from "@/apis/unit.js";
export default {
    components: {
        InfoSubmenu
    },
    data() {
        return {
            formType:0,//0新增,1修改
            isFinished: true,
            personTypeOptions: [],
            companylist: [],
            houseOptions: [],
            baseTopFormData: {
                postName: "",
                state: ""
            },
            types: [
                {
                    value: 1,
                    label: "类型一"
                }
            ],
            // baseTable表格组件数据
            baseTableData: {
                total: 0,
                list: []
            },
            childDialog: {
                form: {
                    fId: "",
                    // postNO: "",
                    postName: "",
                    doorStopID: "",
                    shortName: "",
                    funcID: [],
                    fcompanyid: "",
                    remark: "",
                    fCompanyid: "",
                    personnelType: [],
                    state: "1"
                },
                visible: false
            },
            baseTableCurrentRadio: 0, // 当前选中的radio
            pageNum: 1,
            pageSize: 10,
            mainDialog: false,
            currentTableRow: {}
        };
    },
    methods: {
        getPersonType() {
            Apis.getPersonType({ type: 1 }).then(res => {
                if (res.code == 0) {
                    this.personTypeOptions = res.rows;
                }
            });
        },
        getHouselist() {
            Apis.getHouselist().then(res => {
                if (res.code == 0) {
                    this.houseOptions = res.rows;
                }
            });
        },
        getList() {
            const { pageNum, pageSize } = this;
            Apis.getPostList({
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
        handleAdd() {
            this.childDialog.title = "新增";
            this.$resetFields("childDialog");
            this.mainDialog = true;
            this.formType=0
        },
        handleUpdate(record) {
            this.formType=1
            this.$resetFields("childDialog");
            this.childDialog.title = "修改";
            this.mainDialog = true;
            const { fId } = record;
            Apis.getPostDetail(fId).then(res => {
                const {
                    fId,
                    // postNO,
                    postName,
                    shortName,
                    funcID,
                    fcompanyid,
                    remark,
                    state,
                    fCompanyid,
                    personnelType
                } = res.data || {};
                this.childDialog.form = {
                    fId,
                    // postNO,
                    postName,
                    shortName,
                    funcID: funcID.split(","),
                    fcompanyid,
                    remark,
                    state,
                    fCompanyid,
                    personnelType: personnelType.split(",")
                };
            });
        },
        handleStateChange(state, record) {
            Apis.addOrUpdatePost({ state, fId: record.fId })
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
                Apis.deletePost({ ids: record.fId }).then(res => {
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
        // 主页表单校验并保存按钮
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    debugger
                    if(this.formType==0)
                    this.childDialog.form.fId=""
                    Apis.addOrUpdatePost(this.childDialog.form).then(res => {
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
            this.getSublist();
        },
        baseTablePageCurrentChange(val) {
            this.pageNum = val;
            this.getSublist();
        }
    },
    mounted() {
        this.getList();
        this.getPersonType();
        this.getHouselist();
    }
};
</script>

<style scoped lang="scss">
</style>
