<template>
  <div class="info-locker">
    <base-top-form
      title="随身物品柜"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="name" label="名称：">
          <el-input
            v-model="baseTopFormData.lockerName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
    </base-top-form>
    <base-table-btns
      @onBaseTableBtnsAdd="addRow"
      :buttons="['add']"
    ></base-table-btns>
    <base-table
      :isBaseTablePage="true"
      :stripe="false"
      :baseTableData="baseTableData.list"
      :baseTableDataTotal="baseTableData.total"
      :baseTablePageCurrent="pageNum"
      :baseTablePageSize="pageSize"
      baseTableDataPrimaryKey="id"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="lockerType" width:65
			 label="类型">
			 	<template scope="scope">
                    <el-tag effect="dark" v-if="scope.row.lockerType=='1'">智能柜</el-tag>  
					<el-tag type="success" style="width:60px;text-align:center" effect="dark" v-if="scope.row.lockerType=='2'">货架</el-tag> 
                </template>
			</el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="centerInfoName" label="办案中心"></el-table-column>
      <el-table-column prop="opt" label="操作" width="360">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="editRow(scope.row)"
            >修改</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="viewRow(scope.row)"
            >查看</el-button
          > -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="settings(scope.row)"
            >设置</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="deleteRow(scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="viewUsed(scope.row)"
            >查看使用情况</el-button
          >
        </template>
      </el-table-column>
    </base-table>

    <el-dialog
      ref="lockerForm"
      :close-on-click-modal="false"
      :title="detailDialog.title"
      :visible.sync="detailDialog.visible"
      width="800px"
      close="closeDialog"
    >
      <el-form
        :model="detailDialog.form"
        :rules="detailDialog.rules"
        ref="detailDialog"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="智能柜厂商"
              :rules="[{'required': true,'message': '请输入智能柜厂商','trigger': 'blur'}]"
                    prop="lockerName">
              <el-input
                v-model="detailDialog.form.lockerName"
                required
                
                style="width: 220px;"
              ></el-input>
              <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号" prop="lockCode">
              <el-input
                v-model="detailDialog.form.lockCode" maxlength="12"
                required
                disabled
                style="width: 220px;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Nvr" prop="nvrID">
              <el-select
                v-model="detailDialog.form.nvrID"
                
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in nvrOptions"
                  :key="index"
                  :label="item.nvrName"
                  :value="item.nvrID"
                ></el-option>
              </el-select>
              <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通道ID" prop="region">
              <el-select
                v-model="detailDialog.form.cannelID"
                
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in channelOptions"
                  :key="index"
                  :label="item.passage"
                  :value="item.nvrDetailId"
                ></el-option>
              </el-select>
              <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="货位数量" prop="positionCount">
              <el-input
                v-model="detailDialog.form.positionCount"
                required
                :disabled="detailDialog.disabled"
                style="width: 220px;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="储物柜类型"
             :rules="[{'required': true,'message': '请选择储物柜类型','trigger': 'change'}]"
             prop="lockerType">
              <el-select
                v-model="detailDialog.form.lockerType"
                placeholder="请选择"
                @change="changeType(detailDialog.form.lockerType)"
              >
                <el-option label="柜子" value="1"></el-option>
                <el-option label="货架" value="2"></el-option>
              </el-select>
                <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          
          <el-col :span="12">
            <el-form-item label="状态"  :rules="[
                { required: true, message: '请选择类型', trigger: 'change' },
              ]" prop="status">
              <el-select
                v-model="detailDialog.form.status"
                
                placeholder="请选择"
              >
                <el-option label="可用" :value="0"></el-option>
                <el-option label="删除" :value="1"></el-option>
              </el-select>
              <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col><el-col :span="12">
            <el-form-item v-if="isCabinet"
             :rules="[
           { required: true, message: '请输入IP', trigger: 'change' },
            { pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, message: '请输入正确的IP', trigger: 'change' },
          ]"
          label="IP"
            prop="lockerIp">
              <!-- <el-input
                v-model="detailDialog.form.lockerIp"
                required
                :disabled="detailDialog.disabled"
                style="width: 220px;"
              ></el-input> -->
              <ip-address
                v-model="detailDialog.form.lockerIp"
                required
                
                style="width: 220px;"
              />
              <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="detailDialog.form.remark"
              ></el-input>
                <!-- :disabled="detailDialog.disabled" -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="!detailDialog.disabled">
        <el-button @click="closeForm()">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="详情"
      :visible.sync="viewDialog.visible"
      width="1100px"
    >
      <base-top-form
        :baseTopFormData="viewDialog.search"
        @onPostBaseTopFormData="viewSearch"
      >
        <template v-slot:form>
          <el-form-item prop="name" label="柜台名称：">
            <el-input
              v-model="viewDialog.search.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态：">
            <el-select
              v-model="viewDialog.search.status"
              clearable
              placeholder="请选择"
            >
              <el-option label="未使用" value="0" />
              <el-option label="已使用" value="1" />
            </el-select>
          </el-form-item>
        </template>
      </base-top-form>
      <base-table
        :isBaseTablePage="false"
        :baseTableData="viewDialog.list"
        :max-height="600"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">{{
            scope.row.name || scope.row.siteNO
          }}</template>
        </el-table-column>
        <el-table-column prop="userName" label="使用人"></el-table-column>
        <el-table-column prop="userId" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.userId">已使用</span>
            <span v-else>未使用</span>
          </template>
        </el-table-column>
      </base-table>
    </el-dialog>
    <el-dialog
      title="设置箱体"
      :close-on-click-modal="false"
      :visible.sync="settingsDialog.visible"
      width="1100px"
    >
      <cabinet-settings
        ref="cabintSettings"
        v-if="settingsDialog.visible"
        :dataProp="settingsDialog.visible ? settingsDialog.data : {}"
        :typeProp="settingsDialog.type"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOrUpdateLockers">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Apis from "@/apis/Info/lock.js";
import CabinetSettings from "./components/lock/CabinetSettings";
import IpAddress from "@/components/ipAddress";
export default {
  data() {
    return {
      isCabinet:true,
      // 顶部表单数据
      baseTopFormData: {
        lockerName: "",
      },
      /* detail弹框组件 */
      detailDialog: {
        title: "查看",
        visible: false,
        disabled: false,
        form: {},
      } /* detail弹框组件 */,
      viewDialog: {
        visible: false,
        search: {},
        list: [],
      },
      settingsDialog: {
        visible: false,
        data: {},
      },
      // 表格数据
      baseTableData: {
        total: 0,
        list: [],
      },

      pageNum: 1,
      pageSize: 10,
      baseTableCurrent: {},
      channelOptions: [],
      nvrOptions: [],
    };
  },
  components: { CabinetSettings,IpAddress },
  mounted() {
    this.getList();
    this.getInfoLockList();
  },
  methods: {
    changeType(type)
    {
      if(type=="2")
      this.isCabinet=false
      else
      this.isCabinet=true
    },
    getInfoLockList() {
      Apis.getNvrList({}).then((res) => {
        this.nvrOptions = res.rows || [];
      });
    },
    getChanel(nvrId) {
      Apis.getChannelList({
        nvrId: nvrId,
      }).then((res) => {
        this.channelOptions = res.data || [];
      });
    },
    getList() {
      const { pageNum, pageSize } = this;
      Apis.getList({
        ...this.baseTopFormData,
        pageNum,
        pageSize,
        centerInfoId: JSON.parse(localStorage.userInfo).fcompanyid,
      }).then((res) => {
        debugger
        const { rows, total } = res;
        this.baseTableData.list = rows || [];
        this.baseTableData.total = total || 0;
      });
    },
    getViewList() {
      const { pageNum, pageSize, search } = this.viewDialog;
      Apis.getViewList({
        ...search,
        pageNum,
        pageSize,
      }).then((res) => {
        const { rows, total } = res;
        debugger
        this.viewDialog.list = rows || [];
        this.viewDialog.total = total || 0;
      });
    },
    getLockerCode(){
      Apis.getLockerCode({
        code:this.$store.state.userInfo.fcompanyid+this.getYear()
      }).then(res=>{
       this.detailDialog.form.lockCode=res;
      })
    },
    getYear(){
      var myDate = new Date();
      return myDate.getFullYear();
    },
    addRow(record) {
      this.detailDialog.title = "新增";
      this.detailDialog.disabled = false;
      this.detailDialog.visible = true;
      this.detailDialog.form = {};
      this.detailDialog.lockerId = "";
      this.detailDialog.form.lockerIp = '...'
      //this.getLockerCode()
      this.$nextTick(() => {
        this.$refs['detailDialog'].clearValidate()
      })
    },
    settings(record) {
      this.settingsDialog.visible = true;
      const { id, lockerType } = record;
      Apis.getSettingsList({
        lockerType,
        fId: id,
        lockerId: id,
      }).then((res) => {
        this.settingsDialog.data = res || {};
        this.settingsDialog.type = lockerType;
      });
    },
    closeForm(){
      this.detailDialog.visible = false
      this.$resetFields("detailDialog");
    },
    saveOrUpdate() {
       this.$validate('detailDialog')
        .then((res) => {
          if(this.detailDialog.form.lockerType=="2"){
            var count=this.detailDialog.form.positionCount;
            if(count==undefined||count==null||count=="")
            {
              this.$message.error("请填写数量");
              return 
            }
          }
          const {
        detailDialog: { form },
          } = this;
          Apis.saveOrUpdate(form).then((res) => {
            if (res.code === 0) {
              this.$message.success(form.lockerId ? "修改成功" : "保存成功");
              this.detailDialog.visible = false;
              this.getList();
            } else if (res.code === 500) {
              this.$message.error(res.msg);
            } else {
              this.$message.error("操作失败");
            }
      })
        })
        .catch((err) => {
          console.log('err', err)
        })
    
    },
    saveOrUpdateLockers() {
      this.$refs.cabintSettings.save().then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.$message.success("保存成功");
          this.settingsDialog.visible = false;
          this.closeDialog();
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    closeDialog() {
      this.$resetFields("lockerForm");
    },
    editRow(record) {
      const { id } = record;
      this.detailDialog.title = "修改";
      this.detailDialog.disabled = true;
      this.detailDialog.visible = true;
      this.getDetail(id);
    },
    viewRow(record) {
      const { id } = record;
      this.detailDialog.title = "查看";
      this.detailDialog.disabled = true;
      this.detailDialog.visible = true;
      this.getDetail(id);
    },
    viewUsed(record) {
      const { id: lockerId, lockerType } = record;
      this.viewDialog.visible = true;
      this.viewDialog.search.lockerId = lockerId;
      this.viewDialog.search.lockerType = lockerType;
      this.getViewList();
    },
    deleteRow(record) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const { id, lockerType } = record;
          Apis.delete({ lockerId: id, fId: id, lockerType }).then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.getList();
            } else if (res.code === 8700) {
              this.$message.error(res.msg);
            } else {
              this.$message.error("操作失败");
            }
          });
        })
        .catch(() => {});
    },
    getDetail(lockerId) {
      Apis.getDetail({ lockerId }).then((res) => {
        debugger
        const {
          lockerId,
          nvrID,
          remark,
          status,
          lockerIp,
          lockerName,
          lockCode,
          cannelID,
          positionCount,
          lockerType,
        } = res.rows || {};
        this.detailDialog.form = {
          lockerId,
          nvrID,
          remark,
          status,
          lockerIp,
          lockerName,
          lockCode,
          cannelID,
          positionCount,
          lockerType,
        };
        this.getChanel(this.detailDialog.form.nvrID);
      });
    },
    postBaseTopFormData() {
      this.getList();
    },
    viewSearch() {
      this.getViewList();
    },
    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      console.log("选中行", row, index);
    },
    baseTablePageSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getList();
    },
    baseTablePageCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.info-locker {
  padding: 30px 20px;
}
</style>
