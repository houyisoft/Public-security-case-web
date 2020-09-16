<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div class="page-wrap">
		<base-top-form title='待办流程'
		 :isBaseTopFormResetBtn="true"
		 :baseTopFormData="baseTopFormData"
		 @onPostBaseTopFormData="getTbInoutpersonCaseareaList">
			<template v-slot:form>
				<el-form-item label="涉案人员"
				 prop="name">
					<el-input placeholder="请输入"
					 v-model.trim="baseTopFormData.name"></el-input>
				</el-form-item>
				<el-form-item label="人员编号"
				 prop="ypeople">
					<el-input placeholder="请输入"
					 v-model.trim="baseTopFormData.ypeople"></el-input>
				</el-form-item>
				<el-form-item label="入区日期"
				 prop="date">
					<el-date-picker type="daterange"
					 unlink-panels
					 value-format="yyyy-MM-dd"
					 range-separator="-"
					 start-placeholder="开始日期"
					 end-placeholder="结束日期"
					 v-model="baseTopFormData.date">
					</el-date-picker>
				</el-form-item>
			</template>
		</base-top-form>

		<div class="page-main">
			<div class="main-list">
				<div :class="{'list-item': true, 'bcg356498': index % 2 != 0}"
				 v-for="(item, index) in personCaseareaData.rows"
				 :key="index">
					<div class="list-index">{{index + 1}}</div>
					<div class="list-info">
						<div class="info-item">
							<div class="info-label">入区时间：</div>
							<div class="info-value">{{item.fcreatedate}}</div>
						</div>
						<div class="info-item">
							<div class="info-label">涉案人员：</div>
							<div class="info-value">{{item.name}}</div>
						</div>
						<div class="info-item">
							<div class="info-label">卡/腕带：</div>
							<div class="info-value" v-if="item.wristbandNo != 'null'">{{item.wristbandNo}}</div>
						</div>
						<div class="info-item">
							<div class="info-label">人员编号：</div>
							<div class="info-value">{{item.ypeople}}</div>
						</div>
					</div>

					<el-steps class="layout-steps"
					 align-center>
						<el-step :class="{'steps-item': true, 'steps-item-finish': 1}"
						 title="入区登记"
						 @click.native="goStep(item, 1)">
							<i class="steps-item-icon step-1"
							 slot="icon"></i>
						</el-step>
						<el-step :class="{'steps-item': true, 'steps-item-finish': item.isPersonsSecurity == 1 && item.isChangeClothes == 1}"
						 title="人身检查"
						 @click.native="goStep(item, 2)">
							<i class="steps-item-icon step-2"
							 slot="icon"></i>
						</el-step>
						<el-step :class="{'steps-item': true, 'steps-item-finish': item.isUserState == 1}"
						 title="随身物品"
						 @click.native="goStep(item, 3)">
							<i class="steps-item-icon step-3"
							 slot="icon"></i>
						</el-step>
						<el-step :class="{'steps-item': true, 'steps-item-finish': item.isSuspectInfo == 1}"
						 title="信息采集"
						 @click.native="goStep(item, 4)">
							<i class="steps-item-icon step-4"
							 slot="icon"></i>
						</el-step>
						<el-step :class="{'steps-item': true, 'steps-item-finish': item.distributionRoomId}"
						 title="侯问待审"
						 @click.native="goStep(item, 5)">
							<i class="steps-item-icon step-5"
							 slot="icon"></i>
						</el-step>
						<el-step :class="{'steps-item': true, 'steps-item-finish': item.isReturnGoods == 1}"
						 title="物品返还"
						 @click.native="goStep(item, 6)">
							<i class="steps-item-icon step-6"
							 slot="icon"></i>
						</el-step>
						<el-step :class="{'steps-item': true, 'steps-item-finish': item.outAreaTime}"
						 title="出区登记"
						 @click.native="goStep(item, 7)">
							<i class="steps-item-icon step-7"
							 slot="icon"></i>
						</el-step>
					</el-steps>
				</div>
			</div>
			<el-pagination @size-change="handleSizeChange"
			 @current-change="handleCurrentChange"
			 :total="personCaseareaData.total"
			 :current-page="baseTopFormData.pageNum"
			 :page-size="baseTopFormData.pageSize"
			 :page-sizes="[10, 20, 30, 40]"
			 layout="total, sizes, prev, pager, next">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import apiCaseEntry from '@/apis/apiCase/apiCaseEntry.js'
	export default {
		data() {
			return {
				// 表单查询条件
				baseTopFormData: {
					name: "",
					ypeople: '',
					date: '',
					pageNum: 1,
					pageSize: 10,
				},
				// 涉案人员列表
				personCaseareaData: {},
			}
		},
		created() {
			// 获取待办流程列表
			this.getTbInoutpersonCaseareaList()
		},
		methods: {
			getTbInoutpersonCaseareaList() {
				let data = {
                    centerInfoId: JSON.parse(localStorage.getItem("userInfo")).fcompanyid,
					pageNum: this.baseTopFormData.pageNum,
					pageSize: this.baseTopFormData.pageSize,
					name: this.baseTopFormData.name, // 涉案人员
                    ypeople: this.baseTopFormData.ypeople, // 人员编号
					startDate: this.baseTopFormData.date ? this.baseTopFormData.date[0] + ' 00:00:00' : '',
					endDate: this.baseTopFormData.date ? this.baseTopFormData.date[1] + ' 23:59:59' : '',
				}
                //JSON.parse(localStorage.getItem('userInfo')).fcompanyid
				apiCaseEntry.getTbInoutpersonCaseareaList(data).then(res => {
					console.log('获取待办流程列表成功', res)
					if (res.code == 0) {
						this.personCaseareaData = res
					}
				}).catch(err => {
					console.log('获取待办流程列表成功', err)
				})
			},
			handleSizeChange(val) {
				this.$set(this.baseTopFormData, 'pageNum', 1)
				this.$set(this.baseTopFormData, 'pageSize', val)
				this.getTbInoutpersonCaseareaList()
			},
			handleCurrentChange(val) {
				this.$set(this.baseTopFormData, 'pageNum', val)
				this.getTbInoutpersonCaseareaList()
			},
			goStep(item, step) {
				console.log('前往选中步骤', item, step)
				switch (step) {
					case 1:
						this.$router.push({
							path: "CaseEntry",
							query: {
								options: item.fid
							},
						})
						break;
					case 2:
						this.$router.push({
							path: "CaseSecurityCheck",
							query: {
								options: item.fid
							}
						})
						break;
					case 3:
						this.$router.push({
							path: "CaseBelongings",
							query: {
								options: item.fid
							}
						})
						break;
					case 4:
						this.$router.push({
							path: "CaseInfoCollect",
							query: {
								options: item.fid
							}
						})
						break;
					case 5:
						this.$router.push({
							path: "CaseWaitRoom",
							query: {
								options: item.fid
							}
						})
						break;
					case 6:
						this.$router.push({
							path: "CaseBelongingsBack",
							query: {
								options: item.fid
							}
						})
						break;
					case 7:
						this.$router.push({
							path: "CaseExit",
							query: {
								options: item.fid
							}
						})
						break;
				}
			},
		}
	}
</script>

<style scoped
 lang="scss">
	.page-main {
		.main-list {
			background: rgba(9, 61, 113, 1);
			border: 1px solid rgba(108, 223, 252, 1);

			/*.bcg356498 {*/
				/*background-color: #356498;*/
			/*}*/

			.list-item {
				display: flex;
				align-items: center;
				padding: 20px 0;
				border-bottom: 1px solid #5787B8;
				&:last-child {
					border-bottom: none;
				}

				.list-index {
					font-size: 10px;
					color: rgba(154, 191, 241, 1);
					width: 60px;
					text-align: center;
				}

				.list-info {
					width: 240px;

					.info-item {
						display: flex;
						font-size: 10px;
						line-height: 20px;
                        padding-right: 12px;
						border-right: 1px solid rgba(108, 223, 252, 0.3);

						.info-label {
							width: 60px;
							color: rgba(126, 172, 221, 1);
						}

						.info-value {
							flex: 1;
							color: rgba(108, 223, 252, 1);
						}
					}
				}

				/* 流程图部分 */
				.layout-steps {
					flex: 1;

					.steps-item {
						width: 130px;

						::v-deep .el-step__head {

							.el-step__line {
								height: 1px;
								background: #999;
								left: 68%;
								right: -32%;
							}

							.el-step__icon {
								cursor: pointer;
								width: 24px;
								height: 24px;
								border: none !important;

								.steps-item-icon {
									width: 24px;
									height: 24px;
									background-size: 100%;
									background-repeat: no-repeat;
									background-position: center;
								}

								.step-1 {
									background-image: url(../../assets/images/steps/step_1.png);
								}

								.step-2 {
									background-image: url(../../assets/images/steps/step_2.png);

								}

								.step-3 {
									background-image: url(../../assets/images/steps/step_3.png);
								}

								.step-4 {
									background-image: url(../../assets/images/steps/step_4.png);
								}

								.step-5 {
									background-image: url(../../assets/images/steps/step_5.png);
								}

								.step-6 {
									background-image: url(../../assets/images/steps/step_6.png);
								}

								.step-7 {
									background-image: url(../../assets/images/steps/step_7.png);
								}
							}
						}

						::v-deep .el-step__main {
							.el-step__title {
								cursor: pointer;
								color: #FFFFFF;
								font-size: 10px !important;
							}
						}
					}

					.steps-item-finish {
						::v-deep .el-step__head {
							.el-step__icon {
								.step-1 {
									background-image: url(../../assets/images/steps/step_1_active.png);
								}

								.step-2 {
									background-image: url(../../assets/images/steps/step_2_active.png);
								}

								.step-3 {
									background-image: url(../../assets/images/steps/step_3_active.png);
								}

								.step-4 {
									background-image: url(../../assets/images/steps/step_4_active.png);
								}

								.step-5 {
									background-image: url(../../assets/images/steps/step_5_active.png);
								}

								.step-6 {
									background-image: url(../../assets/images/steps/step_6_active.png);
								}

								.step-7 {
									background-image: url(../../assets/images/steps/step_7_active.png);
								}
							}
						}

						::v-deep .el-step__main {
							.el-step__title {
								color: #FBB95C;
							}
						}
					}
				}

			}
		}
	}
</style>
