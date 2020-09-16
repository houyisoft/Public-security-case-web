<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div class="staff-item">
		<base-top-form title="非涉案人员入区登记列表信息"
		 :baseTopFormData="baseTopFormData"
		 @onPostBaseTopFormData="postBaseTopFormData">
			<template v-slot:form>
				<el-form-item prop="policeName"
				 label="人员姓名：">
					<el-input placeholder="请输入"
					 v-model="baseTopFormData.policeName"></el-input>
				</el-form-item>
			</template>
		</base-top-form>

		<!-- <base-table-btns :isDefaultBaseTableBtns="false">
			<div class="table-btn-wrap"
			 @click="baseTableBtnsEdit">
				<span>编辑</span>
				<i class="el-icon-edit btn-icon"></i>
			</div>
			<div class="table-btn-wrap"
			 @click="baseTableBtnsDelete">
				<span>删除</span>
				<i class="el-icon-delete btn-icon"></i>
			</div>
        </base-table-btns>-->

		<base-table baseTableDataPrimaryKey="fid"
		 :baseTableData="baseTableData.rows"
		 :baseTableDataTotal="baseTableData.total"
		 :baseTablePageCurrent="baseTablePageCurrent"
		 :baseTablePageSize="baseTablePageSize"
		 @onBaseTableCurrentChange="baseTableCurrentChange"
		 @onBaseTablePageSizeChange="baseTablePageSizeChange"
		 @onBaseTablePageCurrentChange="baseTablePageCurrentChange">
			<el-table-column prop="index"
			 label="序号"
			 type="index"
			 width="50"></el-table-column>
			<el-table-column label="人员类型"
			 width="100">
				<template slot-scope="scope">{{scope.row.peopleType}}</template>
			</el-table-column>
			<el-table-column prop="idno"
			 label="证件号"></el-table-column>
			<el-table-column prop="policeName"
			 label="姓名"
			 width="80"></el-table-column>
			<el-table-column prop="fgender"
			 label="性别"
			 width="80"></el-table-column>
			<el-table-column prop="fmobile"
			 label="手机号"
			 width="80"></el-table-column>
			<el-table-column prop="departmentName"
			 label="部门"
			 width="80"></el-table-column>
			<!-- <el-table-column prop="isLeave"
			 label="状态"
			 width="90"></el-table-column> -->
			<el-table-column prop="fdescription"
			 label="备注"
			 width="90"></el-table-column>
		</base-table>

		<!-- 登记选择弹框 - 选择工作人员/民警/律师 -->
		<el-dialog class="regist-dialog"
		 :visible="isUninvolvedRegist"
		 :close-on-click-modal="false"
		 @close="handleIsUninvolvedRegist(false)"
		 width="465px"
		 title="选择">
			<div class="regist-dialog-img-wrap">
				<el-image class="regist-dialog-img"
				 :src="require('@/assets/Case/CaseEntry/staff.png')"
				 @click="handleIsStaffRegist(true)"></el-image>
				<el-image class="regist-dialog-img"
				 :src="require('@/assets/Case/CaseEntry/police.png')"
				 @click="handleIsPoliceRegist(true)"></el-image>
				<el-image class="regist-dialog-img"
				 :src="require('@/assets/Case/CaseEntry/lawyer.png')"
				 @click="handleIsLawyerRegist(true)"></el-image>
			</div>
		</el-dialog>

		<!-- 1. 登记工作人员信息 -->
		<el-dialog title="工作人员登记"
		 :visible.sync="isStaffRegist"
		 :close-on-click-modal="false"
		 width="600px">
			<uninvolved-staff-dialog-item
			 @onHandleIsStaffRegist="handleIsStaffRegist"></uninvolved-staff-dialog-item>
		</el-dialog>

		<!-- 2. 登记民警信息 -->
		<el-dialog title="民警登记"
		:close-on-click-modal="false"
		 width="800px"
		 :visible.sync="isPoliceRegist">
			<uninvolved-police-dialog-item @onHandleIsPoliceRegist="handleIsPoliceRegist"
			 :isPoliceRegist="isPoliceRegist"></uninvolved-police-dialog-item>
		</el-dialog>

		<!-- 3. 登记律师信息 -->
		<el-dialog title="其他人员登记"
		 :visible.sync="isLawyerRegist"
		 :close-on-click-modal="false"
		 width="1000px">
			<uninvolved-others-dialog-item ref="lawyer" />
			<template slot="footer">
				<el-button type="primary"
				 @click="() => {this.$refs.lawyer.submitForm();isLawyerRegist = false}">确认</el-button>
				<el-button type
				 @click="isLawyerRegist = false">关闭</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	import apiCaseEntry from "@/apis/apiCase/apiCaseEntry.js";
	import UninvolvedStaffDialogItem from "@/views/Case/CaseEntry/components/UninvolvedStaffDialogItem.vue";
	import UninvolvedPoliceDialogItem from "@/views/Case/CaseEntry/components/UninvolvedPoliceDialogItem.vue";
	import UninvolvedOthersDialogItem from "@/views/Case/CaseEntry/components/UninvolvedOthersDialogItem.vue";
	export default {
		props: {
			isUninvolvedRegist: {
				type: Boolean,
				default: false
			}
		},
		components: {
			UninvolvedStaffDialogItem,
			UninvolvedPoliceDialogItem,
			UninvolvedOthersDialogItem
		},
		data() {
			return {
				// 顶部表单数据
				baseTopFormData: {
					departmentId: "", // 部门ID
					policeName: "" // 姓名
				},

				/* 非涉案人员表格 */
				baseTableData: {
					total: 0,
					rows: []
				},
				baseTableCurrent: {}, // 当前选中表格行
				baseTablePageCurrent: 1,
				baseTablePageSize: 10,

				isStaffRegist: false, // 登记 - 工作人员弹框
				isPoliceRegist: false, // 登记 - 民警弹框
				isLawyerRegist: false // 登记 - 律师弹框
			};
		},
		computed: {
			typeMapData() {
				return this.$store.state.typeMapData;
			}
		},
		created() {
			this.getTbUnsuspectList(); // 获取非涉案人员列表信息
		},
		methods: {
			getTbUnsuspectList() {
				apiCaseEntry
					.getTbUnsuspectList({
						pageNum: this.baseTablePageCurrent,
						pageSize: this.baseTablePageSize,
						departmentID: this.baseTopFormData.departmentId,
						policeName: this.baseTopFormData.policeName,
						centerInfoId: this.$store.state.userInfo.fcompanyid,
					})
					.then(res => {
						console.log("获取非涉案人员列表信息成功", res);
						if (res.code == 0) {
							this.baseTableData = res;
							// 字段纠错，后台接口返回小写，前端用的是驼峰
							this.baseTableData.rows.forEach((item)=>{
								item.fAllowEndTime = (item.fallowendtime || 0)
							})
						}
					})
					.catch(err => {
						console.log("获取非涉案人员列表信息失败", err);
					});
			},
			// 提交顶部表单
			postBaseTopFormData() {
				console.log("提交顶部表单数据", this.baseTopFormData);
				this.baseTablePageCurrent = 1;
				this.getTbUnsuspectList();
			},
			// // 编辑表格数据
			// baseTableBtnsEdit() {
			// 	console.log('表格当前选中行', this.baseTableCurrent)
			// },
			// // 删除表格数据
			// baseTableBtnsDelete() {
			// 	console.log('表格当前选中行', this.baseTableCurrent)
			// },
			// 选中表格行
			baseTableCurrentChange(row, index) {
				console.log("选中行", row, index);
				this.baseTableCurrent = row;
			},
			// 表格修改每页数量
			baseTablePageSizeChange(val) {
				console.log("设置每页数量", val);
				this.baseTablePageSize = val;
				this.baseTablePageCurrent = 1;
				this.getTbUnsuspectList()
			},
			// 表格翻页
			baseTablePageCurrentChange(val) {
				console.log("设置当前页码", val);
				this.baseTablePageCurrent = val;
				this.getTbUnsuspectList()
			},
			handleIsUninvolvedRegist(bool) {
				this.$emit("onHandleIsUninvolvedRegist", bool);
			},
			handleIsStaffRegist(bool) {
				this.isStaffRegist = bool;
			},
			handleIsPoliceRegist(bool) {
				this.isPoliceRegist = bool;
			},
			handleIsLawyerRegist(bool) {
				this.isLawyerRegist = bool;
			}
		}
	};
</script>

<style scoped
 lang="scss">
	.staff-item {
		.regist-dialog {
			.regist-dialog-img-wrap {
				display: flex;
				justify-content: space-around;

				.regist-dialog-img {
					width: 150px;
					height: 150px;
				}
			}
		}
	}
</style>
