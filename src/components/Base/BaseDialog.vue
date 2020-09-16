<template>
	<div class="base-dialog">
		<el-dialog :visible="isBaseDialog"
		:close-on-click-modal="false"
		 :title="title"
		 :width="dialogWidth"
		 @close="handleIsBaseDialog(false)">
			<el-form ref="baseDialogForm"
			 :rules="baseDialogFormRules"
			 :model="baseDialogFormData"
			 :label-width="labelWidth">
				<slot name="form"></slot>
			</el-form>
			<slot name="content"></slot>
			<template slot="footer">
				<div class="base-dialog-footer"
				 style="justify-content: space-between">
					<el-checkbox v-model="isFinished">确认并关闭窗口</el-checkbox>
					<div class="footer-btns">
						<el-button type="primary"
						 @click="postBaseDialogFormData">确认</el-button>
						<el-button @click="$emit('onHandleIsBaseDialog', false)">关闭</el-button>
					</div>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			// 弹窗显示隐藏
			isBaseDialog: {
				type: Boolean,
				default: false,
			},
			// 弹窗标题
			title: {
				type: String,
				default: ''
			},
			// 表单
			baseDialogFormData: {
				type: Object,
				default () {
					return {}
				}
			},
			// 弹窗宽度
			dialogWidth: {
				type: String
			},
			baseDialogFormRules: {
				type: Object,
				// 如不传该参数，使用默认全局校验规则
				default () {
					return {
						name: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						}],
						email: [{
								required: true,
								message: '请输入邮箱地址',
								trigger: 'blur'
							},
							{
								type: 'email',
								message: '请输入正确的邮箱地址',
								trigger: ['blur', 'change']
							}
						],
						mobile: [{
								required: true,
								message: '请输入手机号码',
								trigger: 'blur'
							},
							{
								validator: this.$checkMobile,
								trigger: ['blur', 'change']
							}
						]
					}
				}
			},
			labelWidth: {
				type: String,
				default: 'auto',
			}
		},
		data() {
			return {
				// 是否确认并关闭窗口
				isFinished: true,
			}
		},
		methods: {
			// 提交弹窗表单
			postBaseDialogFormData() {
				this.$validate('baseDialogForm').then(() => {
					console.log("验证成功");

					this.$emit('onPostBaseDialogFormData')

					if (this.isFinished) { // 如果确认并关闭窗口
						this.$emit('onHandleIsBaseDialog', false)
					} else { // 否则清空表单继续操作
						this.$resetFields('baseDialogForm')
					}
				}).catch(err => {
					console.log("验证失败", err);
				})
			},
			// 弹窗开关控制
			handleIsBaseDialog(bool) {
				this.$emit('onHandleIsBaseDialog', bool)
				if (!bool) {
					console.log('清空表单', this.baseDialogFormData)
					this.$resetFields('baseDialogForm')
				}
			},
		}
	}
</script>

<style scoped
 lang="scss">
	.base-dialog {
		.base-dialog-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
