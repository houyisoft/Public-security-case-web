<template>
  <div class="system-administration">
    <base-top-form
      title="设备管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="searchValue" label="关键字">
          <el-input
            v-model="baseTopFormData.searchValue"
            placeholder="ip/描述"
            style="width: 200px;"
          ></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select
            placeholder="请选择"
            clearable
            v-model="baseTopFormData.state"
          >
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="停用"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </base-top-form>
    <div class="table-btns-wrap">
      <div class="table-btn-wrap" @click="handleAdd">
        <span>新增</span>
        <i class="el-icon-circle-plus btn-icon"></i>
      </div>
    </div>
    <base-table
      :baseTableData="baseTableData.list"
      :baseTableDataTotal="baseTableData.total"
      :baseTableCurrentRadio="baseTableCurrentRadio"
      :baseTablePagecurrentPage="pageNum"
      :baseTablePageSize="pageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="equiIP" width label="设备IP"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            active-value="1"
            inactive-color="#ff4949"
            inactive-value="0"
            @change="handleStateChange($event, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="fcreatedate"
        label="创建日期"
        width
      ></el-table-column>
      <el-table-column
        prop="fcreateusername"
        label="创建人"
        width
      ></el-table-column>
      <el-table-column
        prop="fDescription"
        label="描述"
        width="190"
      ></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </base-table>

    <!-- 主页弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="childDialog.title"
      :visible.sync="mainDialog"
      width="760px"
    >
      <el-form
        :model="childDialog.form"
        ref="equipmentForm"
        label-width="100px"
      >
        <el-form-item
          label="设备IP"
          prop="equiIP"
          :rules="[
            { required: true, message: '请输入名称', trigger: 'change' },
            {
              pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
              message: '请输入正确格式',
            },
          ]"
        >
          <!-- <el-input
            v-model="childDialog.form.equiIP"
            style="width: 260px;"
          ></el-input> -->
          <ip-address v-model="childDialog.form.equiIP" style="width: 260px;" />
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '请选择功能授权', trigger: 'blur' },
          ]"
          label="功能授权"
          prop="moduleMenuNames"
        >
          <base-fake-element
            baseFakeElementFlag="select"
            @onBaseFakeElementClick="
              () => {
                childDialog.checkedKeys = childDialog.checkedKeys;
                childDialog.visible = true;
              }
            "
            style="width: 260px;"
            >{{ childDialog.form.moduleMenuNames }}</base-fake-element
          >
        </el-form-item>
        <el-form-item prop="moduleMenuIds" hidden></el-form-item>
        <el-form-item label="有效" prop="state">
          <el-switch
            v-model="childDialog.form.state"
            active-color="#13ce66"
            active-value="1"
            inactive-color="#ff4949"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="描述" prop="fDescription">
          <el-input
            type="textarea"
            rows="5"
            v-model="childDialog.form.fDescription"
            style="width: 560px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('equipmentForm')"
          >确认</el-button
        >
        <el-button @click="mainDialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 子弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      title="功能权限"
      :visible.sync="childDialog.visible"
      width="500"
    >
      <el-tree
        :data="childDialog.functionTree"
        show-checkbox
        node-key="fModuleid"
        :default-checked-keys="childDialog.checkedKeys"
        :props="{ label: 'fFullname' }"
        ref="functionTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectTreeData">确认</el-button>
        <el-button @click="() => (childDialog.visible = false)">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Apis from "@/apis/unit.js";
import SystemApis from "@/apis/system.js";
import { handleTree } from "@/utils/utils.js";
import InfoSubmenu from "@/views/Info/components/InfoSubmenu.vue";
import IpAddress from "@/components/ipAddress";
export default {
  components: {
    InfoSubmenu,
  },
  data() {
    return {
      baseTopFormData: {
        searchValue: "",
        state: "",
      },
      // baseTable表格组件数据
      baseTableData: {
        total: 0,
        list: [],
      },
      childDialog: {
        form: {
          fDepartmentid: "",
          equiIP: "",
          state: "1",
          moduleMenuIds: [],
          moduleMenuNames: "",
          fDescription: "",
        },
        functionTree: [],
        checkedKeys: [],
        visible: false,
      },
      baseTableCurrentRadio: 0, // 当前选中的radio
      pageNum: 1,
      pageSize: 10,
      mainDialog: false,
      currentTableRow: {},
    };
  },
  components: { IpAddress },
  mounted() {
    this.getList();
    this.getSystemList();
  },
  methods: {
    selectTreeData() {
      const tree = this.$refs.functionTree;
      const checked = JSON.parse(JSON.stringify(tree.getCheckedNodes()));
      const halfChecked = JSON.parse(JSON.stringify(tree.getHalfCheckedKeys()));
      const name = [],
        keys = [];
      for (const item of checked) {
        name.push(item.fFullname);
        keys.push(item.fModuleid);
      }
      this.childDialog.checkedKeys = keys;
      this.childDialog.form.moduleMenuNames = name.join(",");
      this.childDialog.form.moduleMenuIds = halfChecked.concat(keys);
      this.childDialog.visible = false;
      this.$refs.equipmentForm.validateField("moduleMenuNames");
    },
    getList() {
      const { pageNum, pageSize } = this;
      Apis.getEquipmentlist({
        ...this.baseTopFormData,
        pageNum,
        pageSize,
      }).then((res) => {
        if (res.code == 0) {
          this.baseTableData.list = res.rows;
          this.baseTableData.total = res.total;
        }
      });
    },
    getSystemList() {
      SystemApis.getSystemlist().then((res) => {
        const menuList = handleTree(res.data || [], {
          rootId: "-1",
          idField: "fModuleid",
          parentIdField: "fParentid",
        });
        this.childDialog.functionTree = menuList;
      });
    },
    handleAdd() {
      this.childDialog.title = "新增";
      this.$resetFields("equipmentForm");
      this.mainDialog = true;
    },
    handleUpdate(record) {
      this.$resetFields("equipmentForm");
      this.childDialog.title = "修改";
      this.mainDialog = true;
      const { fId } = record;
      Apis.getEquipmentDetail(fId).then((res) => {
        const { fId, equiIP, fDescription, state, moduleNames, moduleMenuIds } =
          res.data || {};
        this.childDialog.form = {
          fId,
          equiIP,
          fDescription,
          state,
          moduleMenuNames: res.moduleNames || "",
          moduleMenuIds,
        };
        this.childDialog.checkedKeys = moduleMenuIds;
      });
    },
    handleStateChange(state, record) {
      Apis.addOrUpdateEquipment({ state, fId: record.fId })
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.mainDialog = false;
            this.getList();
          } else {
            this.$message({
              message: "操作失败",
              type: "error",
            });
          }
        })
        .catch(function() {
          record.state = record.state === "0" ? "1" : "0";
        });
    },
    handleDelete(record) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        Apis.deleteEquipment({ ids: record.fId }).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.mainDialog = false;
            this.getList();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
        });
      });
    },
    // 主页表单校验并保存按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Apis.addOrUpdateEquipment(this.childDialog.form).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.mainDialog = false;
              this.getList();
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交顶部表单数据
    postBaseTopFormData() {
      this.getList();
    },

    // 表格操作
    baseTableCurrentChange(row, index) {
      this.baseTableCurrentRadio = index;
    },
    baseTableRadioChange(row, index) {
      this.baseTableCurrentRadio = index;
    },
    // 页码操作
    baseTablePageSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getSublist();
    },
    baseTablePageCurrentChange(val) {
      this.pageNum = val;
      this.getSublist();
    },
  },
};
</script>

<style>
.left-btn {
  margin-left: 254px;
}
</style>
