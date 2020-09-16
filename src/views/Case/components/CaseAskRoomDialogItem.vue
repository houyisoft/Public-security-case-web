<!-- 组件名称
@module 组件存放位置
@desc 分配询讯问室页面 进入离开弹框
@author 高飞翔
@date 2020年5月6日
@param {Object} [personInfo] - 刷手环获取的人员信息
@function savePersonInfo - 保存父组件刷手环获取的人员信息
@example 调用示例
<case-ask-room-dialog-item :personInfo="personInfo"
@onSavePersonInfo="savePersonInfo"></case-ask-room-dialog-item> -->
<template>
	<div class="ask-room-dialog-cpnt">
		<el-dialog
		:close-on-click-modal="false"
		 :title="status == 1 ? '进入询讯问室' : '离开询讯问室'"
		 :visible="$store.state.Case.askRoomDialog.visible"
		 @close="$store.commit('Case/updateAskRoomDialog', {visible: false})">
			<el-row>
				<el-col class="dialog-left"
				 :span="12">
					<div class="left-title">
						<template v-if="status == 1">请进入询讯问室的人员刷手环进入</template>
						<template v-if="status == 2">请离开询讯问室的人员刷手环离开</template>
					</div>
					<div class="left-info" style="margin-top:20px">
						<div class="info-label">人员编号：</div>
						<div class="info-value">{{personInfo.fId}}</div>
					</div>
					<div class="left-info">
						<div class="info-label">手环编号：</div>
						<div class="info-value">{{personInfo.wristbandId}}</div>
					</div>
					<div class="left-info">
						<div class="info-label">人员姓名：</div>
						<div class="info-value">{{personInfo.name}}</div>
					</div>
					<div class="left-info">
						<div class="info-label">案件名称：</div>
						<div class="info-value">{{personInfo.caseName}}</div>
					</div>
					<div class="left-info">
						<div class="info-label">所在位置：</div>
						<div class="info-value">{{personInfo.personSite}}</div>
					</div>
					<div class="left-info">
						<div class="info-label">功能室：</div>
						<div class="info-value">
							<span v-if="personInfo.fcName!=''">{{personInfo.fcName}}</span>
							<span v-else>
								<el-select v-model="type" placeholder="请选择">
									<el-option
									v-for="(item,index) in typelist"
									:key="index"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</span>
						</div>
					</div>
					<div class="left-info">
						<div class="info-label">民警编号：</div>
						<div class="info-value">{{personInfo.policeNo}}</div>
					</div>
					<div class="left-info">
						<div class="info-label">民警姓名：</div>
						<div class="info-value">{{personInfo.policeName}}</div>
					</div>
				</el-col>
				<el-col class="dialog-right"
				 :span="12">
					<div class="right-title">人员照片</div>
					<div class="right-img">
						<el-image class="person-img"
						 :src="personInfo.picture"
						 fit="fill"></el-image>
					</div>
					<el-button class="right-btn"
					 type="primary"
					 @click="savePersonInfo">保存</el-button>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['personInfo','typelist'],
		computed: {
			// 进入/离开询讯问室
			status() {
				return this.$store.state.Case.askRoomDialog.status
			},
		},
		data() {
			return {
				type:''
			}
		},
		methods: {
			savePersonInfo() {
				this.$emit('onSavePersonInfo')
				this.$store.commit('Case/updateAskRoomDialog', {
					visible: false,status:this.status
				})
			}
		}
	}
</script>

<style scoped
 lang="scss">
	.ask-room-dialog-cpnt {
		.dialog-left {
			.left-title {}

			.left-info {
				display: flex;
				line-height: 50px;
				.info-label {}

				.info-value {}
			}
		}

		.dialog-right {
			.right-title {}

			.right-img {
				width: 300px;
				height: 200px;
			}

			.right-btn {
				float: right;
			}
		}
	}
</style>
