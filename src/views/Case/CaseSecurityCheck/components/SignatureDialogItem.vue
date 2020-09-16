<!-- 组件名称
@module 组件存放位置
@desc 生成电子签章页 弹框
@author 高飞翔
@date 2020年5月7日
@params {Boolean} [isShow] 弹窗显示隐藏
@function onCloseDialog 父组件关闭弹窗
-->
<template>
	<div class="">
		<el-dialog title="生成电子签章页"
		 :visible="isShow"
		 :close-on-click-modal="false"
		 @close="$emit('onCloseDialog')">

			<el-row>
				<el-col class="dialog-info">
					<el-col class="title">人员基本信息</el-col>
					<el-row>
						<el-col :span="6">姓名：杨永福</el-col>
						<el-col :span="8">性别：男</el-col>
						<el-col :span="10">出生日期：1982-2-1</el-col>
					</el-row>
					<el-row>
						<el-col :span="10">入区时间：1982-2-1</el-col>
						<el-col :span="8">现住址：北京市丰台区</el-col>
						<el-col :span="6">户籍住址：北京市丰台区</el-col>
					</el-row>
				</el-col>
				<el-col class="dialog-security">
					<el-col class="title">人身检查情况</el-col>
					<el-row>
						<el-col :span="4">有无病史：有</el-col>
						<el-col :span="4">有无伤情</el-col>
						<el-col :span="4">有无伤痕</el-col>
						<el-col :span="4">是否饮酒</el-col>
					</el-row>
					<el-table class="main-table"
					 :data="dialogTableData">
						<el-table-column prop="index"
						 label="编号"
						 width="50">
						</el-table-column>
						<el-table-column prop="detail"
						 label="详细信息"
						 width="100">
						</el-table-column>
						<el-table-column prop="url"
						 label="图片">
							<template slot-scope="scope">
								<el-image :src="scope.row.url"
								 fit="fill"
								 :width="50"
								 :height="20"></el-image>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
				<el-col class="dialog-signature">
					<el-col class="title">人员基本信息</el-col>
					<el-row>
						<div class="fingerprint-wrap">
							<div class="">嫌疑人</div>
							<el-button type="primary"
							 plain
							 @click="fingerprint"
							 v-if="!fingerprintUrl">电子签章捺印</el-button>
							<el-image src=""
							 fit="fill"
							 :width="122"
							 :height="50"
							 style="background-color: red;"
							 v-else></el-image>
						</div>
					</el-row>
				</el-col>
			</el-row>

		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				dialogTableData: [{
					index: 1, // 序号
					detail: '王小虎', // 详细信息
					url: '', // 图片路径
				}, {
					index: 2, // 序号
					detail: '陈小春', // 详细信息
					url: '', // 图片路径
				}],
				fingerprintUrl: "", // 指纹
			}
		},
		methods: {
			// 电子签章捺印
			fingerprint() {
				console.log("按指纹");
				this.fingerprintUrl = "123313"
			},
		}
	}
</script>

<style scoped
 lang="scss">
</style>
