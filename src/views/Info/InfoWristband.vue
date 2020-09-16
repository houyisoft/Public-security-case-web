<template>
	<div class="info-wristband">
		<base-top-form title='手环管理'
		 :baseTopFormData="baseTopFormData"
		 @onPostBaseTopFormData="postBaseTopFormData">
			<template v-slot:form>
				<el-form-item prop="name"
				 label="手环编号：">
					<el-input v-model="baseTopFormData.name"
					 placeholder="请输入"></el-input>
				</el-form-item>
			</template>
		</base-top-form>

		<base-table-btns @onBaseTableBtnsAdd="baseTableBtnsAdd"
		 @onBaseTableBtnsEdit="baseTableBtnsEdit"
		 @onBaseTableBtnsDelete="baseTableBtnsDelete"></base-table-btns>

		<base-table :baseTableData="baseTableData.list"
		 :isBaseTableCheckbox="false"
		 baseTableDataPrimaryKey="fid"
		 :baseTableDataTotal="baseTableData.total"
		 :baseTablePageCurrent="baseTablePageCurrent"
		 :baseTablePageSize="baseTablePageSize"
		 @onBaseTableCurrentChange="baseTableCurrentChange"
		 @onBaseTablePageSizeChange="baseTablePageSizeChange"
		 @onBaseTablePageCurrentChange="baseTablePageCurrentChange">
				<el-table-column type="index"
				 label="序号"
				 width="50">
				</el-table-column>
			<el-table-column prop="cardCode"
			 label="卡号">
			</el-table-column>
			<el-table-column prop="icCode"
			 label="Ic卡编号">
			</el-table-column>
			<el-table-column prop="quantity"
			 label="电量">
			</el-table-column>
			<el-table-column prop="proportion"
			 label="百分比">
			</el-table-column>
			<el-table-column prop="useState" 
			 label="使用状态">
			 	<template scope="scope">
                    <el-tag effect="dark" v-if="scope.row.useState=='0'||scope.row.useState==''||scope.row.useState==null">未使用</el-tag>  
					<el-tag type="success" effect="dark" v-if="scope.row.useState=='1'">使用中</el-tag> 
                </template>
			</el-table-column>
			<el-table-column prop="useUserName"
			 label="入区人员信息姓名">
			</el-table-column>
		</base-table>

		<base-dialog :isBaseDialog="isBaseDialog"
		 :baseDialogFormData="baseDialogFormData"
		 :title="baseDialogType == 1 ? '新增' : '编辑'"
		 @onHandleIsBaseDialog="handleIsBaseDialog"
		 @onPostBaseDialogFormData="postBaseDialogFormData">
			<template v-slot:form>
				<el-form-item prop="fId" v-if="false" 
				 label="主键">
					<el-input placeholder="请输入"
					 v-model="baseDialogFormData.fId"></el-input>
				</el-form-item>
				<el-form-item prop="cardCode" :rules="[{'required': true,'message': '请输入卡号','trigger': 'blur'}]"
				 label="卡号">
					<el-input placeholder="请输入"
					 v-model="baseDialogFormData.cardCode"></el-input>
				</el-form-item>
				<el-form-item prop="icCode" :rules="[{'required': true,'message': '请输入IC卡号','trigger': 'blur'}]"
				 label="IC卡号">
					<el-input placeholder="请输入"
					 v-model="baseDialogFormData.icCode"></el-input>
				</el-form-item>
			</template>
		</base-dialog>

	</div>
</template>

<script>
	import axios from 'axios'
	import InfoWristband from '@/apis/Info/InfoWristband.js'
	export default {
		data() {
			return {
				// 顶部表单数据
				baseTopFormData: {
					keyword: "",
				},
				// 表格数据
				baseTableData: {
					total: 0,
					list: []
				},
				baseTablePageCurrent: 1,
				baseTablePageSize: 10,
				baseTableCurrent: {}, // 当前选中行数据

				/* 全局弹框组件 */
				baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
				isBaseDialog: false,
				baseDialogFormData: {
				},
			}
		},
		created(){
		   	this.getList();
		},
		methods: {
			getList(){
				// debugger
				InfoWristband.getList({
					pageNum:this.baseTablePageCurrent,
					pageSize:this.baseTablePageSize,
					cardCode:this.baseTopFormData.name
				}).then(res=>{
				   if(res.code==0)
				   {
					 this.baseTableData.list= res.rows;
					 this.baseTableData.total=res.total;
				   }
			   }).catch(err=>{
				   console.log("获取表单失败"+err);
			   })
			},
			postBaseTopFormData() { 
				this.getList();
				console.log('顶部表单数据', this.baseTopFormData)
			},

			/* 表格上方控制按钮操作 */
			baseTableBtnsAdd(bool) {
				this.baseDialogFormData = {}
				this.baseDialogType = 1
				this.handleIsBaseDialog(bool)
				console.log('baseTableBtnsAdd', bool)
			},
			baseTableBtnsEdit(bool) {
				if(this.baseTableCurrent!=null&&this.baseTableCurrent.fid!=null)
				{
				this.baseDialogType = 2
				this.handleIsBaseDialog(bool)
				this.baseDialogFormData=this.baseTableCurrent;
				}else{
					this.$message({
						showClose: true,
						message: '请选择要编辑的信息',
						type: 'warning'
						});
				}
				console.log('baseTableBtnsEdit', bool)
			},
			baseTableBtnsDelete(bool) {
				if(this.baseTableCurrent!=null&&this.baseTableCurrent.fid!=null)
				{
					if(this.baseTableCurrent.useState!="1"){
					this.$elConfirm().then(res => {
						// debugger
					var data=this.baseTableCurrent;
					var fId=data.fid;
					InfoWristband.delete({
						ids:fId
					}).then(res=>{
						if(res.code==0)
						{
							this.$message({
							showClose: true,
							message: '操作成功',
							type: 'success'
							});
							this.getList(); 
						}else{
							this.$message({
								showClose: true,
								message: '删除失败',
								type: 'error'
								});
						}
					})
						console.log('baseTableBtnsDelete', bool)
					}).catch(err => {
						console.log('err', err)
					})
					}else{
						this.$message({
								showClose: true,
								message: '当前手环正在使用无法删除！',
								type: 'error'
								});
					}
					}else{
					this.$message({
						showClose: true,
						message: '请选择要删除的信息',
						type: 'warning'
						});
				}
			},
			/* 弹窗操作 */
			handleIsBaseDialog(bool) {
				this.getList();
				this.isBaseDialog = bool
			},
			postBaseDialogFormData() {
				// debugger
				var data=this.baseDialogFormData;
				var fId=data.fid;
				var cardCode=data.cardCode;
				var icCode=data.icCode;
				var centerInfoId=0;
				if(this.baseDialogType==1){
					InfoWristband.save(
						{cardCode:data.cardCode,
						icCode:data.icCode,
						centerInfoId:data.centerInfoId
						}).then(res=>{
							debugger
				   if(res.code==0)
				   {
					   this.$message({
							showClose: true,
							message: '操作成功',
							type: 'success'
							});
						this.getList();
				   }else{
					   this.$message({
								showClose: true,
								message: res.msg,
								type: 'error'
								});
				   }
			   }).catch(err=>{
				   console.log("获取表单失败"+err);
			   })
				}else if(this.baseDialogType==2){
					InfoWristband.edit(
						{
							fId:fId,
							cardCode:cardCode,
							icCode:icCode
						}
					).then(res=>{
						// debugger
						if(res.code==0)
						{
							this.$message({
							showClose: true,
							message: '操作成功',
							type: 'success'
							});
							this.getList();
						}else{
							this.$message({
								showClose: true,
								message: res.msg,
								type: 'error'
								});
						}
					})
				}
				console.log('提交表单数据', JSON.parse(JSON.stringify(this.baseDialogFormData)))
			},

			/* 表格操作 */
			baseTableCurrentChange(row, index) {
				console.log('当前选中表格行', row, index)
				this.baseTableCurrent = row
			},
			baseTablePageSizeChange(val) {
				console.log('每页数量', val)
				this.baseTablePageSize = val
				this.getList();
			},
			baseTablePageCurrentChange(val) {
				console.log('当前页码', val)
				this.baseTablePageCurrent = val
				this.getList();
			},
			formatterproportion(row,column)
			{
				return row.proportion+"%";
			}
		}
	}
</script>

<style scoped
 lang="scss">
	.info-wristband {
		padding: 30px 20px;
	}
</style>
