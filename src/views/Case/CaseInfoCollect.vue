<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div class="page-wrap">
        <base-top-form title="信息采集列表信息"
                       :caseMainTopFormData="caseMainTopFormData"
                       @onPostBaseTopFormData="postCaseMainTopFormData">
            <template v-slot:form>
                <el-form-item prop="type"
                              label="人员类型">
                    <el-select placeholder="请选择"
                               clearable
                               v-model="caseMainTopFormData.personnelType">
                        <el-option :value="item.fitemvalue"
                                   :label="item.fitemname"
                                   v-for="item in personTypeOptions"
                                   :key="item.fitemvalue"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name"
                              label="人员姓名">
                    <el-input v-model="caseMainTopFormData.name"
                              placeholder="请输入"></el-input>
                </el-form-item>
            </template>
        </base-top-form>
        <div class="table-btns-wrap">
            <div class="table-btn-wrap"
                 @click="openInfoCollectDialog(2)">
                <span>信息采集</span>
                <i class="el-icon-s-goods btn-icon"></i>
            </div>
        </div>
		<div class="page-main">
			<el-table class="main-table"
			 :data="infoCollectTableData.list"
			 highlight-current-row
                      border
			 @current-change="selectTableRow">
				<el-table-column type="index"
				 label="序号"
				 width="50">
				</el-table-column>
				<el-table-column prop="registrationTime"
				 label="登记时间"
				 width="180">
				</el-table-column>
				<el-table-column prop="name"
				 label="姓名">
				</el-table-column>
				<el-table-column prop="wristbandNo"
				 label="腕带编号"
				 width="120">
					<template slot-scope="scope">
						<span v-if="scope.row.wristbandNo != 'null'">{{scope.row.wristbandNo}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="casesName"
				 label="案件名称"
				 width="180">
				</el-table-column>
				<el-table-column prop="isSuspectInfo"
				 label="是否信息采集"
				 width="120">
					<template slot-scope="scope">
						<span v-if="scope.row.isSuspectInfo == 0">否</span>
						<span v-else-if="scope.row.isSuspectInfo == 1">是</span>
					</template>
				</el-table-column>
				<el-table-column prop="cardNumber"
				 label="身份证"
				 width="180">
				</el-table-column>
				<el-table-column prop="height"
				 label="身高"
				 width="80">
				</el-table-column>
				<el-table-column prop="weight"
				 label="体重"
				 width="90">
				</el-table-column>
				
				<el-table-column prop="bankName"
				 label="银行名称"
				 width="80">
				</el-table-column>
				<el-table-column prop="bankCard"
				 label="银行卡号"
				 width="150">
				</el-table-column>
				<el-table-column prop="phone"
				 label="手机号"
				 width="120">
				</el-table-column>
				<el-table-column prop="phoneSIS"
				 label="手机SIS"
				 width="120">
				</el-table-column>
				<el-table-column prop="fingerprint"
				 label="指纹"
				 width="120">
				</el-table-column>
				<el-table-column prop="palmprints"
				 label="掌纹"
				 width="120">
				</el-table-column>
				<el-table-column prop="palmprints"
				 label="人像"
				 width="120">
				</el-table-column>
				<el-table-column prop="footprint"
				 label="足迹"
				 width="120">
				</el-table-column>
				<el-table-column prop="handwriting"
				 label="笔迹"
				 width="120">
				</el-table-column>
				<el-table-column prop="handwriting"
				 label="伤疤"
				 width="120">
				</el-table-column>
				<el-table-column prop="dna"
				 label="DNA"
				 width="120">
				</el-table-column>
				<el-table-column prop="urine"
				 label="尿液"
				 width="120">
				</el-table-column>
				<el-table-column prop="bloodTesting"
				 label="血检"
				 width="120">
				</el-table-column>
			</el-table>

			<el-pagination @size-change="handleSizeChange"
			 @current-change="handleCurrentChange"
			 :current-page="caseMainTopFormData.pageNum"
			 :page-sizes="[10, 20, 30, 40]"
			 :page-size="caseMainTopFormData.pageSize"
			 layout="total, sizes, prev, pager, next, jumper"
			 :total="infoCollectTableData.total"
			 :hide-on-single-page="false">
			</el-pagination>
		</div>

		<!-- 修改/信息采集弹窗 -->
		<el-dialog :title="infoCollectDialog.status == 1 ? '信息采集修改' : '信息采集录入'"
		 :visible.sync="infoCollectDialog.visible"
		 :close-on-click-modal="false"
		 @close="infoCollectDialog.visible = false">
			<el-form ref="dialogForm"
			 label-width="80px"
			 :model="dialogFormData">
				<el-row>
					<el-col :span='12'>
						<el-form-item label="身高"
						 prop="height"
						 >
							<el-input v-model="dialogFormData.height"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="体重"
						 prop="weight"
						 >
							<el-input v-model="dialogFormData.weight"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item label="银行名称"
						 prop="bankName"
						 >
							<el-input v-model="dialogFormData.bankName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="银行卡号"
						 prop="bankCard"
						 >
							<el-input v-model="dialogFormData.bankCard"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item label="手机号"
						 prop="phone"
						 >
							<el-input v-model="dialogFormData.phone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="手机SIS"
						 prop="phoneSIS"
						 >
							<el-input v-model="dialogFormData.phoneSIS"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item label="指纹"
						 prop="fingerprint"
						 >
							<el-input v-model="dialogFormData.fingerprint"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="掌纹"
						 prop="palmprints"
						 >
							<el-input v-model="dialogFormData.palmprints"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item label="足迹"
						 prop="footprint"
						 >
							<el-input v-model="dialogFormData.footprint"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="笔迹"
						 prop="handprint"
						 >
							<el-input v-model="dialogFormData.handwriting"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='12'>
						<el-form-item label="尿检"
						 prop="urine"
						 >
							<el-input v-model="dialogFormData.urine"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="血检"
						 prop="bloodTesting"
						 >
							<el-input v-model="dialogFormData.bloodTesting"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='24'>
						<el-form-item label="DNA"
						 prop="dna"
						 >
							<el-input v-model="dialogFormData.dna"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='24'>
						<el-form-item label="备注"
						 prop="remark"
						 >
							<el-input type="textarea" v-model="dialogFormData.remark"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer"
			 class="dialog-footer">
				<el-button type="primary"
				 @click="postDialogFormData">保存</el-button>
				<el-button @click="infoCollectDialog.visible = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import caseinfo from "@/apis/wywcase.js";
    import info from "@/apis/apiCase/apiCaseCollect.js";
	import CaseMainTop from '@/components/CaseMainTop.vue'
	export default {
		components: {
			CaseMainTop,
		},
		data() {
			return {
				// 人员类型下拉选框
				personTypeOptions: [],
				caseMainTopFormData: {
                    personnelType: '',
					name: '',
					pageNum: 1,
					pageSize: 10
				},
				// 信息采集修改/录入弹窗表单控制
				infoCollectDialog: {
					visible: false,
					status: 1, // 1 修改 2 录入
				},
				// 信息采集修改/录入弹窗表单
				dialogFormData: {},
				// 信息采集列表数据
				infoCollectTableData: {
					total: 0,
					list: []
				},
				currentPage: 1,
				pageSize: 100,
				infoRow: {}
			}
		},
		created() {
		    //勿删，代办流程跳转过来需要这段代码
            let fid = this.$route.query.options;
            if(fid) {
                this.caseMainTopFormData.fId = fid;
                this.getList();
            } else {
                this.getList();
            }
			this.getSuspect();
		},
		methods: {
		    getSuspect() {
                info.listSuspect().then(res => {
                    if(res.code==0){
                        this.personTypeOptions = res.rows;
                    }
                });
			},
			getList() {
			  caseinfo.getInfolist(this.caseMainTopFormData).then(res => {
				if(res.code==0){
					this.infoCollectTableData.list = res.rows;
					this.infoCollectTableData.total = res.total;
				}
			  });
    		},
			// 提交CaseMainTop表单
			postCaseMainTopFormData() {
                this.caseMainTopFormData.fId = '';
				this.getList();
			},
			openInfoCollectDialog(status) {
			    if(!this.infoRow.name) {
                    this.$message({
                        message: '请选择一条数据！',
                        type: 'error'
                    });
				} else {
                    this.infoCollectDialog = {
                        status,
                        visible: true,
                    };
                    this.dialogFormData = {};
					let data = {
						'entryreGistrationPersonsInfoId':this.infoRow.entryreGistrationPersonsInfoId,
						'fId': this.infoRow.fid
					}
					info.echoInfo(data).then(res => {
						if(res.code==0){
							if(res.rows[0]) {
								this.dialogFormData = res.rows[0];
							}
						}
					});
				}
			},
			// 提交 信息采集修改/录入弹窗表单
			postDialogFormData() {
				this.$validate('dialogForm').then(res => {
                    this.dialogFormData.centerInfoId = JSON.parse(localStorage.getItem('userInfo')).fcompanyid;
				    if(this.infoRow.isSuspectInfo == 0) {
                        this.dialogFormData.entryreGistrationPersonsInfoId = this.infoRow.entryreGistrationPersonsInfoId;
                        this.dialogFormData.dNA = this.dialogFormData.dna;
                        info.addInfo(this.dialogFormData).then(res => {
                            if(res.code==0){
                                this.$message({
                                    message: '录入信息采集成功！',
                                    type: 'success'
                                });
                                this.infoCollectDialog.visible = false;
                                this.getList();
                            }
                        });
					} else if(this.infoRow.isSuspectInfo == 1) {
                        let data = {
                            entryreGistrationPersonsInfoId: this.dialogFormData.entryreGistrationPersonsInfoId,
                            fId: this.dialogFormData.fid,
							weight: this.dialogFormData.weight,
                            height: this.dialogFormData.height,
                            bankName: this.dialogFormData.bankName,
                            bankCard: this.dialogFormData.bankCard,
                            phone: this.dialogFormData.phone,
                            phoneSIS: this.dialogFormData.phoneSIS,
                            palmprints: this.dialogFormData.palmprints, // 掌纹
                            urine: this.dialogFormData.urine, // 尿检
                            fingerprint: this.dialogFormData.fingerprint,
                            bloodTesting: this.dialogFormData.bloodTesting,//血检
                            footprint: this.dialogFormData.footprint,
                            handwriting: this.dialogFormData.handwriting,
                            dNA: this.dialogFormData.dna,
                            remark: this.dialogFormData.remark
						}
                        this.dialogFormData.fId = this.dialogFormData.fid;
                        info.editInfo(data).then(res => {
                            if(res.code==0){
                                this.$message({
                                    message: '修改信息采集成功！',
                                    type: 'success'
                                });
                                this.infoCollectDialog.visible = false;
                                this.getList();
                            }
                        });
					}

				}).catch(err => {
					console.log('err', err)
				})
			},
			selectTableRow(val) {
				this.infoRow = val;
			},
			handleSizeChange(val) {
				console.log('设置每页数量', val);
				this.caseMainTopFormData.pageSize = val;
                this.getList();
			},
			handleCurrentChange(val) {
				console.log('设置当前页码', val);
                this.caseMainTopFormData.pageNum = val;
                this.getList();
			},
		}
	}
</script>

<style scoped
 lang="scss">

</style>
