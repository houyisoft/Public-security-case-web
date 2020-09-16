<template>
	<div class="staff-dialog-item">
		<el-form class="staff-form"
		 :model="staffFormData"
		 ref="staffForm"
		 :rules="staffFormDataRules"
		 label-width="80px"
		 label-position="left">
			<el-form-item label="人员类型"
			 prop="peopleType"
			 required>
				<el-select v-model="staffFormData.peopleType"
				 placeholder="请选择">
					<el-option :label="item.fitemname"
					 :value="item.fitemvalue"
					 v-for="(item, index) in typeObjData.unInvolvedStaffTypes"
					 :key="index"></el-option>
				</el-select>
			</el-form-item>
			<div class="form-item">
				<div class="form-item-label">
					<span class="required-icon">*</span>人员姓名</div>
				<div class="form-item-content">
					<base-fake-element baseFakeElementFlag="policeName"
					 baseFakeElementType="select"
					 @onBaseFakeElementClick="baseFakeElementClick">{{staffFormData.policeName || '请选择'}}</base-fake-element>
				</div>
			</div>
			<div class="flex-box">
				<el-form-item class="flex-box-left"
				 label="证件类型"
				 prop="iDType">
					<base-fake-element baseFakeElementType="input">{{staffFormData.iDType}}</base-fake-element>
				</el-form-item>
				<el-form-item class="flex-box-right"
				 label="证件号"
				 prop="iDNO">
					<base-fake-element baseFakeElementType="input">{{staffFormData.iDNO}}</base-fake-element>
				</el-form-item>
			</div>
			<div class="flex-box">
				<el-form-item class="flex-box-left"
				 label="性别"
				 prop="fGender">
					<base-fake-element baseFakeElementType="input">{{staffFormData.fGender}}</base-fake-element>
				</el-form-item>
				<el-form-item class="flex-box-right"
				 label="部门"
				 prop="departmentID">
					<base-fake-element :title="staffFormData.deptName" baseFakeElementType="input">{{(staffFormData.deptName.length>12&&staffFormData.deptName!="")?staffFormData.deptName.slice(0,11)+'...':addStaffBaseTableCurrent.deptName}}</base-fake-element>
				</el-form-item>
			</div>
			<div class="flex-box">
				<el-form-item class="flex-box-left"
				 label="手机号"
				 prop="fMobile">
					<base-fake-element baseFakeElementType="input">{{staffFormData.fMobile}}</base-fake-element>
				</el-form-item>
				<el-form-item class="flex-box-right"
				 label="账号"
				 prop="fAccount">
					<base-fake-element baseFakeElementType="input">{{staffFormData.fAccount}}</base-fake-element>
				</el-form-item>
			</div>
			<el-form-item label="岗位"
			 prop="station">
				<el-select placeholder="请选择"
				 v-model="staffFormData.station">
					<el-option :label="item.postName"
					 :value="item.fid"
					 v-for="(item, index) in $store.state.posts"
					 :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="门禁卡号"
			 prop="postCardNo">
				<base-fake-element style="width:85%;float:left" baseFakeElementType="card"
				 baseFakeElementFlag="postCardNo"
				 @onBaseFakeElementClick="baseFakeElementClick">{{staffFormData.postCardNo}}</base-fake-element>
				 <el-checkbox style="margin-left:2.5%" v-model="staffFormData.noname">同号</el-checkbox>
			</el-form-item>
			<el-form-item label="定位卡号">
				<base-fake-element style="width:85%;float:left" baseFakeElementType="card"
				 baseFakeElementFlag="cardNo"
				 @onBaseFakeElementClick="baseFakeElementClick">{{staffFormData.cardNo}}</base-fake-element>
				 <el-checkbox style="margin-left:2.5%" v-model="staffFormData.noname">同号</el-checkbox>
			</el-form-item>
			<el-form-item label="有效时间"
			 prop="fAllowEndTime">
				<el-date-picker v-model="staffFormData.fAllowEndTime"
				 type="date"
				 format="yyyy-MM-dd"
				 value-format="yyyy-MM-dd"
				 placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="备注"
			 prop="fDescription">
				<el-input type="textarea"
				 v-model="staffFormData.fDescription"></el-input>
			</el-form-item>

			<div class="staff-form-footer">
				<el-button type="primary"
				 @click="postStaffFormData">确认</el-button>
				<el-button @click="$emit('onHandleIsStaffRegist', false)">取消</el-button>
			</div>
		</el-form>

		<!-- 以下为弹窗区域 -->
		<el-dialog title="添加人员"
		:close-on-click-modal="false"
		 :visible.sync="isAddStaffDialog"
		 append-to-body>
			<base-top-form :baseTopFormData="addStaffBaseTopFormData"
			 @onPostBaseTopFormData="getAddStaffBaseTableData">
				<template v-slot:form>
					<el-form-item prop="fRealname"
					 label="人员姓名">
						<el-input v-model="addStaffBaseTopFormData.fRealname"
						 placeholder="请输入"></el-input>
					</el-form-item>
				</template>
			</base-top-form>

			<base-table baseTableDataPrimaryKey="fUserid"
			 :baseTableData="addStaffBaseTableData.rows"
			 :baseTableDataTotal="addStaffBaseTableData.total"
			 :baseTablePageCurrent="addStaffBaseTablePageCurrent"
			 :baseTablePageSize="addStaffBaseTablePageSize"
			 @onBaseTableCurrentChange="addStaffBaseTableCurrentChange"
			 @onBaseTablePageSizeChange="addStaffBaseTablePageSizeChange"
			 @onBaseTablePageCurrentChange="addStaffBaseTablePageCurrentChange">
				<el-table-column prop="index"
				 label="序号"
				 type="index"
				 width="50">
				</el-table-column>
				<el-table-column prop="faccount"
				 label="账号">
				</el-table-column>
				<el-table-column prop="frealname"
				 label="姓名">
				</el-table-column>
				<el-table-column prop="fgender"
				 label="性别">
					<template slot-scope="scope"
					 v-if="scope.row.fgender">
						{{typeMapData.genderTypes[scope.row.fgender].fitemname}}
					</template>
				</el-table-column>
				<el-table-column prop="fmobile"
				 label="手机">
				</el-table-column>
				<el-table-column prop="deptName"
				 label="部门">
				</el-table-column>
			</base-table>
			<template slot="footer">
				<el-button type="primary"
				 @click="chooseAddStaff">确认</el-button>
				<el-button @click="isAddStaffDialog = false">关闭</el-button>
			</template>
		</el-dialog>

		<!-- 2. 刷卡 -->
		<el-dialog class="scan-dialog"
		:close-on-click-modal="false"
		 append-to-body
		 width="920px"
		 :visible.sync="isScanCardDialog"
		 title="请选择">
			<el-input
					ref="refDialogCardNumber"
					class="dialog-hide-input"
					:autofocus="true"
					autocomplete="on"
					v-model="DialogBandNumber"
					@input="changeDialogBandCardNumber"
					@blur="(e) => e.target.focus()"
			></el-input>
			<div class="scan-dialog-wrap">
				<el-image class="dialog-card-img"
				 :src="require('@/assets/images/case/caseEntry/cardDialogImg.png')"></el-image>
				<div class="dialog-big-text">请将卡置于机器上方</div>
				<div class="dialog-small-text">读取成功后自动关闭</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import apiCaseEntry from '@/apis/apiCase/apiCaseEntry.js'
	import Apis from "@/apis/apiCase/caseEntry_un.js";
	import {
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				// 人员基本信息表单
				staffFormData: {
					deptName:""
				},
				staffFormDataRules: {},

				/* 1.添加人员弹窗 */
				isAddStaffDialog: false,
				addStaffBaseTopFormData: {},
				addStaffBaseTableData: {
					total: 0,
					rows: []
				},
				addStaffBaseTablePageCurrent: 1,
				addStaffBaseTablePageSize: 10,
				addStaffBaseTableCurrent: {
					
				}, // 当前选中人员行

				/* 2. 刷卡/手环弹窗 */
				isScanCardDialog: false, // 刷卡弹窗
                DialogBandNumber: "", // 扫描手环窗口隐藏input获取值
				cardFlag:"",//0:cardNo,1:postCardNo
			}
		},
		created() {
			console.log('typeMapData', this.typeMapData)
		},
		watch: {
			isAddStaffDialog(val) {
				if (!val) {
					console.log('清除添加工作人员弹窗数据')
					this.addStaffBaseTopFormData = {}
					this.addStaffBaseTableData = {}
					this.addStaffBaseTablePageCurrent = 1
					this.addStaffBaseTablePageSize = 10
				}
			}
		},
		computed: {
			typeObjData() {
				return this.$store.state.typeObjData
			},
			typeMapData() {
				return this.$store.state.typeMapData
			}
		},
		mounted(){
			this.getTypeList()
		},
		methods: {
			...mapMutations(["updateTypeObjData"]),
            changeDialogBandCardNumber(wristbandNo) {
                if (wristbandNo.length == 8) {
                    if(this.cardFlag == 0){
                        this.staffFormData.cardNo = wristbandNo;
					} else if(this.cardFlag == 1) {
                        this.staffFormData.postCardNo = wristbandNo;
					}
                    this.isScanCardDialog = false;
                }
            },
			getTypeList() {
				Apis.getTypeList({
					type: 10
				}).then(res => {
					this.updateTypeObjData({
						unInvolvedStaffTypes: res.data || []
					});
				});
			},
			// 打开弹窗
			baseFakeElementClick(flag) {
				console.log('点击伪标签', flag)
				if (flag == 'policeName') {
					this.isAddStaffDialog = true
					this.getAddStaffBaseTableData()
				} else if (flag == 'cardNo') { // 定位卡号
					this.isScanCardDialog = true
					this.DialogBandNumber = "";
					this.cardFlag = 0;
                    this.$nextTick(() => {
                        this.$refs['refDialogCardNumber'].focus();
                    })
				} else if (flag == 'postCardNo') { // 门禁卡号
					this.isScanCardDialog = true;
                    this.DialogBandNumber = "";
                    this.cardFlag = 1;
                    this.$nextTick(() => {
                        this.$refs['refDialogCardNumber'].focus();
                    })
				}
			},

			// 提交登记工作人员表单
			postStaffFormData() {
				let data = { ...this.staffFormData,
					centerInfoId:this.$store.state.userInfo.fcompanyid,
					centerID: this.$store.state.userInfo.fcompanyid, // 办案中心id
					fId: 0, // 新增传0 编辑传对应值
          type: 1, // 1-工作人员 2-民警 3-其他
          peopleType: this.staffFormData.peopleType
				}
				if (!this.staffFormData.fAllowEndTime) {
					let date = new Date()
					let year = date.getFullYear().toString()
					let month = date.getMonth().toString().length === 2 ? date.getMonth() : '0' + date.getMonth().toString()
					let day = date.getDate().toString().length === 2 ? date.getDate() : '0' + date.getDate().toString()
					data.fAllowEndTime = year + '-' + month + '-' + day
				} else {
					data.fAllowEndTime = this.staffFormData.fAllowEndTime + ' 23:59:59'
				}
				apiCaseEntry.geTtbUnsuspectAdd(data).then(res => {
					console.log('保存入区成功', data)
					if (res.code == 0) {
						this.$message.success('保存成功')
						this.staffForm = {}
						this.$refs['staffForm'].resetFields();
						this.staffFormData.policeName = ""
						this.staffFormData.station = ""
						this.$emit('onHandleIsStaffRegist', false)
					} else {
						this.$message.warning(res.msg || '保存失败')
					}
				}).catch(err => {
					this.$message.warning(err.msg || '保存失败')
					console.log('保存入区失败', err)
				})
			},

			// 弹窗区域
			// 添加人员 - 列表
			getAddStaffBaseTableData() {
				let data = {
					fRealname: this.addStaffBaseTopFormData.fRealname,
					pageNum: this.addStaffBaseTablePageCurrent,
					pageSize: this.addStaffBaseTablePageSize,
				}
				apiCaseEntry.getLrBaseUserList(data).then(res => {
					if (res.code == 0) {
						console.log('获取人员列表成功', res)
						this.addStaffBaseTableData = res
					}
				})
			},
			addStaffBaseTableCurrentChange(row, index) {
				if (!row) {
					return
				}
				console.log('当前选中工作人员行', row)
				this.addStaffBaseTableCurrent = row
			},
			addStaffBaseTablePageSizeChange(val) {
				this.addStaffBaseTablePageCurrent = 1
				this.addStaffBaseTablePageSize = val
				this.getAddStaffBaseTableData()
			},
			addStaffBaseTablePageCurrentChange(val) {
				this.addStaffBaseTablePageCurrent = val
				this.getAddStaffBaseTableData()
			},
			chooseAddStaff() { // 选中人员姓名
				if (!this.addStaffBaseTableCurrent.fuserid) {
					return
				}
				let staffInfo = {
					policeName: this.addStaffBaseTableCurrent.frealname,
					iDType: this.addStaffBaseTableCurrent.idtype, // 证件类型
					iDNO: this.addStaffBaseTableCurrent.idno, // 证件号
					fGender: this.addStaffBaseTableCurrent.fgender,
					departmentID: this.addStaffBaseTableCurrent.fdepartmentid,
					fMobile: this.addStaffBaseTableCurrent.fmobile,
					fAccount: this.addStaffBaseTableCurrent.faccount,
					deptName: this.addStaffBaseTableCurrent.deptName==null?"":this.addStaffBaseTableCurrent.deptName
				}
				this.staffFormData = { ...this.staffFormData,
					...staffInfo
				}
				this.isAddStaffDialog = false
			},

		}
	}
</script>

<style scoped
 lang="scss">
	.staff-dialog-item {
		padding: 20px 30px;

		/* 表单元素样式自定义 */
		::v-deep .el-form-item {
			.el-form-item__label {
				width: 80px;
			}

			.el-form-item__content {
				.el-select {
					width: 100%;
				}
			}
		}

		/* 自定义form-item样式 */
		.form-item {
			display: flex;
			margin-bottom: 22px;

			.form-item-label {
				width: 80px;
			}

			.form-item-content {
				flex: 1;
			}
		}

		.staff-form {

			.flex-box {
				.flex-box-left {
					flex: 2;
					padding-right: 20px;
				}

				.flex-box-right {
					flex: 3;
				}
			}

			.staff-form-footer {
				text-align: right;
			}
		}

		/* 添加人员弹窗 */

		/* 扫描/扫手环弹窗 */
		
	}
	.scan-dialog {
		::v-deep .el-dialog__body {
			padding: 90px 0 95px 0;
		}
		.dialog-hide-input {
			position: absolute;
			top: -10000px;
		}

		.scan-dialog-wrap {
			text-align: center;

			.dialog-card-img {
				width: 213px;
				height: 95px;
			}

			.dialog-band-img {
				width: 120px;
				height: 114px;
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
