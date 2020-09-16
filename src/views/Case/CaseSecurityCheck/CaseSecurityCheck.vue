<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="case-security-check">
        <base-top-form
            title="人身检查列表信息"
            :baseTopFormData="baseTopFormData"
            @onPostBaseTopFormData="postBaseTopFormData"
        >
            <template v-slot:form>
                <!--<el-form-item label=""-->
                <!--prop="department">-->
                <!--<el-select placeholder="请选择人员部门" size="mini"-->
                <!--v-model="baseTopFormData.department">-->
                <!--<el-option :label="item.label"-->
                <!--:value="item.value"-->
                <!--v-for="(item, index) in departments"-->
                <!--:key="index"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="人员姓名" prop="name">
                    <el-input placeholder="请输入人员姓名" v-model.trim="baseTopFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="安全检查" prop="isChecked">
                    <el-select
                        placeholder="请选择是否已安全检查"
                        clearable
                        v-model="baseTopFormData.isPersonsSecurity"
                    >
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
            </template>
        </base-top-form>

        <div class="table-btns-wrap">
            <!-- <div class="table-btn-wrap"
			 @click="openElectronicSignatureDialog">
				<span>生成电子签章页</span>
				<img class="btn-img"
				 :src="require('@/assets/Case/CaseSecurityCheck/signature.png')">
            </div>-->
            <div class="table-btn-wrap" @click="brushHand()">
                <span>刷手环</span>
                <i class="el-icon-watch-1 btn-icon"></i>
            </div>
            <div class="table-btn-wrap" @click="openSecurityCheckDialog">
                <span>安全检查</span>
                <i class="el-icon-s-check btn-icon"></i>
            </div>
            <div class="table-btn-wrap" @click="openDressPhotoDialog">
                <span>换衣拍照</span>
                <i class="el-icon-camera-solid btn-icon"></i>
            </div>
        </div>
        <div class="page-main">
            <el-table
                class="main-table"
                border
                :data="securityCheckData.list"
                highlight-current-row
                @current-change="selectTableRow"
            >
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="fcreatedate" label="登记时间" width="200" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                <el-table-column prop="personnelType" width="200" label="人员类型" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" width="50" align="center"></el-table-column>
                <el-table-column prop="gender" label="性别" width="50" align="center"></el-table-column>
                <el-table-column prop="wristbandNo" label="卡/手环编号" width="120" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.wristbandNo != 'null'">{{scope.row.wristbandNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="isPersonsSecurity"
                    width="130"
                    label="是否已安全检查"
                    align="center"
                ></el-table-column>
                <el-table-column prop="isChangeClothes" width="130" label="是否已换衣拍照" align="center"></el-table-column>
                <el-table-column prop="cardType" label="证件类型" width="100" align="center"></el-table-column>
                <el-table-column prop="cardNumber" label="证件号码" width="170" align="center"></el-table-column>
                <el-table-column prop="birthDate" label="出生日期" width="100" align="center"></el-table-column>=
                <el-table-column prop="nativeAddress" label="籍贯地址"></el-table-column>
            </el-table>
        </div>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total"
            :hide-on-single-page="false"
        ></el-pagination>

        <!-- 生成电子签章页弹窗 -->
        <!-- <signature-dialog-item :isShow="isSignatureDialog"
        @onCloseDialog="isSignatureDialog = false"></signature-dialog-item>-->
        <!-- 安全检查弹窗 -->
        <security-check-dialog-item
            :isShow="isSecurityCheckDialog"
            :peopleObj="currentTableRow"
            @onCloseDialog="() => {isSecurityCheckDialog = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
        ></security-check-dialog-item>
        <!-- 安全检查弹窗usb -->
         <security-check-dialog-itemusb
            :isShow="isSecurityCheckDialogusb"
            :peopleObj="currentTableRow"
            @onCloseDialog="() => {isSecurityCheckDialogusb = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
        ></security-check-dialog-itemusb>
        <!-- 换衣拍照弹窗 -->
        <dress-photo-dialog-item
            ref="dressPhoto"
            :isShow="isDressPhotoDialog"
            :peopleObj="currentTableRow"
            @onCloseDialog="() => {isDressPhotoDialog = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
        ></dress-photo-dialog-item>
        <!-- 换衣拍照弹窗usb -->
        <dress-photo-dialog-itemusb
            ref="dressPhoto"
            :isShow="isDressPhotoDialogusb"
            :peopleObj="currentTableRow"
            @onCloseDialog="() => {isDressPhotoDialogusb = false;baseTopFormData.wristbandNo = '';currentTableRow = {};getList();}"
        ></dress-photo-dialog-itemusb>
        <el-dialog
            class="scan-dialog"
            :close-on-click-modal="false"
            width="650px"
            :visible.sync="isScanBandDialog"
            title="请选择"
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
                    :src="require('@/assets/images/case/caseEntry/wristbandDialogImg.png')"
                ></el-image>
                <div class="dialog-big-text">请将手环置于机器上方</div>
                <div class="dialog-small-text">读取成功后自动关闭</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import caseinfo from "@/apis/wywcase.js";
import SignatureDialogItem from "./components/SignatureDialogItem.vue"; // 电子签章
import SecurityCheckDialogItem from "./components/SecurityCheckDialogItem.vue"; // 安全检查
import SecurityCheckDialogItemusb from "./components/SecurityCheckDialogItemusb.vue"; // 安全检查usb
import DressPhotoDialogItem from "./components/DressPhotoDialogItem.vue"; // 换衣拍照
import DressPhotoDialogItemusb from "./components/DressPhotoDialogItemusb.vue";//换衣拍照usb
export default {
    components: {
        SignatureDialogItem,
        SecurityCheckDialogItem,
        DressPhotoDialogItem,
        DressPhotoDialogItemusb,
        SecurityCheckDialogItemusb
    },
    data() {
        return {
            isScanBandDialog: false,
            DialogBandNumber: "",
            // 顶部组件表单数据
            baseTopFormData: {
                department: "",
                name: "",
                isChecked: "",
                pageSize: 10,
                pageNum: 1,
                centerInfoId: this.$store.state.userInfo.fcompanyid,
            },
            pageData: {
                currentPage: 1,
                pageSize: 10,
                pageNum: 1,
                total: 0,
            },
            // 人员部门下拉选框
            departments: [
                {
                    label: "部门一",
                    value: 1,
                },
            ],
            isSignatureDialog: false, // 显示隐藏 生成电子签章页弹窗
            isSecurityCheckDialog: false, // 显示隐藏 安全检查弹窗
             isSecurityCheckDialogusb: false, // 显示隐藏 安全检查弹窗usb
            isDressPhotoDialog: false, // 显示隐藏 换衣拍照弹窗
             isDressPhotoDialogusb: false, // 显示隐藏 换衣拍照弹窗usb
            // 信息采集列表数据
            securityCheckData: {
                total: 0,
                list: [],
            },
            fid: "",
            currentTableRow: {}, // 当前选中行
        };
    },
    created() {
        let fid = this.$route.query.options;
        if (fid) {
            this.baseTopFormData.fId = fid;
            this.getList();
        } else {
            this.getList();
        }
    },
    methods: {
        changeDialogBandCardNumber(ID) {
            var DialogNumber = document.getElementById(ID).value;
            if (DialogNumber.length == 8) {
                caseinfo.getRsjclist({ DialogNumber }).then((res) => {
                    if (res.code === 0) {
                        this.isScanBandDialog = false;
                        this.DialogBandNumber = "";
                        document.getElementById(ID).value = "";
                        this.currentTableRow = res.rows[0];
                        this.openSecurityCheckDialog();
                    }
                });
            } else {
                this.DialogBandNumber = "";
                document.getElementById(ID).value = "";
                this.$refs.refDialogBandNumber.focus();
            }
        },
        brushHand() {
            this.isScanBandDialog = true;
            this.$nextTick(() => {
                //自动获取焦点 element组件autofocus失效
                this.DialogCardNumber = "";
                this.$refs.refDialogBandNumber.focus();
            });
        },
        takePhoto(row) {
            let pluginPlay = document.getElementById("plugin0");
            let pathName = "D:\\SecurityImg" + "\\" + Date.now() + ".jpg";
            let cmd = {
                cmd: "snapshot",
                data: {
                    path: pathName,
                    pictype: 1,
                    snaptype: 1,
                },
            };
            let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
            ret = JSON.parse(ret);

            if (ret.code == 0) {
                //拍照后延迟 图片才在文件夹内生成。再转换成base64格式图片
                setTimeout(() => {
                    let src = pluginPlay.base64EncodeFile(pathName);
                    console.log(src);
                    let img = "data:image/jpg;base64," + src;
                    console.log("after图片base64地址", img);
                    this.dialogTableData[row.no - 1].img = img;
                }, 2000);
            }
        },

        getList() {
            caseinfo.getRsjclist(this.baseTopFormData).then((res) => {
                // console.log(res)
                if (res.code == 0) {
                    this.securityCheckData.list = res.rows;
                    this.securityCheckData.total = res.total;
                    this.pageData.total = res.total;
                }
            });
        },
        // 提交页面顶部表单
        postBaseTopFormData() {
            this.baseTopFormData.fId = "";
            this.getList();
        },
        // 打开生成电子签章页弹窗
        openElectronicSignatureDialog() {
            this.isSignatureDialog = true;
        },
        // 打开安全检查弹窗
        openSecurityCheckDialog() {
            if (JSON.stringify(this.currentTableRow) == "{}") {
                this.$message({
                    message: "请先选择人员",
                    type: "error",
                });
            } else {
                caseinfo.getCameraType({configName:'人身抓拍摄像头类型'}).then(res=>{
                    debugger
                if(res.rows[0].configNr=="1"){
                    this.isSecurityCheckDialog = true;}
                    else if(res.rows[0].configNr=="2"){
                    this.isSecurityCheckDialogusb = true;}
                });
            }
        },
        // 打开换衣拍照弹窗
        openDressPhotoDialog() {
            if (JSON.stringify(this.currentTableRow) == "{}") {
                this.$message({
                    message: "请先选择人员",
                    type: "error",
                });
            } else {
                caseinfo.getCameraType({configName:'人身抓拍摄像头类型'}).then(res=>{
                    debugger
                if(res.rows[0].configNr=="1"){
                    this.isDressPhotoDialog = true;}
                    else if(res.rows[0].configNr=="2"){
                    this.isDressPhotoDialogusb = true;}
                });
            }
        },
        // 提交 信息采集修改/录入弹窗表单
        postDialogFormData() {
            this.$validate("dialogForm")
                .then((res) => {
                    console.log("res", res);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
        selectTableRow(val) {
            console.log("当前选中行", val);
            this.currentTableRow = val;
        },
        handleSizeChange(val) {
            console.log("设置每页数量", val);
            this.baseTopFormData.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            console.log("设置当前页码", val);
            this.baseTopFormData.pageNum = val;
            this.getList();
        },
    },
};
</script>

<style scoped lang="scss">
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
