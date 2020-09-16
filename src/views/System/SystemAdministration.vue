<template>
	<div class="system-administration">
		<el-container>
			<el-aside width="180px">
				<info-submenu title="行政区域"></info-submenu>
			
			</el-aside>
			<el-main>
				<base-top-form title="区域信息"
				:baseTopFormData="baseTopFormData"
				@onPostBaseTopFormData="postBaseTopFormData">
				<template v-slot:btn>
				</template>

					<template v-slot:form>
						<el-form-item prop="type" label-width="120px"
						label="">
							<el-select placeholder="请选择"
							v-model="baseTopFormData.type">
								<el-option :value="item.value"
								:label="item.label"
								v-for="(item, index) in types"
								:key="index"></el-option>
							</el-select>
						</el-form-item>
					</template>
				</base-top-form>
				<div class="table-btns-wrap">
					<div class="table-btn-wrap"
						@click="mainDialog = true">
						<span>新增</span>
						<i class="el-icon-circle-plus btn-icon"></i>
					</div>
					<div class="table-btn-wrap"
						@click="mainDialog = true">
						<span>编辑</span>
						<i class="el-icon-edit btn-icon"></i>
					</div>
					<div class="table-btn-wrap">
						<span>删除</span>
						<i class="el-icon-delete btn-icon"></i>
					</div>
				</div>
				<base-table :baseTableData="baseTableData.list"
				:baseTableDataTotal="baseTableData.total"
				:baseTableCurrentRadio="baseTableCurrentRadio"
				:baseTablePagecurrentPage="baseTablePagecurrentPage"
				:baseTablePageSize="baseTablePageSize"
				@onBaseTableCurrentChange="baseTableCurrentChange"
				@onBaseTablePageSizeChange="baseTablePageSizeChange"
				@onBaseTablePageCurrentChange="baseTablePageCurrentChange">
					<el-table-column prop="index"
					label="序号"
					width="50">
					</el-table-column>
					<el-table-column prop="name"
					label="名称"
					width="100">
					</el-table-column>
					<el-table-column prop="address"
					width=""
					label="简拼">
					</el-table-column>
					<el-table-column prop="number"
					label="级别"
					width="">
					</el-table-column>
					<el-table-column prop=""
					label="有效"
					width="">
					<template>
						<el-switch></el-switch>
					</template>
					</el-table-column>
					<el-table-column prop="police"
					label="备注"
					width="300">
					</el-table-column>
				</base-table>
			</el-main>
		</el-container>
		
		<!-- 主页弹窗 -->
		<el-dialog title="添加区域"
		 width="50%"
		 :close-on-click-modal="false"
		 :visible="mainDialog"
		 @close="mainDialog = false">
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item :rules="[{'required': true,'message': '请输入编号','trigger': 'blur'}]" label="编号" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item :rules="[{'required': true,'message': '请输入名称','trigger': 'blur'}]" label="名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item :rules="[{'required': true,'message': '请输入排序','trigger': 'blur'}]" label="排序" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc"></el-input>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<el-button type="primary"
				@click="submitForm('ruleForm')">确认</el-button>
				<el-button type=""
				@click="mainDialog = false">关闭</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	import InfoSubmenu from '@/views/Info/components/InfoSubmenu.vue'
	export default {
		components: {
			InfoSubmenu,
		},
		data() {
			return {
				ruleForm: {
          name: '',
          type: [],
        },
				baseTopFormData: {
					type: "",
				},
				types: [{
					value: 1,
					label: "类型一"
				}],
				// baseTable表格组件数据
				baseTableData: {
					total: 20,
					list: [{
						index: 1, // 序号
						name: '王小虎', // 人员名称
						address: '上海市', // 所在位置
						number: 1010010100101, // 案件编号
						caseName: "案件一", // 案件名称
						bandsNumber: "1232313", // 手环编号
						police: "张三", // 交接民警
						isLeave: true, // 是否已离开
						roomName: "7号侯问室", // 功能室名称
						inDate: '2016-05-02', // 进入时间
						outDate: '2016-05-02', // 离开时间
					}, {
						index: 2, // 序号
						name: '王小', // 人员名称
						address: '北京市 1518 弄', // 所在位置
						number: 1010010100101, // 案件编号
						caseName: "案件一", // 案件名称
						bandsNumber: "1232313", // 手环编号
						police: "张三", // 交接民警
						isLeave: true, // 是否已离开
						roomName: "7号侯问室", // 功能室名称
						inDate: '2016-05-02', // 进入时间
						outDate: '2016-05-02', // 离开时间
					}, {
						index: 3, // 序号
						name: '小虎', // 人员名称
						address: '长沙市 1518 弄', // 所在位置
						number: 1010010100101, // 案件编号
						caseName: "案件一", // 案件名称
						bandsNumber: "1232313", // 手环编号
						police: "张三", // 交接民警
						isLeave: true, // 是否已离开
						roomName: "7号侯问室", // 功能室名称
						inDate: '2016-05-02', // 进入时间
						outDate: '2016-05-02', // 离开时间
					}, {
						index: 4, // 序号
						name: '王虎', // 人员名称
						address: '重庆市', // 所在位置
						number: 1010010100101, // 案件编号
						caseName: "案件一", // 案件名称
						bandsNumber: "1232313", // 手环编号
						police: "张三", // 交接民警
						isLeave: true, // 是否已离开
						roomName: "7号侯问室", // 功能室名称
						inDate: '2016-05-02', // 进入时间
						outDate: '2016-05-02', // 离开时间
					}, ]
				},
				baseTableCurrentRadio: 0, // 当前选中的radio
				baseTablePagecurrentPage: 1,
				baseTablePageSize: 2,
				mainDialog: false,
				visibleSubMain: false
			}
		},
		methods: {
			// 主页表单校验并保存按钮
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						this.mainDialog = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
			// 提交顶部表单数据
			postBaseTopFormData() {
				console.log('postBaseTopFormData', this.postBaseTopFormData)
			},

			// 表格操作
			baseTableCurrentChange(row, index) {
				console.log('row', row.name, index)
				this.baseTableCurrentRadio = index
			},
			baseTableRadioChange(row, index) {
				console.log('row', row.name, index)
				this.baseTableCurrentRadio = index
			},
			// 页码操作
			baseTablePageSizeChange(val) {
				console.log('val', val)
			},
			baseTablePageCurrentChange(val) {
				console.log('val', val)
			},
		}
	}
</script>

<style scoped
 lang="scss">
	.system-administration {
		padding: 40px 20px 20px 20px;
	}
	.left-btn{
		margin-left: 254px;
	}
</style>
